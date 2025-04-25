import { useMemo } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useParams } from 'react-router-dom';

import { ExtendHead } from '../../components/ExtendHead';
import { PageTopBackground } from '../../components/ui/PageTopBackground';
import { ErrorFallback } from '../../error/ErrorFallback';
import { logError } from '../../error/logError';
import { ErrorBoundaryResetHandler } from '../../error/utils';
import { useGetGameQuery } from '../../redux/features/game/gameApi';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { CreateGameContext } from './context/CreateGameContext';

export * from './types';

const handleErrorBoundaryReset: ErrorBoundaryResetHandler = (details) => {
  console.log(details);
};

export const CreateGame = () => {
  const { uid } = useParams<{ uid: string }>();

  const { data } = useGetGameQuery(uid!, {
    skip: !uid,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const gameData = data?.data;

  const contextValue = useMemo(
    () => ({
      uid,
      gameData,
    }),
    [uid, gameData]
  );

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={logError}
      onReset={handleErrorBoundaryReset}
    >
      <CreateGameContext.Provider value={contextValue}>
        <ExtendHead
          title={`${uid ? 'Edit' : 'Create'} Game`}
          description={`${uid ? 'Edit' : 'Create'} Game`}
        />
        <Header />
        <Main />
        <PageTopBackground />
      </CreateGameContext.Provider>
    </ErrorBoundary>
  );
};
