import { SITE_INFO } from '../../enums';

export const Header = () => {
  return (
    <header className='py-8 xl:pt-32 xl:pb-24 relative isolate z-0 '>
      <div className='fb-container'>
        <div className='flex flex-col gap-4'>
          <h2 className='capitalize text-center font-bold font-tti-bold text-[clamp(1.5rem,4vw,2.5rem)] leading-tight'>
            Become a Booster at{' '}
            <span className='text-brand-primary-color-1/30 bg-clip-text bg-[linear-gradient(293deg,var(--tw-gradient-stops))] from-brand-primary-color-1 to-brand-primary-color-light animate-text-gradient'>
              {SITE_INFO.url.hostname}
            </span>
          </h2>
          <p className='max-w-2xl mx-auto text-center text-white text-sm xl:text-base leading-relaxed font-normal font-tti-regular'>
            To become a Booster, you may fill the form below. If you will provide incorrect
            information or miss any parts of the form, your application may be declined without
            explaining the reason.
          </p>
        </div>
      </div>
    </header>
  );
};
