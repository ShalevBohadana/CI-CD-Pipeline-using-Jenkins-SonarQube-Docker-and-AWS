import { useParams } from 'react-router-dom';

import { useGetGuideQuery } from '../../redux/features/guide/guideApi';
import { CommonParams } from '../../types/globalTypes';
import { sanitizeHTML } from '../../utils/DOMPurifier';

import './css/guide-details.css';

export const Main = () => {
  const { uid } = useParams<CommonParams>();
  const { data: currentGuideRes } = useGetGuideQuery(uid || '', {
    skip: !uid,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });
  const guide = currentGuideRes?.data;

  return (
    <main className='relative isolate z-0 py-4 xl:py-11'>
      <div className='fb-container'>
        <div
          className='flex flex-col gap-10 xl:gap-20'
          data-dynamic-markup='guide-details'
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: sanitizeHTML(guide?.details || ''),
          }}
        >
          {/* <div className="flex gap-8 xl:gap-16 flex-col">
            <h2 className="capitalize text-brand-primary-color-1 font-oxanium text-[clamp(1.125rem,4vw,1.5rem)] leading-none font-normal">
              Our platform ensures a smooth refund process, which consists of
              two steps:
            </h2>
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <h3 className="capitalize text-brand-primary-color-1 font-tti-regular text-lg xl:text-xl leading-none font-normal">
                  step 01
                </h3>
                <div className="h-px bg-[linear-gradient(293deg,var(--tw-gradient-stops))] to-brand-primary-color-1/30 from-brand-primary-color-1/5" />
                <p className="text-brand-black-20 font-tti-regular font-normal text-sm xl:text-lg leading-relaxed">
                  The refunded amount will be credited to your website balance.
                  If you prefer, you can utilize this balance for future
                  purchases by selecting {`"account balance"`} as your payment
                  method.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="capitalize text-brand-primary-color-1 font-tti-regular text-lg xl:text-xl leading-none font-normal">
                  step 02
                </h3>
                <div className="h-px bg-[linear-gradient(293deg,var(--tw-gradient-stops))] to-brand-primary-color-1/30 from-brand-primary-color-1/5" />
                <p className="text-brand-black-20 font-tti-regular font-normal text-sm xl:text-lg leading-relaxed">
                  The refunded amount will be credited to your website balance.
                  If you prefer, you can utilize this balance for future
                  purchases by selecting {`"account balance"`} as your payment
                  method.
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-8 xl:gap-16 flex-col">
            <h2 className="relative pb-1 after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-[linear-gradient(293deg,var(--tw-gradient-stops))] to-brand-primary-color-1/30 from-brand-primary-color-1/5 capitalize text-brand-primary-color-1 font-oxanium text-[clamp(1.125rem,4vw,1.5rem)] leading-none font-normal">
              You are eligible to request a refund from your{' '}
              {SITE_INFO.name.capitalized} balance in the following cases:
            </h2>
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-3 xl:gap-6">
                <p className="text-brand-black-20 font-tti-regular font-normal text-sm xl:text-lg leading-relaxed">
                  <span className="text-brand-primary-color-1">
                    1. Order Cancellation:{' '}
                  </span>
                  <span className=""> If your order has been cancelled.</span>
                </p>
                <p className="text-brand-black-20 font-tti-regular font-normal text-sm xl:text-lg leading-relaxed">
                  <span className="text-brand-primary-color-1">
                    2. Poor Quality of Service:{' '}
                  </span>
                  <span className="">
                    In the event of extremely poor service quality provided by
                    your booster (please note that a thorough investigation by
                    management is required before a decision can be reached).
                  </span>
                </p>
                <p className="text-brand-black-20 font-tti-regular font-normal text-sm xl:text-lg leading-relaxed">
                  <span className="text-brand-primary-color-1">
                    3. Change of Mind:{' '}
                  </span>
                  <span className="">
                    If you decide not to proceed with the services after placing
                    an order (partial refunds will be issued based on the
                    current progress of the order)..
                  </span>
                </p>
                <p className="text-brand-black-20 font-tti-regular font-normal text-sm xl:text-lg leading-relaxed">
                  <span className="text-brand-primary-color-1">
                    4. Arbitration Decision:{' '}
                  </span>
                  <span className="">
                    If an arbitration ticket is raised by either party involved
                    in the order, and a refund or partial refund is decided by
                    the Arbitration Team.
                  </span>
                </p>
              </div>
              <div className="flex flex-col gap-3 xl:gap-6">
                <p className="text-brand-black-20 font-tti-demi-bold font-semibold text-sm xl:text-lg leading-relaxed">
                  To initiate a refund request, please reach out to our support
                  team by clicking {`"I need help"`} on your order page or by
                  using the website chat.
                </p>
                <p className="text-brand-black-20 font-tti-demi-bold font-semibold text-sm xl:text-lg leading-relaxed">
                  Please be aware that it takes approximately 3 to 5 business
                  days to investigate all submitted arbitration tickets
                  initially.
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-8 xl:gap-16 flex-col">
            <h2 className="relative pb-1 after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-[linear-gradient(293deg,var(--tw-gradient-stops))] to-brand-primary-color-1/30 from-brand-primary-color-1/5 capitalize text-brand-primary-color-1 font-oxanium text-[clamp(1.125rem,4vw,1.5rem)] leading-none font-normal">
              Refunds to Your Original Method of Payment Policy
            </h2>
            <ul className="flex flex-col gap-4 text-brand-black-20 text-sm xl:text-lg leading-relaxed font-normal font-tti-regular list-disc pl-6">
              <li>
                We can only refund money to the bank or PayPal account from
                which your balance was replenished.
              </li>
              <li>
                Full and partial refunds are available; however, the
                availability of partial refunds depends on the policies of
                specific payment systems. While most payment systems support
                full refunds, only a limited number of larger payment systems,
                such as PayPal, allow partial refunds. Unfortunately,{' '}
                {SITE_INFO.name.capitalized}
                does not have control over this aspect.
              </li>
              <li>
                Regarding inquiries about the status of refunds to the original
                method of payment, we kindly ask that you allow 96 business
                hours to pass before contacting us. After the refund is
                processed to your original method of payment, the transfer of
                funds to your personal bank account may take between 1 and 14
                business days (in the case of card payments). The exact duration
                depends on the specific payment system, and{' '}
                {SITE_INFO.name.capitalized} does not have control over this
                process.
              </li>
              <li>
                If you have replenished your {SITE_INFO.name.capitalized}{' '}
                balance and subsequently utilized a portion of it or if the
                Arbitration Team has partially refunded your payment due to a
                dispute with a seller, only a partial refund option will be
                available. If your payment system does not support partial
                refunds, a refund to your personal account will not be possible.
                Nevertheless, the balance will remain on your{' '}
                {SITE_INFO.name.capitalized}
                account, and you can use it for future transactions on the
                website.
              </li>
              <li>
                No additional commission fees are applied to refunds made to the
                original method of payment. You will receive the exact amount
                you originally paid, including any commission fees charged by
                the payment system at the time of the transaction (such as bank
                or PayPal fees), as they will also be refunded to you.
              </li>
            </ul>
          </div> */}
        </div>
      </div>
    </main>
  );
};
