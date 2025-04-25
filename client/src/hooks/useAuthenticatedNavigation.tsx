import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROLE, Role } from '../enums/role';
import { ROUTER_PATH } from '../enums/router-path';
import { useAppSelector } from '../redux/hooks';

export const useAuthenticatedNavigation = () => {
  const { token } = useAppSelector((state) => state.auth);
  const auth = useAppSelector((state) => state.auth);
  const roles = auth?.user?.roles || [ROLE.VISITOR];  const navigate = useNavigate();
  const { state } = useLocation();
  const from = state?.pathname || ROUTER_PATH.ROOT;
  const stateRoles = state?.roles as Role[] | undefined;

  useEffect(() => {
    // אם אין token או אין stateRoles, אין צורך להמשיך
    if (!token || !stateRoles?.length) {
      return;
    }

    // בדיקה שיש לפחות תפקיד אחד משותף
    const hasMatchingRole = roles.some((role) => stateRoles?.includes(role));

    if (hasMatchingRole) {
      navigate(from, { replace: true });
    }
  }, [token, stateRoles, roles, from, navigate]);
};
