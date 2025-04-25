import { createBrowserRouter } from 'react-router-dom';
import { ROLE } from '../enums/role';
import { ROUTER_PATH } from '../enums/router-path';
import { DashboardLayout } from '../layouts/DashboardLayout';

import RootLayout from '../layouts/RootLayout';
import { lazilyLoadable } from '../utils/lazilyLoadable';
import { SuccessRecharge } from '../pages/Profile/Wallet/SuccessRecharge';

const { Home } = lazilyLoadable(() => import('../pages/Home'));
const { NotFound } = lazilyLoadable(() => import('../pages/NotFound'));
const { Authenticated } = lazilyLoadable(() => import('../components/Authenticated'));
const { ErrorElement } = lazilyLoadable(() => import('../components/ErrorElement'));
const { SignupDiscord } = lazilyLoadable(() => import('../components/SignupDiscord'));
const { Unauthorized } = lazilyLoadable(() => import('../components/Unauthorized'));
const { Testing } = lazilyLoadable(() => import('../components/Testing'));
const { WorkWithUs } = lazilyLoadable(() => import('../pages/WorkWithUs'));
const { BecomeBooster } = lazilyLoadable(() => import('../pages/BecomeBooster'));
const { BecomeCurrencySupplier } = lazilyLoadable(() => import('../pages/BecomeCurrencySupplier'));
const { BecomeCurrencySeller } = lazilyLoadable(() => import('../pages/BecomeCurrencySeller'));
const { Profile } = lazilyLoadable(() => import('../pages/Profile'));
const { AccountInfo } = lazilyLoadable(() => import('../pages/Profile/components/AccountInfo'));
const { GeneralSettings } = lazilyLoadable(
  () => import('../pages/Profile/components/GeneralSettings')
);
const { Transactions } = lazilyLoadable(() => import('../pages/Profile/components/Transactions'));
const { Wallet } = lazilyLoadable(() => import('../pages/Profile/components/Wallet'));
const { Guides } = lazilyLoadable(() => import('../pages/Guides'));
const { GuidesSingle } = lazilyLoadable(() => import('../pages/GuidesSingle'));
const { Support } = lazilyLoadable(() => import('../pages/Support'));
const { SupportTicketSummary } = lazilyLoadable(() => import('../pages/SupportTicketSummary'));
const { Games } = lazilyLoadable(() => import('../pages/Games'));
const { GamesSingle } = lazilyLoadable(() => import('../pages/GamesSingle'));
// const { Currencies } = lazilyLoadable(() => import('../pages/Currencies'));
const { CurrenciesSingle } = lazilyLoadable(() => import('../pages/CurrenciesSingle'));
const { MyOrders } = lazilyLoadable(() => import('../pages/MyOrders'));
const { OrdersSingle } = lazilyLoadable(() => import('../pages/OrdersSingle'));
const { RateOrder } = lazilyLoadable(() => import('../pages/RateOrder'));
const { RateClient } = lazilyLoadable(() => import('../pages/RateClient'));

const { OrderReview } = lazilyLoadable(() => import('../pages/OrderReview'));

const { SignIn } = lazilyLoadable(() => import('../pages/SignIn'));
const { SignUp } = lazilyLoadable(() => import('../pages/SignUp'));
const { OffersSingle } = lazilyLoadable(() => import('../pages/OffersSingle'));
const { CreateOffer } = lazilyLoadable(() => import('../pages/CreateOffer'));
const { CreateGame } = lazilyLoadable(() => import('../pages/CreateGame'));
const { CreatePromo } = lazilyLoadable(() => import('../pages/CreatePromo'));
const { CreateGameCurrency } = lazilyLoadable(() => import('../pages/CreateGameCurrency'));
const { CreateGameCurrencyOffer } = lazilyLoadable(
  () => import('../pages/CreateGameCurrencyOffer')
);
const { Checkout } = lazilyLoadable(() => import('../pages/Checkout'));
const { PaymentMethodTabContent } = lazilyLoadable(
  () => import('../pages/Checkout/components/PaymentMethodTabContent')
);
const { ReviewTabContent } = lazilyLoadable(
  () => import('../pages/Checkout/components/ReviewTabContent')
);
const { CompletedTabContent } = lazilyLoadable(
  () => import('../pages/Checkout/components/CompletedTabContent')
);
const { Payment } = lazilyLoadable(() => import('../pages/Payment'));
const { BalanceRecharge } = lazilyLoadable(() => import('../pages/BalanceRecharge'));
const { AboutUs } = lazilyLoadable(() => import('../pages/AboutUs'));
const { RefundPolicy } = lazilyLoadable(() => import('../pages/RefundPolicy'));
const { CookiePolicy } = lazilyLoadable(() => import('../pages/CookiePolicy'));
const { CopyrightNotice } = lazilyLoadable(() => import('../pages/CopyrightNotice'));
const { TermsAndConditions } = lazilyLoadable(() => import('../pages/TermsAndConditions'));
const { PrivacyPolicy } = lazilyLoadable(() => import('../pages/PrivacyPolicy'));
const { CredentialOnFile } = lazilyLoadable(() => import('../pages/CredentialOnFile'));

// dashboard pages
// const { Customer: DBCustomer } = lazilyLoadable(
//   () => import('../pages/Dashboard/Customer')
// );

const { DBAdmin } = lazilyLoadable(() => import('../pages/Dashboard/Admin'));
const { AdminOrder } = lazilyLoadable(() => import('../pages/Dashboard/Admin/Order'));
const { AdminIncomingOrders } = lazilyLoadable(
  () => import('../pages/Dashboard/Admin/IncomingOrders')
);
const { WorkWithUsApproval } = lazilyLoadable(
  () => import('../pages/Dashboard/Admin/WorkWithUsApproval')
);
const { Employees } = lazilyLoadable(() => import('../pages/Dashboard/Admin/Employees'));
const { Partners } = lazilyLoadable(() => import('../pages/Dashboard/Admin/Partners'));
const { Tickets } = lazilyLoadable(() => import('../pages/Dashboard/Admin/Tickets'));
const { Reviews } = lazilyLoadable(() => import('../pages/Dashboard/Admin/Reviews'));
const { UserManager } = lazilyLoadable(() => import('../pages/Dashboard/Admin/UserManager'));
const { PartnerManager } = lazilyLoadable(() => import('../pages/Dashboard/Admin/PartnerManager'));
const { Offers } = lazilyLoadable(() => import('../pages/Dashboard/Admin/Offers'));
const { AdminFinances } = lazilyLoadable(() => import('../pages/Dashboard/Admin/Finances'));
const { AdminCurrencies } = lazilyLoadable(() => import('../pages/Dashboard/Admin/Currencies'));
const { AdminPromos } = lazilyLoadable(() => import('../pages/Dashboard/Admin/Promos'));
const { AdminGames } = lazilyLoadable(() => import('../pages/Dashboard/Admin/Games'));
const { DBPartner } = lazilyLoadable(() => import('../pages/Dashboard/Partner'));
const { PartnerOrder } = lazilyLoadable(() => import('../pages/Dashboard/Partner/Order'));
const { PartnerClaim } = lazilyLoadable(() => import('../pages/Dashboard/Partner/Claim'));
const { PartnerCurrencyOffers } = lazilyLoadable(
  () => import('../pages/Dashboard/Partner/CurrencyOffers')
);
const { DBSupport } = lazilyLoadable(() => import('../pages/Dashboard/Support'));
const { SupportOrder } = lazilyLoadable(() => import('../pages/Dashboard/Support/Order'));
const { SupportIncomingOrders } = lazilyLoadable(
  () => import('../pages/Dashboard/Support/IncomingOrders')
);
const { SupportTickets } = lazilyLoadable(() => import('../pages/Dashboard/Support/Tickets'));

import { Router } from '@remix-run/router';

export const router: Router = createBrowserRouter([
  {
    path: ROUTER_PATH.ROOT,
    element: <RootLayout />,
    errorElement: <ErrorElement />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: ROUTER_PATH.WORK_WITH_US,
        caseSensitive: true,
        element: <WorkWithUs />,
      },

      {
        path: ROUTER_PATH.BECOME_BOOSTER,
        caseSensitive: true,
        element: (
          <Authenticated roles={[...Object.values(ROLE)]}>
            <BecomeBooster />
          </Authenticated>
        ),
      },
      {
        path: ROUTER_PATH.BECOME_CURRENCY_SELLER,
        caseSensitive: true,
        element: (
          <Authenticated roles={[...Object.values(ROLE)]}>
            <BecomeCurrencySeller />
          </Authenticated>
        ),
      },
      {
        path: ROUTER_PATH.BECOME_CURRENCY_SUPPLIER,
        caseSensitive: true,
        element: <BecomeCurrencySupplier />,
      },
      {
        path: ROUTER_PATH.GUIDES,
        caseSensitive: true,
        element: <Guides />,
      },
      {
        path: ROUTER_PATH.GUIDES_SINGLE,
        caseSensitive: true,
        element: <GuidesSingle />,
      },
      {
        path: ROUTER_PATH.SIGNIN,
        caseSensitive: true,
        element: <SignIn />,
      },
      {
        path: ROUTER_PATH.SIGNUP,
        caseSensitive: true,
        element: <SignUp />,
      },
      {
        path: ROUTER_PATH.SIGNUP_DISCORD,
        caseSensitive: true,
        element: <SignupDiscord />,
      },
      {
        path: ROUTER_PATH.MY_ORDERS,
        caseSensitive: true,
        element: (
          <Authenticated roles={[...Object.values(ROLE)]}>
            <MyOrders />
          </Authenticated>
        ),
      },
      {
        path: ROUTER_PATH.ORDERS_SINGLE,
        caseSensitive: true,
        element: (
          <Authenticated roles={[...Object.values(ROLE)]}>
            <OrdersSingle />
          </Authenticated>
        ),
      },
      {
        path: ROUTER_PATH.RATE_ORDER,
        caseSensitive: true,
        element: (
          <Authenticated roles={[...Object.values(ROLE)]}>
            <RateOrder />
          </Authenticated>
        ),
      },
      {
        path: ROUTER_PATH.RATE_CLIENT,
        caseSensitive: true,
        element: (
          <Authenticated roles={[...Object.values(ROLE)]}>
            <RateClient />
          </Authenticated>
        ),
      },
      {
        path: ROUTER_PATH.ORDER_REVIEW,
        caseSensitive: true,
        element: (
          <Authenticated roles={[...Object.values(ROLE)]}>
            <OrderReview />
          </Authenticated>
        ),
      },
      {
        path: ROUTER_PATH.PROFILE,
        caseSensitive: true,
        element: (
          <Authenticated roles={[...Object.values(ROLE)]}>
            <Profile />
          </Authenticated>
        ),
        children: [
          {
            index: true,
            caseSensitive: true,
            element: <AccountInfo />,
          },
          {
            path: ROUTER_PATH.ACCOUNT_INFO,
            caseSensitive: true,
            element: <AccountInfo />,
          },
          {
            path: ROUTER_PATH.GENERAL_SETTINGS,
            caseSensitive: true,
            element: <GeneralSettings />,
          },
          {
            path: ROUTER_PATH.TRANSACTIONS,
            caseSensitive: true,
            element: <Transactions />,
          },
          {
            path: ROUTER_PATH.WALLET,
            caseSensitive: true,
            element: <Wallet />,
          },
          {
            path: 'wallet/success',
            caseSensitive: true,
            element: <SuccessRecharge />,
          },
        ],
      },
      {
        path: ROUTER_PATH.GAMES,
        caseSensitive: true,
        element: (
          // <Authenticated roles={[...Object.values(ROLES)]}>
          <Games />
          // </Authenticated>
        ),
      },
      {
        path: ROUTER_PATH.SUPPORT,
        caseSensitive: true,
        element: (
          // <Authenticated roles={[...Object.values(ROLES)]}>
          <Support />
          // </Authenticated>
        ),
      },
      {
        path: ROUTER_PATH.SUPPORT_TICKET_SUMMARY,
        caseSensitive: true,
        element: (
          // <Authenticated roles={[...Object.values(ROLES)]}>
          <SupportTicketSummary />
          // </Authenticated>
        ),
      },
      {
        path: ROUTER_PATH.GAMES_SINGLE,
        caseSensitive: true,
        element: (
          // <Authenticated roles={[...Object.values(ROLES)]}>
          <GamesSingle />
          // </Authenticated>
        ),
      },
      // {
      //   path: ROUTER_PATH.CURRENCIES,
      //   caseSensitive: true,
      //   element: (
      //     // <Authenticated roles={[...Object.values(ROLES)]}>
      //     <Currencies />
      //     // </Authenticated>
      //   ),
      // },
      {
        path: ROUTER_PATH.CURRENCIES_SINGLE,
        caseSensitive: true,
        element: (
          // <Authenticated roles={[...Object.values(ROLES)]}>
          <CurrenciesSingle />
          // </Authenticated>
        ),
      },
      {
        path: ROUTER_PATH.OFFERS_SINGLE,
        caseSensitive: true,
        element: (
          // <Authenticated roles={[...Object.values(ROLES)]}>
          <OffersSingle />
          // </Authenticated>
        ),
      },
      {
        path: ROUTER_PATH.CHECKOUT,
        caseSensitive: true,
        element: (
          // <Authenticated roles={[...Object.values(ROLES)]}>
          <Checkout />
          // </Authenticated>
        ),
        children: [
          {
            index: true,
            caseSensitive: true,
            element: <PaymentMethodTabContent />,
          },
          {
            path: ROUTER_PATH.CHECKOUT_METHOD,
            caseSensitive: true,
            element: <PaymentMethodTabContent />,
          },
          {
            path: ROUTER_PATH.CHECKOUT_REVIEW,
            caseSensitive: true,
            element: <ReviewTabContent />,
          },
          {
            path: ROUTER_PATH.CHECKOUT_SUCCESS,
            caseSensitive: true,
            element: <CompletedTabContent />,
          },
        ],
      },
      {
        path: ROUTER_PATH.CHECKOUT_PAYMENT,
        caseSensitive: true,
        element: (
          // <Authenticated roles={[...Object.values(ROLES)]}>
          <Payment />
          // </Authenticated>
        ),
      },
      {
        path: ROUTER_PATH.CHECKOUT_BALANCE_RECHARGE,
        caseSensitive: true,
        element: (
          // <Authenticated roles={[...Object.values(ROLES)]}>
          <BalanceRecharge />
          // </Authenticated>
        ),
      },
      {
        path: ROUTER_PATH.OFFER_CREATE,
        caseSensitive: true,
        element: (
          // <Authenticated roles={[...Object.values(ROLES)]}>
          <CreateOffer />
          // </Authenticated>
        ),
      },
      {
        path: ROUTER_PATH.OFFER_EDIT,
        caseSensitive: true,
        element: (
          // <Authenticated roles={[...Object.values(ROLES)]}>
          <CreateOffer />
          // </Authenticated>
        ),
      },
      {
        path: ROUTER_PATH.GAMES_CREATE,
        caseSensitive: true,
        element: (
          // <Authenticated roles={[...Object.values(ROLES)]}>
          <CreateGame />
          // </Authenticated>
        ),
      },
      {
        path: ROUTER_PATH.GAMES_EDIT,
        caseSensitive: true,
        element: (
          // <Authenticated roles={[...Object.values(ROLES)]}>
          <CreateGame />
          // </Authenticated>
        ),
      },
      {
        path: ROUTER_PATH.PROMO_CREATE,
        caseSensitive: true,
        element: (
          // <Authenticated roles={[...Object.values(ROLES)]}>
          <CreatePromo />
          // </Authenticated>
        ),
      },
      {
        path: ROUTER_PATH.GAME_CURRENCIES_CREATE,
        caseSensitive: true,
        element: (
          // <Authenticated roles={[...Object.values(ROLES)]}>
          <CreateGameCurrency />
          // </Authenticated>
        ),
      },
      {
        path: ROUTER_PATH.GAME_CURRENCIES_EDIT,
        caseSensitive: true,
        element: (
          // <Authenticated roles={[...Object.values(ROLES)]}>
          <CreateGameCurrency />
          // </Authenticated>
        ),
      },
      {
        path: ROUTER_PATH.GAME_CURRENCIES_OFFER_CREATE,
        caseSensitive: true,
        element: (
          // <Authenticated roles={[...Object.values(ROLES)]}>
          <CreateGameCurrencyOffer />
          // </Authenticated>
        ),
      },
      {
        path: ROUTER_PATH.GAME_CURRENCIES_OFFER_EDIT,
        caseSensitive: true,
        element: (
          // <Authenticated roles={[...Object.values(ROLES)]}>
          <CreateGameCurrencyOffer />
          // </Authenticated>
        ),
      },
      {
        path: ROUTER_PATH.PROMO_EDIT,
        caseSensitive: true,
        element: (
          // <Authenticated roles={[...Object.values(ROLES)]}>
          <CreatePromo />
          // </Authenticated>
        ),
      },
      {
        path: ROUTER_PATH.ABOUT_US,
        caseSensitive: true,
        element: <AboutUs />,
      },
      {
        path: ROUTER_PATH.REFUND_POLICY,
        caseSensitive: true,
        element: <RefundPolicy />,
      },
      {
        path: ROUTER_PATH.COOKIE_POLICY,
        caseSensitive: true,
        element: <CookiePolicy />,
      },
      {
        path: ROUTER_PATH.COPYRIGHT_NOTICE,
        caseSensitive: true,
        element: <CopyrightNotice />,
      },
      {
        path: ROUTER_PATH.TERMS_AND_CONDITIONS,
        caseSensitive: true,
        element: <TermsAndConditions />,
      },
      {
        path: ROUTER_PATH.PRIVACY_POLICY,
        caseSensitive: true,
        element: <PrivacyPolicy />,
      },
      {
        path: ROUTER_PATH.CREDENTIAL_ON_FILE,
        caseSensitive: true,
        element: <CredentialOnFile />,
      },
      {
        path: '/testing',
        caseSensitive: true,
        element: <Testing />,
      },
      {
        path: ROUTER_PATH.UNAUTHORIZED,
        // caseSensitive: true,
        element: <Unauthorized />,
      },
      //! must come at the very last of all routes
      {
        path: ROUTER_PATH.ALL,
        element: <NotFound />,
      },
    ],
  },
  {
    path: ROUTER_PATH.DASHBOARD,
    caseSensitive: true,
    element: (
      <Authenticated roles={[...Object.values(ROLE)]}>
        <DashboardLayout />
      </Authenticated>
    ),
    children: [
      // {
      //   path: ROUTER_PATH.DB_CUSTOMER,
      //   caseSensitive: true,
      //   element: (
      //     <Authenticated
      //       roles={[...Object.values(ROLES).filter((r) => r !== ROLES.PARTNER)]}
      //     >
      //       <DBCustomer />
      //     </Authenticated>
      //   ),
      // },
      {
        path: ROUTER_PATH.DB_SUPPORT,
        caseSensitive: true,
        element: (
          <Authenticated roles={[...Object.values(ROLE).filter((r) => r !== ROLE.CUSTOMER)]}>
            <DBSupport />
          </Authenticated>
        ),
        children: [
          {
            index: true,
            caseSensitive: true,
            element: <SupportOrder />,
          },
          {
            path: ROUTER_PATH.SUPPORT_ORDER,
            element: <SupportOrder />,
          },
          {
            path: ROUTER_PATH.SUPPORT_INCOMING_ORDERS,
            element: <SupportIncomingOrders />,
          },
          {
            path: ROUTER_PATH.SUPPORT_TICKETS,
            element: <SupportTickets />,
          },
        ],
      },
      {
        path: ROUTER_PATH.DB_ADMIN,
        caseSensitive: true,
        element: (
          <Authenticated roles={[...Object.values(ROLE)]}>
            <DBAdmin />
          </Authenticated>
        ),
        children: [
          {
            index: true,
            caseSensitive: true,
            element: <AdminOrder />,
          },
          {
            path: ROUTER_PATH.ADMIN_ORDER,
            caseSensitive: true,
            element: <AdminOrder />,
          },
          {
            path: ROUTER_PATH.ADMIN_INCOMING_ORDERS,
            caseSensitive: true,
            element: <AdminIncomingOrders />,
          },
          {
            path: ROUTER_PATH.ADMIN_WORK_WITH_US,
            caseSensitive: true,
            element: <WorkWithUsApproval />,
          },
          {
            path: ROUTER_PATH.ADMIN_EMPLOYEES,
            caseSensitive: true,
            element: <Employees />,
          },
          {
            path: ROUTER_PATH.ADMIN_PARTNERS,
            caseSensitive: true,
            element: <Partners />,
          },
          {
            path: ROUTER_PATH.ADMIN_TICKETS,
            caseSensitive: true,
            element: <Tickets />,
          },
          {
            path: ROUTER_PATH.ADMIN_REVIEWS,
            caseSensitive: true,
            element: <Reviews />,
          },
          {
            path: ROUTER_PATH.ADMIN_USER_MANAGER,
            caseSensitive: true,
            element: <UserManager />,
          },
          {
            path: ROUTER_PATH.ADMIN_PARTNER_MANAGER,
            caseSensitive: true,
            element: <PartnerManager />,
          },
          {
            path: ROUTER_PATH.ADMIN_OFFERS,
            caseSensitive: true,
            element: <Offers />,
          },
          {
            path: ROUTER_PATH.ADMIN_FINANCES,
            caseSensitive: true,
            element: <AdminFinances />,
          },
          {
            path: ROUTER_PATH.ADMIN_CURRENCIES,
            caseSensitive: true,
            element: <AdminCurrencies />,
          },
          {
            path: ROUTER_PATH.ADMIN_PROMOS,
            caseSensitive: true,
            element: <AdminPromos />,
          },
          {
            path: ROUTER_PATH.ADMIN_GAMES,
            caseSensitive: true,
            element: <AdminGames />,
          },
        ],
      },
      {
        path: ROUTER_PATH.DB_PARTNER,
        caseSensitive: true,
        element: (
          <Authenticated roles={[...Object.values(ROLE).filter((r) => r !== ROLE.CUSTOMER)]}>
            <DBPartner />
          </Authenticated>
        ),
        children: [
          {
            index: true,
            caseSensitive: true,
            element: <PartnerOrder />,
          },
          {
            path: ROUTER_PATH.PARTNER_ORDER,
            caseSensitive: true,
            element: <PartnerOrder />,
          },
          {
            path: ROUTER_PATH.PARTNER_CLAIM,
            caseSensitive: true,
            element: <PartnerClaim />,
          },
          {
            path: ROUTER_PATH.PARTNER_CURRENCY_OFFERS,
            element: <PartnerCurrencyOffers />,
          },
        ],
      },
    ],
  },
]);
