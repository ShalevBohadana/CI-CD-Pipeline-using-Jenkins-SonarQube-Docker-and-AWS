import { useEffect, useMemo, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useParams } from 'react-router-dom';

import { ExtendHead } from '../../components/ExtendHead';
import { PageTopBackground } from '../../components/ui/PageTopBackground';
import { ErrorFallback } from '../../error/ErrorFallback';
import { logError } from '../../error/logError';
import { ErrorBoundaryResetHandler } from '../../error/utils';
import { setCurrentOffer } from '../../redux/features/currentOffer/currentOfferSlice';
import { useGetOfferQuery } from '../../redux/features/offer/offerApi';
import { useAppDispatch } from '../../redux/hooks';
import { CommonParams } from '../../types/globalTypes';
import { OfferDataDb } from '../CreateOffer';

import { Header } from './Header';
import { Main } from './Main';

// type SingleOfferContextValue = {
//   uid?: string;
//   gameOffer?: TOfferData;
// };

// const SingleOfferContext = createContext<SingleOfferContextValue>({});

const handleErrorBoundaryReset: ErrorBoundaryResetHandler = (details) => {
  // Reset the state of your app so the error doesn't happen again
  console.log(details);
};

export const OffersSingle = () => {
  const [gameOffer, setGameOffer] = useState<OfferDataDb>();
  const dispatch = useAppDispatch();

  // const singleOfferContextValue = useMemo(
  //   () => ({ uid, gameOffer }),
  //   [uid, gameOffer]
  // );
  const { uid } = useParams<CommonParams>();
  const { data: currentOfferRes } = useGetOfferQuery(uid || '', {
    skip: !uid,
    refetchOnFocus: true,
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
  });
  const currentOffer = useMemo(() => currentOfferRes?.data, [currentOfferRes?.data]);
  useEffect(() => {
    if (!gameOffer && currentOffer) {
      // fetch('/data/offerData.json')
      //   .then((res) => res.json())
      //   .then((data: OfferDataDb) => {
      // console.log(offer);
      setGameOffer(currentOffer);
      // const isRegion = data?.dynamicFilters?.[0]?.name === 'region';
      dispatch(setCurrentOffer(currentOffer));
      // })
      // .catch(console.error);
    }
  }, [gameOffer, currentOffer, dispatch]);

  if (!uid) {
    return <p className='text-red-500 text-center'>No valid game offer found!</p>;
  }
  console.log(currentOffer);
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={logError}
      onReset={handleErrorBoundaryReset}
    >
      {/* <SingleOfferContext.Provider value={singleOfferContextValue}> */}
      <ExtendHead
        title={`${gameOffer?.name ? `${gameOffer.name} - Offer` : ''}`}
        description={`${gameOffer?.name} page`}
      />
      <Header />
      <Main />
      <PageTopBackground showMainImage showSideImages showOvalShape />
      {/* </SingleOfferContext.Provider> */}
    </ErrorBoundary>
  );
};

// export const useSingleOfferContext = () => {
//   const context = useContext(SingleOfferContext);
//   if (!context) {
//     throw new Error(
//       `SingleOfferContext must be used with OffersSingle component`
//     );
//   }
//   return context;
// };
