import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseQuery';

// Properly define the Order interface with all fields
export interface Order {
  _id: string;
  id: string;
  uid: string;
  title: string;
  ordererName: string;
  status: 'completed' | 'pending' | 'cancelled' | 'processing' | 'failed';
  createdAt: string;
  date: string;
  paymentMethod: 'credit_card' | 'paypal' | 'bitcoin' | 'google_pay' | 'apple_pay';
  amount: number;
  currency: string;
  gameType: string;
  quantity: number;
  customerEmail: string;
  deliveryStatus: 'delivered' | 'processing' | 'pending' | 'cancelled' | 'failed';
  deliveredAt?: string;
  cancelReason?: string;
  failureReason?: string;
  reviewCount: number;
  rating: number;
}

// Define the response types for each endpoint
interface AssignBoosterResponse {
  success: boolean;
  order: Order;
}

interface OnlineBooster {
  id: string;
  name: string;
  status: string;
  // Add other relevant booster properties based on your API
  avatar?: string;
  rating?: number;
  specialties?: string[];
}

interface JoinGroupChatResponse {
  channelId: string;
  inviteUrl: string;
}

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery,
  tagTypes: ['Order'],
  endpoints: (builder) => ({
    assignBoosterToOrder: builder.mutation({
      query: ({ orderId, boosterId }: { orderId: string; boosterId: string }) => ({
        url: `/orders/${orderId}/assign-booster`,
        method: 'POST',
        body: { boosterId },
      }),
      invalidatesTags: ['Order'],
      transformResponse: (response: AssignBoosterResponse) => response,
    }),
    getOnlineBoosters: builder.query({
      query: () => ({
        url: '/users/boosters/online',
        method: 'GET',
      }),
      transformResponse: (response: OnlineBooster[]) => response,
    }),
    joinGroupChat: builder.mutation({
      query: ({ id, userId }: { id: string; userId: string }) => ({
        url: `/orders/${id}/join-group-chat`,
        method: 'POST',
        body: { userId },
      }),
      transformResponse: (response: JoinGroupChatResponse) => response,
    }),
  }),
});

export const {
  useAssignBoosterToOrderMutation,
  useGetOnlineBoostersQuery,
  useJoinGroupChatMutation,
} = orderApi;
