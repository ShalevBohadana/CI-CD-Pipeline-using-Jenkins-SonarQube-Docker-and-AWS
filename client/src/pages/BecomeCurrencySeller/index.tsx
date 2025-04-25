import { createContext, useContext, useMemo } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { ExtendHead } from '../../components/ExtendHead';
import { PageTopBackground } from '../../components/ui/PageTopBackground';
import { ErrorFallback } from '../../error/ErrorFallback';
import { logError } from '../../error/logError';
import { ErrorBoundaryResetHandler } from '../../error/utils';

import { BecomeCurrencySellerForm } from './BecomeCurrencySellerForm';
import { Header } from './Header';

type BecomeCurrencySellerContextType = object;
const BecomeCurrencySellerContext = createContext<BecomeCurrencySellerContextType>({});

const handleErrorBoundaryReset: ErrorBoundaryResetHandler = (details) => {
  // Reset the state of your app so the error doesn't happen again
  console.log(details);
};

export const BecomeCurrencySeller = () => {
  const becomeCurrencySellerContextValue = useMemo(() => ({}), []);

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={logError}
      onReset={handleErrorBoundaryReset}
    >
      <BecomeCurrencySellerContext.Provider value={becomeCurrencySellerContextValue}>
        <ExtendHead title='Become a Currency Seller' description='Become a Currency Seller' />
        <Header />
        <BecomeCurrencySellerForm />
        <PageTopBackground />
      </BecomeCurrencySellerContext.Provider>
    </ErrorBoundary>
  );
};

export const useBecomeCurrencySellerContext = () => {
  return useContext(BecomeCurrencySellerContext);
};
