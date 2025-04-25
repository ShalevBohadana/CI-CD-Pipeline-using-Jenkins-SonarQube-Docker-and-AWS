import { createContext, useContext } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { ExtendHead } from '../../components/ExtendHead';
import { PageTopBackground } from '../../components/ui/PageTopBackground';
import { ErrorFallback } from '../../error/ErrorFallback';
import { logError } from '../../error/logError';
import { ErrorBoundaryResetHandler } from '../../error/utils';
import { Order } from '../MyOrders/components/OrderItem';

import { Header } from './Header';
import { Main } from './Main';

type TOrderSingleContext = {
  uid: string;
  order: Readonly<Order>;
};
const RateOrderContext = createContext<TOrderSingleContext | undefined>(undefined);

const handleErrorBoundaryReset: ErrorBoundaryResetHandler = (details) => {
  // Reset the state of your app so the error doesn't happen again
  console.log(details);
};
export const RateOrder = () => {
  // const { uid } = useParams<{ uid: string }>();
  // const rateOrderContextValue = useMemo(
  //   () => ({
  //     uid: uid as string,
  //     order: ORDERS_DATA.find((item) => item?.uid === uid)!,
  //   }),
  //   [uid]
  // );

  // if (!rateOrderContextValue?.order) {
  //   return <p className="text-red-500 text-center">No valid order ID found!</p>;
  // }

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={logError}
      onReset={handleErrorBoundaryReset}
    >
      {/* <RateOrderContext.Provider value={rateOrderContextValue}> */}
      <ExtendHead title='Rate Order' description='Rate Order' />
      <Header />
      <Main />
      <PageTopBackground />
      {/* </RateOrderContext.Provider> */}
    </ErrorBoundary>
  );
};

export const useRateOrderContext = () => {
  const context = useContext(RateOrderContext);
  if (!context) {
    throw new Error(`RateOrderContext must be used with RateOrder component`);
  }
  return context;
};
