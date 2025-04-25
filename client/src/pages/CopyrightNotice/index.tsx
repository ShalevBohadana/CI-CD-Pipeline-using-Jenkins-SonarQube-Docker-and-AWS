import { createContext, useContext, useMemo } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { v4 } from 'uuid';

import { ExtendHead } from '../../components/ExtendHead';
import { PageTopBackground } from '../../components/ui/PageTopBackground';
import { COMPANY_INFO, SITE_INFO } from '../../enums';
import { ErrorFallback } from '../../error/ErrorFallback';
import { logError } from '../../error/logError';
import { ErrorBoundaryResetHandler } from '../../error/utils';
import { removeLastSlash } from '../../utils';
import { AgreementInquiry } from '../CookiePolicy/AgreementInquiry';
import {
  TermsOfServiceList,
  TOSListType,
} from '../TermsAndConditions/components/TermsOfServiceList';

import { Header } from './Header';

type CookiePolicyContextValue = object;
const CookiePolicyContext = createContext<CookiePolicyContextValue>({});

const handleErrorBoundaryReset: ErrorBoundaryResetHandler = (details) => {
  // Reset the state of your app so the error doesn't happen again
  console.log(details);
};

export const INTRODUCTION_DATA: TOSListType = {
  start: 0,
  title: `${SITE_INFO.name.capitalized} © product of ${COMPANY_INFO.name} ${COMPANY_INFO.type}`,
  subtitle: `This work is protected by copyright law and international treaties. No part of this work may be reproduced, distributed, transmitted, performed, publicly displayed, or made into a derivative work without the prior written permission of the copyright holder, except as permitted by law.
  `,
  items: [],
};

export const LIMITATIONS_AND_EXCEPTIONS_DATA: TOSListType = {
  start: 0,
  title: `Limitations and Exceptions`,
  subtitle: `The following uses of the work are permitted without the express written permission of the copyright holder:
  `,
  items: [
    {
      itemType: 'bullet',
      content: `Fair use, as defined in Section 107 of the United States Copyright Act;`,
    },
    {
      itemType: 'bullet',
      content: `Educational uses, such as performance or display of the work in a classroom setting;`,
    },
    {
      itemType: 'bullet',
      content: `Library uses, such as lending copies of the work to patrons;`,
    },
    {
      itemType: 'bullet',
      content: `Archival uses, such as preservation of the work for future generations.`,
    },
  ],
};

export const NOTICE_OF_COPYRIGHT_DATA: TOSListType = {
  start: 0,
  title: `Notice of Copyright`,
  subtitle: `The copyright holder has affixed to all copies of this work the symbol ©, the word "Copyright," or the abbreviation "Copr.," followed by the year of first publication and the name of the copyright holder.`,
  items: [],
};
export const REMEDIES_DATA: TOSListType = {
  start: 0,
  title: `Notice of Copyright`,
  subtitle: `The copyright holder may bring legal action against any person who infringes on the copyright in this work. Remedies for copyright infringement may include injunctions, damages, and attorney's fees.
  `,
  items: [],
};

export const CONTACT_INFORMATION_DATA: TOSListType = {
  start: 0,
  title: `Contact Information`,
  subtitle: `If you have any questions about this copyright notice or if you wish to request permission to use the work in a way that is not permitted by law, please contact the copyright holder at the following address:
  
  `,
  items: [
    {
      itemType: 'bullet',
      content: `Website: ${removeLastSlash(SITE_INFO.url.href)}`,
    },
    {
      itemType: 'bullet',
      content: `Business Inquiries Email: ${COMPANY_INFO.contacts.emails.businessInquiries}`,
    },
    {
      itemType: 'bullet',
      content: `Customer Support Email: ${COMPANY_INFO.contacts.emails.customerSupport}`,
    },
  ],
};

const TOS_LIST_TYPE_DATA = [
  INTRODUCTION_DATA,
  LIMITATIONS_AND_EXCEPTIONS_DATA,
  NOTICE_OF_COPYRIGHT_DATA,
  REMEDIES_DATA,
  CONTACT_INFORMATION_DATA,
];

export const CopyrightNotice = () => {
  const cookiePolicyContextValue = useMemo(() => ({}), []);

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={logError}
      onReset={handleErrorBoundaryReset}
    >
      <CookiePolicyContext.Provider value={cookiePolicyContextValue}>
        <ExtendHead title='Copyright Notice' description='Copyright Notice info' />
        <div className='fb-container grid gap-12 xl:gap-20 pb-12'>
          <Header />
          {/* <ListWithTitle payload={INTRODUCTION_DATA} className="list-none" /> */}

          {TOS_LIST_TYPE_DATA?.map((list) => <TermsOfServiceList key={v4()} payload={list} />)}
          <AgreementInquiry />
        </div>
        <PageTopBackground showMainImage showSideImages showOvalShape />
      </CookiePolicyContext.Provider>
    </ErrorBoundary>
  );
};

export const useCookiePolicyContext = () => {
  return useContext(CookiePolicyContext);
};
