import { NavLink, Outlet, useLocation } from 'react-router-dom';

import { latestOffersDisplayDefaultPayload } from '../../components/ui/GameUpsellDisplay';
import { GradientBordered } from '../../components/ui/GradientBordered';
import { ROUTER_PATH, RouterPath } from '../../enums/router-path';
import { lazilyLoadable } from '../../utils/lazilyLoadable';

const { GameUpsellDisplay } = lazilyLoadable(() => import('../../components/ui/GameUpsellDisplay'));

export type TabbedNavType = {
  label: string;
  path: RouterPath;
};

const PROFILE_TABS: TabbedNavType[] = [
  {
    label: 'Account info',
    path: ROUTER_PATH.ACCOUNT_INFO,
  },
  {
    label: 'General settings',
    path: ROUTER_PATH.GENERAL_SETTINGS,
  },
  {
    label: 'Transactions',
    path: ROUTER_PATH.TRANSACTIONS,
  },
  {
    label: 'Wallet',
    path: ROUTER_PATH.WALLET,
  },
];

export const Main = () => {
  const { pathname } = useLocation();

  return (
    <main className='relative isolate z-0 py-8 xl:py-14 grid gap-28'>
      <div className='fb-container'>
        <GradientBordered className='rounded-[.625rem] before:rounded-[.625rem] before:bg-gradient-bordered-light bg-brand-primary-color-1/[0.03] py-4 xl:py-8'>
          <div className='relative isolate z-0 flex justify-between items-center gap-1 xl:gap-4 px-2 lg:px-6 xl:px-12 after:absolute after:w-full after:h-px after:bottom-0 after:left-0 after:bg-gradient-bordered-light font-oxanium text-[clamp(.75rem,3vw,1rem)] leading-none font-medium'>
            {PROFILE_TABS.map((item, idx) => (
              <NavLink
                to={item.path}
                key={`profile-tab-${idx + 1}`}
                className={`${
                  pathname === ROUTER_PATH.PROFILE && item.path === ROUTER_PATH.ACCOUNT_INFO
                    ? 'active'
                    : ''
                } relative isolate z-0 outline-none py-4 text-white line-clamp-1 inline-flex justify-center text-center xl:min-w-[7rem] transition-all cursor-pointer hover:text-brand-primary-color-light select-none capitalize [&.active]:before:absolute [&.active]:before:w-full [&.active]:before:h-[2px] [&.active]:before:left-0 [&.active]:before:bottom-0 [&.active]:before:bg-brand-primary-color-1 [&.active]:before:rounded-t-lg [&.active]:text-brand-primary-color-1`}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
          <div className=''>
            <Outlet />
          </div>
        </GradientBordered>
      </div>

      {pathname === ROUTER_PATH.WALLET ? (
        <div className='fb-container'>
          <GameUpsellDisplay payload={latestOffersDisplayDefaultPayload} />
        </div>
      ) : (
        false
      )}
    </main>
  );
};
