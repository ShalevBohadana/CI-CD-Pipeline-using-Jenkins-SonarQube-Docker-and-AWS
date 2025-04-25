import React from 'react';
import { createContext, SetStateAction, useContext, useMemo, useState } from 'react';

import { ExtendHead } from '../../../../components/ExtendHead';

import { Header } from './Header';
import { Main } from './Main';

type AdminCurrenciesContextType = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
};

const AdminCurrenciesContext = createContext<AdminCurrenciesContextType | undefined>(undefined);

export const AdminCurrencies = () => {
  const [isOpen, setIsOpen] = useState(false);
  const AdminCurrenciesContextValue = useMemo(() => ({ isOpen, setIsOpen }), [isOpen, setIsOpen]);
  return (
    <AdminCurrenciesContext.Provider value={AdminCurrenciesContextValue}>
      <ExtendHead title='Currencies - Admin Dashboard' description='Currencies Admin dashboard' />
      <Header />
      <Main />
    </AdminCurrenciesContext.Provider>
  );
};

export const useAdminCurrenciesContext = () => {
  const context = useContext(AdminCurrenciesContext);
  if (!context) {
    throw new Error(
      'useAdminCurrenciesContext must be used within admin dashboard AdminCurrencies'
    );
  }
  return context;
};
