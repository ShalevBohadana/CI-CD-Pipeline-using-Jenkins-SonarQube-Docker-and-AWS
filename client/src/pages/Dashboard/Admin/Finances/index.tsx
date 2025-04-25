import React from 'react';
import { createContext, SetStateAction, useContext, useMemo, useState } from 'react';

import { ExtendHead } from '../../../../components/ExtendHead';
import { AdminFinancesSummaryProps } from '../components/AdminFinancesSummaryItem';

import { Main } from './Main';

type AdminFinancesContextType = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  adminFinancesSummary?: AdminFinancesSummaryProps;
  setAdminFinancesSummary: React.Dispatch<SetStateAction<AdminFinancesSummaryProps | undefined>>;
};

const AdminFinancesContext = createContext<AdminFinancesContextType | undefined>(undefined);

export const AdminFinances = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [adminFinancesSummary, setAdminFinancesSummary] = useState<AdminFinancesSummaryProps>();

  const adminFinancesContextValue = useMemo(
    () => ({
      isOpen,
      setIsOpen,
      adminFinancesSummary,
      setAdminFinancesSummary,
    }),
    [isOpen, setIsOpen, adminFinancesSummary, setAdminFinancesSummary]
  );
  return (
    <AdminFinancesContext.Provider value={adminFinancesContextValue}>
      <ExtendHead title='Finances - Admin Dashboard' description='Finances Admin dashboard' />
      {/* <Header /> */}
      <Main />
    </AdminFinancesContext.Provider>
  );
};

export const useAdminFinancesContext = () => {
  const context = useContext(AdminFinancesContext);
  if (!context) {
    throw new Error('useAdminFinancesContext must be used within AdminFinances');
  }
  return context;
};
