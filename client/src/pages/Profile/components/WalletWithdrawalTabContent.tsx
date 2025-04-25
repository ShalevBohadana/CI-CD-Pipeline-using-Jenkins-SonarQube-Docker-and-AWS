import { useState } from 'react';
import { Resolver, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { CurrencySymbol } from '../../../components/ui/CurrencySymbol';
import { ShowInputError } from '../../../components/ui/ShowInputError';
import { GradientBorderedInput } from './GradientBorderedInput';
import { PaymentGatewayItem } from './PaymentGatewayItem';
import { PAYMENT_METHODS } from './WalletDepositTabContent';
import { useWalletContext } from './Wallet';
import { useWithdrawMutation, WithdrawRequest } from '../../../redux/features/wallet/walletApi';
import { encryptCardData } from '../../../utils/encryption';
import { CARD_VALIDATION } from '../../../utils/constants';

interface CardDetails {
  holder: string;
  number: string;
  expireDate: string;
  cvv: string;
}

interface WithdrawalFormInputs {
  method: string;
  amount: number;
  card: CardDetails;
}

const cardDetailsSchema = yup.object().shape({
  holder: yup.string().required('Card holder name is required'),
  number: yup
    .string()
    .required('Card number is required')
    .matches(/^\d{16}$/, 'Invalid card number'),
  expireDate: yup.string().required('Expiration date is required'),
  cvv: yup
    .string()
    .required('CVV is required')
    .matches(/^\d{3,4}$/, 'Invalid CVV'),
});

const validationSchema = yup
  .object({
    method: yup.string().required('Payment method is required').defined(),
    amount: yup
      .number()
      .required('Amount is required')
      .min(1, 'Amount must be at least 1')
      .typeError('Amount must be a number')
      .defined(),
    card: yup
      .object({
        holder: yup.string().required('Card holder name is required').defined(),
        number: yup
          .string()
          .required('Card number is required')
          .matches(/^\d{16}$/, 'Invalid card number')
          .defined(),
        expireDate: yup.string().required('Expiration date is required').defined(),
        cvv: yup
          .string()
          .required('CVV is required')
          .matches(/^\d{3,4}$/, 'Invalid CVV')
          .defined(),
      })
      .required()
      .defined(),
  })
  .required();

export const WalletWithdrawalTabContent = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setTabIndex } = useWalletContext();
  const [withdraw] = useWithdrawMutation();

  const defaultValues: WithdrawalFormInputs = {
    method: '',
    amount: 0,
    card: {
      holder: '',
      number: '',
      expireDate: '',
      cvv: '',
    },
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<WithdrawalFormInputs>({
    resolver: yupResolver(validationSchema) as Resolver<WithdrawalFormInputs>,
    defaultValues,
  });

  const onSubmit: SubmitHandler<WithdrawalFormInputs> = async (data) => {
    try {
      setIsSubmitting(true);

      const encryptedCard = await encryptCardData({
        holder: data.card.holder,
        number: data.card.number,
        expireDate: new Date(data.card.expireDate),
        cvv: data.card.cvv,
      });

      // Format the card details as a JSON string for accountDetails
      const accountDetails = JSON.stringify({
        ...encryptedCard,
        expireDate: encryptedCard.expireDate.toISOString().slice(0, 7)
      });

      // Create the withdraw request with the correct structure
      const withdrawRequest: WithdrawRequest = {
        amount: data.amount,
        withdrawalMethod: data.method,
        accountDetails: accountDetails
      };

      const result = await withdraw(withdrawRequest).unwrap();

      if (result.success) {
        toast.success('Withdrawal request submitted successfully');
        reset();
        setTabIndex(0);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Withdrawal failed');
      console.error('Withdrawal error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='grid gap-4 xl:gap-8 px-2 xl:px-8'>
      <div className='flex justify-between items-center'>
        <h2 className='text-white text-[clamp(1rem,3vw,1.75rem)] leading-none font-semibold font-tti-demi-bold'>
          Choose withdrawal method
        </h2>
      </div>

      <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 xl:gap-8 font-oxanium'>
        {PAYMENT_METHODS?.map((gateway) => (
          <PaymentGatewayItem
            key={gateway.id}
            gateway={gateway}
            register={register('method')}
            disabled={isSubmitting}
          />
        ))}
        <ShowInputError errors={errors} name='method' />
      </div>

      <div className='grid lg:grid-cols-2 items-start gap-4 xl:gap-8 font-oxanium'>
        <GradientBorderedInput
          className='bg-brand-primary-color-1/[.03]'
          label='Withdrawal amount'
          type='number'
          placeholder='0'
          icon={<CurrencySymbol className='inline-flex pl-4' />}
          register={register('amount')}
          errors={errors}
          disabled={isSubmitting}
        />

        <GradientBorderedInput
          className='bg-brand-primary-color-1/[.03]'
          label='Card number'
          type='text'
          placeholder='0000 0000 0000 0000'
          register={register('card.number')}
          errors={errors}
          disabled={isSubmitting}
          maxLength={CARD_VALIDATION.MAX_LENGTH}
        />

        <GradientBorderedInput
          className='bg-brand-primary-color-1/[.03]'
          label='Card holder'
          placeholder='John Doe'
          register={register('card.holder')}
          errors={errors}
          disabled={isSubmitting}
        />

        <div className='grid grid-cols-2 gap-4'>
          <GradientBorderedInput
            className='bg-brand-primary-color-1/[.03]'
            label='Expiration date'
            type='month'
            min={new Date().toISOString().slice(0, 7)}
            register={register('card.expireDate')}
            errors={errors}
            disabled={isSubmitting}
          />
          <GradientBorderedInput
            className='bg-brand-primary-color-1/[.03]'
            label='CVV'
            type='password'
            placeholder='***'
            icon={<AiOutlineInfoCircle className='rotate-180 w-5 h-5 shrink-0 inline-flex mr-4' />}
            iconPosition='end'
            register={register('card.cvv')}
            errors={errors}
            disabled={isSubmitting}
            maxLength={4}
          />
        </div>
      </div>

      <div className='text-center py-3'>
        <button
          type='submit'
          disabled={isSubmitting}
          className='inline-flex gap-2 items-center justify-center text-center text-sm xl:text-base leading-none font-medium font-tti-medium bg-brand-primary-color-1 hover:bg-brand-primary-color-light hover:text-brand-primary-color-1 transition-colors px-4 xl:px-6 py-2.5 rounded-full'
        >
          <span className='first-letter:capitalize'>
            {isSubmitting ? 'Processing...' : 'Withdraw'}
          </span>
        </button>
      </div>
    </form>
  );
};