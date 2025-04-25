import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router-dom';

import { ErrorFallback } from '../../../error/ErrorFallback';
import { logError } from '../../../error/logError';
import { ErrorBoundaryResetHandler } from '../../../error/utils';

export const DBSupport = () => {
  const handleErrorBoundaryReset: ErrorBoundaryResetHandler = (details) => {
    // Reset the state of your app so the error doesn't happen again
    console.log(details);
  };
  return (
    <div className='p-4 xl:p-4 xl:pl-0 h-[inherit] overflow-auto flex flex-col gap-8 minimal-scrollbar'>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onError={logError}
        onReset={handleErrorBoundaryReset}
      >
        <Outlet />
      </ErrorBoundary>
    </div>
  );
};
