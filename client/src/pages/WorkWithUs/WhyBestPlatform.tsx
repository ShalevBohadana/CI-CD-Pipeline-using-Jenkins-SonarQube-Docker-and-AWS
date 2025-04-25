import { useEffect, useState } from 'react';

import { SITE_INFO } from '../../enums';

import { BestPlatformCard } from './components/BestPlatformCard';

export type BestPlatformReason = {
  id: string;
  title: string;
  description: string;
  iconType: 'automation' | 'communication' | 'simple';
};

export const WhyBestPlatform = () => {
  const [reasons, setReasons] = useState<BestPlatformReason[]>();
  useEffect(() => {
    if (reasons?.length === undefined || reasons?.length === 0) {
      fetch('./data/whyBestPlatform.json')
        .then((res) => res.json())
        .then((data: BestPlatformReason[]) => {
          // console.log(data);
          setReasons(data);
        })
        .catch(console.error);
    }
  }, [reasons?.length]);

  return (
    <section className='pt-36 pb-24'>
      <div className='fb-container'>
        <div className='flex flex-col gap-24'>
          <h2 className='capitalize text-center font-bold font-tti-bold text-[clamp(1.5rem,4vw,2.5rem)] leading-tight'>
            Why{' '}
            <span className='text-brand-primary-color-1/30 bg-clip-text bg-[linear-gradient(293deg,var(--tw-gradient-stops))] from-brand-primary-color-1 to-brand-primary-color-light animate-text-gradient'>
              {SITE_INFO.name.capitalized} is the best platform
            </span>{' '}
            to work with
          </h2>
          <div className='grid xl:grid-cols-3 gap-28 xl:gap-8'>
            {reasons?.map((reason) => <BestPlatformCard key={reason.id} card={reason} />)}
          </div>
        </div>
      </div>
    </section>
  );
};
