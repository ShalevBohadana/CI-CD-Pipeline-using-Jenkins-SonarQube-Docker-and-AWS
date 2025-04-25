import { ErrorBoundary } from 'react-error-boundary';

import { ExtendHead } from '../../components/ExtendHead';
import { PageTopBackground } from '../../components/ui/PageTopBackground';
import { ErrorFallback } from '../../error/ErrorFallback';
import { logError } from '../../error/logError';
import { ErrorBoundaryResetHandler } from '../../error/utils';

import { Header } from './Header';
import { Main } from './Main';

const handleErrorBoundaryReset: ErrorBoundaryResetHandler = (details) => {
  // Reset the state of your app so the error doesn't happen again
  console.log(details);
};

export const Support = () => {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={logError}
      onReset={handleErrorBoundaryReset}
    >
      <ExtendHead title='Support' description='Support page' />
      <div className='relative z-0 isolate grid gap-4'>
        <Header />
        <Main />
      </div>
      <PageTopBackground showMainImage showOvalShape />
    </ErrorBoundary>
  );
};
