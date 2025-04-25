import { createContext, SetStateAction, useContext, useMemo, useState } from 'react';

import { ExtendHead } from '../../../../components/ExtendHead';

import { Header } from './Header';
import { Main } from './Main';

type PromosContextType = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
};

const PromosContext = createContext<PromosContextType | undefined>(undefined);

export const AdminPromos = () => {
  const [isOpen, setIsOpen] = useState(false);
  const promosContextValue = useMemo(() => ({ isOpen, setIsOpen }), [isOpen, setIsOpen]);
  return (
    <PromosContext.Provider value={promosContextValue}>
      <ExtendHead title='Promos - Admin Dashboard' description='Promos Admin dashboard' />
      <Header />
      <Main />
    </PromosContext.Provider>
  );
};

export const usePromosContext = () => {
  const context = useContext(PromosContext);
  if (!context) {
    throw new Error('usePromosContext must be used within admin dashboard Promos');
  }
  return context;
};
