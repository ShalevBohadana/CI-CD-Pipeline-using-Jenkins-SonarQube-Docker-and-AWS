import { createContext, useContext, useMemo } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { ExtendHead } from '../../components/ExtendHead';
import { PageTopBackground } from '../../components/ui/PageTopBackground';
import { ErrorFallback } from '../../error/ErrorFallback';
import { logError } from '../../error/logError';
import { ErrorBoundaryResetHandler } from '../../error/utils';

import { BecomeBoosterForm } from './BecomeBoosterForm';
import { Header } from './Header';

type BecomeBoosterContextType = object;
const BecomeBoosterContext = createContext<BecomeBoosterContextType>({});

const handleErrorBoundaryReset: ErrorBoundaryResetHandler = (details) => {
  // Reset the state of your app so the error doesn't happen again
  console.log(details);
};

export const BecomeBooster = () => {
  const becomeBoosterContextValue = useMemo(() => ({}), []);

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={logError}
      onReset={handleErrorBoundaryReset}
    >
      <BecomeBoosterContext.Provider value={becomeBoosterContextValue}>
        <ExtendHead title='Become a Booster' description='Become a Booster page' />
        <Header />
        <BecomeBoosterForm />
        <PageTopBackground />
      </BecomeBoosterContext.Provider>
    </ErrorBoundary>
  );
};

export const useBecomeBoosterContext = () => {
  return useContext(BecomeBoosterContext);
};
