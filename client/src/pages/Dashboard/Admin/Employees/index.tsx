import React from 'react';
import { createContext, SetStateAction, useContext, useMemo, useState } from 'react';

import { ExtendHead } from '../../../../components/ExtendHead';

import { Header } from './Header';
import { Main } from './Main';

type EmployeesContextType = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
};

const EmployeesContext = createContext<EmployeesContextType | undefined>(undefined);

export const Employees = () => {
  const [isOpen, setIsOpen] = useState(false);
  const employeesContextValue = useMemo(() => ({ isOpen, setIsOpen }), [isOpen, setIsOpen]);
  const [status, setStatus] = useState<string>('online');
  return (
    <EmployeesContext.Provider value={employeesContextValue}>
      <ExtendHead title='Employees - Admin Dashboard' description='Employees Admin dashboard' />
      <Header setStatus={setStatus} />
      <Main online={status} />
    </EmployeesContext.Provider>
  );
};

export const useEmployeesContext = () => {
  const context = useContext(EmployeesContext);
  if (!context) {
    throw new Error('useEmployeesContext must be used within admin dashboard Employees');
  }
  return context;
};
