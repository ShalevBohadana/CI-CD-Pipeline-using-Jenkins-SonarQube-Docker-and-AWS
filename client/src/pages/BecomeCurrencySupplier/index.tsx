import { createContext, useContext, useMemo } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { ExtendHead } from '../../components/ExtendHead';
import { PageTopBackground } from '../../components/ui/PageTopBackground';
import { ErrorFallback } from '../../error/ErrorFallback';
import { logError } from '../../error/logError';
import { ErrorBoundaryResetHandler } from '../../error/utils';

import { BecomeCurrencySupplierForm } from './BecomeCurrencySupplierForm';
import { Header } from './Header';

type BecomeCurrencySupplierContextType = object;
const BecomeCurrencySupplierContext = createContext<BecomeCurrencySupplierContextType>({});

const handleErrorBoundaryReset: ErrorBoundaryResetHandler = (details) => {
  // Reset the state of your app so the error doesn't happen again
  console.log(details);
};

export const BecomeCurrencySupplier = () => {
  const becomeCurrencySupplierContextValue = useMemo(() => ({}), []);

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={logError}
      onReset={handleErrorBoundaryReset}
    >
      <BecomeCurrencySupplierContext.Provider value={becomeCurrencySupplierContextValue}>
        <ExtendHead title='Become a Currency Supplier' description='Become a Currency Supplier' />
        <Header />
        <BecomeCurrencySupplierForm />
        <PageTopBackground />
      </BecomeCurrencySupplierContext.Provider>
    </ErrorBoundary>
  );
};

export const useBecomeCurrencySupplierContext = () => {
  return useContext(BecomeCurrencySupplierContext);
};
