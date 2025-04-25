import { createContext, SetStateAction, useContext, useMemo, useState } from 'react';

import { ExtendHead } from '../../../../components/ExtendHead';

import { Header } from './Header';
import { Main } from './Main';

type UserManagerContextType = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
};

const UserManagerContext = createContext<UserManagerContextType | undefined>(undefined);

export const UserManager = () => {
  const [isOpen, setIsOpen] = useState(false);
  const userManagerContextValue = useMemo(() => ({ isOpen, setIsOpen }), [isOpen, setIsOpen]);
  return (
    <UserManagerContext.Provider value={userManagerContextValue}>
      <ExtendHead
        title='User Manager - Admin Dashboard'
        description='User Manager Admin dashboard'
      />
      <Header />
      <Main />
    </UserManagerContext.Provider>
  );
};

export const useUserManagerContext = () => {
  const context = useContext(UserManagerContext);
  if (!context) {
    throw new Error('useUserManagerContext must be used within admin dashboard UserManager');
  }
  return context;
};
