import { HTTP_VERB } from '../../../enums';
import { PromoDataDb } from '../../../pages/CreatePromo';
import { CreatePromoFormInputs } from '../../../pages/CreatePromo/Main';
import { api, ResSuccess } from '../../api/apiSlice';

const promoApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPromos: builder.query<ResSuccess<PromoDataDb[]>, string>({
      query: (searchParams) => ({
        url: `/promo?${searchParams}`,
        method: HTTP_VERB.GET,
      }),
      providesTags: ['promo'],
    }),

    getPromo: builder.query<ResSuccess<PromoDataDb>, string>({
      query: (code) => ({
        url: `/promo/${code}`,
        method: HTTP_VERB.GET,
      }),
      providesTags: ['promo'],
    }),

    createPromo: builder.mutation<ResSuccess<string>, CreatePromoFormInputs>({
      query: (payload) => {
        return {
          url: `/promo`,
          method: HTTP_VERB.POST,
          body: { ...payload },
        };
      },
      invalidatesTags: ['promo'],
    }),

    updatePromo: builder.mutation<ResSuccess<string>, Partial<PromoDataDb>>({
      query: (payload) => {
        const { code, ...rest } = payload;
        return {
          url: `/promo/${code}`,
          method: HTTP_VERB.PATCH,
          body: rest,
        };
      },
      invalidatesTags: ['promo'],
    }),

    deletePromo: builder.mutation<ResSuccess<string>, string>({
      query: (code) => {
        return {
          url: `/promo/${code}`,
          method: HTTP_VERB.DELETE,
        };
      },
      invalidatesTags: ['promo'],
    }),
  }),
});

export const {
  useGetPromosQuery,
  useLazyGetPromosQuery,
  useGetPromoQuery,
  useCreatePromoMutation,
  useUpdatePromoMutation,
  useDeletePromoMutation,
} = promoApi;
