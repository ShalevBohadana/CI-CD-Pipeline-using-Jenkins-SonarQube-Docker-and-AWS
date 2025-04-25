import { HTTP_VERB } from '../../../enums';
import { api, ResSuccess } from '../../api/apiSlice';

export const newsletterApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addToNewsletter: builder.mutation<ResSuccess<Record<string, string>>, { email: string }>({
      query: (payload) => {
        return {
          url: `/newsletter`,
          method: HTTP_VERB.POST,
          body: payload,
        };
      },
      // invalidatesTags: ['newsletter'],
    }),

    removeFromNewsletter: builder.mutation<ResSuccess<Record<string, string>>, { email: string }>({
      query: (payload) => {
        return {
          url: `/newsletter`,
          method: HTTP_VERB.PATCH,
          body: payload,
        };
      },
      // invalidatesTags: ['newsletter'],
    }),
  }),
});

export const { useAddToNewsletterMutation, useRemoveFromNewsletterMutation } = newsletterApi;
