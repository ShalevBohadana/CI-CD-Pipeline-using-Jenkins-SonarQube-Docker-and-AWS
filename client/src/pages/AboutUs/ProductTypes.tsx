import { ProductTypeCard, TProductType } from './components/ProductTypeCard';

export const PRODUCT_TYPES_DATA: TProductType[] = [
  {
    id: '52981a7f-1057-51e5-b776-ffcc8fb577a3',
    title: 'IN-GAME CURRENCY',
    description: `Every player requires in-game currency to progress. By purchasing it, you can bypass hours of tedious farming and immerse yourself in the game's most engaging activities. While the process is generally safe, we strongly advise you to take certain precautions:`,
    listItems: [
      `Avoid using in-game chats, as server administrators may have access to them, including private messages. Maintain discretion to protect your privacy.`,
      `When engaging in direct gold trades (e.g., in WoW), it is recommended to request a reciprocal exchange from the other party. This exchange need not involve valuable items but serves as a confirmation of the transaction.`,
      `Utilize legitimate in-game tools for currency transactions, such as the guild bank, mail system with cash-on-delivery, or the auction house. These platforms offer safer and authorized means for conducting exchanges.`,
    ],
  },
  {
    id: 'd15402cc-585b-531f-b0ce-372e4a0e75f5',
    title: 'SELF-PLAY SERVICES',
    description:
      'FullBoosts ensures a secure experience by not requiring your account details for most services. Simply provide your in-game nickname after placing an order, go online, and wait for an invitation. You can actively participate or passively follow the group, knowing that your order will be completed without any account risks. Enjoy a seamless and secure gaming experience with FullBoosts.',
    listItems: [
      'Avoid chatting with your pro player in the in-game chat, particularly when it comes to discussing your order. Maintain discretion to maintain confidentiality and security.',
      'Follow the instructions provided by the pro players to enhance the efficiency and fluidity of your gameplay session. Adhering to their guidance will help expedite your progress.',
    ],
    footnote:
      'By adhering to these guidelines, you can enjoy a seamless and efficient gaming experience with FullBoosts.',
  },
  {
    id: '051b1dc3-1d60-5bab-b120-2575a9eee2b4',
    title: 'COACHING',
    description:
      'Discover the growing trend of e-learning in gaming, where coaching from pro players offers the fastest way to learn and improve skills, covering areas such as new classes, PvP, PvE, and playstyle, with valuable tips from FullBoosts.',
    listItems: [
      'Feel free to ask your coach any question without hesitation.',
      'Prior to making a purchase, kindly request the player to provide you with a link to their character profile on battle.net or a similar service.',
      `Attentively heed your coach's advice and be receptive to their tips, even if they may not immediately resonate with you.`,
      'Avoid engaging in conversations with the seller through in-game chat, particularly when discussing order details.',
    ],
  },
];

export const ProductTypes = () => {
  return (
    <section>
      <div className='fb-container grid gap-8 xl:gap-16'>
        <h2 className='text-white text-center font-bold font-tti-bold text-[clamp(1.5rem,4vw,2.5rem)] leading-tight capitalize'>
          Product Types
        </h2>
        <div className='grid grid-cols-1 gap-8 xl:gap-12'>
          {PRODUCT_TYPES_DATA?.map((productType) => (
            <ProductTypeCard key={productType?.id} card={productType} />
          ))}
        </div>
      </div>
    </section>
  );
};
