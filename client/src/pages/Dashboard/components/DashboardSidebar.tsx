import React from 'react';
import { LuLogOut } from 'react-icons/lu';
import {
  ClaimIcon,
  CurrenciesIcon,
  CurrencyOffersIcon,
  EmployeesIcon,
  FinancesIcon,
  GamesIcon,
  IncomingOrdersIcon,
  OffersIcon,
  OrderIcon,
  PartnerManagerIcon,
  PartnersIcon,
  PromosIcon,
  ReviewsIcon,
  TicketsIcon,
  UserManagerIcon,
  WorkWithUsIcon,
} from '../../../components/icons/icons';
import { ExcludedVisitorRole, ROLE } from '../../../enums/role';
import { ROUTER_PATH } from '../../../enums/router-path';
import { useUserLogoutMutation } from '../../../redux/features/auth/authApi';
import { useAppSelector } from '../../../redux/hooks';
import { Pretty } from '../../../types/globalTypes';
import { TopLevelLinkItem } from '../../shared/Footer';
import { Link } from 'react-router-dom';

export type TopLevelLinkItemWithIcon = Pretty<
  {
    icon: JSX.Element;
  } & TopLevelLinkItem
>;

// Link configurations for different roles
export const PARTNER_LINKS: Readonly<TopLevelLinkItemWithIcon[]> = [
  {
    to: ROUTER_PATH.PARTNER_ORDER,
    label: 'My Orders',
    icon: <OrderIcon />,
  },
  {
    to: ROUTER_PATH.PARTNER_CLAIM,
    label: 'Claim',
    icon: <ClaimIcon />,
  },
];

export const CURRENCY_SUPPLIER_LINKS: Readonly<TopLevelLinkItemWithIcon[]> = [
  ...PARTNER_LINKS,
  {
    to: ROUTER_PATH.PARTNER_SUPPLIER_CURRENCY_OFFERS,
    label: 'Currency Offers',
    icon: <CurrencyOffersIcon />,
  },
];

export const SUPPORT_LINKS: Readonly<TopLevelLinkItemWithIcon[]> = [
  {
    to: ROUTER_PATH.SUPPORT_ORDER,
    label: 'Orders',
    icon: <OrderIcon />,
  },
  {
    to: ROUTER_PATH.SUPPORT_TICKETS,
    label: 'Tickets',
    icon: <TicketsIcon />,
  },
  {
    to: ROUTER_PATH.SUPPORT_INCOMING_ORDERS,
    label: 'Incoming Orders',
    icon: <IncomingOrdersIcon />,
  },
];

export const ADMIN_LINKS: Readonly<TopLevelLinkItemWithIcon[]> = [
  {
    to: ROUTER_PATH.ADMIN_ORDER,
    label: 'Orders',
    icon: <OrderIcon />,
  },
  {
    to: ROUTER_PATH.ADMIN_WORK_WITH_US,
    label: 'Work with us',
    icon: <WorkWithUsIcon />,
  },
  {
    to: ROUTER_PATH.ADMIN_EMPLOYEES,
    label: 'Employees',
    icon: <EmployeesIcon />,
  },
  {
    to: ROUTER_PATH.ADMIN_PARTNERS,
    label: 'Partners',
    icon: <PartnersIcon />,
  },
  {
    to: ROUTER_PATH.ADMIN_INCOMING_ORDERS,
    label: 'Incoming orders',
    icon: <IncomingOrdersIcon />,
  },
  {
    to: ROUTER_PATH.ADMIN_USER_MANAGER,
    label: 'User Manager',
    icon: <UserManagerIcon />,
  },
  {
    to: ROUTER_PATH.ADMIN_PARTNER_MANAGER,
    label: 'Partner Manager',
    icon: <PartnerManagerIcon />,
  },
  {
    to: ROUTER_PATH.ADMIN_REVIEWS,
    label: 'Reviews',
    icon: <ReviewsIcon />,
  },
  {
    to: ROUTER_PATH.ADMIN_TICKETS,
    label: 'Tickets',
    icon: <TicketsIcon />,
  },
  {
    to: ROUTER_PATH.ADMIN_FINANCES,
    label: 'Finances',
    icon: <FinancesIcon />,
  },
  {
    to: ROUTER_PATH.ADMIN_OFFERS,
    label: 'Offers',
    icon: <OffersIcon />,
  },
  {
    to: ROUTER_PATH.ADMIN_PROMOS,
    label: 'Promos',
    icon: <PromosIcon />,
  },
  {
    to: ROUTER_PATH.ADMIN_GAMES,
    label: 'Games',
    icon: <GamesIcon />,
  },
  {
    to: ROUTER_PATH.ADMIN_CURRENCIES,
    label: 'Currencies',
    icon: <CurrenciesIcon />,
  },
];

const ROLE_LINKS_MAP: Partial<Record<ExcludedVisitorRole, Readonly<TopLevelLinkItemWithIcon[]>>> = {
  [ROLE.PARTNER]: PARTNER_LINKS,
  [ROLE.CURRENCY_SUPPLIER]: CURRENCY_SUPPLIER_LINKS,
  [ROLE.SUPPORT]: SUPPORT_LINKS,
  [ROLE.ADMIN]: ADMIN_LINKS,
  [ROLE.OWNER]: ADMIN_LINKS, // Owner has same access as admin
};

interface SidebarLinkItemProps {
  payload: TopLevelLinkItemWithIcon;
}

const SidebarLinkItem: React.FC<SidebarLinkItemProps> = ({ payload }) => {
  const { to, label, icon } = payload;

  return (
    <Link
      to={to}
      className='flex items-center gap-4 px-3 xl:px-5 py-2 xl:py-4 rounded-lg
                 bg-brand-primary-color-1/[.04] hover:bg-brand-primary-color-1/10 
                 transition-colors group w-full'
    >
      <span className='w-6 h-6 group-hover:text-brand-primary-color-1 transition-colors'>
        {icon}
      </span>
      <span
        className='font-tti-medium font-medium text-sm xl:text-lg leading-none 
                     text-brand-primary-color-light group-hover:text-brand-primary-color-1 
                     transition-colors'
      >
        {label}
      </span>
    </Link>
  );
};


export const DashboardSidebar = () => {
  // Updated to access user property instead of data
  const authState = useAppSelector((state) => state.auth);
  const user = authState?.user || { roles: [ROLE.VISITOR] };
  const roles = user.roles || [ROLE.VISITOR];
  
  const [userLogout] = useUserLogoutMutation();

  // Get unique links for all user roles and flatten them
  const roleLinks = roles
    .map((role) => ROLE_LINKS_MAP[role as ExcludedVisitorRole])
    .filter(Boolean)
    .flatMap((links) => links)
    .reduce((unique, link) => {
      if (link) {
        const exists = unique.some((item) => item.to === link.to);
        if (!exists) {
          unique.push(link);
        }
      }
      return unique;
    }, [] as TopLevelLinkItemWithIcon[]);

  return (
    <div className='flex flex-col h-[inherit] overflow-auto minimal-scrollbar p-4 gap-4'>
      {roleLinks.map((link) => (
        <SidebarLinkItem key={link.to} payload={link} />
      ))}

      <button
        type='button'
        className='mt-auto w-full flex flex-wrap items-center gap-4 px-3 xl:px-5 py-2 xl:py-4 
                 transition-colors'
        onClick={() => userLogout({})}
      >
        <LuLogOut className='w-6 h-6 group-hover:text-brand-primary-color-1 transition-colors' />
        <span
          className='first-letter:capitalize group-hover:text-brand-primary-color-1 
                     transition-colors font-tti-medium font-medium text-sm xl:text-lg 
                     leading-none text-brand-primary-color-light'
        >
          logout
        </span>
      </button>
    </div>
  );
};

export default DashboardSidebar;