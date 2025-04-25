import { useParams } from 'react-router-dom';

import { useGetGuideQuery } from '../../redux/features/guide/guideApi';
import { CommonParams } from '../../types/globalTypes';

export const Header = () => {
  // const { featuredGuide: guide } = useGuidesSingleContext();
  const { uid } = useParams<CommonParams>();
  const { data: currentGuideRes } = useGetGuideQuery(uid || '', {
    skip: !uid,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });
  const guide = currentGuideRes?.data;

  return (
    <header className='py-10 xl:py-24 relative isolate z-0 '>
      <div className='fb-container'>
        <div className='flex flex-col items-center gap-2'>
          <h2 className='capitalize font-bold font-tti-bold text-[clamp(1.85rem,5vw,3rem)] leading-tight'>
            <span className='flex text-brand-primary-color-1/30 bg-clip-text bg-[linear-gradient(293deg,var(--tw-gradient-stops))] from-brand-primary-color-1 to-brand-primary-color-light animate-text-gradient'>
              {guide?.title}
            </span>
          </h2>
          <p className='max-w-lg text-white text-sm xl:text-base leading-relaxed font-normal font-oxanium'>
            {guide?.title}
          </p>
        </div>
      </div>
    </header>
  );
};
