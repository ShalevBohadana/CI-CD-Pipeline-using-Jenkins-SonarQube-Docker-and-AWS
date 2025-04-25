import headerBg from '../../assets/images/work-with-us-bannerpng.png';
import { SITE_INFO } from '../../enums';

export const Header = () => {
  return (
    <header className='relative isolate z-0 overflow-hidden'>
      <div className='fb-container py-11 xl:py-32 relative z-10 '>
        <div className='xl:max-w-lg flex flex-col gap-6 backdrop-blur-sm py-6 xl:py-11'>
          <h1 className='text-brand-black-5 text-[clamp(1.75rem,5vw,2.5rem)] font-bold font-tti-bold leading-none xl:leading-tight'>
            Work With <br className='hidden xl:block' />
            <span className='text-brand-primary-color-1/30 bg-clip-text bg-[linear-gradient(293deg,var(--tw-gradient-stops))]  from-brand-primary-color-1 to-brand-primary-color-light animate-text-gradient'>
              {SITE_INFO.name.capitalized}
            </span>
          </h1>

          <p className='font-oxanium text-base text-white leading-relaxed font-medium'>
            We are one of the largest boosting and in-game currency broker services in the world,
            boasting a large customer base and unparalleled customer service. <br /> Apply today to
            join their ranks!
          </p>
        </div>
      </div>
      <figure className='absolute -z-10 w-64 xl:w-[22.5rem] aspect-square left-[55%] top-1/4 blur-[6rem] rounded-circle bg-brand-primary-color-1/70' />
      <figure className='absolute w-full h-full inset-0 flex justify-center items-center bg-brand-black-100/60 -z-20' />
      <figure className='absolute w-full h-full inset-0 flex justify-center items-center -z-30'>
        <picture className='w-full h-full flex justify-center items-center'>
          <img className='w-full h-full object-cover' src={headerBg} alt='header' />
        </picture>
      </figure>
    </header>
  );
};
