import { createContext, useContext } from 'react';
import { TLatestGamesOffersContext } from './LatestGamesOffersTypes';

export const LatestGamesOffersContext = createContext<TLatestGamesOffersContext | undefined>(undefined);

export const useLatestGamesOffersContext = () => {
  const context = useContext(LatestGamesOffersContext);
  if (!context) {
    throw new Error('Could not find the LatestGamesOffers page context');
  }
  return context;
};
