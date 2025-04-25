import { Link } from 'react-router-dom';

import ourStorySrc from '../../assets/images/our-story-sec.png';
import { GradientFadePrimaryHr } from '../../components/ui/GradientFadePrimaryHr';
import { SITE_INFO } from '../../enums';
import { ROUTER_PATH } from '../../enums/router-path';

export const OurStory = () => {
  return (
    <section>
      <div className='fb-container grid gap-8 xl:gap-16'>
        <h2 className='text-white text-center font-bold font-tti-bold text-[clamp(1.5rem,4vw,2.5rem)] leading-tight capitalize'>
          Our Story
        </h2>
        <div className='grid xl:grid-cols-2 gap-8 items-center'>
          {/* left col  */}
          <div className='grid grid-cols-1 items-center gap-4 text-sm xl:text-lg leading-relaxed text-brand-black-10 font-normal font-oxanium'>
            <h3 className='font-tti-regular font-normal text-brand-primary-color-1 text-lg xl:text-xl capitalize'>
              Our Story
            </h3>
            <GradientFadePrimaryHr />
            <p className=''>
              Welcome to {SITE_INFO.name.capitalized}, the result of a shared passion between two
              lifelong friends. With a deep love for gaming, we set out to create a company that
              provides top-notch online game boosting and currency selling services.
            </p>
            <p className=''>
              As avid gamers ourselves, we understand the challenges players face in their pursuit
              of gaming excellence. We assembled a team of skilled and dedicated players who share
              our commitment to skill, integrity, and customer satisfaction. Together, we aim to
              empower gamers worldwide by offering professional, reliable, and secure services.
            </p>
            <p className=''>
              At {SITE_INFO.name.capitalized}, we prioritize delivering exceptional gaming
              experiences while upholding the values of fair play and sportsmanship. Our team
              strictly adheres to game publishers&apos; terms of service, ensuring the security of
              your accounts and data. We also place a strong emphasis on customer satisfaction, with
              our responsive support team available 24/7 to assist you.
            </p>
            <p className=''>
              <Link
                to={ROUTER_PATH.WORK_WITH_US}
                className='text-brand-primary-color-1 hover:underline transition-colors hover:text-brand-primary-color-light'
              >
                Join us
              </Link>{' '}
              at {SITE_INFO.name.capitalized} as we shape the future of online gaming. Let&apos;s
              embark on extraordinary adventures, surpass boundaries, and achieve new levels of
              gaming success together. Explore our services and experience the transformative power
              of our expertise.
            </p>
          </div>
          {/* right col  */}
          <figure className=''>
            <picture className='inline-flex justify-center items-center'>
              <source media='(min-width: 350px)' srcSet={ourStorySrc} />
              <img
                src={ourStorySrc}
                alt='description'
                className='object-cover inline-flex justify-center items-center rounded-2xl'
                loading='lazy'
                width='644'
                height='550'
                decoding='async'
                // fetchPriority="low"
              />
            </picture>
          </figure>
        </div>
      </div>
    </section>
  );
};
