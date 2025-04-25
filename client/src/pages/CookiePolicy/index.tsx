import { createContext, useContext, useMemo } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { v4 } from 'uuid';

import { ExtendHead } from '../../components/ExtendHead';
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

type CookiePolicyContextValue = object;
const CookiePolicyContext = createContext<CookiePolicyContextValue>({});

const handleErrorBoundaryReset: ErrorBoundaryResetHandler = (details) => {
  // Reset the state of your app so the error doesn't happen again
  console.log(details);
};

export const WHAT_ARE_COOKIES_DATA: TOSListType = {
  start: 0,
  title: `What are cookies?`,
  subtitle: `Cookies are small text files that are stored on your computer or mobile device when you visit a website. They are used to store information about your visit, such as your language preferences, login status, and items in your shopping cart.`,
  items: [],
};

export const WHAT_TYPES_OF_COOKIES_DO_WE_USE_DATA: TOSListType = {
  start: 0,
  title: `What types of cookies do we use?`,
  subtitle: `We use a variety of cookies on our website, including:`,
  items: [
    {
      itemType: 'bullet',
      content: `Essential cookies: These cookies are necessary for our website to function properly. They allow you to navigate the website and use its features, such as logging in to your account or adding items to your shopping cart.`,
    },
    {
      itemType: 'bullet',
      content: `Analytical cookies: These cookies collect information about how you use our website, such as the pages you visit and the links you click on. We use this information to improve our website and make it more user-friendly.`,
    },
    {
      itemType: 'bullet',
      content: `Advertising cookies: These cookies are used to show you relevant ads on our website and other websites. They do this by tracking your browsing activity and collecting information about your interests.`,
    },
    {
      itemType: 'bullet',
      content: `Social media cookies: These cookies allow you to share content from our website on social media platforms.`,
    },
    {
      itemType: 'bullet',
      content: `Third-party cookies: Some of the cookies used on our website are set by third-party service providers, such as Google Analytics and Facebook Pixel. These cookies are used to collect information about how you use our website and to show you relevant ads on our website and other websites.`,
    },
  ],
};
export const HOW_LONG_DO_COOKIES_STAY_ON_MY_DEVICE_DATA: TOSListType = {
  start: 0,
  title: `How long do cookies stay on my device?`,
  subtitle: `The length of time that a cookie stays on your device depends on the type of cookie. Some cookies are deleted as soon as you close your browser (session cookies), while others remain on your device for a longer period of time (persistent cookies).
  `,
  items: [],
};
export const HOW_CAN_I_CONTROL_MY_COOKIE_SETTINGS_DATA: TOSListType = {
  start: 0,
  title: `How can I control my cookie settings?`,
  subtitle: `You can control your cookie settings in your browser settings. Most browsers allow you to block or delete all cookies, or to only allow certain types of cookies. However, please note that blocking or deleting cookies may affect your ability to use some of the features on our website.  `,
  items: [],
};

export const HOW_DO_WE_USE_COOKIES_DATA: TOSListType = {
  start: 0,
  title: `How do we use cookies?`,
  subtitle: `We use cookies for a variety of purposes, including:`,
  items: [
    {
      itemType: 'bullet',
      content: `To improve your user experience: Cookies can help us to remember your preferences, such as your language settings and login status. This can make your next visit to our website smoother and more convenient.`,
    },
    {
      itemType: 'bullet',
      content: `To collect analytics data: Cookies can help us to collect information about how you use our website, such as the pages you visit and the links you click on. We use this information to improve our website and make it more user-friendly.`,
    },
    {
      itemType: 'bullet',
      content: `To show you relevant ads: Cookies can be used to show you relevant ads on our website and other websites. This is done by tracking your browsing activity and collecting information about your interests.`,
    },
    {
      itemType: 'bullet',
      content: `To share content on social media: Cookies can allow you to share content from our website on social media platforms.`,
    },
  ],
};

export const HOW_DO_WE_SHARE_YOUR_COOKIE_DATA: TOSListType = {
  start: 0,
  title: `How do we share your cookie data?`,
  subtitle: `We may share your cookie data with third-party service providers, such as Google Analytics and Facebook Pixel. These service providers use this data to provide us with analytics services and to show you relevant ads on our website and other websites.`,
  items: [],
};
export const YOUR_CHOICES_DATA: TOSListType = {
  start: 0,
  title: `Your choices`,
  subtitle: `You have the choice of whether or not to accept cookies. You can change your cookie settings in your browser settings. However, please note that blocking or deleting cookies may affect your ability to use some of the features on our website.
  `,
  items: [],
};
export const CHANGES_TO_THIS_COOKIE_POLICY_DATA: TOSListType = {
  start: 0,
  title: `Changes to this Cookie Policy`,
  subtitle: `We may update this Cookie Policy from time to time. If we make any significant changes, we will notify you by posting a notice on our website.`,
  items: [],
};
export const CONTACT_US_DATA: TOSListType = {
  start: 0,
  title: `Contact us`,
  subtitle: `If you have any questions about this Cookie Policy, please contact us at support@fullboosts.com.`,
  items: [],
};

export const ADDITIONAL_INFORMATION_DATA: TOSListType = {
  start: 0,
  title: `Additional information`,
  subtitle: `Here is some additional information about the cookies that we use:
  `,
  items: [
    {
      itemType: 'bullet',
      content: `Google Analytics: Google Analytics is a web analytics service that helps us to understand how you use our website. Google Analytics collects information such as the pages you visit, the links you click on, and the amount of time you spend on our website. Google Analytics uses cookies to store this information.`,
    },
    {
      itemType: 'bullet',
      content: `Facebook Pixel: Facebook Pixel is a social media analytics tool that helps us to understand how you use our website and to show you relevant ads on Facebook. Facebook Pixel collects information such as the pages you visit, the links you click on, and the products you view on our website. Facebook Pixel uses cookies to store this information.`,
    },
  ],
};

const TOS_LIST_TYPE_DATA = [
  WHAT_ARE_COOKIES_DATA,
  WHAT_TYPES_OF_COOKIES_DO_WE_USE_DATA,
  HOW_LONG_DO_COOKIES_STAY_ON_MY_DEVICE_DATA,
  HOW_CAN_I_CONTROL_MY_COOKIE_SETTINGS_DATA,
  HOW_DO_WE_USE_COOKIES_DATA,
  HOW_DO_WE_SHARE_YOUR_COOKIE_DATA,
  YOUR_CHOICES_DATA,
  CHANGES_TO_THIS_COOKIE_POLICY_DATA,
  CONTACT_US_DATA,
  ADDITIONAL_INFORMATION_DATA,
];

export const CookiePolicy = () => {
  const cookiePolicyContextValue = useMemo(() => ({}), []);

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={logError}
      onReset={handleErrorBoundaryReset}
    >
      <CookiePolicyContext.Provider value={cookiePolicyContextValue}>
        <ExtendHead title='Cookie Policy' description='Cookie Policy info' />
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
