import { createContext, useContext, useMemo } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useParams } from 'react-router-dom';

import { ExtendHead } from '../../components/ExtendHead';
import { PageTopBackground } from '../../components/ui/PageTopBackground';
import { ErrorFallback } from '../../error/ErrorFallback';
import { logError } from '../../error/logError';
import { ErrorBoundaryResetHandler } from '../../error/utils';

import { Header } from './Header';
import { Main } from './Main';
import { Order } from '../MyOrders/components/OrderItem';
import { ORDERS_DATA } from '../MyOrders/Main';

type TOrderSingleContext = {
  uid: string;
  order: Readonly<Order>;
};

const OrderReviewContext = createContext<TOrderSingleContext | undefined>(undefined);

const handleErrorBoundaryReset: ErrorBoundaryResetHandler = (details) => {
  console.log('Error boundary reset:', details);
};

export const OrderReview = () => {
  const { uid } = useParams<{ uid: string }>();

  const orderReviewContextValue = useMemo(() => {
    if (!uid) return undefined;

    const foundOrder = ORDERS_DATA.find((item) => item.uid === uid);
    if (!foundOrder) return undefined;

    return {
      uid,
      order: foundOrder as Readonly<Order>,
    };
  }, [uid]);

  if (!orderReviewContextValue) {
    return <div className='text-red-500 text-center p-4'>No valid order ID found!</div>;
  }

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={logError}
      onReset={handleErrorBoundaryReset}
    >
      <OrderReviewContext.Provider value={orderReviewContextValue}>
        <ExtendHead
          title={`${orderReviewContextValue.order.title} - Order Review`}
          description={`${orderReviewContextValue.order.title} - Order Review`}
        />
        <Header />
        <Main />
        <PageTopBackground />
      </OrderReviewContext.Provider>
    </ErrorBoundary>
  );
};

export const useOrderReviewContext = () => {
  const context = useContext(OrderReviewContext);
  if (!context) {
    throw new Error('OrderReviewContext must be used within OrderReview component');
  }
  return context;
};
