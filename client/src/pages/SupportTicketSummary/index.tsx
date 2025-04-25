import { createContext, useContext, useMemo } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useParams } from 'react-router-dom';

import { ExtendHead } from '../../components/ExtendHead';
import { PageTopBackground } from '../../components/ui/PageTopBackground';
import { ErrorFallback } from '../../error/ErrorFallback';
import { logError } from '../../error/logError';
import { ErrorBoundaryResetHandler } from '../../error/utils';
import { useGetTicketQuery } from '../../redux/features/ticket/ticketApi';
import { TicketDataDb } from '../Dashboard/Admin/components/TicketSummaryItem';

import { Header } from './Header';
import { Main } from './Main';

type TTicketSummaryContext = {
  uid: string;
  ticket: Readonly<TicketDataDb>;
};
const TicketSummaryContext = createContext<TTicketSummaryContext | undefined>(undefined);

const handleErrorBoundaryReset: ErrorBoundaryResetHandler = (details) => {
  // Reset the state of your app so the error doesn't happen again
  console.log(details);
};

export const SupportTicketSummary = () => {
  const { uid } = useParams<{ uid: string }>();
  const { data: ticketRes, isLoading } = useGetTicketQuery(uid || '', {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });
  const ticketData = useMemo(() => ticketRes?.data || ({} as TicketDataDb), [ticketRes?.data]);
  const ticketSummaryContextValue = useMemo(
    () => ({
      uid: uid as string,
      ticket: ticketData,
    }),
    [uid, ticketData]
  );

  if (!isLoading && !ticketSummaryContextValue?.ticket) {
    return <p className='text-red-500 text-center'>No valid ticket ID found!</p>;
  }

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={logError}
      onReset={handleErrorBoundaryReset}
    >
      <TicketSummaryContext.Provider value={ticketSummaryContextValue}>
        <ExtendHead title='Support Ticket Summary' description='Support Ticket Summary page' />
        <Header />
        <Main />
        <PageTopBackground showMainImage showOvalShape />
      </TicketSummaryContext.Provider>
    </ErrorBoundary>
  );
};

export const useTicketSummaryContext = () => {
  const context = useContext(TicketSummaryContext);
  if (!context?.ticket) {
    throw new Error(`TicketSummaryContext must be used with TicketSummary component`);
  }
  return context;
};
