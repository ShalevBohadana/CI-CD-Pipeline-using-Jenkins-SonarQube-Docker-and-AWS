import { memo, ReactNode, useEffect, useCallback } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { ROLE, Roles } from '../enums/role';
import { ROUTER_PATH } from '../enums/router-path';
import { useRefreshMutation } from '../redux/features/auth/authApi';
import { useAppSelector } from '../redux/hooks';
import { LoadingCircle } from './LoadingCircle';
import { COOKIES, jsCookie } from '@/utils/jsCookie';
import { selectAuthToken, selectAuthData, isTokenExpired } from '../redux/features/auth/authSlice';

type AuthenticatedProps = {
  children: ReactNode;
  roles: Roles;
};

export const Authenticated = memo(({ children, roles }: AuthenticatedProps) => {
  const { pathname } = useLocation();
  const token = useAppSelector(selectAuthToken);
  const authData = useAppSelector(selectAuthData);
  const [refresh, { isLoading }] = useRefreshMutation();

  const userRoles = authData?.roles || [ROLE.VISITOR];
  const tokenIsExpired = token ? isTokenExpired(token) : false;
  const hasValidRoles = roles?.every((role) => Object.values(ROLE).includes(role));
  const hasPermission = userRoles.some((role) => roles.includes(role)) && hasValidRoles;

  const refreshToken = useCallback(async () => {
    if (!tokenIsExpired) return;

    try {
      const refreshToken = jsCookie.get(COOKIES.REFRESH_TOKEN);
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      await refresh({ refreshToken }).unwrap();
    } catch (error) {
      console.error('Token refresh failed:', error);
      // Clear any existing tokens on refresh failure
      jsCookie.remove(COOKIES.ACCESS_TOKEN);
      jsCookie.remove(COOKIES.REFRESH_TOKEN);
    }
  }, [tokenIsExpired, refresh]);

  useEffect(() => {
    let isActive = true;

    if (isActive && token) {
      refreshToken();
    }

    return () => {
      isActive = false;
    };
  }, [refreshToken, token]);

  if (isLoading) {
    return <LoadingCircle />;
  }

  if (!token || !roles || !hasPermission) {
    const redirectPath = !token ? ROUTER_PATH.SIGNIN : ROUTER_PATH.UNAUTHORIZED;

    const redirectState = {
      pathname,
      roles,
      reason: !token ? 'no_token' : !roles ? 'no_roles' : 'insufficient_permissions',
    };

    return <Navigate to={redirectPath} state={redirectState} replace />;
  }

  return <>{children}</>;
});

Authenticated.displayName = 'Authenticated';
