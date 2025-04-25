import { createContext, useContext, useMemo } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { ExtendHead } from '../../components/ExtendHead';
import { PageTopBackground } from '../../components/ui/PageTopBackground';
import { ErrorFallback } from '../../error/ErrorFallback';
import { logError } from '../../error/logError';
import { ErrorBoundaryResetHandler } from '../../error/utils';

import { Header } from './Header';
import { Main } from './Main';
import { SimpleAddress } from './SimpleAddress';

type PrivacyPolicyContextValue = object;
const PrivacyPolicyContext = createContext<PrivacyPolicyContextValue>({});

const handleErrorBoundaryReset: ErrorBoundaryResetHandler = (details) => {
  // Reset the state of your app so the error doesn't happen again
  console.log(details);
};

export const PrivacyPolicy = () => {
  const privacyPolicyContextValue = useMemo(() => ({}), []);

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={logError}
      onReset={handleErrorBoundaryReset}
    >
      <PrivacyPolicyContext.Provider value={privacyPolicyContextValue}>
        <ExtendHead title='Privacy Policy' description='Privacy Policy info' />
        <div className='grid gap-12 xl:gap-20 pb-12'>
          <Header />
          {/* <TermsAndConditions /> */}
          <Main />
          {/* <ListWithTitle
            payload={CARDHOLDER_CREDENTIALS_STORAGE_AGREEMENT_DATA}
            className="list-none"
          />
          <ListWithTitle
            payload={MERCHANT_DISCLOSURES_DATA}
            className="pl-[1.25rem]"
          />
          <ListWithTitle
            payload={EVENT_PROMPTING_TRANSACTION_DATA}
            className="pl-[1.25rem]"
          /> */}
          <SimpleAddress />
        </div>
        <PageTopBackground showMainImage showSideImages showOvalShape />
      </PrivacyPolicyContext.Provider>
    </ErrorBoundary>
  );
};

export const usePrivacyPolicyContext = () => {
  return useContext(PrivacyPolicyContext);
};
