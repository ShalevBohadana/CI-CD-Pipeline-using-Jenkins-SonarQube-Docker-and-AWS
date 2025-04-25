import { createContext, useContext } from 'react';
import { NormalizedDbData, Pretty } from '../../../types/globalTypes';
import { CreateGameFormInputs } from '../types';

/**
 * Combines normalized database data with form inputs
 */
export type GameDataDb = Pretty<NormalizedDbData & CreateGameFormInputs>;

/**
 * Context type for CreateGame feature
 */
type TCreateGameContext = {
  uid?: string;
  gameData?: GameDataDb;
};

/**
 * Context for sharing game data and uid across components
 */
export const CreateGameContext = createContext<TCreateGameContext | undefined>(undefined);

/**
 * Custom hook for accessing CreateGame context
 * Throws error if used outside CreateGame provider
 */
export const useCreateGameContext = () => {
  const context = useContext(CreateGameContext);

  if (!context) {
    throw new Error('CreateGameContext must be used with CreateGame component');
  }

  return context;
};
