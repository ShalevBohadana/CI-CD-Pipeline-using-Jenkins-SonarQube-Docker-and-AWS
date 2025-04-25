import { createContext, useContext, useMemo } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { ExtendHead } from '../../components/ExtendHead';
import { PageTopBackground } from '../../components/ui/PageTopBackground';
import { ErrorFallback } from '../../error/ErrorFallback';
import { logError } from '../../error/logError';
import { ErrorBoundaryResetHandler } from '../../error/utils';

import { Header } from './Header';
import { Main } from './Main';

type ProfileContextType = object;
const ProfileContext = createContext<ProfileContextType>({});

const handleErrorBoundaryReset: ErrorBoundaryResetHandler = (details) => {
  // Reset the state of your app so the error doesn't happen again
  console.log(details);
};

export const Profile = () => {
  const profileContextValue = useMemo(() => ({}), []);

  // useEffect(() => {
  // if (true) {
  // setGames(ALL_GAMES_DATA);
  // }
  // }, []);

  // if (!true) {
  //   return <p className="text-red-500 text-center">No profile found!</p>;
  // }

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={logError}
      onReset={handleErrorBoundaryReset}
    >
      <ProfileContext.Provider value={profileContextValue}>
        <ExtendHead title='Profile Settings' description='Profile Settings' />
        <Header />
        <Main />
        <PageTopBackground />
      </ProfileContext.Provider>
    </ErrorBoundary>
  );
};

export const useProfileContext = () => {
  return useContext(ProfileContext);
};
