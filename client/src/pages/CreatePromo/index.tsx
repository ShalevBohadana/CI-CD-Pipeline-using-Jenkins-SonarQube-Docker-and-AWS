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

import { Header } from './Header';
import { CreatePromoFormInputs, Main } from './Main';

export type TPromoData = {
  id: string;
} & CreatePromoFormInputs;
export type PromoDataDb = Pretty<NormalizedDbData & CreatePromoFormInputs>;
type TCreatePromoContext = {
  uid?: string;
  promoData?: TPromoData;
};

const CreatePromoContext = createContext<TCreatePromoContext | undefined>(undefined);

const handleErrorBoundaryReset: ErrorBoundaryResetHandler = (details) => {
  // Reset the state of your app so the error doesn't happen again
  console.log(details);
};
export const CreatePromo = () => {
  const { uid } = useParams<{ uid: string }>();

  const [promoData, setPromoData] = useState<TPromoData>();

  useEffect(() => {
    if (uid) {
      // Fetch data when uid is available
      axios
        .get(`/data/promoData.json`)
        .then((response) => {
          // Update the offerData with the fetched data
          setPromoData(response.data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  }, [uid]);

  const CreatePromoContextValue = useMemo(
    () => ({
      uid,
      promoData,
    }),
    [uid, promoData]
  );

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={logError}
      onReset={handleErrorBoundaryReset}
    >
      <CreatePromoContext.Provider value={CreatePromoContextValue}>
        <ExtendHead
          title={`${CreatePromoContextValue?.uid ? 'Edit' : 'Create'} Promo`}
          description={`${CreatePromoContextValue?.uid ? 'Edit' : 'Create'} Promo`}
        />
        <Header />
        <Main />
        <PageTopBackground />
      </CreatePromoContext.Provider>
    </ErrorBoundary>
  );
};

export const useCreatePromoContext = () => {
  const context = useContext(CreatePromoContext);
  if (!context) {
    throw new Error(`CreatePromoContext must be used with CreatePromo component`);
  }
  return context;
};
