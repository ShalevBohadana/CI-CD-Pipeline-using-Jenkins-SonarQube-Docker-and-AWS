import {
  CreateGuideFormInputs,
  GuideDataDb,
} from '../../../pages/Guides/components/FeaturedGuideCard';
import { api, ResSuccess } from '../../api/apiSlice';

const guideApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getGuides: builder.query<ResSuccess<GuideDataDb[]>, string>({
      query: (searchParams) => ({
        url: `/guide?${searchParams}`,
        method: 'GET',
      }),
      providesTags: ['guide'],
    }),

    getGuide: builder.query<ResSuccess<GuideDataDb>, string>({
      query: (uid) => ({
        url: `/guide/${uid}`,
        method: 'GET',
      }),
      providesTags: ['guide'],
    }),

    createGuide: builder.mutation<ResSuccess<GuideDataDb>, CreateGuideFormInputs>({
      query: (payload) => {
        return {
          url: `/guide`,
          method: 'POST',
          body: payload,
        };
      },
      invalidatesTags: ['guide'],
    }),

    updateGuide: builder.mutation<ResSuccess<GuideDataDb>, Partial<GuideDataDb>>({
      query: (payload) => {
        return {
          url: `/guide/${payload.uid}`,
          method: 'PATCH',
          body: payload,
        };
      },
      invalidatesTags: ['guide'],
    }),

    deleteGuide: builder.mutation<ResSuccess<object>, string>({
      query: (uid) => ({
        url: `/guide/${uid}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['guide'],
    }),
  }),
});

export const {
  useGetGuidesQuery,
  useLazyGetGuidesQuery,
  useGetGuideQuery,
  useCreateGuideMutation,
  useUpdateGuideMutation,
  useDeleteGuideMutation,
} = guideApi;
