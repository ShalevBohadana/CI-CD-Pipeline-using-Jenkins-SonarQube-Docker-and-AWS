import { createContext, useContext, useMemo } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { ExtendHead } from '../../components/ExtendHead';
import { TListWithTitle } from '../../components/ui/ListWithTitle';
import { PageTopBackground } from '../../components/ui/PageTopBackground';
import { ErrorFallback } from '../../error/ErrorFallback';
import { logError } from '../../error/logError';
import { ErrorBoundaryResetHandler } from '../../error/utils';

import { Header } from './Header';
import { Main } from './Main';

type RefundPolicyContextValue = object;
const RefundPolicyContext = createContext<RefundPolicyContextValue>({});

const handleErrorBoundaryReset: ErrorBoundaryResetHandler = (details) => {
  // Reset the state of your app so the error doesn't happen again
  console.log(details);
};
export const REFUND_ELIGIBILITY_DATA2: TListWithTitle = {
  type: 'ordered',
  title:
    'You are eligible to request a refund from your FullBoosts balance in the following cases:',
  items: [
    {
      name: 'Order Cancellation:',
      isNameColored: true,
      description: 'If your order has been cancelled.',
    },
    {
      name: 'Poor Quality of Service:',
      isNameColored: true,
      description: `In the event of extremely poor service quality provided by your booster (please note that a thorough investigation by management is 
        required before a decision can be reached).`,
    },
    {
      name: 'Change of Mind:',
      isNameColored: true,
      description:
        'If you decide not to proceed with the services after placing an order (partial refunds will be issued based on the current progress of the order).',
    },
    {
      name: 'Arbitration Decision:',
      isNameColored: true,
      description:
        'If an arbitration ticket is raised by either party involved in the order, and a refund or partial refund is decided by the Arbitration Team.',
    },
  ],
};
export const REFUND_ELIGIBILITY_DATA_FOOTNOTES: string[] = [
  `To initiate a refund request, please reach out to our support team by clicking "I need help" on your order page or by using the website chat.`,
  `Please be aware that it takes approximately 3 to 5 business days to investigate all submitted arbitration tickets initially.`,
];
export const REFUNDS_ORIGINAL_METHOD_POLICY_DATA: TListWithTitle = {
  type: 'unordered',
  title: 'Refunds to Your Original Method of Payment Policy',
  items: [
    {
      description: `We can only refund money to the bank or PayPal account from which your balance was replenished.`,
    },
    {
      description: `Full and partial refunds are available; however, the availability of partial refunds depends on the policies of specific payment systems. While most payment systems support full refunds, only a limited number of larger payment systems, such as PayPal, allow partial refunds. Unfortunately, FullBoosts does not have control over this aspect.`,
    },
    {
      description: `Regarding inquiries about the status of refunds to the original method of payment, we kindly ask that you allow 96 business hours to pass before contacting us. After the refund is processed to your original method of payment, the transfer of funds to your personal bank account may take between 1 and 14 business days (in the case of card payments). The exact duration depends on the specific payment system, and FullBoosts does not have control over this process.`,
    },
    {
      description: `If you have replenished your FullBoosts balance and subsequently utilized a portion of it or if the Arbitration Team has partially refunded your payment due to a dispute with a seller, only a partial refund option will be available. If your payment system does not support partial refunds, a refund to your personal account will not be possible. Nevertheless, the balance will remain on your FullBoosts account, and you can use it for future transactions on the website.`,
    },
    {
      description: `No additional commission fees are applied to refunds made to the original method of payment. You will receive the exact amount you originally paid, including any commission fees charged by the payment system at the time of the transaction (such as bank or PayPal fees), as they will also be refunded to you.`,
    },
  ],
};
export const RefundPolicy = () => {
  const refundPolicyContextValue = useMemo(() => ({}), []);
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={logError}
      onReset={handleErrorBoundaryReset}
    >
      <RefundPolicyContext.Provider value={refundPolicyContextValue}>
        <ExtendHead title='Refund Policy' description='Refund Policy info' />
        <div className='fb-container grid gap-10 xl:gap-16'>
          <Header />
          <Main />
        </div>
        {/* <div className="grid gap-12 xl:gap-20 pb-12">
          <Header />
          <RefundProcess />
          <ListWithTitle
            payload={REFUND_ELIGIBILITY_DATA2}
            className="pl-[1.25rem]"
          >
            <ul className="grid gap-6 list-none text-brand-black-20 font-tti-demi-bold font-semibold text-lg xl:text-xl leading-none">
              {REFUND_ELIGIBILITY_DATA_FOOTNOTES?.map((note) => (
                <li key={uuidv4()}>{note}</li>
              ))}
            </ul>
          </ListWithTitle>
          <ListWithTitle
            payload={REFUNDS_ORIGINAL_METHOD_POLICY_DATA}
            className="pl-4 leading-none"
          />
        </div> */}
        <PageTopBackground showMainImage showSideImages showOvalShape />
      </RefundPolicyContext.Provider>
    </ErrorBoundary>
  );
};

export const useRefundPolicyContext = () => {
  return useContext(RefundPolicyContext);
};
