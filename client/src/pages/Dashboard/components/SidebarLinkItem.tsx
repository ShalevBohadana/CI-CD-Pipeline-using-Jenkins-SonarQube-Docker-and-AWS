import { cloneElement } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { GradientBordered } from '../../../components/ui/GradientBordered';
import { ROUTER_PATH, RouterPath } from '../../../enums/router-path';
import { removeLastSlash } from '../../../utils';
import { twMergeClsx } from '../../../utils/twMergeClsx';

import { TopLevelLinkItemWithIcon } from './DashboardSidebar';

type Props = {
  payload: TopLevelLinkItemWithIcon;
};
export const SidebarLinkItem = ({ payload: { to, label, icon } }: Props) => {
  const { pathname } = useLocation();
  const normalizedPath = removeLastSlash(pathname.trim()) as RouterPath;
  let result: RouterPath;

  switch (normalizedPath) {
    // case ROUTER_PATH.DB_CUSTOMER:
    //   result = ROUTER_PATH.CUSTOMER_ORDER;
    //   break;
    case ROUTER_PATH.DB_PARTNER:
      result = ROUTER_PATH.PARTNER_ORDER;
      break;
    case ROUTER_PATH.DB_SUPPORT:
      result = ROUTER_PATH.SUPPORT_ORDER;
      break;
    case ROUTER_PATH.DB_ADMIN:
      result = ROUTER_PATH.ADMIN_ORDER;
      break;

    default:
      result = ROUTER_PATH.DASHBOARD;
      break;
  }

  return (
    <NavLink
      to={to}
      className={twMergeClsx(
        `w-full flex flex-wrap gap-1 items-center group ${result === to ? 'active' : ''}`
      )}
    >
      <GradientBordered className='h-auto group-[&.active]:bg-brand-primary-color-1/[.04] rounded-lg before:rounded-lg before:bg-transparent group-[&.active]:before:bg-gradient-bordered-deep hover:before:bg-gradient-bordered-light before:transition-all transition-colors px-3 xl:px-5 py-2 xl:py-4 group flex flex-wrap items-center gap-4'>
        {cloneElement(icon, {
          className: 'grayscale group-hover:grayscale-0 group-[&.active]:grayscale-0',
        })}
        <span className='first-letter:capitalize group-hover:text-brand-primary-color-light group-[&.active]:text-brand-primary-color-1 transition-colors font-tti-medium font-medium text-sm xl:text-lg leading-none text-brand-black-40'>
          {label}
        </span>
      </GradientBordered>
    </NavLink>
  );
};
