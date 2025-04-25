import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

import { LoadingCircle } from '../../../../components/LoadingCircle';
import { CurrencySymbol } from '../../../../components/ui/CurrencySymbol';
import { GradientBordered } from '../../../../components/ui/GradientBordered';
import { Money } from '../../../../components/ui/Money';
import { ORDER_STATUS } from '../../../../enums';
import { ROUTE_PARAM, ROUTER_PATH } from '../../../../enums/router-path';
import { useAssignOrderMutation } from '../../../../redux/features/order/orderApi';
import { useCurrentUserQuery } from '../../../../redux/features/user/userApi';
import { ExtendedOrder } from '@/pages/MyOrders/components/OrderItem';

interface ClaimOrderCardProps {
  payload: ExtendedOrder;
  showImage?: boolean;
  showReviews?: boolean;
}

export const ClaimOrderCard: React.FC<ClaimOrderCardProps> = ({
  payload,
  showImage = false,
  showReviews = false,
}) => {
  const { data: user, isLoading: isUserLoading } = useCurrentUserQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  const { title, extendedTitle, imageUrl, id, ordererName, rating, price } = payload;

  const [assignOrder, { isLoading }] = useAssignOrderMutation();

  const handleAcceptOrder = async () => {
    if (!user?.data?._id) {
      toast.error('User data not available');
      return;
    }

    try {
      const result = await assignOrder({
        _id: id,
        partner: user.data._id,
        status: ORDER_STATUS.PROCESSING,
      }).unwrap();

      if (result) {
        toast.success('Order Claimed successfully');
      }
    } catch (error) {
      console.error('Failed to claim order:', error);
      toast.error('Failed to claim order. Please try again.');
    }
  };

  if (isUserLoading || isLoading) {
    return <LoadingCircle />;
  }

  const orderDetailsLink = ROUTER_PATH.ORDERS_SINGLE.replace(ROUTE_PARAM.UID, id);

  return (
    <GradientBordered
      className={`rounded-[1.25rem] before:rounded-[1.25rem] before:transition-all before:bg-gradient-bordered-light p-4 xl:p-8 bg-multi-gradient-1 grid ${
        showImage ? 'md:grid-cols-[auto,1fr]' : 'grid-cols-1'
      } gap-8 overflow-visible`}
    >
      {showImage && (
        <figure className='relative isolate z-0 group flex justify-center self-center'>
          <picture className='inline-flex justify-center items-center top-left-sharp-cut rounded-[.625rem] overflow-clip'>
            <source media='(min-width: 350px)' srcSet={imageUrl} />
            <img
              src={imageUrl}
              alt={`${title} image`}
              className='h-auto object-cover group-hover:scale-110 transition-transform'
              loading='lazy'
              width='250'
              height='250'
              decoding='async'
            />
          </picture>
        </figure>
      )}

      <div>
        <div className='flex flex-wrap justify-between gap-4'>
          <div className='flex flex-col gap-3'>
            <h2 className='first-letter:uppercase font-bold font-tti-bold text-[clamp(1.35rem,4vw,2rem)] leading-none'>
              {extendedTitle} <span className='capitalize text-brand-primary-color-1'>{title}</span>
            </h2>
            <p className='text-sm xl:text-lg leading-none xl:leading-none font-normal font-oxanium text-brand-black-10'>
              {ordererName}
            </p>
            <p className='font-oxanium text-lg leading-none font-normal text-brand-primary-color-1'>
              ID #{id}
            </p>
            {showReviews && (
              <p className='font-oxanium text-lg leading-none font-normal'>
                <span className='first-letter:uppercase inline-block text-brand-primary-color-1'>
                  rated for:
                </span>{' '}
                <span className='first-letter:uppercase inline-block'>{rating}</span>
              </p>
            )}
          </div>

          <GradientBordered className='rounded-[.25rem] before:rounded-[.25rem] before:transition-all before:bg-gradient-bordered-light overflow-clip inline-flex w-auto h-auto self-start'>
            <Link
              to={orderDetailsLink}
              className='flex items-center justify-center text-center text-sm xl:text-base leading-none xl:leading-none font-normal font-tti-regular bg-brand-primary-color-1/[.03] text-brand-black-10 hover:bg-brand-primary-color-light hover:text-brand-primary-color-1 transition-colors px-4 py-2.5 xl:px-5 xl:py-4 rounded-[.25rem] capitalize'
            >
              Order summary
            </Link>
          </GradientBordered>
        </div>

        <div className='mt-6 flex flex-wrap gap-4 justify-between items-center'>
          <div className='flex flex-wrap gap-4'>
            <button
              onClick={handleAcceptOrder}
              disabled={isLoading}
              type='button'
              className='inline-flex items-center justify-center text-center text-sm xl:text-base leading-none xl:leading-none font-normal font-tti-regular bg-brand-primary-color-1 hover:bg-brand-primary-color-light text-white hover:text-brand-primary-color-1 transition-colors px-4 xl:px-8 py-2.5 xl:py-4 rounded-[.25rem]'
            >
              {isLoading ? 'Accepting...' : 'Accept'}
            </button>

            <GradientBordered className='rounded-[.25rem] before:rounded-[.25rem] before:transition-all before:bg-gradient-bordered-light overflow-clip inline-flex w-auto h-auto'>
              <button
                type='button'
                className='flex items-center justify-center text-center text-sm xl:text-base leading-none xl:leading-none font-normal font-tti-regular bg-brand-primary-color-1/[.03] text-brand-black-10 hover:bg-brand-primary-color-light hover:text-brand-primary-color-1 transition-colors px-4 xl:px-8 py-2.5 xl:py-4 rounded-[.25rem]'
              >
                Reject
              </button>
            </GradientBordered>
          </div>

          <p className='flex flex-col gap-1 text-end'>
            <span className='text-brand-black-30 font-oxanium text-lg xl:text-xl leading-none font-medium'>
              Price
            </span>
            <span className='flex flex-wrap font-semibold font-tti-demi-bold text-[clamp(1.35rem,4vw,2rem)] leading-none text-brand-primary-color-1'>
              <CurrencySymbol />
              <Money value={price} />
            </span>
          </p>
        </div>
      </div>
    </GradientBordered>
  );
};

export default ClaimOrderCard;
