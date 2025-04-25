import { Link } from 'react-router-dom';

import { GradientBordered } from '../../../../components/ui/GradientBordered';
import { ROUTE_PARAM, ROUTER_PATH } from '../../../../enums/router-path';
import { OrderReviewDataDb } from '../../../RateOrder/Main';

type Props = {
  payload: OrderReviewDataDb;
  showImage?: boolean;
  showReviews?: boolean;
};

export const PartnerClaimItem = ({ payload, showImage = false, showReviews = false }: Props) => {
  // const { isOpen, setIsOpen, setOrderSummary } = usePartnerClaimContext();
  const { order, reviewer, rating } = payload;
  return (
    <GradientBordered
      className={`rounded-[1.25rem] before:rounded-[1.25rem] before:transition-all before:bg-gradient-bordered-light p-4 xl:p-8 bg-multi-gradient-1 grid ${
        showImage ? 'md:grid-cols-[auto,1fr]' : 'grid-cols-1'
      } gap-8 overflow-visible `}
    >
      {showImage ? (
        <figure className='relative isolate z-0 group flex justify-center self-center'>
          <picture className='inline-flex justify-center items-center top-left-sharp-cut rounded-[.625rem] overflow-clip'>
            <source media='(min-width: 350px)' srcSet={order?.item?.offerImage} />
            <img
              src={order?.item?.offerImage}
              alt='description'
              className='h-auto object-cover group-hover:scale-110 transition-transform'
              loading='lazy'
              width='250'
              height='250'
              decoding='async'
              // fetchPriority="low"
            />
          </picture>
        </figure>
      ) : null}

      {/* details  */}
      <div className=''>
        <div className='flex flex-wrap justify-between gap-4'>
          <div className='flex flex-col gap-3'>
            <h2 className='first-letter:uppercase font-bold font-tti-bold text-[clamp(1.35rem,4vw,2rem)] leading-none'>
              {order?.item?.itemType}{' '}
              <span className='capitalize text-brand-primary-color-1'>
                {order?.item?.offerName}
              </span>
            </h2>
            <p className='text-sm xl:text-lg leading-none xl:leading-none font-normal font-oxanium text-brand-black-10'>
              {reviewer.name
                ? `${reviewer.name.firstName} ${reviewer.name.lastName}`
                : reviewer.email}
            </p>
            <p className='font-oxanium text-lg leading-none font-normal text-brand-primary-color-1'>
              ID #{payload?._id}
            </p>
            <p className='text-sm xl:text-base leading-none xl:leading-none font-normal font-oxanium text-brand-black-10'>
              {payload.review}
            </p>
            {showReviews ? (
              <p className='font-oxanium text-lg leading-none font-normal'>
                <span className='first-letter:uppercase inline-block text-brand-primary-color-1'>
                  rated for:
                </span>{' '}
                <span className='first-letter:uppercase inline-block'>{rating}</span>
              </p>
            ) : null}
          </div>
          <GradientBordered className='rounded-[.25rem] before:rounded-[.25rem] before:transition-all before:bg-gradient-bordered-light overflow-clip inline-flex w-auto h-auto self-start'>
            <Link
              to={
                showReviews
                  ? ROUTER_PATH.ORDER_REVIEW.replace(ROUTE_PARAM.UID, payload._id)
                  : ROUTER_PATH.ORDERS_SINGLE.replace(ROUTE_PARAM.UID, payload._id)
              }
              className='flex items-center justify-center text-center text-sm xl:text-base leading-none xl:leading-none font-normal font-tti-regular bg-brand-primary-color-1/[.03] text-brand-black-10 hover:bg-brand-primary-color-light hover:text-brand-primary-color-1 transition-colors px-4 py-2.5 xl:px-5 xl:py-4 rounded-[.25rem] capitalize'
            >
              {showReviews ? 'review' : 'order'} summery
            </Link>
          </GradientBordered>
        </div>
      </div>
    </GradientBordered>
  );
};
