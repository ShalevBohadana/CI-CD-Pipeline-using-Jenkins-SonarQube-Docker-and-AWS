import { CurrencySymbol } from '../../../components/ui/CurrencySymbol';
import { GradientBordered } from '../../../components/ui/GradientBordered';
import { Money } from '../../../components/ui/Money';
import { useGetWalletQuery } from '../../../redux/features/wallet/walletApi';
import { TransactionsSummary } from './TransactionsSummary';

interface BaseTransaction {
  amount: number;
  paymentStatus: 'paid' | 'unpaid' | 'pending';
  isPaid: boolean;
  sessionId?: string;
  paymentId?: string;
  paidAt?: string;
}

type TransactionType = BaseTransaction & {
  type: 'ordered' | 'deposit' | 'withdraw';
};

type ProcessedTransactionType = 'deposit' | 'withdraw';
interface ProcessedTransaction {
  type: ProcessedTransactionType;
  amount: number;
  isPaid: boolean;
  status: 'paid' | 'unpaid' | 'pending';
}

const mapTransaction = (t: TransactionType): ProcessedTransaction => {
  return {
    type: t.type === 'ordered' ? 'deposit' : (t.type as ProcessedTransactionType),
    amount: t.amount,
    isPaid: t.isPaid,
    status: t.paymentStatus,
  };
};

const calculateTotal = (
  transactions: ProcessedTransaction[] = [],
  type: ProcessedTransactionType
): number => {
  return transactions
    .filter((t) => t.type === type && t.isPaid && t.status === 'paid') // רק עסקאות מאושרות
    .reduce((sum, t) => sum + t.amount, 0);
};

export const WalletOverviewTabContent = () => {
  const {
    data: walletData,
    isLoading,
    error,
  } = useGetWalletQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  if (isLoading) {
    return <div className='text-white text-center'>Loading wallet data...</div>;
  }

  if (error) {
    return <div className='text-red-500 text-center'>Error loading wallet data</div>;
  }

  // השתמש בערך balance מהשרת במקום לחשב מחדש
  const balance = walletData?.data?.balance ?? 0;
  const transactions = (walletData?.data?.transactions ?? []).map(mapTransaction);

  // חישוב סה"כ הפקדות ומשיכות רק לצורך תצוגה
  const totalDeposits = calculateTotal(transactions, 'deposit');
  const totalWithdrawals = calculateTotal(transactions, 'withdraw');

  return (
    <div className='grid gap-6 xl:gap-8 px-2'>
      <GradientBordered className='rounded-[1.25rem] before:rounded-[1.25rem] before:bg-gradient-bordered-deep max-w-md mx-auto grid gap-10 pb-14'>
        <div className='w-full bg-brand-primary-color-1/10 px-4 py-5 rounded-b-[1.25rem] flex gap-2 items-start justify-center'>
          <picture className='inline-flex justify-center items-center'>
            <source media='(min-width: 350px)' srcSet='/favicon.svg' />
            <img
              src='/favicon.svg'
              alt='Balance Icon'
              className='inline-flex w-8 h-9'
              loading='lazy'
              width='32'
              height='36'
              decoding='async'
            />
          </picture>
          <h2 className='font-tti-bold font-bold text-[clamp(1.5rem,4vw,2.8125rem)] leading-none text-white'>
            Balance
          </h2>
        </div>

        {balance !== undefined && (
          <>
            <GradientBordered className='px-4 py-3 rounded-[.625rem] before:rounded-[.625rem] before:bg-gradient-bordered-deep bg-brand-primary-color-1/[.03] max-w-[theme(width.72)] mx-auto text-center'>
              <span className='flex gap-1.5 justify-center text-white text-[clamp(1.15rem,4vw,2.25rem)] leading-none font-semibold font-oxanium'>
                <CurrencySymbol className='inline-flex justify-center w-3' />
                <Money value={balance} />
              </span>
            </GradientBordered>

            <div className='grid grid-cols-2 gap-4 px-4'>
              <div className='text-center'>
                <p className='text-brand-primary-color-light text-sm'>Total Deposits</p>
                <p className='text-white font-semibold'>
                  <CurrencySymbol className='inline-flex mr-1 w-2' />
                  <Money value={totalDeposits} />
                </p>
              </div>
              <div className='text-center'>
                <p className='text-brand-primary-color-light text-sm'>Total Withdrawals</p>
                <p className='text-white font-semibold'>
                  <CurrencySymbol className='inline-flex mr-1 w-2' />
                  <Money value={totalWithdrawals} />
                </p>
              </div>
            </div>
          </>
        )}
      </GradientBordered>

      <h2 className='text-brand-primary-color-light text-base font-medium leading-none text-center'>
        Transactions summary
      </h2>
      <div className='w-full max-w-6xl mx-auto'>
        <TransactionsSummary />
      </div>
    </div>
  );
};
