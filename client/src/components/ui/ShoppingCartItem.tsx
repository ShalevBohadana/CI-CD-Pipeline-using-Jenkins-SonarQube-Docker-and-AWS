/* eslint-disable @typescript-eslint/no-unused-vars */
import { ReactNode } from 'react';

import { OfferDataDb } from '../../pages/CreateOffer';
import { OFFER_TYPE } from '../../pages/CreateOffer/Main';
import { useRemoveFromCartMutation } from '../../redux/features/cart/cartApi';
import { CartSingleItemDataType } from '../../types/cart/cartDataType';
import { BackSlashIcon, TrashIcon } from '../icons/icons';

import { CurrencySymbol } from './CurrencySymbol';
import { Money } from './Money';
import { SeparatorBullet } from './SeparatorBullet';

type Props = {
  payload: CartSingleItemDataType;
};

interface RemoveFromCartParams {
  itemId: number;
  offerId: string;
}

export const ShoppingCartItem = ({ payload }: Props): ReactNode => {
  let CART_ITEM: ReactNode = null;
  const { itemType } = payload;
  const [removeFromCart] = useRemoveFromCartMutation();
  const handleRemoveFromCart = async () => {
    await removeFromCart({
      itemId: Number(payload?.itemId) || 0,
      offerId: payload?.offerId?._id || '',
    } as RemoveFromCartParams);
  };

  const commonActionsMarkup = (
    <div className='flex flex-wrap justify-end gap-2 xl:gap-4 pr-2 xl:pr-4'>
      <BackSlashIcon />
      <p className='flex flex-col justify-center items-center text-center gap-3'>
        <span className='text-brand-primary-color-1/30 bg-clip-text bg-[linear-gradient(293deg,var(--tw-gradient-stops))] from-brand-primary-color-1 to-brand-primary-color-light leading-none font-normal font-oxanium capitalize'>
          price
        </span>
        <span className='font-oxanium font-semibold leading-normal'>
          <CurrencySymbol className='inline-flex justify-center w-3' />
          <Money value={payload?.selected?.price || 0} />
        </span>
      </p>
      <div className='flex flex-grow w-full justify-end'>
        <button
          type='button'
          onClick={handleRemoveFromCart}
          className='inline-flex items-end gap-1 font-tti-medium font-medium text-brand-black-30 hover:text-white transition-colors outline-none leading-none'
        >
          <TrashIcon /> <span className=''>Remove</span>
        </button>
      </div>
    </div>
  );

  if (itemType === OFFER_TYPE.REGULAR) {
    const {
      selected: { region },
    } = payload;
    const { offerType, name, image, approximateOrderCompletionInMinutes, sellerId } =
      payload.offerId as unknown as OfferDataDb;
    const { userName } = sellerId as unknown as Record<string, string>;
    CART_ITEM = (
      <div className='relative isolate flex flex-col p-2 xl:p-3 gap-1 xl:gap-2 z-0 border rounded border-black bg-fading-theme-gradient-top-to-bottom text-[clamp(.75rem,3vw,.875rem)]'>
        <div className='flex justify-between items-center gap-1 xl:gap-3'>
          <figure className='max-w-[100px] flex-shrink-0'>
            <picture className=''>
              <source media='(min-width: 150px)' srcSet={`${image} 147w`} />
              <img
                src={image}
                alt='description'
                className='object-contain w-[9.1875rem] h-[4.5rem]'
                loading='lazy'
                width='147'
                height='72'
                decoding='async'
              />
            </picture>
          </figure>
          <h3 className='leading-tight text-[clamp(.75rem,3vw,1.125rem)] font-normal font-zen-dots text-white flex-grow'>
            <span className='first-letter:capitalize inline-block'>{name}</span> -{' '}
            <span className='uppercase'>{region}</span>
          </h3>
        </div>
        <div className='flex flex-nowrap justify-between items-start gap-2 xl:gap-4'>
          <div className='font-tti-regular leading-normal font-normal flex-shrink-0 flex-grow'>
            <div className='text-brand-primary-color-1/30 bg-clip-text bg-[linear-gradient(293deg,var(--tw-gradient-stops))] from-brand-primary-color-1 to-brand-primary-color-light flex flex-wrap items-center gap-1'>
              <span className='first-letter:capitalize'>
                {offerType.replace(OFFER_TYPE.REGULAR, 'offer')}
              </span>
              <SeparatorBullet />
              <span className='uppercase'>{region}</span>
              {/* <SeparatorBullet /> */}
              {/* <span className="">Horde</span> */}
              {/* <SeparatorBullet /> */}
              {/* <span className="">Kazzak</span> */}
            </div>
            <p className='flex flex-wrap items-center gap-1'>
              <span className='text-brand-primary-color-1/30 bg-clip-text bg-[linear-gradient(293deg,var(--tw-gradient-stops))]  from-brand-primary-color-1 to-brand-primary-color-light'>
                Sold by:
              </span>{' '}
              {userName}
            </p>
            <p className='flex flex-wrap items-center gap-1'>
              <span className='text-brand-primary-color-1/30 bg-clip-text bg-[linear-gradient(293deg,var(--tw-gradient-stops))]  from-brand-primary-color-1 to-brand-primary-color-light'>
                Delivery time:
              </span>{' '}
              {approximateOrderCompletionInMinutes} minutes
            </p>
            {/* <p className="flex flex-wrap items-center gap-1">
              <span className="text-brand-primary-color-1/30 bg-clip-text bg-[linear-gradient(293deg,var(--tw-gradient-stops))]  from-brand-primary-color-1 to-brand-primary-color-light">
                Quantity:
              </span>{' '}
              300,000
            </p> */}
          </div>
          {commonActionsMarkup}
        </div>
      </div>
    );
  }

  if (itemType === OFFER_TYPE.CURRENCY) {
    const {
      offerName,
      offerImage,
      // eslint-disable-next-line prettier/prettier
      selected: { region, amount },
    } = payload;
    const { approximateOrderCompletionInMinutes, sellerId } =
      payload.offerId as unknown as OfferDataDb;
    const { userName } = sellerId as unknown as Record<string, string>;
    CART_ITEM = (
      <div className='relative isolate flex flex-col p-2 xl:p-3 gap-1 xl:gap-2 z-0 border rounded border-black bg-fading-theme-gradient-top-to-bottom text-[clamp(.75rem,3vw,.875rem)]'>
        <div className='flex justify-between items-center gap-1 xl:gap-3'>
          <figure className='max-w-[100px] flex-shrink-0'>
            <picture className=''>
              <source media='(min-width: 150px)' srcSet={`${offerImage} 147w`} />
              <img
                src={offerImage}
                alt='description'
                className='object-contain w-[9.1875rem] h-[4.5rem]'
                loading='lazy'
                width='147'
                height='72'
                decoding='async'
              />
            </picture>
          </figure>
          <h3 className='leading-tight text-[clamp(.75rem,3vw,1.125rem)] font-normal font-zen-dots text-white flex-grow'>
            {offerName}
          </h3>
        </div>
        <div className='flex flex-nowrap justify-between items-start gap-2 xl:gap-4'>
          <div className='font-tti-regular leading-normal font-normal flex-shrink-0 flex-grow'>
            <div className='text-brand-primary-color-1/30 bg-clip-text bg-[linear-gradient(293deg,var(--tw-gradient-stops))] from-brand-primary-color-1 to-brand-primary-color-light flex flex-wrap items-center gap-1'>
              <span className=''>Currency</span>
              <SeparatorBullet />
              <span className='uppercase'>{region}</span>
              {/* <SeparatorBullet />
              <span className="">Horde</span>
              <SeparatorBullet />
              <span className="">Kazzak</span> */}
            </div>
            <p className='flex flex-wrap items-center gap-1'>
              <span className='text-brand-primary-color-1/30 bg-clip-text bg-[linear-gradient(293deg,var(--tw-gradient-stops))]  from-brand-primary-color-1 to-brand-primary-color-light'>
                Sold by:
              </span>{' '}
              {userName}
            </p>
            <p className='flex flex-wrap items-center gap-1'>
              <span className='text-brand-primary-color-1/30 bg-clip-text bg-[linear-gradient(293deg,var(--tw-gradient-stops))]  from-brand-primary-color-1 to-brand-primary-color-light'>
                Delivery time:
              </span>{' '}
              {approximateOrderCompletionInMinutes} minutes
            </p>
            <p className='flex flex-wrap items-center gap-1'>
              <span className='text-brand-primary-color-1/30 bg-clip-text bg-[linear-gradient(293deg,var(--tw-gradient-stops))]  from-brand-primary-color-1 to-brand-primary-color-light'>
                Quantity:
              </span>{' '}
              {amount}
            </p>
          </div>
          {commonActionsMarkup}
        </div>
      </div>
    );
  }

  return CART_ITEM;
};
