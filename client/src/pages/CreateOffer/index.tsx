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
import { CreateOfferFormInputs, Main } from './Main';

export type OfferDataDb = Pretty<NormalizedDbData & CreateOfferFormInputs>;
type TCreateOfferContext = {
  uid?: string;
  offerData?: OfferDataDb;
};

const CreateOfferContext = createContext<TCreateOfferContext | undefined>(undefined);

const handleErrorBoundaryReset: ErrorBoundaryResetHandler = (details) => {
  // Reset the state of your app so the error doesn't happen again
  console.log(details);
};
export const CreateOffer = () => {
  const { uid } = useParams<{ uid: string }>();

  const [offerData, setOfferData] = useState<OfferDataDb>(); // Initialize offerData with null or an initial value

  useEffect(() => {
    if (uid) {
      // Fetch data when uid is available
      axios
        .get(`/data/offerData.json`)
        .then((response) => {
          // Update the offerData with the fetched data
          setOfferData(response.data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  }, [uid]);

  const createOfferContextValue = useMemo(
    () => ({
      uid,
      offerData,
    }),
    [uid, offerData]
  );

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={logError}
      onReset={handleErrorBoundaryReset}
    >
      <CreateOfferContext.Provider value={createOfferContextValue}>
        <ExtendHead
          title={`${createOfferContextValue?.uid ? 'Edit' : 'Create'} Offer`}
          description={`${createOfferContextValue?.uid ? 'Edit' : 'Create'} Offer`}
        />
        <Header />
        <Main />
        <PageTopBackground />
      </CreateOfferContext.Provider>
    </ErrorBoundary>
  );
};

export const useCreateOfferContext = () => {
  const context = useContext(CreateOfferContext);
  if (!context) {
    throw new Error(`CreateOfferContext must be used with CreateOffer component`);
  }
  return context;
};
