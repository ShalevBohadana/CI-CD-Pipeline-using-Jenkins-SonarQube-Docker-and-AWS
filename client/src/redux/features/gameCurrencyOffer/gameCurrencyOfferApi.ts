import { TagSuggestion } from 'react-tag-autocomplete';

import { OfferGameCurrencyDataDb } from '../../../pages/CreateGameCurrencyOffer';
import { CreateGameCurrencyOfferFormInputs } from '../../../pages/CreateGameCurrencyOffer/Main';
import { api, ResSuccess } from '../../api/apiSlice';

const gameCurrencyOfferApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getGameCurrencyOffers: builder.query<ResSuccess<OfferGameCurrencyDataDb[]>, string>({
      query: (searchParams) => ({
        url: `/offer-game-currency?${searchParams}`,
        method: 'GET',
      }),
      providesTags: ['offer-game-currency'],
    }),

    getGameCurrencyTagSuggestions: builder.query<ResSuccess<TagSuggestion[][]>, undefined>({
      query: () => ({
        url: `/offer-game-currency/tag-suggestions`,
        method: 'GET',
      }),
      // providesTags: ['offer-game-currency'],
    }),

    getGameCurrencyOffer: builder.query<ResSuccess<OfferGameCurrencyDataDb>, string>({
      query: (uid) => ({
        url: `/offer-game-currency/${uid}`,
        method: 'GET',
      }),
      providesTags: ['offer-game-currency'],
    }),

    createGameCurrencyOffer: builder.mutation<
      ResSuccess<OfferGameCurrencyDataDb>,
      CreateGameCurrencyOfferFormInputs
    >({
      query: (payload) => {
        return {
          url: `/offer-game-currency`,
          method: 'POST',
          body: payload,
        };
      },
      invalidatesTags: ['offer-game-currency'],
    }),
    updateGameCurrencyOffer: builder.mutation<
      ResSuccess<OfferGameCurrencyDataDb>,
      Partial<OfferGameCurrencyDataDb>
    >({
      query: (payload) => {
        return {
          url: `/offer-game-currency/${payload.uid}`,
          method: 'PATCH',
          body: payload,
        };
      },
      invalidatesTags: ['offer-game-currency'],
    }),

    deleteGameCurrencyOffer: builder.mutation<ResSuccess<object>, string>({
      query: (uid) => ({
        url: `/offer-game-currency/${uid}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['offer-game-currency'],
    }),
  }),
});

export const {
  useCreateGameCurrencyOfferMutation,
  useDeleteGameCurrencyOfferMutation,
  useUpdateGameCurrencyOfferMutation,
  useGetGameCurrencyOfferQuery,
  useGetGameCurrencyOffersQuery,
  useGetGameCurrencyTagSuggestionsQuery,
} = gameCurrencyOfferApi;
