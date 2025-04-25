import { createEntityAdapter, createSelector, EntityState } from '@/redux-fix';
import { HTTP_VERB } from '../../../enums';
import { UserDataDb } from '../../../pages/Profile/components/AccountInfo';
import { NormalizedDbData } from '../../../types/globalTypes';
import { api, ResSuccess as OriginalResSuccess } from '../../api/apiSlice';
import type { RootState as AppRootState } from '../../store';

// Define the proper RTK Query state type for our selectors
type RootState = AppRootState & {
  [api.reducerPath]: ReturnType<typeof api.reducer>;
};

// Types
interface UserInDb extends NormalizedDbData {
  id: string;
  userId: string;
  email: string;
  role: string;
  userName: string;
}

interface UserMetadata {
  page: number;
  limit: number;
  total: number;
}

// Use string as the ID type for EntityState
interface UserState extends EntityState<UserInDb, string> {
  meta: UserMetadata;
}

interface UpdateUserPayload {
  userId: string;
  updateData: Partial<UserDataDb>;
}

interface UpdateAvatarPayload {
  avatar: Pick<UserDataDb, 'avatar'>;
}

interface UpdateRolePayload {
  userId: string;
  roles: string[];
}

interface UpdateStatusPayload {
  userId: string;
  status: string;
}

interface ResSuccess<T> extends OriginalResSuccess<T> {
  normalized?: UserState;
}

// Entity Adapter with explicit ID type
const userAdapter = createEntityAdapter<UserInDb, string>({
  selectId: (user) => user.id,
  sortComparer: (a, b) => a.userId.localeCompare(b.userId),
});

// Initial State with metadata
const initialState: UserState = {
  ...userAdapter.getInitialState(),
  meta: {
    page: 0,
    limit: 0,
    total: 0,
  },
};

// API Configuration
export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Queries
    getUsers: builder.query<ResSuccess<UserInDb[]>, void>({
      query: () => ({
        url: '/user',
        method: HTTP_VERB.GET,
      }),
      transformResponse: (response: ResSuccess<UserInDb[]>) => {
        const normalized = userAdapter.setAll(initialState, response.data);
        return {
          ...response,
          normalized: {
            ...normalized,
            meta: {
              page: response.meta?.page ?? initialState.meta.page,
              limit: response.meta?.limit ?? initialState.meta.limit,
              total: response.meta?.total ?? initialState.meta.total,
            },
          },
        };
      },
      providesTags: (result) =>
        result?.normalized?.ids
          ? [
              ...result.normalized.ids.map((id) => ({ type: 'user' as const, id })),
              { type: 'user' as const, id: 'LIST' },
            ]
          : [{ type: 'user' as const, id: 'LIST' }],
    }),

    searchUsers: builder.query<ResSuccess<UserInDb[]>, string>({
      query: (searchParams) => ({
        url: `/user?${searchParams}`,
        method: HTTP_VERB.GET,
      }),
      providesTags: ['user'],
    }),

    getUser: builder.query<ResSuccess<UserDataDb>, string>({
      query: (dbId) => ({
        url: `/user/${dbId}`,
        method: HTTP_VERB.GET,
      }),
      providesTags: ['user'],
    }),

    currentUser: builder.query<ResSuccess<UserDataDb>, void>({
      query: () => ({
        url: '/user/me',
        method: HTTP_VERB.GET,
      }),
      providesTags: ['user'],
    }),

    getStatistics: builder.query<ResSuccess<UserDataDb>, string>({
      query: (dbId) => ({
        url: `/user/statistics/${dbId}`,
        method: HTTP_VERB.GET,
      }),
      providesTags: ['user'],
    }),

    getUserHistory: builder.query<ResSuccess<UserInDb[]>, string>({
      query: (userId) => ({
        url: `/user/history/${userId}`,
        method: HTTP_VERB.GET,
      }),
      providesTags: ['user'],
    }),

    // Mutations
    updateUser: builder.mutation<ResSuccess<UserDataDb>, UpdateUserPayload>({
      query: ({ userId, updateData }) => ({
        url: `/user/${userId}`,
        method: HTTP_VERB.PATCH,
        body: updateData,
      }),
      invalidatesTags: ['user'],
    }),

    updateAvatar: builder.mutation<ResSuccess<UserDataDb>, UpdateAvatarPayload>({
      query: (payload) => ({
        url: `/user/me`,
        method: HTTP_VERB.PATCH,
        body: payload,
      }),
      invalidatesTags: ['user'],
    }),

    updateUserRole: builder.mutation<ResSuccess<UserDataDb>, UpdateRolePayload>({
      query: ({ userId, roles }) => ({
        url: `/user/${userId}`,
        method: HTTP_VERB.PATCH,
        body: { roles },
      }),
      invalidatesTags: ['user'],
    }),

    updateUserStatus: builder.mutation<ResSuccess<UserDataDb>, UpdateStatusPayload>({
      query: ({ userId, status }) => ({
        url: `/user/${userId}`,
        method: HTTP_VERB.PATCH,
        body: { status },
      }),
      invalidatesTags: ['user'],
    }),
  }),
});

// Selectors
const selectUsersResult = userApi.endpoints.getUsers.select();

const selectUsersData = createSelector(
  selectUsersResult,
  (usersResult): UserState => usersResult.data?.normalized ?? initialState
);

// Create manual selectors instead of using the entity adapter selectors
// This approach avoids the complex type issues with the entity adapter
export const selectAllUsers = (state: AppRootState): UserInDb[] => {
  const result = selectUsersData(state as RootState);
  return result.ids
    .map((id) => result.entities[id])
    .filter((user): user is UserInDb => user !== undefined);
};

export const selectUserById = (state: AppRootState, id: string): UserInDb | undefined => {
  const result = selectUsersData(state as RootState);
  return result.entities[id];
};

export const selectUserIds = (state: AppRootState): string[] => {
  const result = selectUsersData(state as RootState);
  return result.ids as string[];
};

// Export hooks
export const {
  useGetUsersQuery,
  useGetUserQuery,
  useSearchUsersQuery,
  useGetStatisticsQuery,
  useCurrentUserQuery,
  useGetUserHistoryQuery,
  useUpdateUserMutation,
  useUpdateAvatarMutation,
  useUpdateUserRoleMutation,
  useUpdateUserStatusMutation,
} = userApi;

// Export types
export type {
  UserInDb,
  UserState,
  UpdateUserPayload,
  UpdateAvatarPayload,
  UpdateRolePayload,
  UpdateStatusPayload,
};
