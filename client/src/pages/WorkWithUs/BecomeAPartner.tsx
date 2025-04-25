import { Link } from 'react-router-dom';

import bannerBgImgSrc from '../../assets/images/become-a-partner-bg.png';
import bannerFrontImgSrc from '../../assets/images/become-a-partner-front.png';
import { SITE_INFO } from '../../enums';
import { ROUTER_PATH } from '../../enums/router-path';

export const BecomeAPartner = () => {
  return (
    <section className='relative isolate z-0 mt-12'>
      <div className='fb-container relative z-10 '>
        <div className='flex flex-col xl:flex-row justify-between'>
          <div className='relative isolate z-10 flex flex-col gap-4 py-4 self-center'>
            <h1 className='xl:max-w-lg capitalize font-bold font-tti-bold text-[clamp(1.5rem,4vw,2.5rem)] leading-tight'>
              Welcome To <br className='' /> {SITE_INFO.name.capitalized}, Friends!
            </h1>

            <p className='xl:max-w-xl font-oxanium text-base text-white leading-relaxed font-normal pb-4'>
              We are one of the largest boosting and in-game currency broker services in the world,
              boasting a large customer base and unparalleled customer service.
            </p>
            <Link
              to={ROUTER_PATH.WORK_WITH_US}
              className="self-start inline-flex justify-center items-center text-center px-6 py-5 text-base leading-none rounded-md rounded-bl-2xl font-medium font-tti-medium text-white bg-fading-theme-gradient-light-to-deep hover:bg-[linear-gradient(theme('colors.brand.primary.color-1')_100%,theme('colors.brand.primary.color-1')_100%)] transition-all"
            >
              Become a partner
            </Link>
          </div>
          <figure className='relative isolate z-0 after:absolute after:z-10 after:w-28 after:xl:w-56 after:pointer-events-none after:aspect-square after:left-1/2 after:-translate-x-1/2 after:top-1/4 after:blur-[8rem] after:rounded-circle after:bg-brand-primary-color-1/70'>
            <picture className='flex justify-center items-center'>
              <source media='(min-width: 350px)' srcSet={bannerFrontImgSrc} />
              <img
                src={bannerFrontImgSrc}
                alt='description'
                className='-mt-28 xl:-mt-16'
                loading='lazy'
                width=''
                height=''
                decoding='async'
                // fetchPriority="low"
              />
            </picture>
          </figure>
        </div>
      </div>
      <figure className='absolute w-full h-full inset-0 flex justify-center items-center bg-brand-primary-color-1/10 -z-20' />
      <figure className='absolute w-full h-full inset-0 flex justify-center items-center -z-30'>
        <picture className='w-full h-full flex justify-center items-center'>
          <img className='w-full h-full object-cover' src={bannerBgImgSrc} alt='header' />
        </picture>
      </figure>
    </section>
  );
};
