import { GameDataDb } from '@/pages/CreateGame/context/CreateGameContext';
import { CreateGameFormInputs } from '../../../pages/CreateGame/components/Main';
import { TTagSuggestion } from '../../../pages/CreateOffer/Main';
import { api, ResSuccess } from '../../api/apiSlice';

const gameApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createGame: builder.mutation<ResSuccess<GameDataDb>, CreateGameFormInputs>({
      query: (payload) => {
        return {
          url: `/game`,
          method: 'POST',
          body: payload,
        };
      },
      invalidatesTags: ['game'],
    }),
    updateGame: builder.mutation<ResSuccess<GameDataDb>, Partial<GameDataDb>>({
      query: (payload) => {
        return {
          url: `/game`,
          method: 'PATCH',
          body: payload,
        };
      },
      invalidatesTags: ['game'],
    }),
    getGames: builder.query<ResSuccess<GameDataDb[]>, string>({
      query: (searchParams) => ({
        url: `/game${`?${searchParams}`}`,
        method: 'GET',
      }),
      providesTags: ['game'],
    }),
    getCategories: builder.query<ResSuccess<TTagSuggestion[]>, undefined>({
      query: () => ({
        url: `/game/categories`,
        method: 'GET',
      }),
      // providesTags: ['game'],
    }),

    getGame: builder.query<ResSuccess<GameDataDb>, string>({
      query: (uid) => ({
        url: `/game/${uid}`,
        method: 'GET',
      }),
      providesTags: ['game'],
    }),
    deleteGame: builder.mutation<ResSuccess<object>, string>({
      query: (uid) => ({
        url: `/game/${uid}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['game'],
    }),
  }),
});

export const {
  useCreateGameMutation,
  useUpdateGameMutation,
  useDeleteGameMutation,
  useGetGamesQuery,
  useLazyGetGamesQuery,
  useGetCategoriesQuery,
  useGetGameQuery,
} = gameApi;
