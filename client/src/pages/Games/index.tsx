import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { PageTopBackground } from '../../components/ui/PageTopBackground';
import { ErrorFallback } from '../../error/ErrorFallback';
import { logError } from '../../error/logError';
import { ErrorBoundaryResetHandler } from '../../error/utils';
import { GameDataType } from '../Home/FeaturedGames';
import { BecomeAPartner } from '../WorkWithUs/BecomeAPartner';

import { Main } from './Main';

export const ALL_GAMES_DATA: GameDataType[] = [
  {
    id: '7e350494-bbe8-560a-ae8e-851f250bff19',
    uid: 'model-3',
    title: 'Model 3',
    posterUrl: 'https://dummyimage.com/420x470.png',
  },
  {
    id: 'c3ef1805-0563-507a-8376-e67093588158',
    uid: 'element',
    title: 'Element',
    posterUrl: 'https://dummyimage.com/420x470.png',
  },
  {
    id: 'c3ef1805-0563-507a-8376-e89393588158',
    uid: 'element-2',
    title: 'Element 2',
    posterUrl: 'https://dummyimage.com/420x470.png',
  },
];

type GamesContextType = {
  games?: GameDataType[];
};
const GamesContext = createContext<GamesContextType>({});

const handleErrorBoundaryReset: ErrorBoundaryResetHandler = (details) => {
  // Reset the state of your app so the error doesn't happen again
  console.log(details);
};

export const Games = () => {
  const [games, setGames] = useState<GameDataType[]>();
  const GamesContextValue = useMemo(() => ({ games }), [games]);

  useEffect(() => {
    if (!games || !games?.length) {
      setGames(ALL_GAMES_DATA);
    }
  }, [games]);

  if (!games) {
    return <p className='text-red-500 text-center'>No games found!</p>;
  }

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={logError}
      onReset={handleErrorBoundaryReset}
    >
      <GamesContext.Provider value={GamesContextValue}>
        <div className='relative z-0 isolate grid gap-14'>
          <Main />
          <div className='3xl:max-w-9xl 2xl:mx-auto w-full'>
            <BecomeAPartner />
          </div>
        </div>
        <PageTopBackground showMainImage showOvalShape />
      </GamesContext.Provider>
    </ErrorBoundary>
  );
};

export const useGamesContext = () => {
  return useContext(GamesContext);
};
