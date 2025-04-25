import { TagSuggestion } from 'react-tag-autocomplete';

import { OfferDataDb } from '../../../pages/CreateOffer';
import { CreateOfferFormInputs, TTagSuggestion } from '../../../pages/CreateOffer/Main';
import { api, ResSuccess } from '../../api/apiSlice';

const offerApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getOffers: builder.query<ResSuccess<OfferDataDb[]>, string>({
      query: (searchParams) => ({
        url: `/offer?${searchParams}`,
        method: 'GET',
      }),
      providesTags: ['offer'],
    }),
    getPrebuiltFilters: builder.query<ResSuccess<TTagSuggestion[]>, undefined>({
      query: () => ({
        url: `/offer/prebuilt-filters`,
        method: 'GET',
      }),
      // providesTags: ['offer'],
    }),
    getTagSuggestions: builder.query<ResSuccess<TagSuggestion[][]>, undefined>({
      query: () => ({
        url: `/offer/tag-suggestions`,
        method: 'GET',
      }),
      // providesTags: ['offer'],
    }),

    getOffer: builder.query<ResSuccess<OfferDataDb>, string>({
      query: (uid) => ({
        url: `/offer/${uid}`,
        method: 'GET',
      }),
      providesTags: ['offer'],
    }),

    getOfferById: builder.query<ResSuccess<OfferDataDb>, string>({
      query: (uid) => ({
        url: `/offer/id/${uid}`,
        method: 'GET',
      }),
      providesTags: ['offer'],
    }),

    createOffer: builder.mutation<ResSuccess<OfferDataDb>, CreateOfferFormInputs>({
      query: (payload) => {
        return {
          url: `/offer`,
          method: 'POST',
          body: payload,
        };
      },
      invalidatesTags: ['offer'],
    }),
    updateOffer: builder.mutation<ResSuccess<OfferDataDb>, Partial<OfferDataDb>>({
      query: (payload) => {
        return {
          url: `/offer/${payload.uid}`,
          method: 'PATCH',
          body: payload,
        };
      },
      invalidatesTags: ['offer'],
    }),

    deleteOffer: builder.mutation<ResSuccess<object>, string>({
      query: (uid) => ({
        url: `/offer/${uid}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['offer'],
    }),
  }),
});

export const {
  useGetOffersQuery,
  useLazyGetOffersQuery,
  useGetOfferQuery,
  useGetOfferByIdQuery,
  useGetPrebuiltFiltersQuery,
  useGetTagSuggestionsQuery,
  useCreateOfferMutation,
  useUpdateOfferMutation,
  useDeleteOfferMutation,
} = offerApi;
