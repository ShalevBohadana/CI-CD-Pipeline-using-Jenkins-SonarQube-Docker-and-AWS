/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { z } from 'zod';

import { EmbeddedCheckout, EmbeddedCheckoutProvider } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import {
  useGetWalletQuery,
  useMakeBalanceRechargeSessionMutation,
} from '../../redux/features/wallet/walletApi';
import { NormalizedDbData, Pretty } from '../../types/globalTypes';

export const WALLET_STATUS = {
  ACTIVATE: 'activate',
  SUSPEND: 'suspend',
} as const;

const createWalletZ = z.object({
  userId: z.optional(z.string()),
  status: z.nativeEnum(WALLET_STATUS),
  balance: z.number().min(0).default(0),
  depositIntentAmount: z.number().min(1).optional(),
});

export type CreateWallet = z.infer<typeof createWalletZ>;
export interface transactionDataType {
  type: 'ordered';
  amount: number;
  paymentStatus: 'paid' | 'unpaid' | 'pending'; // Add all possible payment statuses
  isPaid: boolean;
  sessionId: string;
  paymentId: string;
  paidAt: string;
}
export interface WalletDataDb extends Pretty<NormalizedDbData & CreateWallet> {
  transactions: transactionDataType[];
}
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
// This is your test public API key.

const stripe = loadStripe(import.meta.env.VITE_STRIPE_SECRET_KEY_PUB);

export const Main = () => {
  const [makeSession] = useMakeBalanceRechargeSessionMutation();
  const { data: walletData, isLoading } = useGetWalletQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const rechargeAmount = walletData?.data?.depositIntentAmount;
  // Create a Checkout Session as soon as the page loads
  useEffect(() => {
    if (!isLoading && rechargeAmount && !clientSecret) {
      const makeASession = async () => {
        const payload = {
          depositIntentAmount: rechargeAmount,
        };
        console.log(rechargeAmount);
        const { data: sessionData } = await makeSession(payload).unwrap();
        setClientSecret(sessionData.clientSecret);
      };

      makeASession().catch((err) => {
        console.log(err);
        toast.error(err?.message || 'Something went wrong');
      });
    }

    return () => {
      // setClientSecret(null);
    };
  }, [isLoading, rechargeAmount, clientSecret, makeSession]);
  console.log(rechargeAmount, clientSecret);
  return (
    <div className='p-4'>
      {!walletData?.data?.depositIntentAmount ? (
        <div className=''>please add amount to recharge.</div>
      ) : null}
      {rechargeAmount && clientSecret ? (
        <EmbeddedCheckoutProvider stripe={stripe} options={{ clientSecret }}>
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      ) : null}
    </div>
  );
};
