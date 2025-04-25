/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable react/no-unstable-nested-components */
import { useEffect, useMemo } from 'react';
import toast from 'react-hot-toast';
import { AiFillPlusCircle } from 'react-icons/ai';
import { BsChevronDown } from 'react-icons/bs';
import { HiOutlineBars3CenterLeft } from 'react-icons/hi2';
import { IoMdClose } from 'react-icons/io';
import { RxCross2 } from 'react-icons/rx';
import { Link, NavLink } from 'react-router-dom';
import { Popup } from '../../components/ui/PopupWrapper';

import {
  BellIcon,
  CartIcon,
  MessageIcon,
  OrdersIcon,
  UserIcon,
} from '../../components/icons/icons';
import { LoadingCircle } from '../../components/LoadingCircle';
import { CurrencySymbol } from '../../components/ui/CurrencySymbol';
import { LogoImg } from '../../components/ui/LogoImg';
import { Money } from '../../components/ui/Money';
import { NavSearchForm } from '../../components/ui/NavSearchForm';
import { NOTIFICATION_STATUS } from '../../components/ui/NotificationItem';
import { SelectCurrencyDropdown } from '../../components/ui/SelectCurrencyDropdown';
import { ROLE } from '../../enums/role';

import { ROUTER_PATH } from '../../enums/router-path';
import { DESKTOP_SCREEN, useMatchMedia } from '../../hooks/useMatchMedia';
import { useModalState } from '../../hooks/useModalState';
import { useUserLogoutMutation } from '../../redux/features/auth/authApi';
import { useGetCartQuery } from '../../redux/features/cart/cartApi';
import { closeCartModal, openCartModal } from '../../redux/features/cart/cartSlice';
import { useGetNotificationsQuery } from '../../redux/features/notification/notificationApi';
import { socket } from '../../redux/features/socket/SocketFactory';
import { useGetWalletQuery } from '../../redux/features/wallet/walletApi';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { lazilyLoadable } from '../../utils/lazilyLoadable';
import { useDashboardPageStatus } from '../Dashboard/components/DashboardProvider';
import { Modal } from '../../components/ui/ModalWrapper';

import 'react-responsive-modal/styles.css';
import 'reactjs-popup/dist/index.css';
import { USER_ROLE_ENUM } from '@/types/user';

const { MessageInfo } = lazilyLoadable(() => import('../../components/ui/MessageInfo'));
const { NotificationInfo } = lazilyLoadable(() => import('../../components/ui/NotificationInfo'));

const { NavGameDropdown } = lazilyLoadable(() => import('../../components/ui/NavGameDropdown'));
const { ShoppingCart } = lazilyLoadable(() => import('../../components/ui/ShoppingCart'));
const { SignInForm } = lazilyLoadable(() => import('../../components/ui/SignInForm'));
const { SignUpForm } = lazilyLoadable(() => import('../../components/ui/SignUpForm'));
const { ProfileMenuDropdown } = lazilyLoadable(
  () => import('../../components/ui/ProfileMenuDropdown')
);
const { AddBalanceForm } = lazilyLoadable(() => import('../../components/ui/AddBalanceForm'));
const { UserImageIcon } = lazilyLoadable(() => import('../../components/ui/UserImageIcon'));
const { DashboardSidebar } = lazilyLoadable(
  () => import('../Dashboard/components/DashboardSidebar')
);

export const setClassName = (classState: { isActive: boolean; isPending: boolean }) => {
  const { isActive } = classState;

  const defaultClassNames =
    'first-letter:capitalize hidden xl:inline-flex hover:text-brand-primary-color-1 transition-colors';
  const activeClassNames = 'active underline underline-offset-8 text-brand-primary-color-1';

  return `${defaultClassNames} ${isActive ? activeClassNames : ''}`;
};

export const Navbar = () => {
  const { token, isLoading, ...authStateData } = useAppSelector((state) => state.auth);
  console.log('token', token);

  const dispatch = useAppDispatch();
  const { isInDashboardPage } = useDashboardPageStatus();
  // const getCartItemsCount = useAppSelector(selectCartItemsCount);
  const isDesktop = useMatchMedia(DESKTOP_SCREEN); // 1280px
  const {
    data: walletData,
    isLoading: walletLoading,
    error: walletError,
  } = useGetWalletQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
    // Add skip if no token
    skip: !token,
  });
  console.log('Auth State:', {
    token: !!token,
    // authLoading,
    authStateData,
  });

  console.log('Wallet State:', {
    walletLoading,
    walletError,
    walletData,
    rawBalance: walletData?.data?.balance,
    computedBalance: walletData?.data?.balance ?? 0,
  });
  console.log('Token Check:', {
    hasToken: !!token,
    skipQuery: !token,
    tokenValue: token?.slice(0, 10), // רק ל-debug, אל תציג את כל הטוקן
  });
  const balanceAmount = walletData?.data?.balance ?? 0;
  const { data: notificationRes } = useGetNotificationsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
  const totalNotifications = useMemo(
    () =>
      notificationRes?.data?.notifications?.filter(
        (item) => item.status === NOTIFICATION_STATUS.UNREAD
      ).length || 0,
    [notificationRes]
  );
  // subscribe to the cart state using rtk query
  const { data: cartStateData } = useGetCartQuery(undefined, {
    skip: !token || !authStateData,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
  const getCartItemsCount = cartStateData?.data.items?.length || 0;
  const {
    status: openGames,
    opener: onOpenGamesModal,
    closer: onCloseGamesModal,
  } = useModalState();

  const {
    status: openDashboardSidebar,
    opener: onOpenDashboardSidebarModal,
    closer: onCloseDashboardSidebarModal,
  } = useModalState();

  const {
    status: openProfileModal,
    opener: onOpenProfileModal,
    closer: onCloseProfileModal,
  } = useModalState();

  const {
    status: openSignUpModal,
    opener: onOpenSignUpModal,
    closer: onCloseSignUpModal,
  } = useModalState();

  const {
    status: openMessageModal,
    opener: onOpenMessageModal,
    closer: onCloseMessageModal,
  } = useModalState();

  const {
    status: openNotificationModal,
    opener: onOpenNotificationModal,
    closer: onCloseNotificationModal,
  } = useModalState();

  const {
    status: openSignInModal,
    opener: onOpenSignInModal,
    closer: onCloseSignInModal,
  } = useModalState();

  const {
    status: openAddBalanceModal,
    opener: onOpenAddBalanceModal,
    closer: onCloseAddBalanceModal,
  } = useModalState();

  useEffect(() => {
    function onMessage(data: unknown) {
      console.log('onMessage', data);
      toast.success('Recharge Successful');
    }

    // socket.on('connect', onConnect);
    socket.on('balanceRecharge', onMessage);

    return () => {
      socket.off('balanceRecharge', onMessage);
    };
  }, []);

  // const {
  //   status: openCart,
  //   opener: onOpenCartModal,
  //   closer: onCloseCartModal,
  // } = useModalState();

  const { isOpen: openCart } = useAppSelector((state) => state.cart);
  const onOpenCartModal = () => {
    dispatch(openCartModal(undefined));
  };
  const onCloseCartModal = () => {
    dispatch(closeCartModal(undefined));
  };
  const [userLogout] = useUserLogoutMutation();
  // const handleSocialLogOut = () => {
  //   signOut(auth).then(() => {
  //     dispatch(setUserAuth({ accessToken: '', role: '' }));
  //     onCloseProfileModal();
  //   });
  // };
  const logOutUser = () => {
    userLogout(undefined);
  };
  // const handleLogOut = async () => {
  //   if (auth?.currentUser) {
  //     await signOut(auth);
  //   }

  //   dispatch(setUserAuth(EMPTY_USER_AUTH));
  //   // onCloseProfileModal();
  //   // onCloseSignInModal();
  //   // onCloseSignUpModal();
  // };

  // console.log(auth.currentUser);

  return (
    <nav className='bg-brand-black-90/[.16] backdrop-blur-3xl pt-6 sticky left-0 right-0 top-0 isolate z-[999]'>
      <div className='fb-container max-w-9xl xl:px-4 3xl:px-0'>
        <div className='flex flex-row py-0 items-center justify-between text-left text-base'>
          <div className='flex flex-row items-center justify-between flex-grow xl:gap-4'>
            <div className='flex flex-row items-center justify-start gap-2 xl:gap-4 2xl:gap-8 xl:grow xl:shrink-0'>
              <Link
                to={ROUTER_PATH.ROOT}
                className='absolute xl:static left-1/2 -translate-x-1/2 xl:translate-x-0 w-28 h-8 xl:w-44 xl:h-8 flex-shrink-0 inline-flex justify-center items-center'
              >
                <LogoImg />
              </Link>

              {!isDesktop && isInDashboardPage ? (
                <>
                  <button
                    onClick={onOpenDashboardSidebarModal}
                    type='button'
                    className='p-2 xl:w-32 xl:h-12 xl:px-6 xl:py-3.5 bg-brand-primary-color-1 rounded justify-center items-center xl:gap-3 inline-flex group hover:bg-brand-primary-color-light transition-colors'
                    aria-label='games menu'
                  >
                    <HiOutlineBars3CenterLeft
                      className={`${
                        openDashboardSidebar ? 'hidden' : 'inline-flex xl:hidden'
                      } w-5 h-5 group-hover:stroke-brand-primary-color-1 transition-colors`}
                    />
                    <span className='sr-only'>Dashboard Sidebar</span>

                    <BsChevronDown
                      className={`${
                        openDashboardSidebar ? 'hidden' : 'hidden xl:inline-flex'
                      } w-5 h-5 group-hover:fill-brand-primary-color-1 transition-colors shrink-0`}
                    />
                    <IoMdClose
                      className={`${
                        openDashboardSidebar ? 'inline-flex' : 'hidden'
                      } w-5 h-5 transition-transform shrink-0 strokeWhite fill-white`}
                    />
                  </button>
                  <NavSearchForm />
                </>
              ) : null}

              {isInDashboardPage ? null : (
                <>
                  <button
                    onClick={onOpenGamesModal}
                    type='button'
                    className='p-2 xl:w-32 xl:h-12 xl:px-6 xl:py-3.5 bg-brand-primary-color-1 rounded justify-center items-center xl:gap-3 inline-flex group hover:bg-brand-primary-color-light transition-colors'
                    aria-label='games menu'
                  >
                    <HiOutlineBars3CenterLeft
                      className={`${
                        openGames ? 'hidden' : 'inline-flex xl:hidden'
                      } w-5 h-5 group-hover:stroke-brand-primary-color-1 transition-colors`}
                    />
                    <span className='text-white group-hover:text-brand-primary-color-1 transition-colors text-base font-medium leading-none hidden xl:inline-flex'>
                      Games
                    </span>

                    <BsChevronDown
                      className={`${
                        openGames ? 'hidden' : 'hidden xl:inline-flex'
                      } w-5 h-5 group-hover:fill-brand-primary-color-1 transition-colors shrink-0`}
                    />
                    <IoMdClose
                      className={`${
                        openGames ? 'inline-flex' : 'hidden'
                      } w-5 h-5 transition-transform shrink-0 strokeWhite fill-white`}
                    />
                  </button>
                  {/* games modal  */}
                  <Modal
                    open={openGames}
                    onClose={onCloseGamesModal}
                    showCloseIcon={false}
                    closeOnOverlayClick
                    classNames={{
                      overlay: '',
                      modalContainer: 'overflow-hidden',
                      modal:
                        'w-full h-full max-h-[calc(100dvh-5.3125rem)] xl:max-h-[calc(100dvh-19rem)] top-[85px] xl:top-[98px] p-0 m-0 !mb-0 bg-transparent overflow-hidden shadow-none',
                    }}
                  >
                    <div className='z-50 fixed w-full xl:w-[calc(100%-1rem)] h-full max-h-[calc(100dvh-5.3125rem)] xl:max-h-[calc(100dvh-20rem)] xl:h-auto left-1/2 -translate-x-1/2 bg-brand-black-120 max-w-4xl mx-auto px-4 xl:px-8 pb-4 xl:pb-8 pt-4 rounded-[0.875rem] cursor-auto font-tti-medium font-medium text-base leading-none border border-brand-black-90'>
                      {openGames ? <NavGameDropdown onCloseModal={onCloseGamesModal} /> : null}
                    </div>
                  </Modal>
                  {!isDesktop ? <NavSearchForm /> : null}
                  <NavLink to={ROUTER_PATH.WORK_WITH_US} className={setClassName}>
                    Work with us
                  </NavLink>
                  <NavLink to={ROUTER_PATH.SUPPORT} className={setClassName}>
                    Support
                  </NavLink>
                  {token &&
                  authStateData?.user?.roles &&
                  !authStateData.user.roles.includes('customer' as USER_ROLE_ENUM) ? (
                    <NavLink
                      to={
                        authStateData.user.roles.includes('admin' as USER_ROLE_ENUM)
                          ? ROUTER_PATH.DB_ADMIN
                          : ROUTER_PATH.DB_PARTNER
                      }
                      className={setClassName}
                    >
                      Dashboard
                    </NavLink>
                  ) : null}
                  {authStateData?.user?.roles &&
                  !authStateData.user.roles.includes('customer' as USER_ROLE_ENUM) ? (
                    <Link
                      to={ROUTER_PATH.DASHBOARD}
                      className='justify-start items-end inline-flex gap-2 group transition-colors font-tti-regular font-normal text-brand-black-20 text-base leading-none'
                    >
                      <OrdersIcon className='hidden' />
                      <span className=''>Dashboard</span>
                    </Link>
                  ) : null}
                </>
              )}
            </div>

            <div
              className={`flex flex-row items-center justify-start gap-2 lg:gap-3 xl:gap-6 ${
                isInDashboardPage ? `xl:justify-between xl:flex-grow-[99999]` : ''
              }`}
            >
              {isDesktop ? <NavSearchForm /> : null}
              {!token ? (
                <span className='hidden xl:inline-flex flex-shrink-0 w-[3px] h-[15px] rounded-[1.3125rem] bg-brand-black-80' />
              ) : null}
              {isInDashboardPage ? null : (
                <div className='hidden xl:inline-flex justify-center items-center'>
                  <SelectCurrencyDropdown />
                </div>
              )}
              {!token ? (
                <span className='hidden xl:inline-flex flex-shrink-0 w-[3px] h-[15px] rounded-[1.3125rem] bg-brand-black-80' />
              ) : null}

              {isLoading ? (
                <LoadingCircle />
              ) : (
                <div className='flex flex-row items-center justify-start gap-3 xl:shrink-0'>
                  {!token ? (
                    <>
                      {/* user icon popup for starts */}
                      {isDesktop ? (
                        <button
                          aria-label='Cancel'
                          type='button'
                          className='inline-flex justify-center items-center w-4 h-5 flex-shrink-0 xl:pointer-events-none xl:touch-none'
                        >
                          <UserIcon className='inline-flex' />
                        </button>
                      ) : (
                        <Popup
                          className=''
                          trigger={(open) => (
                            <button
                              aria-label='Cancel'
                              type='button'
                              className='inline-flex justify-center items-center w-4 h-5 flex-shrink-0'
                            >
                              <UserIcon className={`${open ? 'hidden' : 'inline-flex'}`} />
                              <RxCross2
                                className={`${
                                  open ? 'inline-flex' : 'hidden'
                                } w-5 h-5 transition-transform shrink-0 strokeWhite fill-white`}
                              />
                            </button>
                          )}
                          modal
                          nested
                          arrow={false}
                          overlayStyle={{
                            // backdropFilter: 'blur(1rem)',
                            transition: 'all 300ms ease',
                          }}
                          contentStyle={{
                            padding: '0',
                            border: '0',
                            backgroundColor: 'transparent',
                            backgroundImage: 'none',
                          }}
                          position='bottom center'
                        >
                          <div className='z-50 fixed top-[98px] bg-brand-black-120 w-[calc(100%-2rem)] max-w-[703px] right-4 h-28 overflow-auto p-3 xl:p-8 rounded-[0.875rem] cursor-auto font-tti-medium font-medium text-base leading-none border border-brand-black-90 minimal-scrollbar'>
                            <div className='flex flex-col gap-4 h-full justify-between'>
                              <button
                                type='button'
                                onClick={onOpenSignInModal}
                                className='flex flex-row items-center justify-start gap-3'
                              >
                                <span className=''>Log In</span>
                              </button>

                              <button
                                type='button'
                                onClick={onOpenSignUpModal}
                                className='flex flex-row items-center justify-start gap-3'
                              >
                                <span className=''>Sign Up</span>
                              </button>

                              <SelectCurrencyDropdown />

                              <Link
                                to={ROUTER_PATH.WORK_WITH_US}
                                className='justify-start items-end inline-flex gap-2 group transition-colors font-tti-regular font-normal text-brand-black-20 text-base leading-none'
                              >
                                <span className=''> Work with us</span>
                              </Link>
                              <Link
                                to={ROUTER_PATH.SUPPORT}
                                className='justify-start items-end inline-flex gap-2 group transition-colors font-tti-regular font-normal text-brand-black-20 text-base leading-none'
                              >
                                <span className=''>Support</span>
                              </Link>
                            </div>
                          </div>
                        </Popup>
                      )}
                      {/* user icon popup for ends */}

                      <button
                        onClick={onOpenSignInModal}
                        type='button'
                        className='hidden xl:flex items-center justify-start gap-3 shrink-0 hover:text-brand-primary-color-1 transition-colors'
                      >
                        <span className=''>Log In</span>
                      </button>
                      {/* sign in modal  */}
                      <Modal
                        open={openSignInModal}
                        onClose={onCloseSignInModal}
                        showCloseIcon={false}
                        closeOnOverlayClick
                        classNames={{
                          overlay: 'backdrop-blur-lg overflow-auto',
                          modalContainer: 'grid place-items-center',
                          modal: 'px-0 py-0 !my-0 mx-auto bg-transparent shadow-none',
                        }}
                      >
                        <div className='relative isolate rounded-[20px] gradient-bordered before:p-px before:rounded-[20px] before:bg-gradient-bordered-deep bg-brand-primary-color-1/[.12] w-[calc(100vw-2rem)] max-w-[700px] mx-auto'>
                          {openSignInModal ? (
                            <SignInForm
                              modal={{
                                onCloseSignInModal,
                                onCloseSignUpModal,
                                onOpenSignUpModal,
                              }}
                            />
                          ) : null}
                        </div>
                      </Modal>

                      <span className='hidden xl:inline'>/</span>

                      <button
                        onClick={onOpenSignUpModal}
                        type='button'
                        className='hidden xl:flex items-center justify-start gap-3 shrink-0 hover:text-brand-primary-color-1 transition-colors'
                      >
                        <span className=''>Sign Up</span>
                      </button>

                      {/* sign up modal  */}
                      <Modal
                        open={openSignUpModal}
                        onClose={onCloseSignUpModal}
                        showCloseIcon={false}
                        closeOnOverlayClick
                        classNames={{
                          overlay: 'backdrop-blur-lg overflow-auto',
                          modalContainer: 'grid place-items-center',
                          modal: 'px-0 py-0 !my-0 mx-auto bg-transparent shadow-none',
                        }}
                      >
                        <div className='relative isolate rounded-[20px] gradient-bordered before:p-px before:rounded-[20px] before:bg-gradient-bordered-deep bg-brand-primary-color-1/[.12] w-[calc(100vw-2rem)] max-w-[700px] mx-auto'>
                          {openSignUpModal ? (
                            <SignUpForm
                              modal={{
                                onCloseSignUpModal,
                                onCloseSignInModal,
                                onOpenSignInModal,
                              }}
                            />
                          ) : null}
                        </div>
                      </Modal>
                    </>
                  ) : null}

                  {token?.length >= 5 && isDesktop ? (
                    <>
                      {/* messages */}
                      <Popup
                        className=''
                        trigger={(_) => (
                          <button
                            type='button'
                            className='inline-flex justify-center items-center rounded-circle flex-shrink-0 relative isolate z-0 w-12 h-12 bg-[linear-gradient(90deg,var(--tw-gradient-stops))] from-brand-primary-color-1/[.24] to-brand-violet-550/[.24] '
                          >
                            <span className='absolute top-2 right-2 w-4 h-4 bg-brand-primary-color-1 inline-flex rounded-circle items-center justify-center text-center font-normal text-[10px] font-bebas-neue'>
                              13
                            </span>
                            <MessageIcon />
                          </button>
                        )}
                        arrow={false}
                        overlayStyle={{
                          // backdropFilter: 'blur(1rem)',
                          transition: 'all 300ms ease',
                        }}
                        contentStyle={{
                          padding: '0',
                          border: '0',
                          backgroundColor: 'transparent',
                          backgroundImage: 'none',
                        }}
                        position='bottom center'
                      >
                        <div
                          className={`z-50 fixed top-[98px] ${
                            isInDashboardPage ? 'xl:right-2' : ''
                          } bg-brand-black-100/90 w-[calc(100%-2rem)] max-w-lg h-28 overflow-auto p-3 xl:p-8 cursor-auto font-tti-medium font-medium text-base leading-none minimal-scrollbar`}
                        >
                          <div className='flex flex-col gap-4 h-full justify-between'>
                            <MessageInfo />
                          </div>
                        </div>
                      </Popup>

                      {/* notifications */}
                      <Popup
                        className=''
                        trigger={(_) => (
                          <button
                            type='button'
                            className='inline-flex justify-center items-center rounded-circle flex-shrink-0 relative isolate z-0 w-12 h-12 bg-[linear-gradient(90deg,var(--tw-gradient-stops))] from-brand-primary-color-1/[.24] to-brand-violet-550/[.24] '
                          >
                            {totalNotifications >= 1 ? (
                              <span className='absolute top-2 right-2 w-4 h-4 bg-brand-primary-color-1 inline-flex rounded-circle items-center justify-center text-center font-normal text-[10px] font-bebas-neue'>
                                {totalNotifications}
                              </span>
                            ) : null}
                            <BellIcon />
                          </button>
                        )}
                        arrow={false}
                        overlayStyle={{
                          transition: 'all 300ms ease',
                        }}
                        contentStyle={{
                          padding: '0',
                          border: '0',
                          backgroundColor: 'transparent',
                          backgroundImage: 'none',
                        }}
                        position='bottom center'
                      >
                        <div
                          className={`z-50 fixed top-[98px] ${
                            isInDashboardPage ? 'xl:right-2' : ''
                          } bg-brand-black-100/90 w-[calc(100%-2rem)] max-w-xs h-64 overflow-auto p-3 xl:p-5 cursor-auto font-tti-medium font-medium text-base leading-none minimal-scrollbar`}
                        >
                          <div className='flex flex-col gap-4 h-full justify-between'>
                            <NotificationInfo />
                          </div>
                        </div>
                      </Popup>

                      {!isInDashboardPage ? (
                        <>
                          <Link
                            to={ROUTER_PATH.MY_ORDERS}
                            className='justify-center items-end inline-flex gap-2 group transition-colors font-tti-regular font-normal text-brand-black-20 text-base leading-none'
                          >
                            <OrdersIcon />

                            <span className='xl:text-nowrap'>My Orders</span>
                          </Link>

                          <button
                            onClick={onOpenAddBalanceModal}
                            aria-label='Cancel'
                            type='button'
                            className='justify-center items-end inline-flex gap-2 group transition-colors font-tti-regular font-normal text-brand-black-20 text-base leading-none'
                          >
                            <span className='inline-flex justify-center gap-0.5'>
                              <CurrencySymbol className='inline-flex justify-center w-3' />
                              <Money value={balanceAmount || 0} />
                            </span>
                            <AiFillPlusCircle className='w-5 h-5 fill-brand-primary-color-1' />
                          </button>
                        </>
                      ) : null}

                      {/* ProfileItems */}
                      {token && isDesktop ? <ProfileMenuDropdown /> : null}
                    </>
                  ) : null}

                  {token?.length >= 5 && !isDesktop ? (
                    <button
                      onClick={onOpenProfileModal}
                      type='button'
                      className='inline-flex justify-center items-center rounded-circle flex-shrink-0 relative isolate z-0 w-9 h-9 bg-[linear-gradient(90deg,var(--tw-gradient-stops))] from-brand-primary-color-1/[.24] to-brand-violet-550/[.24] overflow-hidden'
                      aria-label='profile menu'
                    >
                      <UserImageIcon
                        className='aspect-square w-12 h-12 inline-flex justify-center items-center rounded-circle'
                        width='48'
                        height='48'
                        loading='lazy'
                        decoding='async'
                      />
                    </button>
                  ) : null}
                </div>
              )}

              {isInDashboardPage ? null : (
                <>
                  <button
                    onClick={onOpenCartModal}
                    type='button'
                    className='py-2 px-2 xl:px-6 xl:py-3.5 bg-brand-primary-color-1 rounded justify-center items-center inline-flex group hover:bg-brand-primary-color-light transition-colors relative isolate z-0 overflow-clip'
                  >{getCartItemsCount ? (
                    <span className='absolute z-10 rounded-circle aspect-square w-full max-w-[theme(width.4)] text-[.625rem] leading-none inline-flex justify-center items-center bg-brand-primary-color-1 group-hover:bg-brand-primary-color-light top-0.5 right-0.5 xl:top-1 xl:right-3 transition-colors group-hover:text-brand-primary-color-1'>
                      {getCartItemsCount}
                    </span>
                  ) : null}
                  <CartIcon className='inline-flex relative overflow-clip shrink-0' />
                </button>
                {/* Cart modal  */}
                <>
                  <Modal
                    open={openCart}
                    onClose={onCloseCartModal}
                    showCloseIcon={false}
                    closeOnOverlayClick
                    classNames={{
                      overlay: '',
                      modalContainer: 'overflow-hidden',
                      modal: [
                        'z-50',
                        'fixed',
                        'top-[85px] xl:top-[97px]',
                        'w-full xl:w-[calc(100%-2rem)]',
                        'max-w-lg',
                        'right-0 xl:right-px',
                        'h-[calc(100dvh-5.3125rem)] xl:h-[calc(100dvh-6.125rem)]',
                        'p-0 m-0 !mb-0',
                        'bg-transparent',
                        'overflow-hidden',
                        'shadow-none',
                      ].join(' '),
                      modalAnimationIn: 'slide-to-left',
                      modalAnimationOut: 'slide-to-right',
                    }}
                  >
                    <div
                      className={[
                        'bg-brand-black-120',
                        'z-50',
                        'fixed',
                        'top-0',
                        'w-full',
                        'h-full',
                        'overflow-auto',
                        'p-3 xl:p-4',
                        'rounded-[0.875rem]',
                        'cursor-auto',
                        'font-tti-medium font-medium',
                        'text-base',
                        'leading-none',
                        'border border-brand-black-90',
                        'minimal-scrollbar',
                      ].join(' ')}
                    >
                      {openCart ? <ShoppingCart /> : null}
                    </div>
                  </Modal>
                </>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
    <hr className='border-none mt-6 h-px w-full bg-fading-theme-gradient-25 ' />

    {/* Add Balance modal */}
    {openAddBalanceModal ? (
      <Modal
        open={openAddBalanceModal}
        onClose={onCloseAddBalanceModal}
        showCloseIcon={false}
        closeOnOverlayClick
        classNames={{
          overlay: 'backdrop-blur-lg overflow-auto',
          modalContainer: 'grid place-items-center',
          modal: 'px-0 py-0 !my-0 mx-auto bg-transparent shadow-none',
        }}
      >
        <div className='relative isolate rounded-[20px] w-[calc(100vw-2rem)] max-w-[700px] bg-brand-black-100/60 p-6 mx-auto'>
          <div className='flex justify-end'>
            <button
              aria-label='Cancel'
              type='button'
              onClick={onCloseAddBalanceModal}
              className='ml-auto inline-flex justify-center items-center fill-white'
            >
              <RxCross2 className='w-5 h-5' />
            </button>
          </div>
          {openAddBalanceModal ? <AddBalanceForm onClose={onCloseAddBalanceModal} /> : null}
        </div>
      </Modal>
    ) : null}

    {/* profile modal mobile */}
    {token && !isDesktop ? (
      <Modal
        open={openProfileModal}
        onClose={onCloseProfileModal}
        showCloseIcon={false}
        closeOnOverlayClick
        classNames={{
          overlay: '',
          modalContainer: 'overflow-hidden flex justify-end',
          modal:
            'z-50 fixed top-[85px] xl:top-[97px] w-80 max-w-lg right-0 xl:right-px h-[calc(100dvh-5.3125rem)] xl:h-[calc(100dvh-6.125rem)] p-0 m-0 !mb-0 bg-transparent overflow-clip shadow-none pointer-events-none',
          modalAnimationIn: 'slide-to-left',
          modalAnimationOut: 'slide-to-right',
        }}
      >
        <div
          className='pointer-events-auto z-50 fixed w-full xl:w-[calc(100%-1rem)] h-auto overflow-auto minimal-scrollbar max-h-[calc(100dvh-5.3125rem)] xl:max-h-[calc(100dvh-20rem)] right-0 bg-brand-black-120 max-w-4xl mx-auto px-4 xl:px-8 pb-4 xl:pb-8 pt-4 rounded-[0.875rem] cursor-auto font-tti-medium font-medium text-base leading-none border border-brand-black-90 grid gap-4'
          onClick={onCloseProfileModal}
          role='menubar'
          tabIndex={-1}
          onKeyUp={() => {}}
        >
          {/* <div className="flex flex-col gap-4 justify-start items-start text-start h-full pr-2 overflow-auto minimal-scrollbar"> */}
          <button
            aria-label='Cancel'
            type='button'
            onClick={onCloseProfileModal}
            className='ml-auto inline-flex justify-center items-center fill-white sticky top-0 backdrop-blur-lg p-1'
          >
            <RxCross2 />
          </button>

          {isInDashboardPage ? null : (
            <>
              <div
                className='relative isolate z-10'
                onClick={(ev) => ev.stopPropagation()}
                role='menuitem'
                tabIndex={-1}
                aria-label='Cancel'
                onKeyUp={() => {}}
              >
                <SelectCurrencyDropdown />
              </div>

              <button
                onClick={onOpenAddBalanceModal}
                type='button'
                className='w-full justify-between items-center flex gap-2 group font-tti-regular font-normal text-brand-black-20 hover:text-white transition-colors text-base leading-none'
              >
                <span className='inline-flex items-start gap-2 flex-col'>
                  <span className=''>Balance</span>
                  <span className=''>
                    <CurrencySymbol className='inline-flex justify-center w-3' />
                    <Money value={balanceAmount || 0} />
                  </span>
                </span>
                <span className='inline-flex items-end gap-1'>
                  <AiFillPlusCircle className='w-5 h-5 fill-brand-primary-color-1' />
                  <span className=''>Add Balance</span>
                </span>
              </button>
            </>
          )}

          <button
            onClick={onOpenMessageModal}
            type='button'
            className='justify-start items-end inline-flex gap-2 group transition-colors font-tti-regular font-normal text-brand-black-20 text-base leading-none'
          >
            Messages
          </button>

          <button
            onClick={onOpenNotificationModal}
            type='button'
            className='justify-start items-end inline-flex gap-2 group transition-colors font-tti-regular font-normal text-brand-black-20 text-base leading-none'
          >
            Notifications
          </button>

          {isInDashboardPage ? null : (
            <Link
              to={ROUTER_PATH.MY_ORDERS}
              className='justify-start items-end inline-flex gap-2 group transition-colors font-tti-regular font-normal text-brand-black-20 text-base leading-none'
            >
              <OrdersIcon className='hidden' />
              <span className='xl:text-nowrap'>My Orders</span>
            </Link>
          )}
          {authStateData?.user?.roles && !authStateData.user.roles.includes('customer' as USER_ROLE_ENUM) ? (
            <Link
              to={ROUTER_PATH.DASHBOARD}
              className='justify-start items-end inline-flex gap-2 group transition-colors font-tti-regular font-normal text-brand-black-20 text-base leading-none'
            >
              <OrdersIcon className='hidden' />
              <span className=''>Dashboard</span>
            </Link>
          ) : null}
          <div className='flex flex-col gap-4 items-start transition-colors font-tti-regular font-normal text-brand-black-20 text-base leading-none'>
            <Link to={ROUTER_PATH.PROFILE} className=''>
              My Profile
            </Link>
            <button onClick={logOutUser} type='button' className=''>
              Sign Out
            </button>
          </div>
          {/* </div> */}
        </div>
      </Modal>
    ) : null}

    {/* Message Modal */}
    <Modal
      open={openMessageModal}
      onClose={onCloseMessageModal}
      showCloseIcon={false}
      closeOnOverlayClick
      classNames={{
        overlay: '',
        modalContainer: 'overflow-hidden',
        modal:
          'w-full h-full max-h-[calc(100dvh-5.3125rem)] xl:max-h-[calc(100dvh-19rem)] top-[85px] xl:top-[98px] p-0 m-0 !mb-0 bg-transparent overflow-hidden shadow-none',
      }}
    >
      <div className='z-50 fixed w-full xl:w-[calc(100%-1rem)] h-full max-h-[calc(100dvh-5.3125rem)] xl:max-h-[calc(100dvh-20rem)] left-1/2 -translate-x-1/2 bg-brand-black-120 max-w-4xl mx-auto px-4 xl:px-8 pb-4 xl:pb-8 pt-4 rounded-[0.875rem] cursor-auto font-tti-medium font-medium text-base leading-none border border-brand-black-90'>
        <div className='flex flex-col gap-4 justify-start items-start text-start'>
          <button
            type='button'
            aria-label='Cancel'
            onClick={onCloseMessageModal}
            className='ml-auto inline-flex justify-center items-center fill-white'
          >
            <RxCross2 />
          </button>
          {openMessageModal ? <MessageInfo /> : null}
        </div>
      </div>
    </Modal>
    {/*  Notification Modal */}
    <Modal
      open={openNotificationModal}
      onClose={onCloseNotificationModal}
      showCloseIcon={false}
      closeOnOverlayClick
      classNames={{
        overlay: '',
        modalContainer: 'overflow-hidden',
        modal:
          'w-full h-full max-h-[calc(100dvh-5.3125rem)] xl:max-h-[calc(100dvh-19rem)] top-[85px] xl:top-[98px] p-0 m-0 !mb-0 bg-transparent overflow-hidden shadow-none',
      }}
    >
      <div className='z-50 fixed w-full xl:w-[calc(100%-1rem)] h-full max-h-[calc(100dvh-5.3125rem)] xl:max-h-[calc(100dvh-20rem)] left-1/2 -translate-x-1/2 bg-brand-black-120 max-w-4xl mx-auto px-4 xl:px-8 pb-4 xl:pb-8 pt-4 rounded-[0.875rem] cursor-auto font-tti-medium font-medium text-base leading-none border border-brand-black-90'>
        <div className='flex flex-col gap-4 justify-start items-start text-start'>
          <button
            type='button'
            aria-label='Cancel'
            onClick={onCloseNotificationModal}
            className='ml-auto inline-flex justify-center items-center fill-white'
          >
            <RxCross2 />
          </button>
          {openNotificationModal ? <NotificationInfo /> : null}
        </div>
      </div>
    </Modal>

    {token && !isDesktop ? (
      <Modal
        open={openDashboardSidebar}
        onClose={onCloseDashboardSidebarModal}
        showCloseIcon={false}
        closeOnOverlayClick
        classNames={{
          overlay: '',
          modalContainer: 'overflow-hidden flex justify-end',
          modal:
            'z-50 fixed top-[85px] xl:top-[97px] w-80 max-w-lg right-0 xl:right-px h-[calc(100dvh-5.3125rem)] xl:h-[calc(100dvh-6.125rem)] p-0 m-0 !mb-0 bg-transparent overflow-clip shadow-none pointer-events-none',
          modalAnimationIn: 'slide-to-left',
          modalAnimationOut: 'slide-to-right',
        }}
      >
        <div
          className='pointer-events-auto z-50 fixed w-full xl:w-[calc(100%-1rem)] h-auto overflow-auto minimal-scrollbar max-h-[calc(100dvh-5.3125rem)] xl:max-h-[calc(100dvh-20rem)] right-0 bg-brand-black-120 max-w-4xl mx-auto px-4 xl:px-8 pb-4 xl:pb-8 pt-4 rounded-[0.875rem] cursor-auto font-tti-medium font-medium text-base leading-none border border-brand-black-90 grid gap-4'
          onClick={onCloseDashboardSidebarModal}
          role='menubar'
          tabIndex={-1}
          onKeyUp={() => {}}
        >
          {/* <div className="flex flex-col gap-4 justify-start items-start text-start h-full pr-2 overflow-auto minimal-scrollbar"> */}
          <button
            type='button'
            aria-label='Cancel'
            onClick={onCloseDashboardSidebarModal}
            className='ml-auto inline-flex justify-center items-center fill-white sticky top-0 backdrop-blur-lg p-1'
          >
            <RxCross2 />
          </button>

          {isInDashboardPage ? <DashboardSidebar /> : null}
          {/* </div> */}
        </div>
      </Modal>
    ) : null}
  </nav>
);
};