import { v4 } from 'uuid';

import {
  TermsOfServiceList,
  TOSListType,
} from '../TermsAndConditions/components/TermsOfServiceList';

export const INTRODUCTION_DATA: TOSListType = {
  start: 0,
  title: 'Introduction',
  subtitle: `We want you to be happy with your purchase from Fullboosts. If you are not satisfied with your purchase for any reason, please contact us within 30 days of delivery to request a refund.`,
  items: [],
};
export const ELIGIBILITY_DATA: TOSListType = {
  start: 0,
  title: 'Eligibility',
  subtitle: `To be eligible for a refund, the following conditions must be met:`,
  items: [
    {
      content: `The product must be returned in its original packaging and condition.`,
      itemType: 'bullet',
    },
    {
      content: `The product must be unused and undamaged.`,
      itemType: 'bullet',
    },
    {
      content: `The product must be accompanied by a copy of the original receipt.`,
      itemType: 'bullet',
    },
  ],
};
export const NON_REFUNDABLE_ITEMS_DATA: TOSListType = {
  start: 0,
  title: 'Non-refundable items',
  subtitle: `The following items are not eligible for a refund:`,
  items: [
    {
      content: `Digital products`,
      itemType: 'bullet',
    },
    {
      content: `Custom-made products`,
      itemType: 'bullet',
    },
    {
      content: `Products that have been used or damaged`,
      itemType: 'bullet',
    },
    {
      content: `Products that have been returned more than 30 days after delivery`,
      itemType: 'bullet',
    },
  ],
};
export const OTHER_ARTICLES_DATA: TOSListType = {
  start: 0,
  title: 'Other Articles',
  items: [
    {
      content: `We reserve the right to refuse a refund if the above conditions are not met.`,
      itemType: 'bullet',
    },
    {
      content: `We are not responsible for shipping costs associated with returning a product.`,
      itemType: 'bullet',
    },
    {
      content: `If you receive a defective product, please contact us immediately and we will arrange for a replacement or refund.`,
      itemType: 'bullet',
    },
    {
      content: `If you are a customer located outside of Australia, you may be responsible for paying customs duties and taxes on the returned product.`,
      itemType: 'bullet',
    },
    {
      content: `If you are returning a product from outside of Australia, we recommend that you use a trackable shipping service.`,
      itemType: 'bullet',
    },
    {
      content: `We are not responsible for lost or stolen packages.`,
      itemType: 'bullet',
    },
    {
      content: `We reserve the right to change this refund policy at any time without notice.`,
      itemType: 'bullet',
    },
  ],
};
export const ADDITIONAL_INFORMATION_DATA: TOSListType = {
  start: 0,
  title: 'Additional information',
  items: [
    {
      name: `Processing refunds: `,
      content: `Refunds will be processed within 10 business days of receiving the returned product. Refunds will be issued to the original form of payment.`,
      itemType: 'bullet',
    },
    {
      name: `Exchanges: `,
      content: `If you would like to exchange a product for a different size, color, or style, please contact us within 30 days of delivery. We will arrange for an exchange to be sent to you once we have received the returned product.`,
      itemType: 'bullet',
    },
    {
      name: `Gift returns: `,
      content: `If you received a product from Fullboosts as a gift, please contact the person who purchased the gift to initiate a return.`,
      itemType: 'bullet',
    },
    {
      name: `Return shipping costs: `,
      content: `We are not responsible for shipping costs associated with returning a product. However, if you receive a defective product, we will reimburse you for the cost of shipping the returned product back to us.`,
      itemType: 'bullet',
    },
  ],
};
export const CONTACT_US_DATA: TOSListType = {
  start: 0,
  title: 'Contact us',
  items: [
    {
      content: `If you have any questions about our refund policy, please contact us at support@fullboosts.com.`,
      description: `We hope this refund policy has been helpful. If you have any further questions, please do not hesitate to contact us.`,
      itemType: 'none',
    },
  ],
};
export const Main = () => {
  const TERMS_OF_SERVICE_LISTS = [
    INTRODUCTION_DATA,
    ELIGIBILITY_DATA,
    NON_REFUNDABLE_ITEMS_DATA,
    OTHER_ARTICLES_DATA,
    ADDITIONAL_INFORMATION_DATA,
    CONTACT_US_DATA,
  ];
  return (
    <main className='fb-container grid gap-10 xl:gap-16'>
      {TERMS_OF_SERVICE_LISTS?.map((list) => <TermsOfServiceList key={v4()} payload={list} />)}
    </main>
  );
};
