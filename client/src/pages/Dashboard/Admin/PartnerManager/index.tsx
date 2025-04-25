import { createContext, Dispatch, SetStateAction, useContext, useMemo, useState } from 'react';

import { ExtendHead } from '../../../../components/ExtendHead';

import { Header } from './Header';
import { Main } from './Main';

type PartnerManagerContextType = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const PartnerManagerContext = createContext<PartnerManagerContextType | undefined>(undefined);

export const PartnerManager = () => {
  const [isOpen, setIsOpen] = useState(false);
  const partnerManagerContextValue = useMemo(() => ({ isOpen, setIsOpen }), [isOpen, setIsOpen]);
  return (
    <PartnerManagerContext.Provider value={partnerManagerContextValue}>
      <ExtendHead
        title='Partner Manager - Admin Dashboard'
        description='Partner Manager Admin dashboard'
      />
      <Header />
      <Main />
    </PartnerManagerContext.Provider>
  );
};

export const usePartnerManagerContext = () => {
  const context = useContext(PartnerManagerContext);
  if (!context) {
    throw new Error('usePartnerManagerContext must be used within admin dashboard PartnerManager');
  }
  return context;
};
