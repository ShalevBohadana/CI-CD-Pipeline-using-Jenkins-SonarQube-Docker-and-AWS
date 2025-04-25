import { api } from '../../api/apiSlice';

const currencyApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getRates: builder.query({
      query: () => `/currency`,
      providesTags: ['currency'],
    }),
  }),
});

export const { useLazyGetRatesQuery } = currencyApi;
