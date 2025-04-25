import { HTTP_VERB } from '../../../enums';
import { WalletDataDb } from '../../../pages/BalanceRecharge/Main';
import { api, ResSuccess } from '../../api/apiSlice';

// Core Types
export interface CardData {
  holder: string;
  number: string;
  expireDate: Date;
  cvv: string;
}

export interface WithdrawRequest {
  method: string;
  amount: number;
  card: CardData;
  isDemoMode?: boolean;
}

export interface WithdrawResponse {
  success: boolean;
  transactionId: string;
}

export interface BalanceRechargeResponse {
  paymentId: string;
  paymentStatus: string;
  isPaid: boolean;
  paidAt: string;
}

export interface SessionResponse {
  clientSecret: string;
}

interface DemoModeParam {
  isDemoMode?: boolean;
}

interface MakeSessionRequest extends DemoModeParam {
  items?: any[];
  [key: string]: any;
}

interface PaymentVerificationResponse {
  paymentId: string;
  paymentStatus: string;
  isPaid: boolean;
  paidAt: string;
}

const handleWithdrawError = (response: { status: number; data: any }) => {
  if (response.status === 400) return `Invalid request: ${response.data.message}`;
  if (response.status === 403) return 'Insufficient funds';
  return 'An error occurred while processing your withdrawal';
};

export const paymentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    makeSession: builder.mutation<ResSuccess<SessionResponse>, MakeSessionRequest>({
      query: (payload: { depositIntentAmount: number }) => ({
        url: '/payment/stripe/session',
        method: HTTP_VERB.POST,
        body: payload,
      }),
      invalidatesTags: ['payment'],
    }),

    makeBalanceOrder: builder.mutation<
      ResSuccess<{ orderId: string }>,
      {
        offerId: string;
        amount: number;
        totalPrice: number;
        item: any[]; // צריך להוסיף את הטיפוס המדויק
      }
    >({
      query: (payload) => ({
        url: '/order/balance-order',
        method: HTTP_VERB.POST,
        body: {
          ...payload,
          type: 'deposit', // וודא שזה תמיד 'deposit' ולא 'ordered'
        },
      }),
      invalidatesTags: ['wallet'],
    }),
    getWallet: builder.query<ResSuccess<WalletDataDb>, void>({
      query: () => ({
        url: '/wallet',
        method: HTTP_VERB.GET,
      }),
      providesTags: ['wallet'],
    }),

    saveBalanceIntent: builder.mutation<
      ResSuccess<Record<string, string>>,
      { depositIntentAmount: number }
    >({
      query: (payload) => ({
        url: '/wallet/save-balance-intent',
        method: HTTP_VERB.POST,
        body: payload,
      }),
      invalidatesTags: ['wallet'],
    }),

    makeBalanceRechargeSession: builder.mutation<
      ResSuccess<{ clientSecret: string }>,
      { depositIntentAmount: number }
    >({
      query: (payload) => ({
        url: '/wallet/stripe/balance-recharge-session',
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

    withdraw: builder.mutation<ResSuccess<WithdrawResponse>, WithdrawRequest>({
      query: (payload) => ({
        url: '/wallet/withdraw',
        method: HTTP_VERB.POST,
        body: payload,
      }),
      transformErrorResponse: handleWithdrawError,
      invalidatesTags: ['wallet', 'notification'],
    }),

    verifyPayment: builder.mutation<ResSuccess<PaymentVerificationResponse>, { sessionId: string }>(
      {
        query: ({ sessionId }) => ({
          url: `/payment/verify/${sessionId}`,
          method: HTTP_VERB.PATCH,
        }),
        invalidatesTags: ['payment', 'cart'],
      }
    ),
  }),
});

export const {
  useMakeSessionMutation,
  useGetWalletQuery,
  useSaveBalanceIntentMutation,
  useMakeBalanceRechargeSessionMutation,
  useWithdrawMutation,
  useVerifyPaymentMutation,
  useMakeBalanceOrderMutation, // שונה מ-makeBalanceOrder
} = paymentApi;
