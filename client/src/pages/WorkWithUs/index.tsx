import { createContext, useContext, useMemo } from 'react';
import { ErrorBoundary } from '../../components/error/ErrorBoundaryWrapper';

import { ExtendHead } from '../../components/ExtendHead';
import { ErrorFallback } from '../../error/ErrorFallback';
import { logError } from '../../error/logError';
import { ErrorBoundaryResetHandler } from '../../error/utils';

import { BecomeAPartner } from './BecomeAPartner';
import { ChoseARole } from './ChoseARole';
import { Header } from './Header';
import { WhyBestPlatform } from './WhyBestPlatform';

type WorkWithUsContextType = object;
const WorkWithUsContext = createContext<WorkWithUsContextType>({});

const handleErrorBoundaryReset: ErrorBoundaryResetHandler = (details) => {
  // Reset the state of your app so the error doesn't happen again
  console.log(details);
};

export const WorkWithUs = () => {
  const workWithUsContextValue = useMemo(() => ({}), []);

  return (
    <ErrorBoundary.Root
      FallbackComponent={ErrorFallback}
      onError={logError}
      onReset={handleErrorBoundaryReset}
    >
      <WorkWithUsContext.Provider value={workWithUsContextValue}>
        <>
          <ExtendHead title='Work with us' description='Work with us' />
          <Header />
          <WhyBestPlatform />
          <ChoseARole />
          <BecomeAPartner />
        </>
      </WorkWithUsContext.Provider>
    </ErrorBoundary.Root>
  );
};

export const useWorkWithUsContext = () => {
  return useContext(WorkWithUsContext);
};
