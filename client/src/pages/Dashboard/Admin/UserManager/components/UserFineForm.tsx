import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { LoadingCircle } from '../../../../../components/LoadingCircle';
import { useCreateReportMutation } from '../../../../../redux/features/report/reportApi';
import { GradientBorderedInput } from '../../../../Profile/components/GradientBorderedInput';
import { useDashboardPageStatus } from '../../../components/DashboardProvider';

type UserFineFormInputs = {
  reason: string;
  amount: number;
};
export const UserFineForm = ({ user }: { user: string }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<UserFineFormInputs>({
    mode: 'onChange',
  });

  const [submitWarning, { isLoading: isSubmittingWarning }] = useCreateReportMutation();
  const { setIsModalOpen } = useDashboardPageStatus();

  const onSubmit: SubmitHandler<UserFineFormInputs> = async (data) => {
    const newFine = {
      userId: user,
      reason: data.reason,
      fine: {
        reason: data.reason,
        amount: -data.amount,
      },
      reportType: 'fine',
    };
    const response = await submitWarning(newFine);
    if (response) {
      toast.success('Submitted fine');
      setIsModalOpen(false);
    }
  };
  if (isSubmittingWarning) {
    return <LoadingCircle />;
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='grid gap-4'>
      <legend>Are you sure you want to fine this user?</legend>
      <GradientBorderedInput
        label='Fine reason'
        errors={errors}
        register={register('reason', {
          required: 'Please enter a reason',
          validate: (value: string) => !!value.trim() || 'no whitespace.',
        })}
      />
      <GradientBorderedInput
        label='Fine amount'
        type='number'
        placeholder='0'
        errors={errors}
        register={register('amount', {
          required: 'Please enter a fine amount',
          min: {
            value: 1,
            message: 'Fine amount must be at least 1 USD or equivalent',
          },
          valueAsNumber: true,
        })}
      />
      <button
        type='submit'
        disabled={isSubmitting || !isValid}
        className='inline-flex items-center justify-self-center gap-1 font-tti-medium font-medium text-base leading-none text-white bg-brand-primary-color-1 hover:bg-brand-primary-color-light hover:text-brand-primary-color-1 transition-colors rounded-[.25rem] px-4 xl:px-6 py-1.5 xl:py-2.5 disabled:cursor-not-allowed disabled:text-white disabled:bg-brand-primary-color-1'
      >
        <span className='capitalize'>confirm</span>
      </button>
    </form>
  );
};
