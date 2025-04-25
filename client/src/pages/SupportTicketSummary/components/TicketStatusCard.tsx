import { useParams } from 'react-router-dom';

import { GradientBordered } from '../../../components/ui/GradientBordered';
import { ORDER_STATUS } from '../../../enums';
import { ROLE, type Roles } from '../../../enums/role';
import { useUpdateTicketMutation } from '../../../redux/features/ticket/ticketApi';
import { useAppSelector } from '../../../redux/hooks';
import { CommonParams } from '../../../types/globalTypes';
import { USER_ROLE_ENUM } from '@/types/user';

export const TicketStatusCard = () => {
  const {
    user: { roles = [] as USER_ROLE_ENUM[] },
  } = useAppSelector((state) => state.auth) || { user: {} };
  const { uid } = useParams<CommonParams>();
  const [updateTicket] = useUpdateTicketMutation();

  const handleProcessing = async () => {
    updateTicket({ _id: uid, status: ORDER_STATUS.PROCESSING });
  };

  const handleDelayed = async () => {
    updateTicket({
      _id: uid,
      isDelayed: true,
      status: ORDER_STATUS.PROCESSING,
    });
  };

  const handleCompleted = async () => {
    updateTicket({
      _id: uid,
      isDelayed: false,
      status: ORDER_STATUS.COMPLETED,
    });
  };

  // Type assertion to safely check if the SUPPORT role is included
  const hasSupport = roles.includes('support' as USER_ROLE_ENUM);

  return (
    <GradientBordered
      className={`rounded-[1.25rem] before:rounded-[1.25rem] before:bg-gradient-bordered-light p-9 bg-multi-gradient-1 grid gap-8 py-8 px-6 ${
        hasSupport ? 'text-center' : ''
      }`}
    >
      <div className='grid gap-4 text-center'>
        <h2 className='capitalize font-tti-demi-bold font-semibold text-[clamp(1.5rem,4vw,2rem)] leading-none text-white'>
          <span className=''>ticket</span>{' '}
          <span className='text-brand-primary-color-1 capitalize inline-block'>status</span>
        </h2>
      </div>
      <div className='grid gap-6 justify-center'>
        <button
          type='button'
          onClick={handleProcessing}
          className='flex w-full h-full justify-center items-center px-3 xl:px-6 py-2 xl:py-4 text-lg xl:text-xl leading-tight rounded-md font-semibold font-oxanium text-white bg-fading-theme-gradient-light-to-deep hover:bg-[linear-gradient(theme("colors.brand.primary.color-1")_100%,theme("colors.brand.primary.color-1")_100%)] transition-all'
        >
          Mark as processing
        </button>
        <button
          type='button'
          onClick={handleDelayed}
          className='flex w-full h-full justify-center items-center px-3 xl:px-6 py-2 xl:py-4 text-lg xl:text-xl leading-tight rounded-md font-semibold font-oxanium text-white bg-fading-theme-gradient-light-to-deep hover:bg-[linear-gradient(theme("colors.brand.primary.color-1")_100%,theme("colors.brand.primary.color-1")_100%)] transition-all'
        >
          Mark as delayed
        </button>
        <button
          type='button'
          onClick={handleCompleted}
          className='flex w-full h-full justify-center items-center px-3 xl:px-6 py-2 xl:py-4 text-lg xl:text-xl leading-tight rounded-md font-semibold font-oxanium text-white bg-fading-theme-gradient-light-to-deep hover:bg-[linear-gradient(theme("colors.brand.primary.color-1")_100%,theme("colors.brand.primary.color-1")_100%)] transition-all'
        >
          Mark as completed
        </button>
      </div>
    </GradientBordered>
  );
};
