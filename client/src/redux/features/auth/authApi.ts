import { COOKIES, jsCookie } from '@/utils/jsCookie';

import { UserDataDb } from '../../../pages/Profile/components/AccountInfo';
import { api, ResSuccess } from '../../api/apiSlice';
import { Credentials, CredentialsSocial, setLoading, setUserAuth, userLogOut } from './authSlice';

interface ApiError {
  status: number | string;
  data: {
    message: string;
    errorMessages: Array<{
      path: string;
      message: string;
    }>;
  };
}

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createNewUserWithEmailAndPassword: builder.mutation({
      query: (credentials: Credentials) => ({
        url: '/auth',
        method: 'POST',
        body: credentials,
        credentials: 'include',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const accessToken = data.data;

          const cookieOptions =
            import.meta.env.VITE_NODE_ENV === 'production'
              ? { secure: true, sameSite: 'none' as const }
              : { sameSite: 'lax' as const };

          jsCookie.set(COOKIES.ACCESS_TOKEN, accessToken, cookieOptions);
          localStorage.setItem('access_token', accessToken);

          dispatch(setUserAuth(accessToken));
        } catch (err) {
          console.error('Registration error:', err);
        }
      },
      invalidatesTags: ['auth'],
      transformErrorResponse: (response: { status: number; data: any }): ApiError => {
        if (typeof response.status === 'string' && response.status === 'FETCH_ERROR') {
          return {
            status: response.status,
            data: {
              message: 'Unable to connect to server. Please check your connection.',
              errorMessages: [{ path: 'connection', message: 'Network error occurred' }],
            },
          };
        }

        if (
          response.status === 409 ||
          (response.data?.code === 11000 && response.data?.keyPattern?.email)
        ) {
          return {
            status: 409,
            data: {
              message: 'Email already exists',
              errorMessages: [
                {
                  path: 'email',
                  message: 'This email is already registered. Please try logging in.',
                },
              ],
            },
          };
        }

        if (response.status === 400) {
          return {
            status: response.status,
            data: {
              message: 'Validation error',
              errorMessages: response.data.errorMessages || [
                { path: 'validation', message: 'Please check your input' },
              ],
            },
          };
        }

        return response as ApiError;
      },
      transformResponse: (response: ResSuccess<string>) => response,
    }),

    signInUserWithEmailAndPassword: builder.mutation({
      query: (credentials: Credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
        credentials: 'include',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const accessToken = data.data;

          const cookieOptions =
            import.meta.env.VITE_NODE_ENV === 'production'
              ? { secure: true, sameSite: 'none' as const }
              : { sameSite: 'lax' as const };

          jsCookie.set(COOKIES.ACCESS_TOKEN, accessToken, cookieOptions);
          localStorage.setItem('access_token', accessToken);

          dispatch(setUserAuth(accessToken));
        } catch (err) {
          console.error('Login error:', err);
        }
      },
      invalidatesTags: ['auth', 'wallet', 'cart', 'user'],
      transformErrorResponse: (response: { status: number; data: any }): ApiError => {
        if (typeof response.status === 'string' && response.status === 'FETCH_ERROR') {
          return {
            status: response.status,
            data: {
              message: 'Connection failed. Please try again.',
              errorMessages: [{ path: 'connection', message: 'Network error occurred' }],
            },
          };
        }

        if (response.status === 401) {
          return {
            status: response.status,
            data: {
              message: 'Invalid credentials',
              errorMessages: [{ path: 'auth', message: 'Email or password is incorrect' }],
            },
          };
        }

        return response as ApiError;
      },
      transformResponse: (response: ResSuccess<string>) => response,
    }),

    signInUserWithGoogle: builder.mutation({
      query: (credentials: CredentialsSocial) => ({
        url: '/auth/login/google',
        method: 'POST',
        body: credentials,
        credentials: 'include',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const accessToken = data.data;

          const cookieOptions =
            import.meta.env.VITE_NODE_ENV === 'production'
              ? { secure: true, sameSite: 'none' as const }
              : { sameSite: 'lax' as const };

          jsCookie.set(COOKIES.ACCESS_TOKEN, accessToken, cookieOptions);
          localStorage.setItem('access_token', accessToken);

          dispatch(setUserAuth(accessToken));
        } catch (err) {
          console.error('Google login error:', err);
        }
      },
      invalidatesTags: ['auth'],
      transformErrorResponse: (response: { status: number; data: any }): ApiError => {
        if (typeof response.status === 'string' && response.status === 'FETCH_ERROR') {
          return {
            status: response.status,
            data: {
              message: 'Google login failed. Please try again.',
              errorMessages: [
                {
                  path: 'google',
                  message: 'Failed to connect to Google services',
                },
              ],
            },
          };
        }
        return response as ApiError;
      },
      transformResponse: (response: ResSuccess<string>) => response,
    }),

    signInUserWithFacebook: builder.mutation({
      query: (credentials: CredentialsSocial) => ({
        url: '/auth/login/facebook',
        method: 'POST',
        body: credentials,
        credentials: 'include',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const accessToken = data.data;

          const cookieOptions =
            import.meta.env.VITE_NODE_ENV === 'production'
              ? { secure: true, sameSite: 'none' as const }
              : { sameSite: 'lax' as const };

          jsCookie.set(COOKIES.ACCESS_TOKEN, accessToken, cookieOptions);
          localStorage.setItem('access_token', accessToken);

          dispatch(setUserAuth(accessToken));
        } catch (err) {
          console.error('Facebook login error:', err);
        }
      },
      invalidatesTags: ['auth'],
      transformErrorResponse: (response: { status: number; data: any }): ApiError => {
        if (typeof response.status === 'string' && response.status === 'FETCH_ERROR') {
          return {
            status: response.status,
            data: {
              message: 'Facebook login failed. Please try again.',
              errorMessages: [
                {
                  path: 'facebook',
                  message: 'Failed to connect to Facebook services',
                },
              ],
            },
          };
        }
        return response as ApiError;
      },
      transformResponse: (response: ResSuccess<string>) => response,
    }),

    signInUserWithDiscord: builder.mutation({
      query: (credentials: CredentialsSocial) => ({
        url: '/auth/discord/redirect',
        method: 'POST',
        body: credentials,
        credentials: 'include',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const accessToken = data.data;

          const cookieOptions =
            import.meta.env.VITE_NODE_ENV === 'production'
              ? { secure: true, sameSite: 'none' as const }
              : { sameSite: 'lax' as const };

          jsCookie.set(COOKIES.ACCESS_TOKEN, accessToken, cookieOptions);
          localStorage.setItem('access_token', accessToken);

          dispatch(setUserAuth(accessToken));
        } catch (err) {
          console.error('Discord login error:', err);
        }
      },
      invalidatesTags: ['auth'],
      transformErrorResponse: (response: { status: number; data: any }): ApiError => {
        if (typeof response.status === 'string' && response.status === 'FETCH_ERROR') {
          return {
            status: response.status,
            data: {
              message: 'Discord login failed. Please try again.',
              errorMessages: [
                {
                  path: 'discord',
                  message: 'Failed to connect to Discord services',
                },
              ],
            },
          };
        }
        return response as ApiError;
      },
      transformResponse: (response: ResSuccess<string>) => response,
    }),

    refresh: builder.mutation({
      query: () => ({
        url: '/auth/refresh-token',
        method: 'POST',
        credentials: 'include',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        dispatch(setLoading(true));
        try {
          const { data } = await queryFulfilled;
          const newAccessToken = data.data.accessToken;

          const cookieOptions =
            import.meta.env.VITE_NODE_ENV === 'production'
              ? { secure: true, sameSite: 'none' as const }
              : { sameSite: 'lax' as const };

          jsCookie.set(COOKIES.ACCESS_TOKEN, newAccessToken, cookieOptions);
          localStorage.setItem('access_token', newAccessToken);

          dispatch(setUserAuth(newAccessToken));
        } catch (err) {
          console.error('Refresh token error:', err);
          localStorage.removeItem('access_token');
          jsCookie.remove(COOKIES.ACCESS_TOKEN);
          jsCookie.remove(COOKIES.REFRESH_TOKEN);

          dispatch(userLogOut(undefined));
        } finally {
          dispatch(setLoading(false));
        }
      },
      transformResponse: (response: ResSuccess<{ accessToken: string }>) => response,
    }),

    userLogout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
        credentials: 'include',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          // Clear all tokens
          localStorage.removeItem('access_token');
          jsCookie.remove(COOKIES.ACCESS_TOKEN);
          jsCookie.remove(COOKIES.REFRESH_TOKEN);

          dispatch(userLogOut(undefined));
          setTimeout(() => {
            dispatch(api.util.resetApiState());
          }, 1000);
        } catch (err) {
          console.error('Logout error:', err);
          // Still clear tokens and logout on error
          localStorage.removeItem('access_token');
          jsCookie.remove(COOKIES.ACCESS_TOKEN);
          jsCookie.remove(COOKIES.REFRESH_TOKEN);
          dispatch(userLogOut(undefined));
        }
      },
      transformResponse: (response: void) => response,
    }),

    userData: builder.query({
      query: () => ({
        url: '/auth/me',
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: ['user'],
      transformErrorResponse: (response: { status: number; data: any }): ApiError => {
        if (response.status === 401) {
          return {
            status: response.status,
            data: {
              message: 'Session expired. Please login again.',
              errorMessages: [{ path: 'auth', message: 'Authentication required' }],
            },
          };
        }
        return response as ApiError;
      },
      transformResponse: (response: ResSuccess<UserDataDb>) => response,
    }),
    
    createPartner: builder.mutation({
      query: (credentials: Credentials) => ({
        url: '/auth/partner',
        method: 'POST',
        body: credentials,
        credentials: 'include',
      }),
      transformErrorResponse: (response: { status: number; data: any }): ApiError => {
        if (typeof response.status === 'string' && response.status === 'FETCH_ERROR') {
          return {
            status: response.status,
            data: {
              message: 'Unable to connect to server. Please check your connection.',
              errorMessages: [{ path: 'connection', message: 'Network error occurred' }],
            },
          };
        }

        if (
          response.status === 409 ||
          (response.data?.code === 11000 && response.data?.keyPattern?.email)
        ) {
          return {
            status: 409,
            data: {
              message: 'Email already exists',
              errorMessages: [
                {
                  path: 'email',
                  message: 'This email is already registered. Please try logging in.',
                },
              ],
            },
          };
        }

        return response as ApiError;
      },
      transformResponse: (response: ResSuccess<string>) => response,
    }),
  }),
});

export const {
  useCreateNewUserWithEmailAndPasswordMutation,
  useSignInUserWithEmailAndPasswordMutation,
  useRefreshMutation,
  useUserLogoutMutation,
  useSignInUserWithGoogleMutation,
  useSignInUserWithFacebookMutation,
  useSignInUserWithDiscordMutation,
  useLazyUserDataQuery,
  useUserDataQuery,
} = authApi;