import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { LoadingCircle } from '../../components/LoadingCircle';
import { CurrencySymbol } from '../../components/ui/CurrencySymbol';
import { GradientBordered } from '../../components/ui/GradientBordered';
import { Money } from '../../components/ui/Money';
import { ORDER_STATUS } from '../../enums';
import { ROLE } from '../../enums/role';
import { useGetGameCurrencyOfferQuery } from '../../redux/features/gameCurrencyOffer/gameCurrencyOfferApi';
import { useGetOfferByIdQuery } from '../../redux/features/offer/offerApi';
import { useGetOrderQuery } from '../../redux/features/order/orderApi';
import { useCurrentUserQuery, useGetUserQuery } from '../../redux/features/user/userApi';
import { useAppSelector } from '../../redux/hooks';
import { OFFER_TYPE } from '../CreateOffer/Main';
import { UserDataDb } from '../Profile/components/AccountInfo';

import { AssignBoosterCard } from './components/AssignBoosterCard';
import { CompletedCard } from './components/CompletedCard';
import { ConfirmationCard } from './components/ConfirmationCard';
import { ConfirmDeliveryCard } from './components/ConfirmDeliveryCard';
import { ConfirmPaymentCard } from './components/ConfirmPaymentCard';
import { InProgressCard } from './components/InProgressCard';
import JoinGroupChatCard from './components/JoinGroupChatCard';
import { JoinServerCard } from './components/JoinServerCard';
import { OrderDetailsMetaInfo } from './components/OrderDetailsMetaInfo';
import { PlacedCard } from './components/PlacedCard';

export const Main = () => {
  const auth = useAppSelector((state) => state.auth);
  const roles = (auth?.user?.roles || [ROLE.VISITOR]) as ROLE[];
  const { uid } = useParams<{ uid: string }>();
  const { data: currentOrderRes } = useGetOrderQuery(uid || '', {
    skip: !uid,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
  const orderData = useMemo(() => currentOrderRes?.data, [currentOrderRes?.data]);
  // const {
  //   order: { status, items },
  // } = useOrdersSingleContext();
  const status = orderData?.status;
  // const status = ORDER_STATUS.COMPLETED;
  const { data: regularOfferRes } = useGetOfferByIdQuery(orderData?.item?.offerId || '', {
    skip: orderData?.item?.itemType !== 'regular',
    refetchOnFocus: true,
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
  });
  const { data: currencyOfferRes } = useGetGameCurrencyOfferQuery(orderData?.item?.offerId || '', {
    skip: orderData?.item?.itemType !== 'currency',
    refetchOnFocus: true,
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
  });

  const regularOfferData = regularOfferRes?.data;
  const currencyOfferData = currencyOfferRes?.data;
  const { data: sellerRes } = useGetUserQuery(
    (regularOfferData?.sellerId as unknown as UserDataDb)?._id ||
      currencyOfferData?.sellerId?._id ||
      '',
    {
      refetchOnFocus: true,
      refetchOnReconnect: true,
      refetchOnMountOrArgChange: true,
    }
  );
  const { data: curentUser, isLoading } = useCurrentUserQuery(undefined, {
    refetchOnFocus: true,
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
  });
  const isSellerOnline = sellerRes?.data?.online ? 'Yes' : 'No';
  const [isAssigned, setIsAssigned] = useState(false);
  useEffect(() => {
    if (orderData?.partner) {
      setIsAssigned(true);
    } else {
      setIsAssigned(false);
    }
  }, [orderData]);
  if (isLoading) {
    return <LoadingCircle />;
  }
  return (
    <main className='relative isolate z-0 py-4 xl:py-4'>
      <div className='fb-container'>
        <div className='pb-20'>
          <div>
            <div className='relative isolate z-0 flex justify-between items-center gap-2 xl:gap-4 xl:px-4 border-b border-brand-black-90 font-oxanium text-sm xl:text-base leading-none font-medium'>
              {Object.values([
                ORDER_STATUS.PLACED,
                ORDER_STATUS.PROCESSING,
                ORDER_STATUS.CONFIRMED,
                ORDER_STATUS.COMPLETED,
              ]).map((label, idx) => (
                <span
                  key={`order-details-tab-${idx + 1}`}
                  className={`relative isolate z-0 outline-none pb-3 line-clamp-1 inline-flex justify-center text-center xl:min-w-[7rem] transition-all capitalize ${
                    status === label
                      ? 'before:absolute before:w-full before:h-[2px] before:left-0 before:bottom-0 before:bg-brand-primary-color-1 before:rounded-t-lg text-brand-primary-color-1'
                      : 'text-white'
                  }`}
                >
                  {label}
                </span>
              ))}
            </div>

            <div className='grid xl:grid-cols-[1fr_min(26rem,100%)] items-start gap-8 pt-6'>
              <div className='w-full flex flex-wrap gap-8'>
                {/* tab panels */}
                <div className='w-full'>
                  <GradientBordered className='rounded-[1.25rem] before:rounded-[1.25rem] before:bg-gradient-bordered-light p-9 bg-multi-gradient-1'>
                    {status === ORDER_STATUS.PLACED ? <PlacedCard /> : null}
                    {/* For User and Status Confirmed */}
                    {status === ORDER_STATUS.CONFIRMED &&
                    curentUser?.data._id === orderData?.buyer._id ? (
                      <CompletedCard />
                    ) : null}
                    {/* For Partner and Status Confirmed */}
                    {status === ORDER_STATUS.CONFIRMED && roles.includes(ROLE.PARTNER) ? (
                      <ConfirmationCard orderId={orderData?._id || ''} />
                    ) : null}
                    {/* Status PROCESSING */}
                    {status === ORDER_STATUS.PROCESSING ? <InProgressCard /> : null}
                  </GradientBordered>
                </div>
                {/* details  */}
                <div className='w-full'>
                  <div className='w-full flex flex-col gap-8'>
                    {/* Delivery details */}
                    <GradientBordered className='rounded-[1.25rem] before:rounded-[1.25rem] before:bg-gradient-bordered-light p-9 bg-multi-gradient-1'>
                      <div className='flex flex-col items-start gap-8'>
                        <h2 className='capitalize font-tti-demi-bold font-semibold text-[clamp(1.5rem,4vw,2rem)] leading-none text-white'>
                          Delivery details
                        </h2>
                        {orderData?.item?.itemType === OFFER_TYPE.REGULAR ? (
                          <div className='w-full grid xl:grid-cols-2 items-start gap-5'>
                            <OrderDetailsMetaInfo
                              label='Offer Name'
                              value={orderData.item.offerName}
                            />
                            {orderData?.item?.selected?.filters
                              ? orderData.item.selected.filters.map((item) => {
                                  return (
                                    <OrderDetailsMetaInfo
                                      key={item.name}
                                      value={item.value.toString()}
                                      label={item.name}
                                    />
                                  );
                                })
                              : null}
                          </div>
                        ) : null}
                        {orderData?.item?.itemType === OFFER_TYPE.CURRENCY ? (
                          <>
                            <div className='w-full grid xl:grid-cols-2 items-start gap-5'>
                              <OrderDetailsMetaInfo
                                label='Server Name'
                                value={orderData.item.offerName}
                              />

                              {currencyOfferData?.dynamicItems
                                ? currencyOfferData.dynamicItems.map((item) => {
                                    return (
                                      <OrderDetailsMetaInfo
                                        key={item.value}
                                        value={item.value}
                                        label={item.label}
                                      />
                                    );
                                  })
                                : null}
                            </div>
                            <div className='w-full grid items-start gap-5'>
                              <OrderDetailsMetaInfo
                                label='Character Name'
                                value={orderData.item.selected.characterName}
                              />
                              <p className='font-tti-regular text-sm leading-relaxed text-brand-black-5 font-normal'>
                                If you’d like to change this, please contact the seller in the chat
                                window and provide the new delivery details.
                              </p>
                            </div>
                          </>
                        ) : null}
                      </div>
                    </GradientBordered>

                    {/* Order info */}
                    <GradientBordered className='rounded-[1.25rem] before:rounded-[1.25rem] before:bg-gradient-bordered-light p-9 bg-multi-gradient-1'>
                      <div className='flex flex-col items-start gap-8'>
                        <h2 className='capitalize font-tti-demi-bold font-semibold text-[clamp(1.5rem,4vw,2rem)] leading-none text-white'>
                          Order info
                        </h2>

                        <div className='w-full grid xl:grid-cols-2 items-start gap-5'>
                          {orderData?.item?.itemType === OFFER_TYPE.REGULAR ? (
                            <>
                              <OrderDetailsMetaInfo
                                label='Game'
                                value={regularOfferData?.gameUid.replaceAll('-', ' ')}
                              />
                              <OrderDetailsMetaInfo
                                label='Category'
                                value={regularOfferData?.categoryUid.replaceAll('-', ' - ')}
                              />
                            </>
                          ) : null}
                          {orderData?.item?.itemType === OFFER_TYPE.CURRENCY ? (
                            <>
                              <OrderDetailsMetaInfo
                                label='Currency'
                                value={currencyOfferData?.currencyUid.replaceAll('-', ' ')}
                              />
                              <OrderDetailsMetaInfo
                                label='Server'
                                value={currencyOfferData?.serverUid.replaceAll('-', ' - ')}
                              />
                            </>
                          ) : null}
                        </div>
                        <div className='w-full grid xl:grid-cols-2 items-start gap-5'>
                          {/* {orderData?.item?.itemType === OFFER_TYPE.REGULAR ? (
                            <OrderDetailsMetaInfo
                              label="Offer"
                              value={regularOfferData?.name}
                            />
                          ) : null} */}
                          {orderData?.item?.itemType === OFFER_TYPE.CURRENCY ? (
                            <OrderDetailsMetaInfo
                              label='Quantity'
                              value={orderData.item.selected.amount}
                            />
                          ) : null}

                          <OrderDetailsMetaInfo
                            label='Created'
                            value={new Date(orderData?.createdAt || Date.now()).toUTCString()}
                          />
                        </div>
                        <div className='w-full grid xl:grid-cols-2 items-start gap-5'>
                          <OrderDetailsMetaInfo label='Seller Online' value={isSellerOnline} />
                          <OrderDetailsMetaInfo
                            label='Order Completion Time'
                            value={`${regularOfferData?.approximateOrderCompletionInMinutes || currencyOfferData?.approximateOrderCompletionInMinutes} Minutes`}
                          />
                        </div>
                        <div className='w-full grid items-start gap-5'>
                          <OrderDetailsMetaInfo
                            label='Total Price'
                            value={
                              <>
                                <CurrencySymbol /> <Money value={orderData?.totalPrice || 0} />
                              </>
                            }
                          />
                        </div>
                      </div>
                    </GradientBordered>
                  </div>
                </div>
              </div>
              <aside className='w-full grid lg:grid-cols-3 xl:grid-cols-1 items-start gap-8 xl:gap-4'>
                {curentUser?.data._id === (orderData?.buyer as unknown as string) &&
                status === ORDER_STATUS.PROCESSING ? (
                  <ConfirmDeliveryCard orderId={orderData?._id || ''} />
                ) : null}
                {roles.includes(ROLE.SUPPORT) ? <ConfirmPaymentCard /> : null}

                <JoinGroupChatCard />
                {roles.includes(ROLE.CUSTOMER) ? <JoinServerCard /> : null}
                {roles.includes(ROLE.SUPPORT) ||
                (roles.includes(ROLE.ADMIN) &&
                  orderData?.status === ORDER_STATUS.PLACED &&
                  orderData?.item?.itemType !== OFFER_TYPE.CURRENCY &&
                  !isAssigned) ? (
                  <AssignBoosterCard />
                ) : null}
              </aside>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
