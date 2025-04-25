import { useMemo } from 'react';

import { useGetTicketsQuery } from '../../../../redux/features/ticket/ticketApi';
import { TicketSummaryItem } from '../../Admin/components/TicketSummaryItem';

export const Main = () => {
  const ticketParams = new URLSearchParams({
    limit: '100',
  });
  const { data: ticketsRes } = useGetTicketsQuery(ticketParams.toString(), {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });
  const tickets = useMemo(() => ticketsRes?.data || [], [ticketsRes?.data]);
  return (
    <main className='flex flex-col gap-8 overflow-auto minimal-scrollbar min-h-[theme(height.40)]'>
      <div className='h-[inherit] grid gap-y-4 overflow-auto minimal-scrollbar'>
        {tickets?.map((item) => <TicketSummaryItem key={item._id} payload={item} />)}
      </div>
    </main>
  );
};
