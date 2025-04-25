import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { LoadingCircle } from '../../../../../components/LoadingCircle';
import { useCreateReportMutation } from '../../../../../redux/features/report/reportApi';
import { socket } from '../../../../../redux/features/socket/SocketFactory';
import { GradientBorderedInput } from '../../../../Profile/components/GradientBorderedInput';
import { useDashboardPageStatus } from '../../../components/DashboardProvider';

type UserBanFormInputs = {
  reason: string;
};
export const UserBanForm = ({ user }: { user: string }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<UserBanFormInputs>({
    mode: 'onChange',
  });
  const [submitWarning, { isLoading: isSubmittingWarning }] = useCreateReportMutation();
  const { setIsModalOpen } = useDashboardPageStatus();

  const onSubmit: SubmitHandler<UserBanFormInputs> = async (data) => {
    const newWarning = {
      userId: user,
      reason: data.reason,
      reportType: 'ban',
    };
    const response = await submitWarning(newWarning);
    socket.emit('banuser', user);
    if (response) {
      toast.success('Account Baned successfully');
      setIsModalOpen(false);
    }
  };
  if (isSubmittingWarning) {
    return <LoadingCircle />;
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='grid gap-4'>
      <legend>Are you sure you want to ban this user?</legend>
      <GradientBorderedInput
        label='Ban reason'
        errors={errors}
        register={register('reason', {
          required: 'Please enter a reason',
          validate: (value: string) => !!value.trim() || 'no whitespace.',
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
