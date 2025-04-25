import { createContext, Dispatch, SetStateAction, useContext, useMemo, useState } from 'react';
import { BiPlus } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { v4 } from 'uuid';

import { ExtendHead } from '../../../../components/ExtendHead';
import { ROUTER_PATH } from '../../../../enums/router-path';
import {
  CurrencyOfferSummaryItem,
  GameCurrencyOffer,
} from '../components/CurrencyOfferSummaryItem';

// import { OrderSummaryModal } from './OrderSummaryModal';
export const CURRENCY_OFFERS_DATA: GameCurrencyOffer[] = [
  {
    id: '11d5c4c62973',
    currencyUid: 'gold',
    status: 'activate',
  },
];

type PartnerCurrencyOffersContextType = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  currencyOfferSummary?: GameCurrencyOffer;
  setCurrencyOfferSummary: Dispatch<SetStateAction<GameCurrencyOffer | undefined>>;
};
const PartnerCurrencyOffersContext = createContext<PartnerCurrencyOffersContextType | undefined>(
  undefined
);

export const PartnerCurrencyOffers = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currencyOfferSummary, setCurrencyOfferSummary] = useState<GameCurrencyOffer>();
  const partnerCurrencyOffersContextValue = useMemo(
    () => ({
      isOpen,
      setIsOpen,
      currencyOfferSummary,
      setCurrencyOfferSummary,
    }),
    [isOpen, currencyOfferSummary, setCurrencyOfferSummary, setIsOpen]
  );
  return (
    <PartnerCurrencyOffersContext.Provider value={partnerCurrencyOffersContextValue}>
      <main className='flex flex-col gap-8 overflow-auto minimal-scrollbar min-h-[theme(height.40)]'>
        <ExtendHead
          title='Currency Offers - Partner Dashboard'
          description='Currency Offers Partner dashboard'
        />
        <div className='relative isolate overflow-clip z-0 flex flex-wrap gap-5 justify-center xl:justify-between'>
          {/* title */}
          <h2 className='capitalize font-semibold font-tti-demi-bold text-[clamp(1.35rem,4vw,2rem)] leading-tight'>
            <span className='text-brand-primary-color-1/30 bg-clip-text bg-[linear-gradient(293deg,var(--tw-gradient-stops))] from-brand-primary-color-1 to-brand-primary-color-light animate-text-gradient'>
              Currency Offers
            </span>
          </h2>

          <Link
            to={ROUTER_PATH.GAME_CURRENCIES_OFFER_CREATE}
            className='w-auto h-auto inline-flex items-center gap-2 font-tti-medium font-medium text-base leading-none text-white bg-brand-primary-color-1 hover:bg-brand-primary-color-light hover:text-brand-primary-color-1 transition-colors rounded-[.25rem] px-4 xl:px-6 py-1.5 xl:py-2.5'
          >
            <BiPlus className='' />
            <span className='inline-block first-letter:uppercase'>create currency offer</span>
          </Link>
        </div>

        <div className='h-[inherit] grid gap-y-4 overflow-auto minimal-scrollbar'>
          {CURRENCY_OFFERS_DATA?.map((item) => (
            <CurrencyOfferSummaryItem key={v4()} payload={item} />
          ))}
        </div>

        {/* <OrderSummaryModal /> */}
      </main>
    </PartnerCurrencyOffersContext.Provider>
  );
};

export const usePartnerCurrencyOffersContext = () => {
  const context = useContext(PartnerCurrencyOffersContext);
  if (!context) {
    throw new Error(
      'usePartnerCurrencyOffersContext must be used within a PartnerCurrencyOffersContextProvider'
    );
  }
  return context;
};
