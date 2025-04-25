import { createContext, useContext, useMemo } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { ExtendHead } from '../../components/ExtendHead';
import { PageTopBackground } from '../../components/ui/PageTopBackground';
import { ErrorFallback } from '../../error/ErrorFallback';
import { logError } from '../../error/logError';
import { ErrorBoundaryResetHandler } from '../../error/utils';

import { FeaturedGuides } from './FeaturedGuides';
import { Header } from './Header';

type GuidesContextType = object;
const GuidesContext = createContext<GuidesContextType>({});

const handleErrorBoundaryReset: ErrorBoundaryResetHandler = (details) => {
  // Reset the state of your app so the error doesn't happen again
  console.log(details);
};

export const Guides = () => {
  const guidesContextValue = useMemo(() => ({}), []);

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={logError}
      onReset={handleErrorBoundaryReset}
    >
      <GuidesContext.Provider value={guidesContextValue}>
        <ExtendHead title='Guides' description='Guides page' />
        <Header />
        <FeaturedGuides />
        <PageTopBackground showOvalShape />
      </GuidesContext.Provider>
    </ErrorBoundary>
  );
};

export const useGuidesContext = () => {
  return useContext(GuidesContext);
};
