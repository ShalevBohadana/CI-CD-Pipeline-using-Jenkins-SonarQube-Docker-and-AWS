import roleBoosterImgSrc from '../../assets/images/role-booster.png';
import roleCurrencySellerImgSrc from '../../assets/images/role-currency-seller.png';
import roleCurrencySupplierImgSrc from '../../assets/images/role-currency-supplier.png';

import { RoleCard } from './components/RoleCard';

export type IRoleCard = {
  id: string;
  role: 'booster' | 'currency-supplier' | 'currency-seller';
  title: string;
  description: string;
  imageUrl: string;
  advantages: string[];
  buttonLabel: string;
};

export const CHOSE_A_ROLE_LIST: Readonly<IRoleCard>[] = [
  {
    id: '548889db-ace3-5e16-a30f-6058b1f67abf',
    title: 'booster',
    role: 'booster',
    description:
      'Boosters are one of the key positions in our business. The better your work, the more orders you will receive. Responsibility, professionalism and motivation are what describe the ideal candidate for this position. If you think that this describes you, then we look forward to your application.',
    imageUrl: roleBoosterImgSrc,
    advantages: [
      'Automated system for receiving an order in two easy clicks.',
      'Semi-automated payouts every day.',
      'Transparent competition and pricing model',
      'History of orders and payments',
      'Crediting funds for a completed order to your currency account',
      'Several withdrawal methods - VISA (cross-borders), WMZ, PayPal, Bank-transfer, QIWI, USDT',
    ],
    buttonLabel: 'Become a booster',
  },
  {
    id: '548889db-654t-5e16-a30f-6058b1f67abf',
    title: 'Sell Currency To Us',
    role: 'currency-supplier',
    description:
      'Sell any amount of currency in Dragonflight, WotLK, FFXIV, Path Of Exile, and more. Stable payouts.',
    imageUrl: roleCurrencySupplierImgSrc,
    advantages: [
      'Payments to any country in the world without restrictions',
      'No registration on the site',
      'Sell any amount to us',
      'There are many available payout methods - WMZ, VISA (cross-borders), PayPal',
      'Stable payments (1-5 working days)',
    ],
    buttonLabel: 'Become currency supplier',
  },
  {
    id: '548889db-ace3-5yuf-a30f-6058b1f67abf',
    title: 'Currency Seller',
    role: 'currency-seller',
    description:
      'Sell currency yourself. FullBoosts is one of the largest in-game currency marketplaces with a huge number of regular customers.',
    imageUrl: roleCurrencySellerImgSrc,
    advantages: [
      'Sell currency directly to the client on website',
      'Payments to any country in the world without restrictions',
      'Stable payments (5-7 working days)',
      'The ability to order an accelerated withdrawal (1 working day)',
      'There are many available payout methods - WMZ,VISA (cross-borders), PayPal',
      '24/7 online support',
    ],
    buttonLabel: 'Become a currency seller',
  },
];

export const ChoseARole = () => {
  // const [roles, setRoles] = useState<IRoleCard[]>();
  // useEffect(() => {
  //   if (roles?.length === undefined || roles?.length === 0) {
  //     fetch('./data/choseARole.json')
  //       .then((res) => res.json())
  //       .then((data: IRoleCard[]) => {
  //         // console.log(data);
  //         setRoles(data);
  //       })
  //       .catch(console.error);
  //   }
  // }, [roles?.length]);

  return (
    <section className='py-11'>
      <div className='fb-container'>
        <div className='flex flex-col gap-24'>
          <h2 className='capitalize text-center font-bold font-tti-bold text-[clamp(1.5rem,4vw,2.5rem)] leading-tight'>
            Choose a{' '}
            <span className='text-brand-primary-color-1/30 bg-clip-text bg-[linear-gradient(293deg,var(--tw-gradient-stops))] from-brand-primary-color-1 to-brand-primary-color-light animate-text-gradient'>
              role that fits
            </span>{' '}
            you
          </h2>
          <div className='grid grid-cols-1 gap-16'>
            {CHOSE_A_ROLE_LIST?.map((role) => <RoleCard key={role.id} card={role} />)}
          </div>
        </div>
      </div>
    </section>
  );
};
