import { TrustPilotIcon } from '../../../components/icons/icons';

import { CheckoutFeaturedGames } from './CheckoutFeaturedGames';

export const CanceledTabContent = () => {
  return (
    <div className='pt-10 grid gap-10 xl:gap-20'>
      <div className=''>
        <h2 className='text-center font-bold font-tti-bold text-[clamp(1.75rem,5vw,3.5rem)] leading-tight capitalize text-brand-primary-color-1/30 bg-clip-text bg-[linear-gradient(293deg,var(--tw-gradient-stops))]  from-brand-primary-color-1 to-brand-primary-color-light animate-text-gradient'>
          Something went wrong!
        </h2>
        <div className='flex flex-wrap items-baseline justify-center gap-0.5'>
          <span className='text-brand-black-20 font-tti-regular font-normal text-xl xl:text-2xl leading-none'>
            Rate us on
          </span>
          <TrustPilotIcon className='w-6 h-6' />
          <span className='pt-[3px] text-xl xl:text-2xl leading-none font-medium font-tti-medium'>
            Trustpilot
          </span>
        </div>
      </div>

      <CheckoutFeaturedGames />
    </div>
  );
};
