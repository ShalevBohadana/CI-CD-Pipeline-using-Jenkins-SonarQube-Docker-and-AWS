import { useAuthenticatedNavigation } from '../hooks/useAuthenticatedNavigation';
import { useAppSelector } from '../redux/hooks';
import { useState, useEffect } from 'react';
import { LoadingCircle } from './LoadingCircle';

export const Unauthorized = () => {
  // Create a local loading state
  const [isLoading, setIsLoading] = useState(true);
  const auth = useAppSelector((state) => state.auth);
  const navigate = useAuthenticatedNavigation();

  // Simulate the loading state check with a useEffect
  useEffect(() => {
    // Once auth state is checked, set loading to false
    setIsLoading(false);
  }, [auth]);

  if (isLoading) {
    return <LoadingCircle />;
  }

  return (
    <div className='pt-9 xl:pt-14 flex items-center justify-center'>
      <h2 className='text-red-600 text-center'>You are not authorized to access this resource!</h2>
    </div>
  );
};
