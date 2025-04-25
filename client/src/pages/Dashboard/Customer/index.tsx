import { Outlet } from 'react-router-dom';

import { ROLE } from '../../../enums/role';
import { useAppSelector } from '../../../redux/hooks';

export const Customer = () => {
  const auth = useAppSelector((state) => state.auth);
  const roles = auth?.user?.roles || [ROLE.VISITOR];  return (
    <main>
      <h1 className=''>roles: {roles.toString()} </h1>
      <h2>Customer page</h2>
      <Outlet />
    </main>
  );
};
