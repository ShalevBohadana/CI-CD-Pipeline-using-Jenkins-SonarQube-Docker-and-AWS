import { v4 as uuidv4 } from 'uuid';

import { ProcessStepCard } from './components/ProcessStep';

export const PROCESS_STEPS: string[] = [
  `The refunded amount will be credited to your website balance. If you prefer, you can utilize this balance for future purchases by selecting "account balance" as your payment method.`,
  `Alternatively, you have the option to request a refund from your website balance back to your original method of payment. Please note that the refund process within our payment system may take up to 96 business hours from the time our support team raises the refund ticket upon your request.`,
];
export const RefundProcess = () => {
  return (
    <section>
      <div className='fb-container grid gap-10 xl:gap-16'>
        <h2 className='font-oxanium text-[clamp(1.5rem,4vw,2rem)] font-normal leading-none capitalize text-brand-primary-color-1'>
          Our platform ensures a smooth refund process, which consists of two steps:
        </h2>
        <div className='grid gap-8'>
          {PROCESS_STEPS?.map((step, idx) => (
            <ProcessStepCard key={uuidv4()} step={idx + 1} description={step} />
          ))}
        </div>
      </div>
    </section>
  );
};
