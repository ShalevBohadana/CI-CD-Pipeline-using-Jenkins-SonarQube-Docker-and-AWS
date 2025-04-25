import { createContext, useContext, useMemo } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { ExtendHead } from '../../components/ExtendHead';
import { PageTopBackground } from '../../components/ui/PageTopBackground';
import { ErrorFallback } from '../../error/ErrorFallback';
import { logError } from '../../error/logError';
import { ErrorBoundaryResetHandler } from '../../error/utils';

import { AddressSection } from './AddressSection';
import { Header } from './Header';
import { Main } from './Main';
import { OurStory } from './OurStory';
import { ProductTypes } from './ProductTypes';
import { Vision } from './Vision';

type AboutUsContextValue = object;
const AboutUsContext = createContext<AboutUsContextValue>({});

const handleErrorBoundaryReset: ErrorBoundaryResetHandler = (details) => {
  // Reset the state of your app so the error doesn't happen again
  console.log(details);
};

export const AboutUs = () => {
  const aboutUsContextValue = useMemo(() => ({}), []);

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={logError}
      onReset={handleErrorBoundaryReset}
    >
      <AboutUsContext.Provider value={aboutUsContextValue}>
        <ExtendHead title='About Us' description='About info' />
        <div className='grid gap-16 xl:gap-36'>
          <Header />
          <Main />
          <Vision />
          <OurStory />
          <ProductTypes />
          <AddressSection />
        </div>
        <PageTopBackground showMainImage showSideImages showOvalShape />
      </AboutUsContext.Provider>
    </ErrorBoundary>
  );
};

export const useAboutUsContext = () => {
  return useContext(AboutUsContext);
};
