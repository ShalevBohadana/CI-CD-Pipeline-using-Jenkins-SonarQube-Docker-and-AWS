import React from 'react';
import { createContext, SetStateAction, useContext, useMemo, useState } from 'react';

import { ExtendHead } from '../../../../components/ExtendHead';

import { Header } from './Header';
import { Main } from './Main';

type OffersContextType = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
};

const OffersContext = createContext<OffersContextType | undefined>(undefined);

export const Offers = () => {
  const [isOpen, setIsOpen] = useState(false);
  const offersContextValue = useMemo(() => ({ isOpen, setIsOpen }), [isOpen, setIsOpen]);
  return (
    <OffersContext.Provider value={offersContextValue}>
      <ExtendHead title='Offers - Admin Dashboard' description='Offers Admin dashboard' />
      <Header />
      <Main />
    </OffersContext.Provider>
  );
};

export const useOffersContext = () => {
  const context = useContext(OffersContext);
  if (!context) {
    throw new Error('useOffersContext must be used within admin dashboard Offers');
  }
  return context;
};
