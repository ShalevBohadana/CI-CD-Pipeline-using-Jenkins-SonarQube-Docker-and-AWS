import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { ROLE } from '../enums/role';
import { ROUTER_PATH, RouterPath } from '../enums/router-path';
import { useAppSelector } from '../redux/hooks';
import { removeLastSlash } from '../utils';

/**
 * The `useDefaultDashboardRedirect` function is a custom hook that redirects the user to a specific
 * page based on their role when they access the default dashboard route.
 */
export const useDefaultDashboardRedirect = () => {
  const auth = useAppSelector((state) => state.auth);
  const roles = auth?.user?.roles || [ROLE.VISITOR];
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const normalizedPath = removeLastSlash(pathname.trim()) as RouterPath;

  useEffect(() => {
    if (normalizedPath === ROUTER_PATH.DASHBOARD) {
      roles.forEach((role) => {
        switch (role) {
          // case ROLES.CUSTOMER:
          //   navigate(ROUTER_PATH.DB_CUSTOMER);
          //   break;
          case ROLE.SUPPORT:
            navigate(ROUTER_PATH.DB_SUPPORT);
            break;
          case ROLE.PARTNER:
          case ROLE.BOOSTER:
          case ROLE.CURRENCY_SELLER:
          case ROLE.CURRENCY_SUPPLIER:
            navigate(ROUTER_PATH.DB_PARTNER);
            break;
          case ROLE.ADMIN:
            navigate(ROUTER_PATH.DB_ADMIN);
            break;

          default:
            navigate(ROUTER_PATH.UNAUTHORIZED);
            break;
        }
      });
    }
  }, [normalizedPath, roles, navigate]);
};
