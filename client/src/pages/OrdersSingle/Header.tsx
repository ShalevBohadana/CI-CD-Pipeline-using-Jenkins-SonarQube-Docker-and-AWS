import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { SITE_INFO } from '../../enums';
import { useGetGameQuery } from '../../redux/features/game/gameApi';
import { useGetGameCurrencyQuery } from '../../redux/features/gameCurrency/gameCurrencyApi';
import { useGetGameCurrencyOfferQuery } from '../../redux/features/gameCurrencyOffer/gameCurrencyOfferApi';
import { useGetOfferByIdQuery } from '../../redux/features/offer/offerApi';
import { useGetOrderQuery } from '../../redux/features/order/orderApi';

// import { useOrdersSingleContext } from '.';

export const Header = () => {
  // const { uid } = useOrdersSingleContext();
  const { uid } = useParams<{ uid: string }>();
  const { data: currentOrderRes } = useGetOrderQuery(uid || '', {
    skip: !uid,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
  const orderData = useMemo(() => currentOrderRes?.data, [currentOrderRes?.data]);
  const { data: offerRes } = useGetOfferByIdQuery(orderData?.item?.offerId || '', {
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

  const { data: gameCurrencyRes } = useGetGameCurrencyQuery(
    currencyOfferRes?.data.currencyUid || '',
    {
      skip: !currencyOfferRes?.data.currencyUid,
      refetchOnFocus: true,
      refetchOnReconnect: true,
      refetchOnMountOrArgChange: true,
    }
  );
  const { data: gameRes } = useGetGameQuery(
    offerRes?.data?.gameUid || gameCurrencyRes?.data?.gameUid || '',
    {
      refetchOnFocus: true,
      refetchOnReconnect: true,
      refetchOnMountOrArgChange: true,
    }
  );
  const bannerUrl = gameRes?.data?.bannerUrl || '';
  const categoryName =
    gameRes?.data?.categories?.find((item) => item.value === offerRes?.data?.categoryUid)?.label ||
    '';
  return (
    <header className='py-10 xl:pb-0 relative isolate z-5 '>
      <div className='fb-container'>
        <div className='grid grid-cols-[1fr] items-center isolate z-0 rounded-2xl overflow-hidden'>
          <div className='row-span-full col-span-full h-full w-full flex flex-col justify-center z-10'>
            <div className='flex flex-col gap-1 px-4 xl:px-7 bg-black/15 xl:py-4 backdrop-blur-md'>
              <span className='font-oxanium text-base xl:text-lg leading-none text-brand-primary-color-1 font-medium'>
                {gameRes?.data?.title} {categoryName}
              </span>
              <h2 className='capitalize text-start font-bold font-tti-bold text-[clamp(1.5rem,4vw,2.5rem)] leading-tight'>
                Enjoy{' '}
                <span className='inline-flex text-brand-primary-color-1/30 bg-clip-text bg-[linear-gradient(293deg,var(--tw-gradient-stops))] from-brand-primary-color-1 to-brand-primary-color-light animate-text-gradient'>
                  {gameRes?.data?.name}
                </span>
                <br className='' />
                <span className='inline-flex text-brand-primary-color-1/30 bg-clip-text bg-[linear-gradient(293deg,var(--tw-gradient-stops))] from-brand-primary-color-1 to-brand-primary-color-light animate-text-gradient'>
                  with
                </span>{' '}
                {SITE_INFO.name.capitalized}
              </h2>
              <p className='font-oxanium text-sm xl:text-base leading-none text-white font-normal'>
                Order ID #{uid} . Created{' '}
                {new Date(orderData?.createdAt || Date.now()).toUTCString()}
              </p>
            </div>
          </div>
          <figure className='row-span-full col-span-full'>
            <picture className='inline-flex justify-center items-center select-none'>
              <source media='(min-width: 350px)' srcSet={bannerUrl} />
              <img
                src={bannerUrl}
                alt='description'
                className='inline-flex justify-center items-center h-96 xl:h-auto object-cover object-[60%] xl:object-left-top'
                loading='lazy'
                width='1320'
                height='448'
                decoding='async'
                // fetchPriority="low"
                draggable='false'
              />
            </picture>
          </figure>
        </div>
      </div>
    </header>
  );
};
