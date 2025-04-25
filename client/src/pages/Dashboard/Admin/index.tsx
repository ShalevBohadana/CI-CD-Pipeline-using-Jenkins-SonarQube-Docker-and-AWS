import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router-dom';
import { ErrorFallback } from '../../../error/ErrorFallback';
import { logError } from '../../../error/logError';
import { ErrorBoundaryResetHandler } from '../../../error/utils';

export const DBAdmin = () => {
  const handleErrorBoundaryReset: ErrorBoundaryResetHandler = (details) => {
    console.log(details);
  };

  return (
    <div className='flex flex-col'>
      {/* Main content container - starts below navbar */}
      <div className='pt-20'>
        {' '}
        {/* pt-20 matches navbar height */}
        <div className='max-w-screen-2xl mx-auto'>
          <div
            className='min-h-[calc(100vh-5rem)] xl:min-h-[calc(100vh-8rem)] 
                        p-4 xl:p-6 
                        flex flex-col gap-8 
                        overflow-auto minimal-scrollbar'
          >
            <ErrorBoundary
              FallbackComponent={ErrorFallback}
              onError={logError}
              onReset={handleErrorBoundaryReset}
            >
              <Outlet />
            </ErrorBoundary>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DBAdmin;
