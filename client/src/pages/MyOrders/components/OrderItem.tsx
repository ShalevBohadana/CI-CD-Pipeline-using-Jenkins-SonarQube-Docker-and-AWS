import { Link } from 'react-router-dom';

import { ColoredStatusText } from '../../../components/ui/ColoredStatusText';
import { CurrencySymbol } from '../../../components/ui/CurrencySymbol';
import { GradientShapeShifter } from '../../../components/ui/GradientShapeShifter';
import { Money } from '../../../components/ui/Money';
import { OrderStatus } from '../../../enums';
import { ROUTE_PARAM, ROUTER_PATH } from '../../../enums/router-path';
import { LARGE_SCREEN, useMatchMedia } from '../../../hooks/useMatchMedia';
import { CartItem } from '../../../redux/features/cart/cartSlice';
import { NormalizedDbData, Pretty } from '../../../types/globalTypes';
import { UserDataDb } from '../../Profile/components/AccountInfo';

import { SlashedMetaInfo } from './SlashedMetaInfo';
import React from 'react';
import { JoinServerCard } from '../../../components/JoinServerCard';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

export interface Order {
  _id: string;
  id: string;
  uid: string;
  title: string;
  ordererName: string;
  status: 'completed' | 'pending' | 'cancelled' | 'processing' | 'failed';
  createdAt: string;
  date: string;
  paymentMethod: 'credit_card' | 'paypal' | 'bitcoin' | 'google_pay' | 'apple_pay';
  amount: number;
  currency: string;
  gameType: string;
  quantity: number;
  customerEmail: string;
  deliveryStatus: 'delivered' | 'processing' | 'pending' | 'cancelled' | 'failed';
  deliveredAt?: string;
  cancelReason?: string;
  failureReason?: string;
  reviewCount: number;
  rating: number;
}

// Extended Order type for Partner/Admin views
export interface ExtendedOrder extends Order {
  extendedTitle: string;
  imageUrl: string;
  ordererName: string;
  price: number;
}

// Database Order type
export type OrderDataDb = Pretty<
  NormalizedDbData & {
    item: CartItem;
    totalPrice: number;
    buyer: UserDataDb;
    status: OrderStatus;
    isChannelCreated: boolean;
    isPaymentConfirmed: boolean;
    isConfirmedByClient: boolean;
    isConfirmedByPartner: boolean;
    inviteUrl: string;
    partner?: string;
    paymentId?: string;
  }
>;

// Props types
export interface OrderItemProps {
  order: OrderDataDb;
}

export interface UpComOrderProps {
  payload: ExtendedOrder;
  showImage?: boolean;
  showReviews?: boolean;
}

type OrderProps = {
  order: OrderDataDb;
};

export const OrderItem: React.FC<OrderProps> = ({ order }) => {
  const isLargeScreen = useMatchMedia(LARGE_SCREEN);
  const { user: userData } = useSelector((state: RootState) => state.auth);

  const {
    _id,
    createdAt,
    status,
    // uid,
    // date,
    // thumbnail: imageUrl,
    // price,
    // rating,
    // reviewCount,
    // status,
    // title,
    totalPrice,
    item,
  } = order;
  const { offerName, offerImage, itemType } = item;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="space-y-4">
        <JoinServerCard
          orderId={order._id}
          userId={userData?.userId}
          channelInviteUrl={order.inviteUrl}
          isChannelCreated={order.isChannelCreated}
        />

        <div className='flex flex-wrap md:flex-nowrap gap-5 lg:gap-1 xl:gap-1 justify-center xl:justify-between'>
          {isLargeScreen ? (
            <figure className='shrink-0 flex items-center xl:pr-4'>
              {status === 'pending' ? (
                <div className='inline-flex items-center'>
                  <picture className='inline-flex items-center'>
                    <source media='(min-width: 350px)' srcSet={offerImage} />
                    <img
                      src={offerImage}
                      alt='description'
                      className='inline-flex w-36 h-16'
                      loading='lazy'
                      width='144'
                      height='64'
                      decoding='async'
                      // fetchPriority="low"
                    />
                  </picture>
                </div>
              ) : (
                <Link
                  to={ROUTER_PATH.ORDERS_SINGLE.replace(ROUTE_PARAM.UID, _id)}
                  className='inline-flex items-center'
                >
                  <picture className='inline-flex items-center'>
                    <source media='(min-width: 350px)' srcSet={offerImage} />
                    <img
                      src={offerImage}
                      alt='description'
                      className='inline-flex w-36 h-16'
                      loading='lazy'
                      width='144'
                      height='64'
                      decoding='async'
                      // fetchPriority="low"
                    />
                  </picture>
                </Link>
              )}
            </figure>
          ) : (
            false
          )}

          <GradientShapeShifter>
            <div className='relative h-full w-full z-10'>
              <div className='flex flex-wrap items-center justify-center md:justify-start gap-3 px-5 py-2 xl:pl-6 xl:pr-3 xl:py-0 h-full w-full'>
                <div className='flex grow gap-3 items-center w-full lg:max-w-sm xl:mr-auto'>
                  <figure className='shrink-0'>
                    <picture className='inline-flex justify-center items-center'>
                      <source media='(min-width: 350px)' srcSet='favicon.svg' />
                      <img
                        src='favicon.svg'
                        alt='description'
                        className='inline-flex w-6 h-7'
                        loading='lazy'
                        width='24'
                        height='28'
                        decoding='async'
                        // fetchPriority="low"
                      />
                    </picture>
                  </figure>
                  <span className='flex-grow pt-[.375rem] font-oxanium font-medium text-lg leading-none'>
                    {status === 'pending' ? (
                      <Link
                        to={ROUTER_PATH.ORDERS_SINGLE.replace(ROUTE_PARAM.UID, _id)}
                        className='hover:text-brand-primary-color-1 transition-colors line-clamp-1'
                      >
                        {itemType === 'currency' ? offerName.replaceAll('-', ' ') : offerName}
                      </Link>
                    ) : (
                      <Link
                        to={ROUTER_PATH.ORDERS_SINGLE.replace(ROUTE_PARAM.UID, _id)}
                        className='hover:text-brand-primary-color-1 transition-colors line-clamp-1'
                      >
                        {itemType === 'currency' ? offerName.replaceAll('-', ' ') : offerName}
                      </Link>
                    )}
                  </span>
                </div>
                <SlashedMetaInfo title='date'>{createdAt.split('T')[0]}</SlashedMetaInfo>

                <SlashedMetaInfo title='status'>
                  <ColoredStatusText value={status} />
                </SlashedMetaInfo>

                {/* <SlashedMetaInfo title="review">{reviewCount}</SlashedMetaInfo> */}
                {/* <SlashedMetaInfo title="rating">{rating}</SlashedMetaInfo> */}
                <SlashedMetaInfo title='price'>
                  <span className='text-brand-primary-color-1 font-semibold'>
                    <CurrencySymbol />
                    <Money value={totalPrice} />
                  </span>
                </SlashedMetaInfo>
              </div>
            </div>
          </GradientShapeShifter>
        </div>
      </div>
    </div>
  );
};
