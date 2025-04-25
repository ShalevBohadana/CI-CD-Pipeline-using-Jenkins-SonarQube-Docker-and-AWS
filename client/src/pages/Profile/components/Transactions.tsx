/* eslint-disable prettier/prettier */
/* eslint-disable react/no-array-index-key */
import { ChangeEventHandler } from 'react';

import { Dropdown } from '../../../components/ui/Dropdown';
import { useGetWalletQuery } from '../../../redux/features/wallet/walletApi';
import { InputToggleBox } from '../../OffersSingle/components/OfferFilterInputBox';

import { TransactionItem } from './TransactionItem';
import { transactionDataType } from '../../BalanceRecharge/Main';

export const Transactions = () => {
  const sortOptions = [
    'Chief Data Manager',
    'Legacy Configuration Planner',
    'Product Group Consultant',
    'Direct Integration Architect',
    'Lead Quality Technician',
    'Customer Accounts Officer',
    'Direct Accountability Agent',
    'Dynamic Web Administrator',
  ];
  const handleSortSelect = (value: string) => {
    console.log(`Selected option: ${value}`);
  };

  const handleShowIncompleteTransactionFilter: ChangeEventHandler<HTMLInputElement> = (ev) => {
    console.log(ev.target.checked);
  };

  // console.log(authStateData?.userId)
  // ! for getting single user with id
  const { data: wallet } = useGetWalletQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  const transactions = wallet?.data?.transactions;
  return (
    <div className='flex flex-col gap-8 pt-6'>
      <div className='grid gap-4 px-4 xl:px-10'>
        <InputToggleBox
          type='checkbox'
          label='Show incomplete transactions'
          onChange={handleShowIncompleteTransactionFilter}
        />
        {/* sort dropdown  */}
        <div className='w-full max-w-xs'>
          <Dropdown
            className='bg-brand-primary-color-1/[.03]'
            defaultLabel='any type'
            selectHandler={handleSortSelect}
            options={sortOptions}
          />
        </div>
      </div>
      <div className='grid gap-4 xl:gap-8 h-full max-h-96 minimal-scrollbar overflow-auto px-4 xl:px-6'>
        {transactions?.map((transaction: transactionDataType, index: number) => (
          <TransactionItem key={index} transaction={transaction} />
        ))}
      </div>
    </div>
  );
};
