import React from 'react';
import { createContext, SetStateAction, useContext, useMemo, useState } from 'react';

import { ExtendHead } from '../../../../components/ExtendHead';

import { Header } from './Header';
import { Main } from './Main';

type GamesContextType = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
};

const GamesContext = createContext<GamesContextType | undefined>(undefined);

export const AdminGames = () => {
  const [isOpen, setIsOpen] = useState(false);
  const gamesContextValue = useMemo(() => ({ isOpen, setIsOpen }), [isOpen, setIsOpen]);
  return (
    <GamesContext.Provider value={gamesContextValue}>
      <ExtendHead title='Games - Admin Dashboard' description='Games Admin dashboard' />
      <Header />
      <Main />
    </GamesContext.Provider>
  );
};

export const useGamesContext = () => {
  const context = useContext(GamesContext);
  if (!context) {
    throw new Error('useGamesContext must be used within admin dashboard Games');
  }
  return context;
};
