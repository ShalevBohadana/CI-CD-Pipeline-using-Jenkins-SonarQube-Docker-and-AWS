import { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ExtendHead } from '../../components/ExtendHead';
import { SignUpForm } from '../../components/ui/SignUpForm';
import { ErrorFallback } from '../../error/ErrorFallback';
import { logError } from '../../error/logError';

interface SignUpElementProps {
  error?: boolean;
}

const SignUpElement: React.FC<SignUpElementProps> = () => {
  // Throw error if needed (commented out for now)
  // if (error) {
  //   throw new Error('hello error world');
  // }

  return (
    <>
      <ExtendHead title='Sign up' description='Sign up page' />
      <main className='py-10'>
        <div className='fb-container max-w-2xl'>
          <SignUpForm />
        </div>
      </main>
    </>
  );
};

export const SignUp = () => {
  const [isError, setIsError] = useState(false); // Changed to false by default

  const handleReset = () => {
    setIsError(false);
  };

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={logError}
      onReset={handleReset}
      resetKeys={[isError]} // Add resetKeys to properly handle error state
    >
      <SignUpElement error={isError} />
    </ErrorBoundary>
  );
};

export default SignUp;
