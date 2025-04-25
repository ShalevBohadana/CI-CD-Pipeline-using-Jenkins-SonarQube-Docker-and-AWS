/* eslint-disable prettier/prettier */
/* eslint-disable simple-import-sort/imports */
import { HTTP_VERB } from '../../../enums';
import { OrderReviewDataDb, RateOrderFormInputs } from '../../../pages/RateOrder/Main';

import { ResSuccess, api } from '../../api/apiSlice';

const URL = '/order-review/seller-review';

const sellerReviewApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSellerReviews: builder.query<ResSuccess<OrderReviewDataDb[]>, string>({
      query: (searchParams) => {
        return {
          url: `${URL}?${searchParams}`,
          method: HTTP_VERB.GET,
        };
      },
      providesTags: ['order-review', 'seller-review'],
    }),

    addSellerReview: builder.mutation<ResSuccess<OrderReviewDataDb>, RateOrderFormInputs>({
      query: (payload) => {
        return {
          url: `${URL}`,
          method: HTTP_VERB.POST,
          body: payload,
        };
      },
      invalidatesTags: ['order-review', 'seller-review'],
    }),
  }),
});

export const { useGetSellerReviewsQuery, useAddSellerReviewMutation } = sellerReviewApi;
