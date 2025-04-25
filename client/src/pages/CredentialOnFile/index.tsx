import { createContext, useContext, useMemo } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { v4 } from 'uuid';

import { ExtendHead } from '../../components/ExtendHead';
import { ListWithTitle, TListWithTitle } from '../../components/ui/ListWithTitle';
import { PageTopBackground } from '../../components/ui/PageTopBackground';
import { ErrorFallback } from '../../error/ErrorFallback';
import { logError } from '../../error/logError';
import { ErrorBoundaryResetHandler } from '../../error/utils';
import {
  TermsOfServiceList,
  TOSListType,
} from '../TermsAndConditions/components/TermsOfServiceList';

import { AgreementInquiry } from './AgreementInquiry';
import { Header } from './Header';

type CredentialOnFileContextValue = object;
const CredentialOnFileContext = createContext<CredentialOnFileContextValue>({});

const handleErrorBoundaryReset: ErrorBoundaryResetHandler = (details) => {
  // Reset the state of your app so the error doesn't happen again
  console.log(details);
};
export const INTRODUCTION_DATA: TListWithTitle = {
  type: 'unordered',
  title: `Introduction`,
  hideTitleSeparator: true,
  items: [
    {
      description: `This Cardholder's Credentials Storage Agreement (hereinafter referred to as the "Agreement") constitutes a legally binding contract entered into between you (hereinafter referred to as the "Cardholder") and FullBoosts, a duly authorized Merchant.`,
    },
    {
      description: `By actively selecting the relevant tick-box, you, as the Cardholder, provide your unequivocal and informed consent to this Agreement. Furthermore, you hereby grant explicit authorization to FullBoosts, together with its designated payment processing service provider, to securely store and retain your personal identifying information, which encompasses your full name, surname, card expiry date, and Primary Account Number (PAN). This composite information, collectively referred to as the "Credentials on File" or "COF," empowers FullBoosts to initiate transactions on your behalf, herein termed as "Merchant-Initiated COF Transactions," and/or process transactions initiated by you, herein termed as "Cardholder-Initiated COF Transactions," as delineated below.`,
    },
  ],
};

export const MERCHANT_DISCLOSURES_DATA: TOSListType = {
  start: 1,
  title: 'Merchant Disclosures',
  titleSize: 'large',
  showTitleSeparator: true,
  subtitle: 'In compliance with transparency standards, FullBoosts hereby discloses the following:',
  items: [
    {
      itemType: 'none',
      content: `Utilization of Credentials on File: Your Credentials on File shall be exclusively employed for the purpose of conducting Merchant-Initiated COF Transactions.`,
    },
    {
      itemType: 'none',
      content: `Service Type: Your Credentials on File shall primarily facilitate your access to specific digital content, offered on a weekly or monthly basis, in accordance with the selected service plan.`,
    },
    {
      itemType: 'none',
      content: `Scheduled Transactions: Fixed dates or intervals of scheduled Merchant-Initiated COF Transactions shall be executed on a monthly basis.`,
    },
    {
      itemType: 'none',
      content: `Event Prompting the Transaction: Not Applicable; the transactions shall be executed without reliance on a specific triggering event.`,
    },
  ],
};

export const TRANSACTION_CONFIRMATION_DETAILS_DATA: TOSListType = {
  prefix: 'Article',
  start: 1,
  title: `Transaction Confirmation Details`,
  items: [
    {
      content: `Pursuant to the terms set forth in this Agreement, each transaction confirmation generated herein shall be executed with the utmost precision and shall provide comprehensive disclosure of the following essential particulars:`,
    },
    {
      name: 'Card Number:',
      isBold: true,
      content: `The numerical identifier assigned to the Cardholder's payment instrument, facilitating unequivocal identification.`,
    },
    {
      name: 'Transaction Amount: ',
      isBold: true,
      content: `The precise monetary value associated with the transaction, inclusive of all pertinent charges, fees, and costs.`,
    },
    {
      name: 'Surcharges (if applicable): ',
      isBold: true,
      content: `In cases where supplementary fees or levies are imposed in connection with the transaction, these shall be explicitly delineated, if applicable.`,
    },
    {
      name: 'Transaction Currency: ',
      isBold: true,
      content: `The designated monetary denomination in which the transaction is conducted, ensuring transparency in financial dealings.`,
    },
    {
      name: 'Transaction Date: ',
      isBold: true,
      content: `The exact calendar date on which the transaction is consummated, establishing an incontrovertible chronological record.`,
    },
    {
      name: 'Authorization Code: ',
      isBold: true,
      content: `A unique alphanumeric code granted by the relevant financial institutions to validate and authenticate the transaction's legitimacy.`,
    },
    {
      name: 'The Physical Location of FullBoosts as the Merchant: ',
      isBold: true,
      content: `The geospatial coordinates or detailed address of FullBoosts' principal place of business or operational establishment, affirming the physical nexus with the Merchant, as required by legal standards.`,
    },
  ],
};

export const NOTIFICATION_OF_AGREEMENT_CHANGES_DATA: TOSListType = {
  prefix: 'Article',
  start: 2,
  title: `Notification of Agreement Changes`,
  items: [
    {
      content: `FullBoosts is committed to the principle of transparency and therefore pledges to duly notify you, the esteemed Cardholder, in the event of any modifications or amendments to this Agreement. In particular, alterations concerning scheduled Merchant-Initiated COF Transactions, which are distinguished by their predefined, consistent intervals, shall be conveyed to you no fewer than 7 (seven) business days prior to their intended effective date. Amendments relevant to unscheduled Merchant-Initiated COF Transactions or Cardholder-Initiated COF Transactions shall be promptly communicated, ensuring a minimum notice period of 2 (two) business days in advance.`,
    },
  ],
};
export const DURATION_AND_TERMINATION_DATA: TOSListType = {
  prefix: 'Article',
  start: 3,
  title: `Duration and Termination`,
  items: [
    {
      content: `This Agreement shall be deemed operative and in full effect upon successful authorization or meticulous account verification conducted by your card issuer, complemented by the Merchant's receipt of your unambiguous consent to the terms embodied herein.`,
    },
    {
      content: `The Agreement shall endure, preserving its legal force, until such time as it is formally terminated by either party, namely you, the Cardholder, or FullBoosts. Such termination shall align meticulously with the specific provisions and conditions set forth in the Cancellation Policy, meticulously established and delineated by FullBoosts`,
    },
  ],
};
export const ACCESS_TO_CANCELLATION_AND_REFUND_POLICIES_DATA: TOSListType = {
  prefix: 'Article',
  start: 4,
  title: `Access to Cancellation and Refund Policies`,
  items: [
    {
      content: `In pursuit of utmost transparency and clarity, FullBoosts affords you, the esteemed Cardholder, unimpeded access to comprehensive information pertaining to its policies with regard to cancellations and refunds. To acquire an exhaustive understanding of these policies, we respectfully direct your attention to the meticulously crafted and legally binding Terms and Conditions.`,
    },
  ],
};
export const CONTACT_INFORMATION_DATA: TOSListType = {
  prefix: 'Article',
  start: 5,
  title: `Contact Information`,
  items: [
    {
      content: `In the event that you, the Cardholder, possess any inquiries or necessitate elucidation concerning the terms and provisions contained within this Agreement, we extend a cordial invitation to direct your correspondence to our dedicated support team, reachable at the following electronic address: support@fullboosts.com.`,
    },
  ],
};

const TOS_LIST_TYPE_DATA = [
  MERCHANT_DISCLOSURES_DATA,
  TRANSACTION_CONFIRMATION_DETAILS_DATA,
  NOTIFICATION_OF_AGREEMENT_CHANGES_DATA,
  DURATION_AND_TERMINATION_DATA,
  ACCESS_TO_CANCELLATION_AND_REFUND_POLICIES_DATA,
  CONTACT_INFORMATION_DATA,
];

export const CredentialOnFile = () => {
  const credentialOnFileContextValue = useMemo(() => ({}), []);

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={logError}
      onReset={handleErrorBoundaryReset}
    >
      <CredentialOnFileContext.Provider value={credentialOnFileContextValue}>
        <ExtendHead title='Credential On File' description='Credential On File info' />
        <div className='grid gap-12 xl:gap-20 pb-12 fb-container'>
          <Header />
          <ListWithTitle payload={INTRODUCTION_DATA} className='list-none' />

          {TOS_LIST_TYPE_DATA?.map((list) => <TermsOfServiceList key={v4()} payload={list} />)}

          <AgreementInquiry />
        </div>
        <PageTopBackground showMainImage showSideImages showOvalShape />
      </CredentialOnFileContext.Provider>
    </ErrorBoundary>
  );
};

export const useCredentialOnFileContext = () => {
  return useContext(CredentialOnFileContext);
};
