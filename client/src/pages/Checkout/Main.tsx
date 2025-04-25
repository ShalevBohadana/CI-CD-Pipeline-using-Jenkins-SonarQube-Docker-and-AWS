import { NavLink, Outlet, useLocation } from 'react-router-dom';

import { ROUTER_PATH } from '../../enums/router-path';
import { twMergeClsx } from '../../utils/twMergeClsx';
import { TabbedNavType } from '../Profile/Main';

import { CheckoutSummary } from './components/CheckoutSummary';

const CHECKOUT_TABS: TabbedNavType[] = [
  {
    label: 'Payment method',
    path: ROUTER_PATH.CHECKOUT_METHOD,
  },
  {
    label: 'Review',
    path: ROUTER_PATH.CHECKOUT_REVIEW,
  },
  {
    label: 'Completed',
    path: ROUTER_PATH.CHECKOUT_SUCCESS,
  },
  // {
  //   label: 'Cancel',
  //   path: ROUTER_PATH.CHECKOUT_CANCEL,
  // },
];
export const Main = () => {
  const { pathname } = useLocation();

  return (
    <main className='pb-20 xl:pb-32'>
      <div className='fb-container'>
        <div className='relative isolate z-0 flex justify-around items-center gap-2 font-oxanium text-base xl:text-2xl leading-none font-medium'>
          {CHECKOUT_TABS?.map((item, idx) => (
            <NavLink
              to={item.path}
              key={`checkout-tab-${idx + 1}`}
              className='relative isolate z-0 outline-none py-1 line-clamp-1 inline-flex justify-center text-center xl:min-w-[7rem] text-white aria-selected:text-brand-primary-color-1 aria-selected:underline aria-selected:underline-offset-[.375rem] xl:aria-selected:underline-offset-8 transition-all cursor-pointer hover:text-brand-primary-color-light select-none capitalize [&.active]:text-brand-primary-color-1'
            >
              {item.label}
            </NavLink>
          ))}
        </div>
        <hr className='border-none h-px w-full bg-brand-primary-color-1/30 flex-grow xl:-mt-1' />
        <div
          className={twMergeClsx(`pt-5 xl:pt-10 grid gap-6 xl:gap-8 items-center ${
            pathname !== ROUTER_PATH.CHECKOUT_SUCCESS ? 'lg:grid-cols-2' : ''
          } 
          `)}
        >
          <div className=''>
            <Outlet />
          </div>
          {pathname !== ROUTER_PATH.CHECKOUT_SUCCESS ? <CheckoutSummary /> : null}
        </div>
      </div>
    </main>
  );
};
