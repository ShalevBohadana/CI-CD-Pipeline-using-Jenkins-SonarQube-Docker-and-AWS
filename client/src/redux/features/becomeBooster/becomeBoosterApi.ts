import { BecomeBoosterFormInputs } from '../../../pages/BecomeBooster/BecomeBoosterForm';
import { BecomeBoosterDataDb } from '../../../pages/Dashboard/Admin/components/WorkWithUsSummaryItem';
import { api, ResSuccess } from '../../api/apiSlice';

const becomeBoosterApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllBoosters: builder.query<ResSuccess<BecomeBoosterDataDb[]>, string>({
      query: (searchParams) => {
        return {
          url: `/booster?${searchParams}`,
          method: 'GET',
        };
      },
      providesTags: ['becomeBooster'],
    }),

    getBooster: builder.query<ResSuccess<BecomeBoosterDataDb>, string>({
      query: (id) => {
        return {
          url: `/booster/${id}`,
          method: 'GET',
        };
      },
      providesTags: ['becomeBooster'],
    }),

    becomeBooster: builder.mutation<ResSuccess<BecomeBoosterDataDb>, BecomeBoosterFormInputs>({
      query: (payload) => {
        return {
          url: `/booster`,
          method: 'POST',
          body: payload,
        };
      },
      invalidatesTags: ['becomeBooster'],
    }),
    approveBooster: builder.mutation<ResSuccess<BecomeBoosterDataDb>, Partial<BecomeBoosterDataDb>>(
      {
        query: (payload) => {
          return {
            url: `/booster/${payload._id}`,
            method: 'PATCH',
            body: payload,
          };
        },
        invalidatesTags: ['becomeBooster'],
      }
    ),

    rejectBooster: builder.mutation<ResSuccess<object>, string>({
      query: (uid) => ({
        url: `/booster/${uid}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['becomeBooster'],
    }),
  }),
});

export const {
  useGetBoosterQuery,
  useGetAllBoostersQuery,
  useLazyGetAllBoostersQuery,
  useBecomeBoosterMutation,
  useApproveBoosterMutation,
  useRejectBoosterMutation,
} = becomeBoosterApi;
