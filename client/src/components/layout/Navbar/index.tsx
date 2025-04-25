import { useAppSelector } from '../../../redux/hooks';
import { DESKTOP_SCREEN, useMatchMedia } from '../../../hooks/useMatchMedia';
import { useModalState } from '../../../hooks/useModalState';
import { useGetCartQuery } from '../../../redux/features/cart/cartApi';
import { useGetNotificationsQuery } from '../../../redux/features/notification/notificationApi';
import { useGetWalletQuery } from '../../../redux/features/wallet/walletApi';
import { useDashboardPageStatus } from '../../../pages/Dashboard/components/DashboardProvider';
import { NavActions } from './components/NavActions';
import NavLinks from './components/NavLinks';
import { NavLogo } from './components/NavLogo';
import { NavMobile } from './components/NavMobile';
import NavSearch from './components/NavSearch';
import { NOTIFICATION_STATUS } from '../../../components/ui/NotificationItem';
import { useUserLogoutMutation } from '../../../redux/features/auth/authApi';
import type { TUserData } from '@/redux/features/auth/authSlice';
import { UserMenu } from './components/UserMenu';
import { AddBalanceForm } from '@/components/ui/AddBalanceForm';
import { RxCross2 } from 'react-icons/rx';
import Modal from 'react-responsive-modal';
import { CartModal } from './components/CartModal';

export const Navbar = () => {
  // Hooks and State
  const authState = useAppSelector((state) => state.auth);
  const token = authState.token;
  const authStateData = authState.user;

  const { isInDashboardPage } = useDashboardPageStatus();
  const isDesktop = useMatchMedia(DESKTOP_SCREEN);
  const [userLogout] = useUserLogoutMutation();

  // Modal States
  const { status: openCart, opener: onOpenCartModal, closer: onCloseCartModal } = useModalState();
  const { opener: onOpenNotificationModal } = useModalState();
  const { opener: onOpenMessageModal } = useModalState();
  const {
    status: openAddBalanceModal,
    opener: onOpenAddBalanceModal,
    closer: onCloseAddBalanceModal,
  } = useModalState();
  const { opener: onOpenGamesModal } = useModalState();
  const { opener: onOpenProfileModal } = useModalState();
  const { opener: onOpenSignInModal } = useModalState();
  const { opener: onOpenSignUpModal } = useModalState();

  // Data Fetching
  const { data: walletData, isLoading: isWalletLoading } = useGetWalletQuery(undefined, {
    skip: !token || !authStateData,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  const { data: notificationRes } = useGetNotificationsQuery(undefined, {
    skip: !token || !authStateData,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  const { data: cartStateData } = useGetCartQuery(undefined, {
    skip: !token || !authStateData,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  // Calculations
  const transactions = walletData?.data?.transactions ?? [];
  const processedTransactions = transactions.map((transaction) => ({
    type: transaction.type as 'deposit' | 'withdraw',
    amount: transaction.amount,
    isPaid: transaction.isPaid,
    status: transaction.paymentStatus,
  }));

  const totalDeposits = processedTransactions
    .filter((t) => t.type === 'deposit' && (t.isPaid || t.status === 'unpaid'))
    .reduce((sum, t) => sum + t.amount, 0);

  const totalWithdrawals = processedTransactions
    .filter((t) => t.type === 'withdraw' && (t.isPaid || t.status === 'unpaid'))
    .reduce((sum, t) => sum + t.amount, 0);

  const balanceAmount = totalDeposits - totalWithdrawals;
  const totalNotifications =
    notificationRes?.data?.notifications?.filter(
      (item) => item.status === NOTIFICATION_STATUS.UNREAD
    ).length || 0;
  const cartItemsCount = cartStateData?.data?.items?.length || 0;

  // Handlers
  const handleLogout = async () => {
    try {
      // Pass an empty object as the argument since the mutation expects something
      await userLogout({});
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Only check wallet loading since we don't have access to auth loading state
  if (isWalletLoading) {
    return (
      <div
        className='h-[4.5rem] sm:h-16 md:h-20 
                   bg-gradient-to-b from-black/90 to-black/70 
                   backdrop-blur-xl transition-all duration-300'
      />
    );
  }

  const userData = authStateData as unknown as TUserData;

  return (
    <nav
      className='fixed top-0 left-0 right-0 z-50
                bg-brand-black-90/[.16] backdrop-blur-3xl
                transition-all duration-300'
    >
      <div className='fb-container max-w-9xl px-4 sm:px-6 xl:px-8 3xl:px-0'>
        {/* Mobile View Container */}
        <div className='lg:hidden'>
          {/* Logo Container - Centered */}
          <div className='flex items-center justify-center h-[4.5rem] sm:h-16 md:h-20'>
            <NavLogo />
          </div>
          {/* Actions Container */}
          <div className='flex items-center justify-between px-2 sm:px-3 py-2'>
            {/* Left Side */}
            <div className='flex items-center gap-2 sm:gap-3'>
              <NavActions
                token={token}
                notifications={totalNotifications}
                cartCount={cartItemsCount}
                isInDashboardPage={isInDashboardPage}
                onNotification={onOpenNotificationModal}
                onCart={onOpenCartModal}
                onMessage={onOpenMessageModal}
                onOpenAddBalanceModal={onOpenAddBalanceModal}
              />
            </div>

            {/* Right Side */}
            <div className='flex items-center gap-2 sm:gap-3'>
              <NavSearch isDesktop={false} />
              <NavMobile
                token={token}
                balanceAmount={balanceAmount}
                onOpenNotificationModal={onOpenNotificationModal}
                onOpenMessageModal={onOpenMessageModal}
                onOpenAddBalanceModal={onOpenAddBalanceModal}
                onOpenProfileModal={onOpenProfileModal}
                onOpenSignInModal={onOpenSignInModal}
                onOpenSignUpModal={onOpenSignUpModal}
              />
            </div>
          </div>
        </div>

        {/* Desktop View Container */}
        <div className='hidden lg:flex lg:items-center lg:justify-between h-20'>
          <NavLogo />

          <NavLinks
            isDesktop={isDesktop}
            isInDashboardPage={isInDashboardPage}
            token={token}
            authStateData={authStateData}
            onOpenGamesModal={onOpenGamesModal}
          />

          <div className='flex items-center gap-2 sm:gap-3 md:gap-4'>
            <NavSearch isDesktop={true} />
            <NavActions
              token={token}
              notifications={totalNotifications}
              cartCount={cartItemsCount}
              isInDashboardPage={isInDashboardPage}
              onNotification={onOpenNotificationModal}
              onCart={onOpenCartModal}
              onMessage={onOpenMessageModal}
              onOpenAddBalanceModal={onOpenAddBalanceModal}
            />
            {token && <UserMenu userData={userData} onLogout={handleLogout} />}
          </div>
        </div>

        {/* Add Balance Modal */}
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
          center
        >
          <div
            className='relative isolate rounded-[20px] 
                      w-[calc(100vw-2rem)] sm:w-[calc(100vw-4rem)] md:w-auto 
                      max-w-[700px] bg-brand-black-100/60 
                      p-4 sm:p-6 mx-auto transition-all duration-300'
          >
            <div className='flex justify-end'>
              <button
                aria-label='Cancel'
                type='button'
                onClick={onCloseAddBalanceModal}
                className='ml-auto inline-flex justify-center items-center 
                         fill-white hover:scale-110 transition-transform duration-200'
              >
                <RxCross2 className='w-5 h-5' />
              </button>
            </div>
            <AddBalanceForm onClose={onCloseAddBalanceModal} />
          </div>
        </Modal>

        {/* Cart Modal */}
        <CartModal isOpen={openCart} onClose={onCloseCartModal} />
      </div>
    </nav>
  );
};
