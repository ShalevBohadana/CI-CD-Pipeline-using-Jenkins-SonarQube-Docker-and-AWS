import { COMPANY_INFO } from '../../enums';

export const AgreementInquiry = () => {
  return (
    <section>
      <div className='fb-container'>
        <div className='grid gap-6 font-tti-demi-bold font-semibold text-sm xl:text-xl leading-none'>
          <p className='text-brand-black-20'>
            If you have any inquiries regarding this Agreement, please contact{' '}
          </p>
          <p className='text-brand-primary-color-1'>
            {COMPANY_INFO.contacts.emails.customerSupport}
          </p>
        </div>
      </div>
    </section>
  );
};
