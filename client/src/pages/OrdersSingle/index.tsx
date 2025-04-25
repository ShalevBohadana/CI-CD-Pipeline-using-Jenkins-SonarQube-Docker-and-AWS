import React, { createContext, useContext } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';

import { ExtendHead } from '../../components/ExtendHead';
import { PageTopBackground } from '../../components/ui/PageTopBackground';
import { ErrorFallback } from '../../error/ErrorFallback';
import { logError } from '../../error/logError';
import { ErrorBoundaryResetHandler } from '../../error/utils';

import { OrderDataDb } from '../MyOrders/components/OrderItem';

import { Header } from './Header';
import { Main } from './Main';
import { ComponentType } from 'react';

type TOrderSingleContext = {
  uid: string;
  order: Readonly<OrderDataDb>;
};
const OrdersSingleContext = createContext<TOrderSingleContext | undefined>(undefined);

const handleErrorBoundaryReset = () => {
  // Reset the state of your app so the error doesn't happen again
  console.log('Error boundary reset');
};

;

export const OrdersSingle = () => {
  // const { uid } = useParams<{ uid: string }>();
  // const { data: currentOrderRes } = useGetOrderQuery(uid || '', {
  //   skip: !uid,
  //   refetchOnMountOrArgChange: true,
  //   refetchOnFocus: true,
  //   refetchOnReconnect: true,
  // });
  // const orderData = useMemo(
  //   () => currentOrderRes?.data || ({} as OrderDataDb),
  //   [currentOrderRes?.data]
  // );
  // const orderSingleContextValue = useMemo(
  //   () => ({
  //     uid: uid as string,
  //     order: orderData,
  //   }),
  //   [uid, orderData]
  // );

  // if (!orderSingleContextValue?.order) {
  //   return <p className="text-red-500 text-center">No valid order ID found!</p>;
  // }

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback as ComponentType<FallbackProps>}
      onError={logError}
      onReset={handleErrorBoundaryReset}
    >
      {/* <OrdersSingleContext.Provider value={orderSingleContextValue}> */}
      <React.Fragment>
        <ExtendHead title='Order Summary' description='Order Summary page' />
        <Header />
        <Main />
        <PageTopBackground showMainImage showOvalShape />
      </React.Fragment>
      {/* </OrdersSingleContext.Provider> */}
    </ErrorBoundary>
  );
};

export const useOrdersSingleContext = () => {
  const context = useContext(OrdersSingleContext);
  if (!context) {
    throw new Error(`OrdersSingleContext must be used with OrderSingle component`);
  }
  return context;
};
