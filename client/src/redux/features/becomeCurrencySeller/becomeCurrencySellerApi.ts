import { BecomeCurrencySellerFormInputs } from '../../../pages/BecomeCurrencySeller/BecomeCurrencySellerForm';
import { BecomeCurrencySellerDataDb } from '../../../pages/Dashboard/Admin/components/WorkWithUsSummaryItem';
import { api, ResSuccess } from '../../api/apiSlice';

const becomeCurrencySellerApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllCurrencySellers: builder.query<ResSuccess<BecomeCurrencySellerDataDb[]>, string>({
      query: (searchParams) => {
        return {
          url: `/currency-seller?${searchParams}`,
          method: 'GET',
        };
      },
      providesTags: ['becomeCurrencySeller'],
    }),

    getCurrencySeller: builder.query<ResSuccess<BecomeCurrencySellerDataDb>, string>({
      query: (id) => {
        return {
          url: `/currency-seller/${id}`,
          method: 'GET',
        };
      },
      providesTags: ['becomeCurrencySeller'],
    }),

    becomeCurrencySeller: builder.mutation<
      ResSuccess<BecomeCurrencySellerDataDb>,
      BecomeCurrencySellerFormInputs
    >({
      query: (payload) => {
        return {
          url: `/currency-seller`,
          method: 'POST',
          body: payload,
        };
      },
      invalidatesTags: ['becomeCurrencySeller'],
    }),
    approveCurrencySeller: builder.mutation<
      ResSuccess<BecomeCurrencySellerDataDb>,
      Partial<BecomeCurrencySellerDataDb>
    >({
      query: (payload) => {
        return {
          url: `/currency-seller/${payload._id}`,
          method: 'PATCH',
          body: payload,
        };
      },
      invalidatesTags: ['becomeCurrencySeller'],
    }),

    rejectCurrencySeller: builder.mutation<ResSuccess<object>, string>({
      query: (uid) => ({
        url: `/currency-seller/${uid}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['becomeCurrencySeller'],
    }),
  }),
});

export const {
  useApproveCurrencySellerMutation,
  useBecomeCurrencySellerMutation,
  useGetAllCurrencySellersQuery,
  useGetCurrencySellerQuery,
  useRejectCurrencySellerMutation,
  useLazyGetAllCurrencySellersQuery,
  useLazyGetCurrencySellerQuery,
} = becomeCurrencySellerApi;
