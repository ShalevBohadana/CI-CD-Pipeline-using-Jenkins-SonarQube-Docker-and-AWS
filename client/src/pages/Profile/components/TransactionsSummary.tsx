/* eslint-disable prettier/prettier */
/* eslint-disable react/no-array-index-key */
import { useGetWalletQuery } from '../../../redux/features/wallet/walletApi';

import { TransactionSummaryItem } from './TransactionSummaryItem';

export const TransactionsSummary = () => {
  const { data: wallet } = useGetWalletQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  // console.log(wallet)
  const transactions = wallet?.data?.transactions;
  // console.log(transactions)
  return (
    <div className='rounded-xl border border-brand-primary-color-1 p-4 xl:p-8'>
      <div className='grid gap-4 h-full max-h-96 minimal-scrollbar overflow-auto px-1'>
        {transactions?.map((summary, index: number) => (
          <TransactionSummaryItem key={index} summary={summary} />
        ))}
      </div>
    </div>
  );
};
