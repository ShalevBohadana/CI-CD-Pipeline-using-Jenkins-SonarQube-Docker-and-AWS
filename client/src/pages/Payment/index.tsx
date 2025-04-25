import { ErrorBoundary } from 'react-error-boundary';

import { ExtendHead } from '../../components/ExtendHead';
import { ErrorFallback } from '../../error/ErrorFallback';
import { logError } from '../../error/logError';
import { ErrorBoundaryResetHandler } from '../../error/utils';

import { Main } from './Main';

const handleErrorBoundaryReset: ErrorBoundaryResetHandler = (details) => {
  // Reset the state of your app so the error doesn't happen again
  console.log(details);
};

export const Payment = () => {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={logError}
      onReset={handleErrorBoundaryReset}
    >
      <ExtendHead title='Payment' description='Payment page' />
      <Main />
    </ErrorBoundary>
  );
};
