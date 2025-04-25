/* eslint-disable import/no-unresolved */

import { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Helmet } from 'react-helmet';

import { SignInForm } from '../../components/ui/SignInForm';
import { SITE_INFO } from '../../enums';
import { ErrorFallback } from '../../error/ErrorFallback';
import { logError } from '../../error/logError';

interface SignInElementProps {
  error: boolean;
}

const SignInElement = ({ error }: SignInElementProps) => {
  // console.log('Home Element props', props);

  if (error) {
    throw new Error('hello error world');
  }

  return (
    <>
      <Helmet titleTemplate={`%s - ${SITE_INFO.name.capitalized}`}>
        <title>Sign in</title>
      </Helmet>

      <main className='py-10'>
        <div className='fb-container max-w-2xl'>
          <SignInForm />
        </div>
      </main>
    </>
  );
};

export const SignIn = () => {
  const [isError, setIsError] = useState(true);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleReset = () => {
    // Reset the state of your app so the error doesn't happen again
    setIsError(false);
    // console.log(details);
  };

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={logError} onReset={handleReset}>
      <SignInElement error={isError} />
    </ErrorBoundary>
  );
};
