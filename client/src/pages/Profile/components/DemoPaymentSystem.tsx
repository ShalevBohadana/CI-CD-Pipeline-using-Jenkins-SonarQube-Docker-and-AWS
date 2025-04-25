// DemoWalletDepositTabContent.tsx
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { PaymentGatewayItem } from './PaymentGatewayItem';
import { ShowInputError } from '../../../components/ui/ShowInputError';
import { GradientBorderedInput } from './GradientBorderedInput';
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

export const DemoWalletDepositTabContent = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DepositFormInputs>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      amount: 0,
      method: '',
    },
  });

  const onSubmit = async () => {
    try {
      setIsSubmitting(true);
      // סימולציה של זמן עיבוד
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success('Demo payment processed successfully!');
      reset();
    } catch (error: any) {
      toast.error('Demo payment failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='grid gap-4 xl:gap-8 px-2 xl:px-8'>
      <div className='flex justify-between items-center'>
        <h2 className='text-white text-[clamp(1rem,3vw,1.75rem)] leading-none font-semibold font-tti-demi-bold'>
          Choose deposit method
        </h2>
        <span className='text-brand-primary-color-1 text-sm'>Demo Mode</span>
      </div>

      <div className='bg-brand-primary-color-1/[0.1] border border-brand-primary-color-1/[0.2] rounded-xl p-4'>
        <p className='text-white/80 text-sm'>
          Demo Mode: No real payments will be processed. This is for testing purposes only.
        </p>
      </div>

      {/* שיטות תשלום */}
      <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 xl:gap-8 font-oxanium'>
        {PAYMENT_METHODS.map((gateway) => (
          <PaymentGatewayItem
            key={gateway.id}
            gateway={gateway}
            register={register('method')}
            disabled={isSubmitting}
          />
        ))}
        <ShowInputError errors={errors} name='method' />
      </div>

      {/* סכום ההפקדה */}
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
      </div>

      {/* כפתור שליחה */}
      <div className='text-center py-3'>
        <button
          type='submit'
          disabled={isSubmitting}
          className='inline-flex gap-2 items-center justify-center text-center text-sm xl:text-base leading-none font-medium font-tti-medium bg-brand-primary-color-1 hover:bg-brand-primary-color-light hover:text-brand-primary-color-1 transition-colors px-4 xl:px-6 py-2.5 rounded-full'
        >
          <span className='first-letter:capitalize'>
            {isSubmitting ? 'Processing...' : 'Demo Payment'}
          </span>
        </button>
      </div>
    </form>
  );
};
