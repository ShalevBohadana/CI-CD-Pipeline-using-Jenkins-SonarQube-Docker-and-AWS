import {
  EfficiencyAndSpeedIcon,
  GuaranteedSecurityIcon,
  PassionateDedicationIcon,
  QualityStandardsIcon,
  TransparentCommunicationIcon,
} from '../../components/icons/icons';
import { SITE_INFO } from '../../enums';

import { CoreValueCard, TCoreValueCard } from './components/CoreValueCard';

export const coreValues: TCoreValueCard[] = [
  {
    id: '066328d6-a8be-5c44-ae1f-d817717eca19',
    icon: <EfficiencyAndSpeedIcon className='fill-brand-primary-color-1' />,
    title: 'Efficiency and Speed',
    description:
      'We highly value your time. FullBoosts consistently enhances its interface and support systems to ensure smooth and prompt order processing.',
  },
  {
    id: '74f6d7ac-aa5f-5977-a71e-0f09e80b1a32',
    icon: <GuaranteedSecurityIcon className='fill-brand-primary-color-1' />,
    title: 'Guaranteed Security',
    description:
      'Payment to sellers is only released upon the completion and confirmation of orders. Your transactions are protected by the FullBoosts money-back guarantee, providing you with peace of mind.',
  },
  {
    id: 'ec991cdc-b99a-54f0-be09-6992d7062e8c',
    icon: <QualityStandardsIcon className='fill-brand-primary-color-1' />,
    title: 'Stringent Quality Standards',
    description:
      'All sellers undergo a rigorous interview process before being approved to sell on FullBoosts. Our utmost priority is to ensure that cheats, bots, or individuals incapable of proper communication with customers are not present on our platform.',
  },
  {
    id: 'ae4825f8-8922-5230-869d-13fe63215d51',
    icon: <TransparentCommunicationIcon className='fill-brand-primary-color-1' />,
    title: 'Transparent Communication',
    description:
      'We maintain complete transparency with our customers. You have the freedom to engage in conversation with any seller and review their previous orders before placing an order yourself.',
  },
  {
    id: '40765fc4-b0b5-56d7-adfb-cbe452f42b1a',
    icon: <PassionateDedicationIcon className='fill-brand-primary-color-1' />,
    title: 'Passionate Dedication',
    description:
      'We create our products with love and meticulous attention to detail. We value our clients and partners greatly, and we embrace constructive criticism while remaining unafraid of making mistakes.',
  },
];

export const Main = () => {
  return (
    <main className='relative isolate z-0'>
      <div className='fb-container grid gap-8 xl:gap-16'>
        <div className='grid gap-4 xl:gap-8 text-center'>
          <h2 className='capitalize font-bold font-tti-bold text-[clamp(1.5rem,4vw,2.5rem)] leading-none text-white'>
            Our Core Values
          </h2>
          <p className='text-sm xl:text-lg leading-relaxed text-brand-black-20 font-normal font-oxanium'>
            {SITE_INFO.name.capitalized} was established with the primary objective of serving as an
            invaluable companion within the realm of massively multiplayer online (MMO) games. As a
            trusted ally, our platform endeavours to connect you with adept individuals capable of
            swiftly resolving any challenges pertaining to your in-game character or account. By
            doing so, we aim to enhance your gaming experience to its utmost level of satisfaction
            and enjoyment.
          </p>
        </div>
        <div className='flex flex-wrap justify-center items-stretch [--gap:theme(gap.8)] [gap:var(--gap)]'>
          {coreValues.map((card) => (
            <CoreValueCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </main>
  );
};
