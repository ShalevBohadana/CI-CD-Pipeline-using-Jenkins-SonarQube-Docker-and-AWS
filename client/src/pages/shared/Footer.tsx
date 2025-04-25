import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import amexSrc from '../../assets/images/payment-icons-amex.svg';
import googleSrc from '../../assets/images/payment-icons-google.svg';
import mastercardSrc from '../../assets/images/payment-icons-mastercard.svg';
import payoneerSrc from '../../assets/images/payment-icons-payoneer.svg';
import visaSrc from '../../assets/images/payment-icons-visa.svg';
import { LogoImg } from '../../components/ui/LogoImg';
import { NewsletterForm } from '../../components/ui/NewsletterForm';
import { COMPANY_INFO, SITE_INFO } from '../../enums';
import { ROUTE_PARAM, ROUTER_PATH, RouterPath } from '../../enums/router-path';
import { useGetGamesQuery } from '../../redux/features/game/gameApi';

export const ACCEPTED_PAYMENT_METHODS_LOGOS_SOURCES: string[] = [
  amexSrc,
  googleSrc,
  mastercardSrc,
  payoneerSrc,
  visaSrc,
];

export type TopLevelLinkItem = {
  to: RouterPath;
  label: string;
};

export const FULLBOOSTS_LINKS: TopLevelLinkItem[] = [
  { to: ROUTER_PATH.ABOUT_US, label: 'About us' },
  { to: ROUTER_PATH.WORK_WITH_US, label: 'Work with us' },
  { to: ROUTER_PATH.GUIDES, label: 'Guides' },
  { to: ROUTER_PATH.SUPPORT, label: 'Get help' },
];

export const LEGAL_LINKS: TopLevelLinkItem[] = [
  { to: ROUTER_PATH.TERMS_AND_CONDITIONS, label: 'Terms and conditions' },
  { to: ROUTER_PATH.PRIVACY_POLICY, label: 'Privacy policy' },
  { to: ROUTER_PATH.REFUND_POLICY, label: 'Refund policy' },
  { to: ROUTER_PATH.COOKIE_POLICY, label: 'Cookies policy' },
  { to: ROUTER_PATH.COPYRIGHT_NOTICE, label: 'Copyright notice' },
  { to: ROUTER_PATH.CREDENTIAL_ON_FILE, label: 'Credential on file agreement' },
];

export const Footer = () => {
  const date = new Date();
  const CURRENT_YEAR = date.getFullYear();

  const { data: gamesData } = useGetGamesQuery('', {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
  const gamesDataFromDb = gamesData?.data;

  return (
    <div className='w-full bg-brand-black-100'>
      <footer className='py-10 xl:py-20 relative isolate z-0 overflow-hidden'>
        <div className='fb-container max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8'>
          {/* Main Footer Content */}
          <div className='grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12'>
            {/* Logo and Newsletter Section */}
            <div className='col-span-1 md:col-span-12 xl:col-span-4'>
              <div className='flex flex-col items-center xl:items-start gap-6'>
                <Link to={ROUTER_PATH.ROOT} className='block mb-4'>
                  <LogoImg />
                </Link>
                <div className='w-full max-w-sm'>
                  <h5 className='font-tti-demi-bold font-semibold text-xl text-brand-black-10 mb-4 text-center xl:text-left'>
                    Don't miss our latest news
                  </h5>
                  <NewsletterForm />
                </div>
              </div>
            </div>

            {/* Fullboosts Links Section */}
            <div className='col-span-1 md:col-span-4 xl:col-span-2'>
              <h5 className='text-white font-tti-demi-bold font-semibold text-xl mb-6'>
                {SITE_INFO.name.capitalized}
              </h5>
              <nav className='flex flex-col gap-4'>
                {FULLBOOSTS_LINKS?.map(({ to, label }) => (
                  <Link
                    key={uuidv4()}
                    to={to}
                    className='text-brand-black-10 hover:text-brand-primary-color-1 
                             hover:underline hover:underline-offset-4 transition-colors'
                  >
                    {label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Legal Links Section */}
            <div className='col-span-1 md:col-span-4 xl:col-span-2'>
              <h5 className='text-white font-tti-demi-bold font-semibold text-xl mb-6'>Legal</h5>
              <nav className='flex flex-col gap-4'>
                {LEGAL_LINKS?.map(({ to, label }) => (
                  <Link
                    key={uuidv4()}
                    to={to}
                    className='text-brand-black-10 hover:text-brand-primary-color-1 
                             hover:underline hover:underline-offset-4 transition-colors'
                  >
                    {label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Games Section */}
            <div className='col-span-1 md:col-span-4 xl:col-span-4'>
              <h5 className='text-white font-tti-demi-bold font-semibold text-xl mb-6'>Games</h5>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                {gamesDataFromDb?.length
                  ? gamesDataFromDb.map((item) => (
                      <Link
                        key={item._id}
                        to={ROUTER_PATH.GAMES_SINGLE.replace(ROUTE_PARAM.UID, item.uid)}
                        className='text-brand-black-10 hover:text-brand-primary-color-1 
                                 hover:underline hover:underline-offset-4 transition-colors'
                      >
                        {item.name}
                      </Link>
                    ))
                  : null}
              </div>
            </div>
          </div>

          {/* Divider */}
          <hr className='border-brand-black-90 my-8' />

          {/* Footer Bottom */}
          <div className='flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4'>
            <p className='text-brand-black-50 text-center md:text-left text-base'>
              © {COMPANY_INFO.name} {COMPANY_INFO.type} {CURRENT_YEAR}. All rights reserved.
            </p>
            <div className='flex flex-wrap justify-center gap-4'>
              {ACCEPTED_PAYMENT_METHODS_LOGOS_SOURCES.map((src) => (
                <img
                  key={uuidv4()}
                  src={src}
                  alt='Payment method'
                  className='w-9 h-7 xl:w-12 xl:h-8'
                  loading='lazy'
                  width='46'
                  height='32'
                  decoding='async'
                />
              ))}
            </div>
          </div>
        </div>

        {/* Background Decoration */}
        <div className='absolute -z-10 w-[28rem] aspect-square -right-64 -bottom-40 blur-[6rem] rounded-full bg-brand-blue-550/10' />
      </footer>
    </div>
  );
};
