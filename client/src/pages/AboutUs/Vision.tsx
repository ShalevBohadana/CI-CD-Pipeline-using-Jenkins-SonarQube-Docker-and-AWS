import { SITE_INFO } from '../../enums';

export const Vision = () => {
  return (
    <section>
      <div className='fb-container text-center grid gap-8 xl:gap-16'>
        <h2 className='text-white font-bold font-tti-bold text-[clamp(1.5rem,4vw,2.5rem)] leading-tight capitalize'>
          <span className='text-brand-primary-color-1/30 bg-clip-text bg-[linear-gradient(293deg,var(--tw-gradient-stops))] from-brand-primary-color-1 to-brand-primary-color-light animate-text-gradient'>
            {SITE_INFO.name.capitalized}{' '}
          </span>
          Vision
        </h2>
        <p className='text-lg xl:text-2xl leading-tight font-oxanium font-medium text-white'>
          We aspire to enhance the gaming journey of players by providing them with exceptional
          boosting options that elevate their skills, unlock new levels, and conquer challenges with
          confidence. Additionally, we strive to be the trusted source for in-game currency,
          enabling gamers to access the resources they need to enhance their gameplay and unlock
          exciting opportunities within the virtual worlds they explore. Our commitment is to
          deliver reliable, secure, and efficient services, ensuring that players have a seamless
          and enjoyable experience while achieving their gaming aspirations. Through our services,
          we aim to empower gamers and contribute to the growth and success of the gaming community
          as a whole.
        </p>
      </div>
    </section>
  );
};
