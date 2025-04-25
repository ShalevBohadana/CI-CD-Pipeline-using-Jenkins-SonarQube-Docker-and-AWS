import guidesHeaderImgSrc from '../../assets/images/guides-main-header.png';

export const Header = () => {
  return (
    <header className='py-10 relative isolate z-0 '>
      <div className='fb-container'>
        <div className='flex flex-col-reverse xl:flex-row gap-y-12 xl:gap-5 justify-between items-center'>
          <div className='flex flex-col gap-4'>
            <h2 className='capitalize font-bold font-tti-bold text-[clamp(1.5rem,4vw,2.5rem)] leading-tight'>
              Guides{' '}
              <span className='text-brand-primary-color-1/30 bg-clip-text bg-[linear-gradient(293deg,var(--tw-gradient-stops))] from-brand-primary-color-1 to-brand-primary-color-light animate-text-gradient'>
                for gamers
              </span>
            </h2>
            <p className='max-w-lg text-white text-sm xl:text-base leading-relaxed font-normal font-oxanium'>
              Looking for comprehensive guides to improve your gaming skills? Look no further! Our
              website offers a wide range of guides, from beginner to pro, to help you achieve
              gaming greatness.
            </p>

            <div className='pt-4'>
              <button
                type='button'
                className='inline-flex justify-center items-center px-5 xl:px-8 py-3 xl:py-5 text-base xl:text-base leading-tight rounded-md font-medium font-tti-medium text-white bg-fading-theme-gradient-light-to-deep hover:bg-[linear-gradient(theme("colors.brand.primary.color-1")_100%,theme("colors.brand.primary.color-1")_100%)] transition-all'
              >
                Registration
              </button>
            </div>
          </div>
          <figure className='relative isolate z-0 '>
            <picture className='relative z-10'>
              <source media='(min-width: 350px)' srcSet={guidesHeaderImgSrc} />
              <img
                src={guidesHeaderImgSrc}
                alt='description'
                className='max-w-md'
                loading='lazy'
                width=''
                height=''
                decoding='async'
                // fetchPriority="low"
              />
            </picture>
            <div className='pointer-events-none absolute z-20 w-1/2 aspect-square left-1/4 top-9 xl:top-16 blur-3xl rounded-circle bg-brand-primary-color-1/60' />
            <div className='absolute -z-10 w-1/2 aspect-square left-1/4 top-1/3 blur-3xl rounded-circle bg-brand-purple-550/10' />
          </figure>
        </div>
      </div>
    </header>
  );
};
