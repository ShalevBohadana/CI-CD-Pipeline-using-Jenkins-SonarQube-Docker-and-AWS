import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import { ROUTE_PARAM, ROUTER_PATH } from '../../enums/router-path';
import {
  CreateOfferCommonSchema,
  OFFER_DISCOUNT_TYPE,
  OFFER_TYPE,
} from '../../pages/CreateOffer/Main';
import { getComputedPrice } from '../../pages/OffersSingle/Main';

import { CurrencySymbol } from './CurrencySymbol';
import { Money } from './Money';
import { OfferLabel } from './OfferLabel';

export type IOfferCardProps = {
  payload: CreateOfferCommonSchema;
};

export const OfferCard = (props: IOfferCardProps) => {
  const {
    gameUid,

    uid,
    image,
    featuredList,
    offerType,
    name,
    basePrice,
    discount,

    offerPromo,
  } = props.payload;

  return (
    <motion.div
      layout
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <Link
        to={
          offerType === OFFER_TYPE.REGULAR
            ? ROUTER_PATH.OFFERS_SINGLE.replace(ROUTE_PARAM.UID, gameUid).replace(
                ROUTE_PARAM.UID,
                uid
              )
            : ROUTER_PATH.CURRENCIES_SINGLE.replace(ROUTE_PARAM.UID, uid)
        }
        className='p-4 max-w-sm w-full mx-auto flex flex-col gap-4 bg-brand-primary-color-1/[0.05] rounded-lg group select-none'
      >
        <div className='grid relative isolate z-0 top-left-sharp-cut rounded-md overflow-hidden pb-2 rounded-b-xl after:absolute after:-z-10 after:w-full after:mx-auto after:h-3 after:bottom-0 after:left-0 after:bg-brand-primary-color-1 group-hover:after:bg-transparent after:transition-colors'>
          <figure className='row-span-full col-span-full'>
            <picture className=''>
              <source media='(min-width: 350px)' srcSet={`${image} 290w`} />
              <img
                src={image}
                alt='description'
                className='rounded-b-md w-full h-[18.75rem] object-cover object-center group-hover:scale-110 group-hover:rounded-none transition-transform select-none'
                loading='lazy'
                width='290'
                height='300'
                decoding='async'
                draggable={false}
                fetchPriority='low'
              />
            </picture>
          </figure>
          {offerPromo ? (
            <OfferLabel className='row-span-full col-span-full justify-self-end mt-4 mr-4'>
              {offerPromo}
            </OfferLabel>
          ) : null}
        </div>
        <div className='overflow-hidden rounded-lg bg-[linear-gradient(180deg,theme("colors.brand.primary.color-1"/0.08)_0%,theme("colors.brand.primary.color-1"/0)_100%)] '>
          <div className='flex flex-col gap-4 px-4 py-3 border-x border-x-brand-primary-color-1'>
            <h2 className='font-tti-demi-bold font-semibold text-lg leading-none group-hover:text-brand-primary-color-1 transition-colors'>
              {name}
            </h2>
            <ul className='flex flex-col gap-2'>
              {featuredList?.map((point, idx) => (
                <li key={`point-${idx + 1}`} className='flex gap-2 items-center justify-start'>
                  <svg
                    className='w-[.375rem] h-[.375rem] shrink-0'
                    viewBox='0 0 6 6'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <rect
                      x='2.82843'
                      y='0.171631'
                      width='4'
                      height='4'
                      transform='rotate(45 2.82843 0.171631)'
                      className='fill-brand-primary-color-1'
                    />
                  </svg>
                  <span className='line-clamp-1 font-oxanium text-brand-black-20 text-xs leading-none font-normal'>
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className='px-4 pt-3 flex flex-col gap-1'>
            <p className='text-brand-black-30 font-oxanium font-medium text-xs leading-none'>
              From
            </p>
            <p className='flex flex-wrap gap-1 items-center'>
              <span className='font-oxanium text-base leading-none font-semibold text-brand-primary-color-1'>
                <CurrencySymbol />
                <Money value={getComputedPrice(basePrice, discount)} />
              </span>

              {discount ? (
                <span className='line-through font-oxanium text-xs leading-none font-semibold text-brand-primary-color-light'>
                  <CurrencySymbol />
                  <Money value={basePrice} />
                  {discount?.type === OFFER_DISCOUNT_TYPE.PERCENT ? '%' : null}
                </span>
              ) : null}
            </p>
          </div>
        </div>
        <hr className='border-0 h-px w-full bg-fading-theme-gradient-25 ' />
      </Link>
    </motion.div>
  );
};
