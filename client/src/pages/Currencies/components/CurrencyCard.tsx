import { Link } from 'react-router-dom';

import { GradientBordered } from '../../../components/ui/GradientBordered';
import { ROUTE_PARAM, ROUTER_PATH } from '../../../enums/router-path';
import { GameCurrency } from '..';

type Props = {
  payload: GameCurrency;
};

export const CurrencyCard = ({ payload }: Props) => {
  const { uid, name, description, servers } = payload;

  return (
    <Link
      to={ROUTER_PATH.CURRENCIES_SINGLE.replace(ROUTE_PARAM.UID, uid)}
      className='max-w-xs sm:w-[calc(50%-var(--gap))] lg:w-[calc(33.33%-var(--gap))] relative isolate z-0 rounded-[.625rem] bg-[linear-gradient(137deg,rgba(250,167,64,0.20)_0%,rgba(255,255,255,0)_47.40%,rgba(241,104,52,0.20)_100%)] overflow-clip group'
    >
      <GradientBordered className='rounded-[.625rem] before:rounded-[.625rem] before:bg-gradient-bordered-deep p-4 grid gap-4'>
        <h3 className='font-semibold self-start font-tti-demi-bold text-[clamp(1rem,3vw,1.5rem)] leading-none capitalize text-brand-primary-color-1/30 bg-clip-text bg-[linear-gradient(293deg,var(--tw-gradient-stops))] from-brand-primary-color-1 to-brand-primary-color-light group-hover:text-brand-primary-color-light transition-colors line-clamp-1'>
          <span className=''>Currency:</span> <span className=''>{name}</span>
        </h3>
        <div className='flex flex-col gap-2'>
          <p className='line-clamp-1'>{description}</p>
          <p className='flex flex-wrap gap-3 line-clamp-1'>
            <span className=''>Servers:</span> {servers?.map((server) => server.name).toString()}
          </p>
        </div>
        <p className=''>
          <span className='bg-clip-text text-brand-yellow-550/10 inline-flex justify-center items-center capitalize gap-1 bg-[linear-gradient(135deg,var(--tw-gradient-stops))] to-brand-primary-color-1 from-brand-yellow-550 hover:underline hover:underline-offset-4'>
            Currency details {'>'}
          </span>
        </p>
      </GradientBordered>
    </Link>
  );
};
