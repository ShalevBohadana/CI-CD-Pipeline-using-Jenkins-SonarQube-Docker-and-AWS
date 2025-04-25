import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setUserAuth, userLogOut } from '../features/auth/authSlice';
import { RootState } from '../store';

export const API_CONFIG = {
  VERSION: 1,
  VERSION_PREFIX: 'v',
  ENDPOINT_PREFIX: 'api',
  BASE: import.meta.env.PROD ? 'https://api.fullboosts.com' : 'http://localhost:8000',
  TIMEOUT: 10000,
} as const;

export const PUBLIC_PATHS = [
  '/auth/login',
  '/auth/refresh-token',
  '/auth/logout',
  '/auth/verify/email',
  '/games',
  '/currencies',
  '/categories',
  '/newsletter',
] as const;

type CustomErrorType = {
  status:
    | 'AUTHENTICATION_ERROR'
    | 'REFRESH_ERROR'
    | 'FETCH_ERROR'
    | 'TIMEOUT_ERROR'
    | 'UNKNOWN_ERROR';
  data: {
    message: string;
    errorMessages: Array<{ path: string; message: string }>;
  };
};

export const BEARER_PREFIX = 'Bearer';

export const API_BASE_PATH: Readonly<URL> = new URL(
  `${API_CONFIG.BASE}/${API_CONFIG.ENDPOINT_PREFIX}/${API_CONFIG.VERSION_PREFIX}${API_CONFIG.VERSION}`
);

export const API_BASE_URL = API_BASE_PATH.href;

export interface ResError {
  status: number | string;
  data: {
    message?: string;
    errorMessages: Array<{ path: string; message: string }>;
  };
}

export interface ResSuccess<T> {
  statusCode: number;
  success: boolean;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  };
  data: T;
  message: string;
}

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const { token } = (getState() as RootState).auth;
    if (token) {
      headers.set('Authorization', `${BEARER_PREFIX} ${token}`);
    }
    return headers;
  },
  timeout: API_CONFIG.TIMEOUT,
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError | CustomErrorType
> = async (args, api, extraOptions) => {
  try {
    // Check if it's a public path
    const path = typeof args === 'string' ? args : args.url;
    const isPublicPath = PUBLIC_PATHS.some((publicPath) => path.includes(publicPath));

    let result = await baseQuery(args, api, extraOptions);

    // If it's a public path or no error, return the result
    if (isPublicPath || !result.error) {
      return result;
    }

    // Handle authentication errors for protected routes
    if (result.error?.status === 401) {
      try {
        const refreshResult = await baseQuery(
          {
            url: '/auth/refresh-token',
            method: 'POST',
            credentials: 'include',
          },
          api,
          extraOptions
        );

        if (refreshResult.data) {
          const refreshedData = refreshResult.data as ResSuccess<{
            accessToken: string;
          }>;
          api.dispatch(setUserAuth(refreshedData.data.accessToken));
          // Retry the original request with new token
          result = await baseQuery(args, api, extraOptions);
        } else {
          // Only logout if it's not a public path
          if (!isPublicPath) {
            api.dispatch(userLogOut(undefined));
          }
          return {
            error: {
              status: 'AUTHENTICATION_ERROR',
              data: {
                message: 'Session expired. Please login again.',
                errorMessages: [
                  {
                    path: 'auth',
                    message: 'Authentication required',
                  },
                ],
              },
            } as CustomErrorType,
          };
        }
      } catch (err) {
        // Only logout if it's not a public path
        if (!isPublicPath) {
          api.dispatch(userLogOut(undefined));
        }
        return {
          error: {
            status: 'REFRESH_ERROR',
            data: {
              message: 'Unable to refresh session',
              errorMessages: [
                {
                  path: 'auth',
                  message: 'Session refresh failed',
                },
              ],
            },
          } as CustomErrorType,
        };
      }
    }

    return result;
  } catch (err) {
    // Handle timeout errors
    if (err instanceof Error && err.name === 'TimeoutError') {
      return {
        error: {
          status: 'TIMEOUT_ERROR',
          data: {
            message: 'Request timed out',
            errorMessages: [
              {
                path: 'timeout',
                message: 'Request took too long to complete',
              },
            ],
          },
        } as CustomErrorType,
      };
    }

    // Handle network errors
    if (err instanceof TypeError && err.message === 'Failed to fetch') {
      return {
        error: {
          status: 'FETCH_ERROR',
          data: {
            message: 'Unable to connect to server',
            errorMessages: [
              {
                path: 'connection',
                message: 'Network error occurred',
              },
            ],
          },
        } as CustomErrorType,
      };
    }

    // Handle all other errors
    return {
      error: {
        status: 'UNKNOWN_ERROR',
        data: {
          message: 'An unexpected error occurred',
          errorMessages: [
            {
              path: 'unknown',
              message: err instanceof Error ? err.message : 'Unknown error',
            },
          ],
        },
      } as CustomErrorType,
    };
  }
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    'auth',
    'cart',
    'game',
    'currency',
    'comment',
    'ticket',
    'report',
    'user',
    'payment',
    'wallet',
    'guide',
    'offer',
    'order',
    'order-review',
    'offer-game-currency',
    'notification',
    'newsletter',
    'game-currency',
    'promo',
    'becomeBooster',
    'becomeCurrencySeller',
    'becomeCurrencySupplier',
    'seller-review',
    'employee',
  ],
  endpoints: () => ({}),
});
