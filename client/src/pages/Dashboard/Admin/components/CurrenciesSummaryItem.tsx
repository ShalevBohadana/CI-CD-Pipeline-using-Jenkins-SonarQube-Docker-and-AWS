import { Link } from 'react-router-dom';

import { GradientBordered } from '../../../../components/ui/GradientBordered';
import { ROUTE_PARAM, ROUTER_PATH } from '../../../../enums/router-path';
import { OfferCurrencyDataDb } from '../../../CreateGameCurrency';

type Props = {
  payload: OfferCurrencyDataDb;
};

export const CurrenciesSummaryItem = ({ payload }: Props) => {
  // const { isOpen, setIsOpen, setOrderSummary } = usePartnerClaimContext();
  const { _id, uid, name } = payload;

  return (
    <GradientBordered className='rounded-[1.25rem] before:rounded-[1.25rem] before:transition-all before:bg-gradient-bordered-light p-4 xl:p-8 bg-multi-gradient-1 overflow-visible grid grid-cols-1 gap-8'>
      {/* details  */}
      <div className=''>
        <div className='flex flex-wrap justify-between gap-4'>
          <div className='flex flex-col gap-3'>
            {/* <h2 className="first-letter:uppercase font-bold font-tti-bold text-[clamp(1.35rem,4vw,2rem)] leading-none">
              {extendedTitle}{' '}
              <span className="capitalize text-brand-primary-color-1">
                {title}
              </span>
            </h2> */}
            <h3 className='first-letter:uppercase font-semibold font-tti-demi-bold text-[clamp(1.05rem,2vw,1.5rem)] leading-none'>
              <span className=''>currency name :</span>{' '}
              <span className='text-brand-primary-color-1 capitalize'>{name}</span>
            </h3>
            <p className='font-oxanium text-lg leading-none font-normal text-brand-primary-color-light'>
              Date created:
            </p>
            <p className='font-oxanium text-lg leading-none font-normal text-brand-primary-color-1'>
              ID #{_id}
            </p>
          </div>
          <GradientBordered className='rounded-[.25rem] before:rounded-[.25rem] before:transition-all before:bg-gradient-bordered-light overflow-clip inline-flex w-auto h-auto self-start'>
            <Link
              to={ROUTER_PATH.GAME_CURRENCIES_EDIT.replace(ROUTE_PARAM.UID, uid)}
              className='flex items-center justify-center text-center text-sm xl:text-base leading-none xl:leading-none font-normal font-tti-regular bg-brand-primary-color-1/[.03] text-brand-black-10 hover:bg-brand-primary-color-light hover:text-brand-primary-color-1 transition-colors px-4 py-2.5 xl:px-5 xl:py-4 rounded-[.25rem] capitalize'
            >
              edit
            </Link>
          </GradientBordered>
        </div>
      </div>
    </GradientBordered>
  );
};
