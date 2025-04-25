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
import { UserDataDb } from '../Profile/components/AccountInfo';
import { OrderReviewDataDb } from '../RateOrder/Main';

import { Header } from './Header';
import { CreateGameCurrencyOfferFormInputs, Main } from './Main';

export type OfferGameCurrencyDataDb = Pretty<
  CreateGameCurrencyOfferFormInputs &
    NormalizedDbData & {
      sellerId: UserDataDb;
      reviews: Array<OrderReviewDataDb>;
    }
>;

type TCreateGameCurrencyOfferContext = {
  uid?: string;
  gameCurrencyData?: OfferGameCurrencyDataDb;
};

const CreateGameCurrencyOfferContext = createContext<TCreateGameCurrencyOfferContext | undefined>(
  undefined
);

const handleErrorBoundaryReset: ErrorBoundaryResetHandler = (details) => {
  // Reset the state of your app so the error doesn't happen again
  console.log(details);
};
export const CreateGameCurrencyOffer = () => {
  const { uid } = useParams<{ uid: string }>();

  const [gameCurrencyOfferData, setGameCurrencyOfferData] = useState<OfferGameCurrencyDataDb>();

  useEffect(() => {
    if (uid) {
      // Fetch data when uid is available
      axios
        .get(`/data/gameCurrencyOffer.json`)
        .then((response) => {
          // Update the offerData with the fetched data
          setGameCurrencyOfferData(response.data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  }, [uid]);

  const gameCurrencyContextValue = useMemo(
    () => ({
      uid,
      gameCurrencyData: gameCurrencyOfferData,
    }),
    [uid, gameCurrencyOfferData]
  );

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={logError}
      onReset={handleErrorBoundaryReset}
    >
      <CreateGameCurrencyOfferContext.Provider value={gameCurrencyContextValue}>
        <ExtendHead
          title={`${gameCurrencyContextValue?.uid ? 'Edit' : 'Create'} Game Currency Offer`}
          description={`${gameCurrencyContextValue?.uid ? 'Edit' : 'Create'} Game Currency Offer`}
        />
        <Header />
        <Main />
        <PageTopBackground />
      </CreateGameCurrencyOfferContext.Provider>
    </ErrorBoundary>
  );
};

export const useCreateGameCurrencyOfferContext = () => {
  const context = useContext(CreateGameCurrencyOfferContext);
  if (!context) {
    throw new Error(
      `CreateGameCurrencyOfferContext must be used with CreateGameCurrencyOffer component`
    );
  }
  return context;
};
