import { COMPANY_INFO } from '../../enums';

export const AddressInfo = () => {
  return (
    <div className='grid gap-8'>
      <h2 className='capitalize font-bold font-tti-bold text-[clamp(1.5rem,4vw,3.5rem)] leading-tight'>
        <span className='text-brand-primary-color-1/30 bg-clip-text bg-[linear-gradient(293deg,var(--tw-gradient-stops))] from-brand-primary-color-1 to-brand-primary-color-light animate-text-gradient'>
          {COMPANY_INFO.name}{' '}
        </span>{' '}
        {COMPANY_INFO.type}
      </h2>
      <address className='grid gap-4 not-italic font-oxanium text-base xl:text-xl leading-normal text-brand-black-10 font-medium'>
        <p className=''>
          {COMPANY_INFO.address.line1} <br />
          {COMPANY_INFO.address.line2} <br />
          {COMPANY_INFO.address.line3}
        </p>
        <p className=''>Customer support: {COMPANY_INFO.contacts.emails.customerSupport}</p>
        <p className=''>Business inquiries: {COMPANY_INFO.contacts.emails.businessInquiries}</p>
      </address>
    </div>
  );
};
