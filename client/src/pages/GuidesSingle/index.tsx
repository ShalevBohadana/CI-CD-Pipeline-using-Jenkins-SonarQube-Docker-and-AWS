import { createContext, useContext } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { PageTopBackground } from '../../components/ui/PageTopBackground';
import { ErrorFallback } from '../../error/ErrorFallback';
import { logError } from '../../error/logError';
import { ErrorBoundaryResetHandler } from '../../error/utils';
import { GuideDataDb } from '../Guides/components/FeaturedGuideCard';

import { Header } from './Header';
import { Main } from './Main';

type GuidesSingleContextType = {
  uid: string;
  featuredGuide: GuideDataDb;
};

const GuidesSingleContext = createContext<GuidesSingleContextType | undefined>(undefined);

const handleErrorBoundaryReset: ErrorBoundaryResetHandler = (details) => {
  // Reset the state of your app so the error doesn't happen again
  console.log(details);
};

export const GuidesSingle = () => {
  // const { uid } = useParams<{ uid: string }>();

  // const guidesSingleContextValue = useMemo(() => {
  //   if (!uid) {
  //     return undefined; // No context value if uid is not defined
  //   }

  //   const CURRENT_GUIDE = FEATURED_GUIDES_DATA.find(
  //     (guide) => guide?.uid === uid
  //   );

  //   if (!CURRENT_GUIDE) {
  //     return undefined; // No context value if guide is not found
  //   }

  //   const contextValue: GuidesSingleContextType = {
  //     uid,
  //     featuredGuide: CURRENT_GUIDE,
  //   };

  //   return contextValue;
  // }, [uid]);

  // if (!guidesSingleContextValue) {
  //   return <p className="text-red-500 text-center">No valid guide found!</p>;
  // }

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={logError}
      onReset={handleErrorBoundaryReset}
    >
      {/* <GuidesSingleContext.Provider value={guidesSingleContextValue}> */}
      <Header />
      <Main />
      <PageTopBackground showMainImage showSideImages showOvalShape />
      {/* </GuidesSingleContext.Provider> */}
    </ErrorBoundary>
  );
};

export const useGuidesSingleContext = () => {
  const context = useContext(GuidesSingleContext);
  if (!context) {
    throw new Error('GuidesSingleContext is not defined');
  }
  return context;
};
