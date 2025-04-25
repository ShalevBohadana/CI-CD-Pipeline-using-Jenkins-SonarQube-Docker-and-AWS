import { BecomeCurrencySupplierFormInputs } from '../../../pages/BecomeCurrencySupplier/BecomeCurrencySupplierForm';
import { BecomeCurrencySupplierDataDb } from '../../../pages/Dashboard/Admin/components/WorkWithUsSummaryItem';
import { api, ResSuccess } from '../../api/apiSlice';

const becomeCurrencySupplierApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllCurrencySuppliers: builder.query<ResSuccess<BecomeCurrencySupplierDataDb[]>, string>({
      query: (searchParams) => {
        return {
          url: `/currency-supplier?${searchParams}`,
          method: 'GET',
        };
      },
      providesTags: ['becomeCurrencySupplier'],
    }),

    getCurrencySupplier: builder.query<ResSuccess<BecomeCurrencySupplierDataDb>, string>({
      query: (id) => {
        return {
          url: `/currency-supplier/${id}`,
          method: 'GET',
        };
      },
      providesTags: ['becomeCurrencySupplier'],
    }),

    becomeCurrencySupplier: builder.mutation<
      ResSuccess<BecomeCurrencySupplierDataDb>,
      BecomeCurrencySupplierFormInputs
    >({
      query: (payload) => {
        return {
          url: `/currency-supplier`,
          method: 'POST',
          body: payload,
        };
      },
      invalidatesTags: ['becomeCurrencySupplier'],
    }),
    approveCurrencySupplier: builder.mutation<
      ResSuccess<BecomeCurrencySupplierDataDb>,
      Partial<BecomeCurrencySupplierDataDb>
    >({
      query: (payload) => {
        return {
          url: `/currency-supplier/${payload._id}`,
          method: 'PATCH',
          body: payload,
        };
      },
      invalidatesTags: ['becomeCurrencySupplier'],
    }),

    rejectCurrencySupplier: builder.mutation<ResSuccess<object>, string>({
      query: (id) => ({
        url: `/currency-supplier/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['becomeCurrencySupplier'],
    }),
  }),
});

export const {
  useApproveCurrencySupplierMutation,
  useBecomeCurrencySupplierMutation,
  useGetAllCurrencySuppliersQuery,
  useGetCurrencySupplierQuery,
  useRejectCurrencySupplierMutation,
  useLazyGetAllCurrencySuppliersQuery,
  useLazyGetCurrencySupplierQuery,
} = becomeCurrencySupplierApi;
