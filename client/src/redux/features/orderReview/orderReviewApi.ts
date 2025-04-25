import { HTTP_VERB } from '../../../enums';
import { OrderReviewDataDb, RateOrderFormInputs } from '../../../pages/RateOrder/Main';
import { api, ResSuccess } from '../../api/apiSlice';

const orderReviewApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getOrderReviews: builder.query<ResSuccess<OrderReviewDataDb[]>, string>({
      query: (searchParams) => {
        return {
          url: `/order-review?${searchParams}`,
          method: HTTP_VERB.GET,
        };
      },
      providesTags: ['order-review'],
    }),

    addOrderReview: builder.mutation<ResSuccess<OrderReviewDataDb>, RateOrderFormInputs>({
      query: (payload) => {
        return {
          url: `/order-review`,
          method: HTTP_VERB.POST,
          body: payload,
        };
      },
      invalidatesTags: ['order-review'],
    }),
  }),
});

export const { useGetOrderReviewsQuery, useAddOrderReviewMutation } = orderReviewApi;
