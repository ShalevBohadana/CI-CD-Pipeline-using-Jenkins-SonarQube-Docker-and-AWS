import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { ROUTER_PATH } from '../../enums/router-path';
import { GradientBorderedInput } from '../../pages/Profile/components/GradientBorderedInput';
import { ResError } from '../../redux/api/apiSlice';
import { useSaveBalanceIntentMutation } from '../../redux/features/wallet/walletApi';

import { CurrencySymbol } from './CurrencySymbol';

type SignInFormInputs = {
  depositIntentAmount: number;
};
type Props = {
  onClose: () => void;
};
export const AddBalanceForm = ({ onClose }: Props) => {
  const navigate = useNavigate();
  const [saveBalanceIntent] = useSaveBalanceIntentMutation();
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<SignInFormInputs>({
    mode: 'all',
  });

  const onSubmit: SubmitHandler<SignInFormInputs> = async ({ depositIntentAmount }) => {
    try {
      const result = await saveBalanceIntent({ depositIntentAmount }).unwrap();
      toast.success(result?.message);
      onClose();
      navigate(ROUTER_PATH.CHECKOUT_BALANCE_RECHARGE);
    } catch (error) {
      const typedError = error as ResError;
      toast.error(
        typedError?.data?.errorMessages[0]?.message ||
          typedError?.data?.message ||
          'Something went wrong'
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-8 font-oxanium'>
      <GradientBorderedInput
        label='Amount'
        placeholder='0'
        type='number'
        errors={errors}
        icon={<CurrencySymbol className='inline-flex pl-4' />}
        onKeyDown={(e) => {
          if (e.key === 'e' || e.key === '-') {
            e.preventDefault();
          }
        }}
        register={register('depositIntentAmount', {
          valueAsNumber: true,
          required: 'Balance amount is required',
          min: {
            value: 1,
            message: 'Minimum amount needs to be at least 1 USD or EUR',
          },
          max: {
            value: 10_000_000, // 1 million USD
            message: 'Maximum amount is 1 million USD',
          },
          maxLength: {
            value: 8,
            message: 'Can not exceed 8 digits',
          },
        })}
      />
      <div className=''>
        <button
          type='submit'
          className='flex mx-auto h-full justify-center items-center px-4 xl:px-6 py-2 text-base xl:text-lg leading-tight rounded-md font-semibold font-oxanium text-white bg-fading-theme-gradient-light-to-deep hover:bg-[linear-gradient(theme("colors.brand.primary.color-1")_100%,theme("colors.brand.primary.color-1")_100%)] transition-all'
        >
          Go to payment page
        </button>
      </div>
    </form>
  );
};
