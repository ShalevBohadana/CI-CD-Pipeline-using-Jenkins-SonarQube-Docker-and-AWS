import { BellIcon, CartIcon, MessageIcon } from '../../../icons/icons';
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { SignInForm } from '../../../ui/SignInForm';
import { SignUpForm } from '../../../ui/SignUpForm';
import { useModalState } from '../../../../hooks/useModalState';
import { useGetWalletQuery } from '../../../../redux/features/wallet/walletApi';

interface NavActionsProps {
  token: string;
  notifications: number;
  cartCount: number;
  isInDashboardPage?: boolean;
  onNotification: () => void;
  onCart: () => void;
  onMessage: () => void;
  onOpenAddBalanceModal: () => void;
}

export const NavActions = ({
  token,
  notifications,
  cartCount,
  isInDashboardPage = false,
  onNotification,
  onCart,
  onMessage,
  onOpenAddBalanceModal,
}: NavActionsProps) => {
  const {
    status: openSignInModal,
    opener: onOpenSignInModal,
    closer: onCloseSignInModal,
  } = useModalState();

  const {
    status: openSignUpModal,
    opener: onOpenSignUpModal,
    closer: onCloseSignUpModal,
  } = useModalState();

  // Get wallet data
  const { data: walletData } = useGetWalletQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  // Use the server-provided balance instead of calculating
  const balance = walletData?.data?.balance ?? 0;

  return (
    <>
      <div className='flex items-center space-x-4'>
        {token ? (
          <>
            {/* Notifications */}
            <button
              onClick={onNotification}
              className='relative p-2 rounded-full bg-gradient-to-r 
                      from-brand-primary-color-1/20 to-brand-violet-550/20
                      hover:from-brand-primary-color-1/30 hover:to-brand-violet-550/30
                      transition-all duration-300'
              aria-label='Notifications'
            >
              <BellIcon className='w-5 h-5' />
              {notifications > 0 && (
                <span
                  className='absolute -top-1 -right-1 w-5 h-5 bg-brand-primary-color-1
                              rounded-full flex items-center justify-center text-xs text-white'
                >
                  {notifications}
                </span>
              )}
            </button>

            {/* Messages */}
            <button
              onClick={onMessage}
              className='relative p-2 rounded-full bg-gradient-to-r 
                      from-brand-primary-color-1/20 to-brand-violet-550/20
                      hover:from-brand-primary-color-1/30 hover:to-brand-violet-550/30
                      transition-all duration-300'
              aria-label='Messages'
            >
              <MessageIcon className='w-5 h-5' />
            </button>

            {/* Balance Button - Only show confirmed balance */}
            {!isInDashboardPage ? (
              <button
                onClick={onOpenAddBalanceModal}
                type='button'
                className='hidden lg:flex items-center space-x-2 px-4 py-2 rounded-lg
                  bg-gradient-to-r from-brand-primary-color-1/10 to-brand-violet-550/10
                  hover:from-brand-primary-color-1/20 hover:to-brand-violet-550/20
                  transition-all duration-300'
              >
                <span className='text-sm font-medium text-white'>${balance.toFixed(2)}</span>
              </button>
            ) : null}

            {/* Cart */}
            <button
              onClick={onCart}
              className='relative p-2 rounded-full bg-gradient-to-r 
                      from-brand-primary-color-1 to-brand-primary-color-1/80
                      hover:from-brand-primary-color-light hover:to-brand-primary-color-light/80
                      transition-all duration-300'
              aria-label='Cart'
            >
              <CartIcon className='w-5 h-5' />
              {cartCount > 0 && (
                <span
                  className='absolute -top-1 -right-1 w-5 h-5 bg-white
                              rounded-full flex items-center justify-center text-xs text-black'
                >
                  {cartCount}
                </span>
              )}
            </button>
          </>
        ) : (
          <div className='flex items-center space-x-4'>
            <button
              onClick={onOpenSignInModal}
              className='px-4 py-2 text-white hover:text-brand-primary-color-1 transition-colors'
            >
              Log In
            </button>
            <button
              onClick={onOpenSignUpModal}
              className='px-4 py-2 rounded-lg bg-brand-primary-color-1
                          hover:bg-brand-primary-color-light transition-colors
                          text-white hover:text-black'
            >
              Sign Up
            </button>
          </div>
        )}
      </div>

      {/* Sign In Modal */}
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

      {/* Sign Up Modal */}
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
  );
};
