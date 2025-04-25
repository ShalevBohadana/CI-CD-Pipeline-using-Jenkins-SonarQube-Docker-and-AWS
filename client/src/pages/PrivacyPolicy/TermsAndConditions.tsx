import { Link } from 'react-router-dom';

import { SITE_INFO } from '../../enums';
import { ROUTER_PATH } from '../../enums/router-path';

export const TermsAndConditions = () => {
  return (
    <section>
      <div className='fb-container grid gap-10 xl:gap-16'>
        <div className='grid gap-4'>
          <h2 className='font-tti-regular text-[clamp(1.5rem,4vw,2rem)] font-normal leading-none capitalize'>
            <span className='text-brand-primary-color-1'>Terms and Conditions</span>
          </h2>
        </div>
        <div className='grid gap-0.5 text-brand-black-20 font-tti-regular font-normal text-lg xl:text-xl leading-relaxed'>
          <p className=''>
            {` This is important: Please ensure that you carefully read this
            Agreement (referred to as the 'Agreement' hereinafter). If you do
            not agree with any of the provisions stated in this Agreement, you
            are not eligible to confirm your registration, utilize any services
            provided by the current resource`}{' '}
            <Link
              to={ROUTER_PATH.ROOT}
              className='underline hover:text-brand-primary-shade-1 transition-colors'
            >
              {SITE_INFO.url.href}
            </Link>{' '}
            {`  (referred to as 'Fullboosts,' 'The Platform,' or 'The Website'), or
            engage in the buying, selling, or exchanging of goods through the
            functional capacity of this trading Platform.`}
          </p>
          <p className=''>
            {`The Agreement governs the relationship between You (also referred to as 'the User') as either a Seller or a Buyer (also collectively referred to as 'Parties,' or individually as 'the Party'), and Fullboosts. The Agreement defines the key terms and conditions, obligations, and rights of each Party in relation to transactions, the use of tools, applications, and any other services provided by Fullboosts. Both Parties have the right to view the Platform as the guarantor, and they also have the right to request arbitration to resolve any disputes that may arise.`}
          </p>
        </div>
      </div>
    </section>
  );
};
