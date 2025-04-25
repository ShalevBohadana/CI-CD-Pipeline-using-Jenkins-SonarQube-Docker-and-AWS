import { HTTP_VERB, ORDER_STATUS } from '../../../enums';
import { OrderDataDb } from '../../../pages/MyOrders/components/OrderItem';
import { api, ResSuccess } from '../../api/apiSlice';

const orderApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<ResSuccess<OrderDataDb[]>, string>({
      query: (searchParams) => {
        return {
          url: `/order?${searchParams}`,
          method: 'GET',
        };
      },
      providesTags: ['order', 'wallet'],
    }),
    getAcceptedOrders: builder.query<ResSuccess<OrderDataDb[]>, string>({
      query: (searchParams) => {
        return {
          url: `/order/accepted?${searchParams}`,
          method: 'GET',
        };
      },
      providesTags: ['order', 'wallet'],
    }),
    getClaimableOrders: builder.query<ResSuccess<OrderDataDb[]>, string>({
      query: (searchParams) => {
        return {
          url: `/order/accepted?${searchParams}`,
          method: 'GET',
        };
      },
      providesTags: ['order', 'wallet'],
    }),
    createOrderWithBalance: builder.mutation<
      ResSuccess<OrderDataDb>,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Partial<OrderDataDb | any>
    >({
      query: (payload) => {
        return {
          url: `/order/balance-order`,
          method: HTTP_VERB.POST,
          body: payload,
        };
      },
      invalidatesTags: ['order', 'wallet'],
    }),
    getOrder: builder.query<ResSuccess<OrderDataDb>, string>({
      query: (id) => ({
        url: `/order/${id}`,
        method: 'GET',
      }),
      providesTags: ['order', 'wallet'],
    }),

    joinGroupChat: builder.mutation<ResSuccess<OrderDataDb>, Partial<OrderDataDb>>({
      query: (payload) => {
        return {
          url: `/order/join-group-chat/${payload._id}`,
          method: HTTP_VERB.PATCH,
          body: payload,
        };
      },
      invalidatesTags: ['order', 'wallet'],
    }),

    confirmPayment: builder.mutation<ResSuccess<OrderDataDb>, Partial<OrderDataDb>>({
      query: (payload) => {
        return {
          url: `/order/${payload._id}`,
          method: HTTP_VERB.PATCH,
          body: {
            isPaymentConfirmed: true,
            isApproved: true,
            status: ORDER_STATUS.PLACED,
            isConfirmedByClient: true,
            isConfirmedByPartner: true,
          },
        };
      },
      invalidatesTags: ['order', 'wallet'],
    }),
    assignOrder: builder.mutation<
      ResSuccess<OrderDataDb>,
      Partial<{ _id: string; partner: string; status: string }>
    >({
      query: (payload: { _id: string; partner: string; status: string }) => {
        return {
          url: `/order/${payload._id}`,
          method: HTTP_VERB.PATCH,
          body: {
            partner: payload.partner,
            status: payload.status,
          },
        };
      },
      invalidatesTags: ['order', 'wallet'],
    }),
    confirmDelivery: builder.mutation<ResSuccess<OrderDataDb>, Partial<{ _id: string }>>({
      query: (payload: { _id: string }) => {
        return {
          url: `/order/${payload._id}`,
          method: HTTP_VERB.PATCH,
          body: {
            status: ORDER_STATUS.CONFIRMED,
          },
        };
      },
      invalidatesTags: ['order', 'wallet'],
    }),
    getPartnerOrders: builder.query<ResSuccess<OrderDataDb>, string>({
      query: (id) => ({
        url: `/order/partner/${id}`,
        method: 'GET',
      }),
      providesTags: ['order', 'wallet'],
    }),
    getUserOrders: builder.query<ResSuccess<OrderDataDb[]>, string>({
      query: (id) => ({
        url: `/order/user/${id}`,
        method: 'GET',
      }),
      providesTags: ['order', 'wallet'],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetOrderQuery,
  useGetUserOrdersQuery,
  useConfirmPaymentMutation,
  useJoinGroupChatMutation,
  useCreateOrderWithBalanceMutation,
  useAssignOrderMutation,
  useGetPartnerOrdersQuery,
  useGetAcceptedOrdersQuery,
  useGetClaimableOrdersQuery,
  useConfirmDeliveryMutation,
} = orderApi;
