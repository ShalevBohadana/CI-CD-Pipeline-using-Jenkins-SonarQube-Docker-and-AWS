import { TagSuggestion } from 'react-tag-autocomplete';

import { OfferCurrencyDataDb } from '../../../pages/CreateGameCurrency';
import { CreateGameCurrencyFormInputs } from '../../../pages/CreateGameCurrency/Main';
import { api, ResSuccess } from '../../api/apiSlice';

const gameCurrencyApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getGameCurrencies: builder.query<ResSuccess<OfferCurrencyDataDb[]>, string>({
      query: (searchParams) => ({
        url: `/game-currency?${searchParams}`,
        method: 'GET',
      }),
      providesTags: ['game-currency'],
    }),

    getGameCurrencyTagSuggestions: builder.query<ResSuccess<TagSuggestion[][]>, undefined>({
      query: () => ({
        url: `/game-currency/tag-suggestions`,
        method: 'GET',
      }),
      // providesTags: ['game-currency'],
    }),

    getGameCurrency: builder.query<ResSuccess<OfferCurrencyDataDb>, string>({
      query: (uid) => ({
        url: `/game-currency/${uid}`,
        method: 'GET',
      }),
      providesTags: ['game-currency'],
    }),

    createGameCurrency: builder.mutation<
      ResSuccess<OfferCurrencyDataDb>,
      CreateGameCurrencyFormInputs
    >({
      query: (payload) => {
        return {
          url: `/game-currency`,
          method: 'POST',
          body: payload,
        };
      },
      invalidatesTags: ['game-currency'],
    }),
    updateGameCurrency: builder.mutation<
      ResSuccess<OfferCurrencyDataDb>,
      Partial<OfferCurrencyDataDb>
    >({
      query: (payload) => {
        return {
          url: `/game-currency/${payload.uid}`,
          method: 'PATCH',
          body: payload,
        };
      },
      invalidatesTags: ['game-currency'],
    }),

    deleteGameCurrency: builder.mutation<ResSuccess<object>, string>({
      query: (uid) => ({
        url: `/game-currency/${uid}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['game-currency'],
    }),
  }),
});

export const {
  // useCreateOfferCurrencyMutation,
  // useDeleteOfferCurrencyMutation,
  // useUpdateOfferCurrencyMutation,
  // useGetOfferCurrenciesQuery,
  // useLazyGetOfferCurrenciesQuery,
  // useGetOfferCurrencyQuery,
  // useGetOfferCurrencyTagSuggestionsQuery,
  useCreateGameCurrencyMutation,
  useDeleteGameCurrencyMutation,
  useUpdateGameCurrencyMutation,
  useGetGameCurrenciesQuery,
  useLazyGetGameCurrenciesQuery,
  useGetGameCurrencyQuery,
  useGetGameCurrencyTagSuggestionsQuery,
} = gameCurrencyApi;
