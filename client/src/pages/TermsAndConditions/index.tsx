import React from 'react';
import { createContext, useContext, useMemo } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ComponentType } from 'react';
import { FallbackProps } from 'react-error-boundary';

import { ExtendHead } from '../../components/ExtendHead';
import { PageTopBackground } from '../../components/ui/PageTopBackground';
import { ErrorFallback } from '../../error/ErrorFallback';
import { logError } from '../../error/logError';
import { ErrorBoundaryResetHandler } from '../../error/utils';
import { SimpleAddress } from '../PrivacyPolicy/SimpleAddress';

import { Header } from './Header';
import { Main } from './Main';

type TermsOfServiceContextValue = object;
const TermsOfServiceContext = createContext<TermsOfServiceContextValue>({});

const handleErrorBoundaryReset = () => {
  // Reset the state of your app so the error doesn't happen again
  console.log('Error boundary reset');
};

export const TermsAndConditions = () => {
  const termsOfServiceContextValue = useMemo(() => ({}), []);

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback as ComponentType<FallbackProps>}
      onError={logError}
      onReset={handleErrorBoundaryReset}
    >
      <>
        <TermsOfServiceContext.Provider value={termsOfServiceContextValue}>
          <ExtendHead title='Terms and Conditions' description='Terms and Conditions info' />
          <div className='grid gap-12 xl:gap-20 pb-12'>
            <Header />
            <Main />
            <SimpleAddress />
          </div>
          <PageTopBackground showMainImage showSideImages showOvalShape />
        </TermsOfServiceContext.Provider>
      </>
    </ErrorBoundary>
  );
};

export const useTermsOfServiceContext = () => {
  return useContext(TermsOfServiceContext);
};
