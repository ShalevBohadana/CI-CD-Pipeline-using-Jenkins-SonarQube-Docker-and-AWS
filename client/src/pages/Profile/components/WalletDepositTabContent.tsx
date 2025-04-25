import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { PaymentGatewayItem } from './PaymentGatewayItem';
import { ShowInputError } from '../../../components/ui/ShowInputError';
import { GradientBorderedInput } from './GradientBorderedInput';
import {
  useMakeBalanceRechargeSessionMutation,
  useVerifyBalanceRechargeMutation,
} from '../../../redux/features/wallet/walletApi';
import { TRANSACTION_LIMITS } from '../../../utils/constants';
import paypal from '../../../assets/images/payment-methods/paypal.svg';
import mastercard from '../../../assets/images/payment-methods/mastercard.svg';
import sepa from '../../../assets/images/payment-methods/sepa.svg';

export interface PaymentMethod {
  id: string;
  name: 'MasterCard' | 'VISA' | 'PayPal' | 'SEPA';
  logo: string;
  serviceFee: number;
}

export const PAYMENT_METHODS = [
  {
    id: 'mastercard',
    name: 'MasterCard',
    logo: mastercard,
    serviceFee: 5.07,
  },
  {
    id: 'sepa',
    name: 'SEPA',
    logo: sepa,
    serviceFee: 9.04,
  },
  {
    id: 'paypal',
    name: 'PayPal',
    logo: paypal,
    serviceFee: 6.94,
  },
] as const;

const validationSchema = yup.object().shape({
  method: yup.string().required('Please select a payment method'),
  amount: yup
    .number()
    .required('Please enter amount')
    .min(TRANSACTION_LIMITS.MIN_DEPOSIT, `Minimum deposit is ${TRANSACTION_LIMITS.MIN_DEPOSIT}`)
    .max(TRANSACTION_LIMITS.MAX_DEPOSIT, `Maximum deposit is ${TRANSACTION_LIMITS.MAX_DEPOSIT}`),
});

type DepositFormInputs = yup.InferType<typeof validationSchema>;

export const WalletDepositTabContent = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [makeSession] = useMakeBalanceRechargeSessionMutation();
  const [verifyPayment] = useVerifyBalanceRechargeMutation();
  const [stripeWindow, setStripeWindow] = useState<Window | null>(null);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<DepositFormInputs>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      amount: 0,
      method: '',
    },
  });

  const selectedMethod = watch('method');
  const amount = watch('amount');

  // Effect to monitor Stripe window and verify payment
  useEffect(() => {
    if (stripeWindow && currentSessionId) {
      const checkWindow = setInterval(async () => {
        if (stripeWindow.closed) {
          clearInterval(checkWindow);
          setStripeWindow(null);

          try {
            // Verify payment status
            const result = await verifyPayment({ sessionId: currentSessionId }).unwrap();

            if (result.data?.paymentStatus === 'paid') {
              toast.success('Payment successful!');
              reset();
            } else if (result.data?.paymentStatus === 'unpaid') {
              toast.error('Payment was not completed');
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            toast.error('Failed to verify payment status');
          }

          setCurrentSessionId(null);
        }
      }, 1000);

      return () => clearInterval(checkWindow);
    }
  }, [stripeWindow, currentSessionId, verifyPayment, reset]);

  const handlePayment = async (data: DepositFormInputs) => {
    try {
      setIsSubmitting(true);

      // Close any existing Stripe window
      if (stripeWindow && !stripeWindow.closed) {
        stripeWindow.close();
      }

      const result = await makeSession({
        depositIntentAmount: data.amount,
      }).unwrap();

      if (result.success && result.data?.clientSecret) {
        // Extract session ID from the URL
        const sessionId = new URL(result.data.clientSecret).searchParams.get('session_id');
        if (sessionId) {
          setCurrentSessionId(sessionId);
        }

        // Open Stripe checkout in a new window
        const newWindow = window.open(
          result.data.clientSecret,
          'stripe_checkout',
          'width=600,height=800,location=yes,resizable=yes,scrollbars=yes,status=yes'
        );

        if (!newWindow) {
          toast.error('Please allow popups to continue with payment');
          return;
        }

        setStripeWindow(newWindow);
        toast('Please complete payment in the new window');
      } else {
        toast.error('Failed to create payment session');
      }
    } catch (error: any) {
      toast.error(error.data?.message || 'Failed to process deposit');
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedPaymentMethod = PAYMENT_METHODS.find((pm) => pm.name === selectedMethod);
  const serviceFee = selectedPaymentMethod ? selectedPaymentMethod.serviceFee : 0;
  const totalAmount = amount ? Number(amount) + serviceFee : 0;

  return (
    <form onSubmit={handleSubmit(handlePayment)} className='grid gap-4 xl:gap-8 px-2 xl:px-8'>
      <div className='flex justify-between items-center'>
        <h2 className='text-white text-[clamp(1rem,3vw,1.75rem)] leading-none font-semibold font-tti-demi-bold'>
          Choose deposit method
        </h2>
      </div>

      <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 xl:gap-8 font-oxanium'>
        {PAYMENT_METHODS.map((gateway) => (
          <PaymentGatewayItem
            key={gateway.id}
            gateway={gateway}
            register={register('method')}
            disabled={isSubmitting}
            showFee={true}
          />
        ))}
        <ShowInputError errors={errors} name='method' />
      </div>

      <div className='grid lg:grid-cols-2 items-start gap-4 xl:gap-8 font-oxanium'>
        <GradientBorderedInput
          className='bg-brand-primary-color-1/[.03]'
          label='Deposit amount'
          type='number'
          placeholder='0'
          register={register('amount')}
          errors={errors}
          disabled={isSubmitting}
        />

        {selectedMethod && amount > 0 && (
          <div className='text-white/80 text-sm mt-2'>
            <div className='grid gap-1'>
              <p>Amount: ${Number(amount).toFixed(2)}</p>
              <p>Service Fee: ${serviceFee.toFixed(2)}</p>
              <p className='font-semibold'>Total: ${totalAmount.toFixed(2)}</p>
            </div>
          </div>
        )}
      </div>

      <div className='text-center py-3'>
        <button
          type='submit'
          disabled={isSubmitting}
          className='inline-flex gap-2 items-center justify-center text-center text-sm xl:text-base leading-none font-medium font-tti-medium bg-brand-primary-color-1 hover:bg-brand-primary-color-light hover:text-brand-primary-color-1 transition-colors px-4 xl:px-6 py-2.5 rounded-full disabled:opacity-50 disabled:cursor-not-allowed'
        >
          <span className='first-letter:capitalize'>
            {isSubmitting ? 'Processing...' : 'Deposit'}
          </span>
        </button>
      </div>
    </form>
  );
};
 