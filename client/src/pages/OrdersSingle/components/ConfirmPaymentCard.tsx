import { BiCheck } from 'react-icons/bi';
import { useParams } from 'react-router-dom';

import logoImgSrc from '../../../assets/images/logo.svg';
import { GradientBordered } from '../../../components/ui/GradientBordered';
import {
  useConfirmPaymentMutation,
  useGetOrderQuery,
} from '../../../redux/features/order/orderApi';
import { CommonParams } from '../../../types/globalTypes';

export const ConfirmPaymentCard = () => {
  const { uid } = useParams<CommonParams>();
  const { data: currentOrderRes } = useGetOrderQuery(uid || '', {
    skip: !uid,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
  const [confirmPayment, { isLoading }] = useConfirmPaymentMutation();
  const handleConfirmPayment = async () => {
    await confirmPayment({ _id: uid });
  };
  return (
    <GradientBordered className='rounded-[1.25rem] before:rounded-[1.25rem] before:bg-gradient-bordered-light p-9 bg-multi-gradient-1 grid gap-8 py-8 px-6 text-center'>
      <div className='grid gap-4 justify-center'>
        <figure className=''>
          <picture className=''>
            <source media='(min-width: 350px)' srcSet={logoImgSrc} />
            <img
              src={logoImgSrc}
              alt='description'
              className='xl:w-44 h-8'
              loading='lazy'
              width='176'
              height='32'
              decoding='async'
              // fetchPriority="low"
            />
          </picture>
        </figure>
        <p className='text-base leading-relaxed font-tti-regular font-regular text-brand-black-10'>
          Payment status for this order
        </p>
      </div>
      <div className=''>
        <button
          type='button'
          disabled={isLoading || currentOrderRes?.data?.isPaymentConfirmed}
          onClick={handleConfirmPayment}
          className='inline-flex gap-2 items-center justify-center text-center text-sm xl:text-base leading-none font-medium font-tti-medium bg-brand-primary-color-1 hover:bg-brand-primary-color-light hover:text-brand-primary-color-1 transition-colors px-4 xl:px-6 py-2.5 rounded-md disabled:cursor-not-allowed'
        >
          <span className=''>
            {currentOrderRes?.data?.isPaymentConfirmed
              ? 'Payment Confirmed'
              : 'Payment has not confirmed yet'}
          </span>
          {currentOrderRes?.data?.isPaymentConfirmed ? (
            <BiCheck className='w-5 h-5 text-white bg-green-500 rounded-circle' />
          ) : null}
        </button>
      </div>
    </GradientBordered>
  );
};
