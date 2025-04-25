// walletApi.ts
import { HTTP_VERB } from '../../../enums';
import { WalletDataDb } from '../../../pages/BalanceRecharge/Main';
import { api, ResSuccess } from '../../api/apiSlice';

export interface CardData {
  holder: string;
  number: string;
  expireDate: Date;
  cvv: string;
}

export interface WithdrawRequest {
  amount: number;
  withdrawalMethod: string;
  accountDetails: string;
}

export interface BalanceRechargeResponse {
  paymentId: string;
  paymentStatus: string;
  isPaid: boolean;
  paidAt: string;
}

export const walletApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getWallet: builder.query<ResSuccess<WalletDataDb>, undefined>({
      query: () => ({
        url: `/wallet`,
        method: HTTP_VERB.GET,
      }),
      providesTags: ['wallet'],
    }),

    saveBalanceIntent: builder.mutation<
      ResSuccess<Record<string, string>>,
      { depositIntentAmount: number }
    >({
      query: (payload) => ({
        url: `/wallet/save-balance-intent`,
        method: HTTP_VERB.POST,
        body: payload,
      }),
      invalidatesTags: ['wallet'],
    }),

    makeBalanceRechargeSession: builder.mutation<
      ResSuccess<{ clientSecret: string; orderId: string }>,
      { depositIntentAmount: number }
    >({
      query: (payload) => ({
        url: `/wallet/stripe/balance-recharge-session`,
        method: HTTP_VERB.POST,
        body: payload,
      }),
      invalidatesTags: ['wallet'],
    }),

    verifyBalanceRecharge: builder.mutation<
      ResSuccess<BalanceRechargeResponse>,
      { sessionId: string }
    >({
      query: ({ sessionId }) => ({
        url: `/wallet/stripe/balance-recharge-session/${sessionId}`,
        method: HTTP_VERB.PATCH,
      }),
      invalidatesTags: ['wallet', 'notification'],
    }),

    withdraw: builder.mutation<ResSuccess<{ transactionId: string }>, WithdrawRequest>({
      query: (payload) => ({
        url: '/wallet/withdraw-request',
        method: HTTP_VERB.POST,
        body: payload,
      }),
      invalidatesTags: ['wallet', 'notification'],
      transformErrorResponse: (response: { status: number; data: any }) => {
        if (response.status === 400) {
          return `Invalid request: ${response.data.message}`;
        }
        if (response.status === 403) {
          return 'Insufficient funds';
        }
        if (response.status === 409) {
          return 'You have a pending withdrawal request';
        }
        return 'An error occurred while processing your withdrawal';
      },
    }),
  }),
});

export const {
  useGetWalletQuery,
  useSaveBalanceIntentMutation,
  useMakeBalanceRechargeSessionMutation,
  useVerifyBalanceRechargeMutation,
  useWithdrawMutation, // Keep this name for backward compatibility
} = walletApi;
