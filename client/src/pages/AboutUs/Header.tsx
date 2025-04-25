import { SITE_INFO } from '../../enums';

export const Header = () => {
  return (
    <header className='relative isolate z-0 overflow-clip py-10 xl:py-20'>
      <div className='fb-container grid gap-4'>
        <h2 className='capitalize font-bold font-tti-bold text-[clamp(1.85rem,5vw,3.5rem)] leading-tight'>
          <span className='flex justify-center text-center text-brand-primary-color-1/30 bg-clip-text bg-[linear-gradient(293deg,var(--tw-gradient-stops))] from-brand-primary-color-1 to-brand-primary-color-light animate-text-gradient'>
            About us
          </span>
        </h2>
        <p className='text-center text-sm xl:text-lg leading-relaxed text-brand-black-20 font-normal font-oxanium'>
          {SITE_INFO.name.capitalized} was established with the primary objective of serving as an
          invaluable companion within the realm of massively multiplayer online (MMO) games. As a
          trusted ally, our platform endeavours to connect you with adept individuals capable of
          swiftly resolving any challenges pertaining to your in-game character or account. By doing
          so, we aim to enhance your gaming experience to its utmost level of satisfaction and
          enjoyment.
        </p>
      </div>
    </header>
  );
};
