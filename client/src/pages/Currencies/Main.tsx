import { CurrencyCard } from './components/CurrencyCard';
import { useCurrenciesContext } from '.';

export const Main = () => {
  const { gameCurrencies } = useCurrenciesContext();

  return (
    <main className='relative isolate z-0 py-8'>
      <div className='fb-container grid gap-10'>
        <header className='relative isolate z-50 overflow-clip py-10 xl:py-20'>
          <h2 className='capitalize text-center font-bold font-tti-bold text-[clamp(1.5rem,4vw,2.5rem)] leading-tight text-brand-primary-color-1/30 bg-clip-text bg-[linear-gradient(293deg,var(--tw-gradient-stops))]  from-brand-primary-color-1 to-brand-primary-color-light animate-text-gradient'>
            currencies
          </h2>
        </header>
        <div className='flex flex-wrap justify-center items-center gap-5 xl:gap-10 [--gap:theme(gap.5)] xl:[--gap:theme(gap.10)]'>
          {gameCurrencies?.map((currency) => <CurrencyCard key={currency.id} payload={currency} />)}
        </div>
      </div>
    </main>
  );
};
