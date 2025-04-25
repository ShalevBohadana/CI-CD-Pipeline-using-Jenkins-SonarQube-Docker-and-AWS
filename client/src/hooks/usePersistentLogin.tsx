import { useEffect, useRef } from 'react';
import { useRefreshMutation } from '../redux/features/auth/authApi';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setUserAuth } from '../redux/features/auth/authSlice';
import { useRememberThisDevice } from './useRememberThisDevice';

export const usePersistentLogin = () => {
  const dispatch = useAppDispatch();
  const effectRan = useRef(false);
  const { shouldRememberDevice } = useRememberThisDevice();

  const { token, isLoading: isAuthLoading } = useAppSelector((state) => state.auth);

  const [refresh, { isLoading }] = useRefreshMutation();

  useEffect(() => {
    // בדיקה למניעת ריצה כפולה בפיתוח
    if (effectRan.current === true && import.meta.env.MODE === 'development') {
      return;
    }

    const verifyRefreshToken = async () => {
      try {
        // בדיקה אם יש refresh token בקוקיס
        const cookies = document.cookie.split(';');
        const hasRefreshToken = cookies.some((cookie) => cookie.trim().startsWith('refreshToken='));

        if (!hasRefreshToken) {
          return;
        }

        const response = await refresh({}).unwrap();

        if (response?.data?.accessToken) {
          dispatch(setUserAuth(response.data.accessToken));
        }
      } catch (error) {
        // לוג מפורט יותר של השגיאה
        console.error('Failed to refresh token:', {
          error,
          hasToken: !!token,
          shouldRemember: shouldRememberDevice,
        });
      }
    };

    // תנאי משופר לרענון הטוקן
    if (shouldRememberDevice && (!token || token === '')) {
      verifyRefreshToken();
    }

    return () => {
      effectRan.current = true;
    };
  }, [token, shouldRememberDevice, refresh, dispatch]);

  // מחזיר מידע נוסף למצב הטעינה
  return {
    isPending: isLoading || isAuthLoading,
    hasToken: !!token,
    shouldRemember: shouldRememberDevice,
  };
};
