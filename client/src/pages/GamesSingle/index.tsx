import { createContext, useContext, useMemo } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useParams } from 'react-router-dom';

import { ExtendHead } from '../../components/ExtendHead';
import { PageTopBackground } from '../../components/ui/PageTopBackground';
import { ErrorFallback } from '../../error/ErrorFallback';
import { logError } from '../../error/logError';
import { ErrorBoundaryResetHandler } from '../../error/utils';
import { useGamesAndCategories } from '../../hooks/useGamesAndCategories';

import { Header } from './Header';
import { Main } from './Main';

type GamesSingleContextType = {
  uid: string;
};
const GamesSingleContext = createContext<GamesSingleContextType | undefined>(undefined);

const handleErrorBoundaryReset: ErrorBoundaryResetHandler = (details) => {
  // Reset the state of your app so the error doesn't happen again
  console.log(details);
};

export const GamesSingle = () => {
  const { uid } = useParams<{ uid: string }>();
  const { gamesAndCategories } = useGamesAndCategories();
  console.log(uid);

  // const contextValue: GamesSingleContextType = {
  //   uid,
  // };

  const gamesSingleContextValue = useMemo(
    () => ({
      uid: uid!,
    }),
    [uid]
  );

  if (!gamesSingleContextValue) {
    return <p className='text-red-500 text-center'>No valid game ID found!</p>;
  }

  const gameName = gamesAndCategories?.find((game) => game.uid === uid)?.name || '';

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={logError}
      onReset={handleErrorBoundaryReset}
    >
      <GamesSingleContext.Provider value={gamesSingleContextValue}>
        <ExtendHead title={`${gameName} Offers`} description={`${gameName} Offers page`} />
        <Header />
        <Main />
        <PageTopBackground showMainImage showOvalShape />
      </GamesSingleContext.Provider>
    </ErrorBoundary>
  );
};

export const useGamesSingleContext = () => {
  const context = useContext(GamesSingleContext);
  if (!context) {
    throw new Error('GamesSingleContext is undefined');
  }
  return context;
};
