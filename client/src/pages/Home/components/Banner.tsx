import { LARGE_SCREEN, useMatchMedia } from '../../../hooks/useMatchMedia';
import { ReviewsWidget } from './ReviewsWidget';

export interface IBanner {
  id: string;
  title: {
    regular: {
      1?: string;
      2?: string;
    };
    gradient: {
      1?: string;
      2?: string;
    };
  };
  imageUrl: string;
}

interface BannerProps {
  banner: IBanner;
}

const createTitleString = ({ regular, gradient }: IBanner['title']) => {
  const regular1 = regular?.[1] || '';
  const regular2 = regular?.[2] || '';
  const gradient1 = gradient?.[1] || '';
  const gradient2 = gradient?.[2] || '';

  return `${gradient1} ${regular1} ${gradient2} ${regular2}`.trim();
};

export const Banner = ({ banner }: BannerProps) => {
  const {
    imageUrl,
    title: { regular, gradient },
  } = banner;
  const isLargeScreen = useMatchMedia(LARGE_SCREEN);
  const parallaxAmount = isLargeScreen ? 500 : 0;

  const GradientText = ({ children }: { children: string }) => (
    <span
      className='text-brand-primary-color-1/30 bg-clip-text 
                bg-[linear-gradient(293deg,var(--tw-gradient-stops))] 
                from-brand-primary-color-1 to-brand-primary-color-light 
                animate-text-gradient'
    >
      {children}
    </span>
  );
  return (
    <div className='grid grid-rows-1 grid-cols-1 relative isolate z-0 overflow-clip pt-10'>
      {/* Content Layer */}
      <div
        className='row-span-full col-span-full z-10 fb-container py-10 xl:py-16 
                    relative grid items-start gap-6'
      >
        <h1
          data-swiper-parallax={parallaxAmount}
          className='max-w-[958px] mx-auto text-center text-brand-black-5 
                   text-[clamp(1.75rem,5vw,2.5rem)] font-bold font-tti-bold 
                   leading-none xl:leading-tight'
        >
          {regular?.[1] && <span className='capitalize'>{regular[1]} </span>}
          {gradient?.[1] && <GradientText>{gradient[1].trim()}</GradientText>}
          <br className='hidden xl:block' />
          {gradient?.[2] && <GradientText>{gradient[2].trim()}</GradientText>}

          {regular?.[2] && <span>{regular[2]}</span>}
        </h1>

        <div className='mt-auto text-center'>
          <div className='inline-flex' data-swiper-parallax={parallaxAmount / 2}>
            <ReviewsWidget />
          </div>
        </div>
      </div>

      {/* Background Layers */}
      <div
        className='row-span-full col-span-full relative isolate -z-10 
                    overflow-clip grid grid-rows-1 grid-cols-1 
                    h-[30rem] xl:h-[29.4375rem]'
      >
        {/* Yellow Glow Effect */}
        <figure
          className='row-span-full col-span-full -z-10 
                   w-64 xl:w-[22.5rem] aspect-square -right-28 
                   top-1/4 blur-[6rem] rounded-circle 
                   bg-brand-yellow-550/10'
          aria-hidden='true'
        />

        {/* Dark Overlay */}
        <figure
          className='row-span-full col-span-full -z-20 w-full h-full 
                   inset-0 flex justify-center items-center 
                   bg-brand-black-100/60'
          aria-hidden='true'
        />

        {/* Background Image */}
        <figure
          className='row-span-full col-span-full -z-30 w-full h-full 
                        inset-0 flex justify-center items-center'
        >
          <picture className='w-full h-full flex justify-center items-center'>
            <img
              className='w-full h-full object-cover object-top'
              src={imageUrl}
              data-swiper-parallax={parallaxAmount * 2}
              alt={createTitleString({ regular, gradient })}
              loading='lazy'
              decoding='async'
              width={1920}
              height={375}
            />
          </picture>
        </figure>
      </div>
    </div>
  );
};
