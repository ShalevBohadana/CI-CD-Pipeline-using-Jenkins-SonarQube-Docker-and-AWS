import React from 'react';
import { createContext, SetStateAction, useContext, useMemo, useState } from 'react';

import { ExtendHead } from '../../../../components/ExtendHead';

import { Header } from './Header';
import { Main } from './Main';

type PartnersContextType = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
};

const PartnersContext = createContext<PartnersContextType | undefined>(undefined);

export const Partners = () => {
  const [isOpen, setIsOpen] = useState(false);
  const partnersContextValue = useMemo(() => ({ isOpen, setIsOpen }), [isOpen, setIsOpen]);
  return (
    <PartnersContext.Provider value={partnersContextValue}>
      <ExtendHead title='Partners - Admin Dashboard' description='Partners Admin dashboard' />
      <Header />
      <Main />
    </PartnersContext.Provider>
  );
};

export const usePartnersContext = () => {
  const context = useContext(PartnersContext);
  if (!context) {
    throw new Error('usePartnersContext must be used within admin dashboard Partners');
  }
  return context;
};
