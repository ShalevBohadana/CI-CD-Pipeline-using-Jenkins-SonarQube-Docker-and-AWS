import { useGetGameCurrenciesQuery } from '../../../../redux/features/gameCurrency/gameCurrencyApi';
import { CurrenciesSummaryItem } from '../components/CurrenciesSummaryItem';

export const Main = () => {
  const currenciesParams = new URLSearchParams({
    limit: '200',
  });
  const { data: currenciesRes } = useGetGameCurrenciesQuery(currenciesParams.toString(), {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
  const gameCurrencies = currenciesRes?.data || [];

  return (
    <main className='flex flex-col gap-8 overflow-auto minimal-scrollbar min-h-[theme(height.40)]'>
      <div className='h-[inherit] grid gap-y-4 overflow-auto minimal-scrollbar'>
        {gameCurrencies?.map((item) => <CurrenciesSummaryItem key={item._id} payload={item} />)}
      </div>

      {/* <OrderSummaryModal /> */}
    </main>
  );
};
