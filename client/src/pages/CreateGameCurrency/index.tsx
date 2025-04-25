import axios from 'axios';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useParams } from 'react-router-dom';

import { ExtendHead } from '../../components/ExtendHead';
import { PageTopBackground } from '../../components/ui/PageTopBackground';
import { ErrorFallback } from '../../error/ErrorFallback';
import { logError } from '../../error/logError';
import { ErrorBoundaryResetHandler } from '../../error/utils';
import { NormalizedDbData, Pretty } from '../../types/globalTypes';
import { OrderReviewDataDb } from '../RateOrder/Main';

import { Header } from './Header';
import { CreateGameCurrencyFormInputs, Main } from './Main';

export type TGameCurrencyData = Pretty<
  {
    id: string;
  } & CreateGameCurrencyFormInputs
>;
export type OfferCurrencyDataDb = Pretty<
  NormalizedDbData &
    CreateGameCurrencyFormInputs & {
      reviews: Array<OrderReviewDataDb>;
    }
>;

type TCreateGameCurrencyContext = {
  uid?: string;
  gameCurrencyData?: TGameCurrencyData;
};

const CreateGameCurrencyContext = createContext<TCreateGameCurrencyContext | undefined>(undefined);

const handleErrorBoundaryReset: ErrorBoundaryResetHandler = (details) => {
  // Reset the state of your app so the error doesn't happen again
  console.log(details);
};
export const CreateGameCurrency = () => {
  const { uid } = useParams<{ uid: string }>();

  const [gameCurrencyData, setGameCurrencyData] = useState<TGameCurrencyData>();

  useEffect(() => {
    if (uid) {
      // Fetch data when uid is available
      axios
        .get(`/data/gameCurrency2.json`)
        .then((response) => {
          // Update the offerData with the fetched data
          setGameCurrencyData(response.data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  }, [uid]);

  const gameCurrencyContextValue = useMemo(
    () => ({
      uid,
      gameCurrencyData,
    }),
    [uid, gameCurrencyData]
  );

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={logError}
      onReset={handleErrorBoundaryReset}
    >
      <CreateGameCurrencyContext.Provider value={gameCurrencyContextValue}>
        <ExtendHead
          title={`${gameCurrencyContextValue?.uid ? 'Edit' : 'Create'} Game Currency`}
          description={`${gameCurrencyContextValue?.uid ? 'Edit' : 'Create'} Game Currency`}
        />
        <Header />
        <Main />
        <PageTopBackground />
      </CreateGameCurrencyContext.Provider>
    </ErrorBoundary>
  );
};

export const useCreateGameCurrencyContext = () => {
  const context = useContext(CreateGameCurrencyContext);
  if (!context) {
    throw new Error(`CreateGameCurrencyContext must be used with CreateGameCurrency component`);
  }
  return context;
};
