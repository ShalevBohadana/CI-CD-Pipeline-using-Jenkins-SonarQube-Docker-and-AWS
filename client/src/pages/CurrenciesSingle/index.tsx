import { ErrorBoundary } from 'react-error-boundary';
import { useParams } from 'react-router-dom';

import { ExtendHead } from '../../components/ExtendHead';
import { LoadingCircle } from '../../components/LoadingCircle';
import { PageTopBackground } from '../../components/ui/PageTopBackground';
import { ErrorFallback } from '../../error/ErrorFallback';
import { logError } from '../../error/logError';
import { ErrorBoundaryResetHandler } from '../../error/utils';
import { useGetGameQuery } from '../../redux/features/game/gameApi';
import { useGetGameCurrencyQuery } from '../../redux/features/gameCurrency/gameCurrencyApi';
import { CommonParams } from '../../types/globalTypes';

import { Header } from './Header';
import { Main } from './Main';

const handleErrorBoundaryReset: ErrorBoundaryResetHandler = (details) => {
  // Reset the state of your app so the error doesn't happen again
  console.log(details);
};

export const CurrenciesSingle = () => {
  const { uid } = useParams<CommonParams>();
  const { data: gameCurrencyRes, isLoading } = useGetGameCurrencyQuery(uid || '', {
    skip: !uid,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
  const gameCurrency = gameCurrencyRes?.data;

  const { data: gameData } = useGetGameQuery(gameCurrency?.gameUid || '', {
    skip: !gameCurrency?.gameUid,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
  const gameName = gameData?.data?.name;

  if (isLoading) {
    return <LoadingCircle />;
  }

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={logError}
      onReset={handleErrorBoundaryReset}
    >
      <ExtendHead
        title={`${gameCurrency?.name ? `${gameCurrency.name} -` : ''} ${gameName}`}
        description={`${gameCurrency?.name ? `${gameCurrency.name} -` : ''} ${gameName}`}
      />
      <Header />
      <Main />
      <PageTopBackground showMainImage showSideImages showOvalShape />
    </ErrorBoundary>
  );
};

// export const useSingleCurrencyContext = () => {
//   const context = useContext(SingleCurrencyContext);
//   if (!context) {
//     throw new Error('SingleCurrencyContext is not available');
//   }
//   return context;
// };
