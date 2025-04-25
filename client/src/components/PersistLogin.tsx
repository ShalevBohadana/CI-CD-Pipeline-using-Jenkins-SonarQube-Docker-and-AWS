import { useEffect, useRef, useState } from 'react';

import { useRememberThisDevice } from '../hooks/useRememberThisDevice';
import { useRefreshMutation } from '../redux/features/auth/authApi';
import { useAppSelector } from '../redux/hooks';

export const PersistLogin = () => {
  const { shouldRememberDevice } = useRememberThisDevice();
  const { token } = useAppSelector((state) => state.auth);
  const effectRan = useRef(false);

  const [, setTrueSuccess] = useState(false);

  const [refresh] = useRefreshMutation();

  useEffect(() => {
    if (effectRan.current === true || import.meta.env.MODE !== 'development') {
      const verifyRefreshToken = async () => {
        try {
          await refresh(undefined);

          setTrueSuccess(true);
        } catch (error) {
          console.error('Failed to refresh token', error);
        }
      };

      if (!token && shouldRememberDevice) verifyRefreshToken();
    }

    return () => {
      effectRan.current = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // return !shouldRememberDevice ? (
  //   <Outlet />
  // ) : isLoading ? (
  //   <p className="text-[10rem] text-center">Loading...</p>
  // ) : (
  //   <Outlet />
  // );
};
