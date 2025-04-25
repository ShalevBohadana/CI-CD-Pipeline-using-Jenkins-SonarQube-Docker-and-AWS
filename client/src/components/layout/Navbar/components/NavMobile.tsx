import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineBars3CenterLeft } from 'react-icons/hi2';
import { IoMdClose } from 'react-icons/io';
import { RxCross2 } from 'react-icons/rx';
import { MessageIcon, BellIcon, UserIcon } from '../../../icons/icons';

import { useGetWalletQuery } from '@/redux/features/wallet/walletApi';
import { LucideIcon } from '../../../icons/LucideIcon';
import { Gamepad2 as GamepadIcon } from 'lucide-react';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  strokeWidth?: number;
  className?: string;
}

// All icons using forwardRef pattern
export const DollarSign = React.forwardRef<SVGSVGElement, IconProps>(({
  size = 24,
  strokeWidth = 2,
  className = '',
  ...props
}, ref) => {
  return (
    <svg
      ref={ref}
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={strokeWidth}
      strokeLinecap='round'
      strokeLinejoin='round'
      className={`lucide lucide-dollar-sign ${className}`}
      {...props}
    >
      <line x1='12' y1='2' x2='12' y2='22' />
      <path d='M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' />
    </svg>
  );
});

DollarSign.displayName = 'DollarSign';

export const Star = React.forwardRef<SVGSVGElement, IconProps>(({
  size = 24,
  strokeWidth = 2,
  className = '',
  ...props
}, ref) => {
  return (
    <svg
      ref={ref}
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={strokeWidth}
      strokeLinecap='round'
      strokeLinejoin='round'
      className={`lucide lucide-star ${className}`}
      {...props}
    >
      <polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
    </svg>
  );
});

Star.displayName = 'Star';

export const Gift = React.forwardRef<SVGSVGElement, IconProps>(({
  size = 24,
  strokeWidth = 2,
  className = '',
  ...props
}, ref) => {
  return (
    <svg
      ref={ref}
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={strokeWidth}
      strokeLinecap='round'
      strokeLinejoin='round'
      className={`lucide lucide-gift ${className}`}
      {...props}
    >
      <rect x='3' y='8' width='18' height='4' rx='1' />
      <path d='M12 8v13' />
      <path d='M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7' />
      <path d='M7.5 8a2.5 2.5 0 0 1 0-5A4.8 4.8 0 0 1 12 8a4.8 4.8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5' />
    </svg>
  );
});

Gift.displayName = 'Gift';

export const Users = React.forwardRef<SVGSVGElement, IconProps>(({
  size = 24,
  strokeWidth = 2,
  className = '',
  ...props
}, ref) => {
  return (
    <svg
      ref={ref}
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={strokeWidth}
      strokeLinecap='round'
      strokeLinejoin='round'
      className={`lucide lucide-users ${className}`}
      {...props}
    >
      <path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
      <circle cx='9' cy='7' r='4' />
      <path d='M22 21v-2a4 4 0 0 0-3-3.87' />
      <path d='M16 3.13a4 4 0 0 1 0 7.75' />
    </svg>
  );
});

Users.displayName = 'Users';

export const Headphones = React.forwardRef<SVGSVGElement, IconProps>(({
  size = 24,
  strokeWidth = 2,
  className = '',
  ...props
}, ref) => {
  return (
    <svg
      ref={ref}
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={strokeWidth}
      strokeLinecap='round'
      strokeLinejoin='round'
      className={`lucide lucide-headphones ${className}`}
      {...props}
    >
      <path d='M3 18v-6a9 9 0 0 1 18 0v6' />
      <path d='M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z' />
      <path d='M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z' />
    </svg>
  );
});

Headphones.displayName = 'Headphones';

export const Settings = React.forwardRef<SVGSVGElement, IconProps>(({
  size = 24,
  strokeWidth = 2,
  className = '',
  ...props
}, ref) => {
  return (
    <svg
      ref={ref}
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={strokeWidth}
      strokeLinecap='round'
      strokeLinejoin='round'
      className={`lucide lucide-settings ${className}`}
      {...props}
    >
      <path d='M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z' />
      <circle cx='12' cy='12' r='3' />
    </svg>
  );
});

Settings.displayName = 'Settings';

export const HelpCircle = React.forwardRef<SVGSVGElement, IconProps>(({
  size = 24,
  strokeWidth = 2,
  className = '',
  ...props
}, ref) => {
  return (
    <svg
      ref={ref}
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={strokeWidth}
      strokeLinecap='round'
      strokeLinejoin='round'
      className={`lucide lucide-help-circle ${className}`}
      {...props}
    >
      <circle cx='12' cy='12' r='10' />
      <path d='M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3' />
      <path d='M12 17h.01' />
    </svg>
  );
});

HelpCircle.displayName = 'HelpCircle';

export const Shield = React.forwardRef<SVGSVGElement, IconProps>(({
  size = 24,
  strokeWidth = 2,
  className = '',
  ...props
}, ref) => {
  return (
    <svg
      ref={ref}
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={strokeWidth}
      strokeLinecap='round'
      strokeLinejoin='round'
      className={`lucide lucide-shield ${className}`}
      {...props}
    >
      <path d='M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' />
    </svg>
  );
});

Shield.displayName = 'Shield';

interface NavMobileProps {
  token?: string;
  onOpenSignInModal: () => void;
  onOpenSignUpModal: () => void;
  onOpenMessageModal: () => void;
  onOpenNotificationModal: () => void;
  onOpenAddBalanceModal: () => void;
  onOpenProfileModal: () => void;
  balanceAmount: number;
}

interface MenuItemProps {
  onClick: () => void;
  children: React.ReactNode;
  icon?: React.ReactElement<any, any>;
  className?: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ onClick, children, icon, className = '' }) => (
  <button
    onClick={onClick}
    className={`w-full px-6 py-4 text-left hover:bg-[#f1774e]/10 
               rounded-lg transition-all duration-200 text-white/90 
               hover:text-white flex items-center gap-3 group text-lg ${className}`}
  >
    {icon && <span className='group-hover:text-[#f1774e] transition-colors'>{icon}</span>}

    {children}
  </button>
);

const MenuSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className='space-y-2'>
    <h3 className='text-sm font-medium text-gray-400 uppercase tracking-wider px-6 mb-2'>
      {title}
    </h3>
    {children}
  </div>
);

const Divider = () => <div className='my-6 border-t border-gray-800/30' />;

export const NavMobile: React.FC<NavMobileProps> = ({
  token,
  onOpenSignInModal,
  onOpenSignUpModal,
  onOpenMessageModal,
  onOpenNotificationModal,
  onOpenAddBalanceModal,
  onOpenProfileModal,
  balanceAmount,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: walletData } = useGetWalletQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
  const handleMenuClick = useCallback((callback: () => void) => {
    callback();
    setIsOpen(false);
  }, []);
  const balance = walletData?.data?.balance ?? 0;

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleClose]);

  return (
    <div className='lg:hidden relative'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='p-3 rounded-lg bg-gradient-to-r from-[#f1774e]/20 
                 to-[#f1774e]/10 hover:from-[#f1774e]/30 
                 hover:to-[#f1774e]/20 transition-all duration-300'
        aria-label='Toggle menu'
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <IoMdClose className='w-7 h-7 text-white transition-all duration-200' />
        ) : (
          <HiOutlineBars3CenterLeft className='w-7 h-7 text-white transition-transform duration-200' />
        )}
      </button>

      {isOpen && (
        <div
          className='fixed inset-0 bg-black/80 backdrop-blur-sm z-[9998]'
          onClick={handleClose}
        />
      )}

      <div
        className={`fixed inset-0 w-full sm:w-[400px] sm:right-0 sm:left-auto bg-gray-900 shadow-xl
                   transform transition-transform duration-300 ease-out z-[9999] h-[100dvh]
                   ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className='flex flex-col h-full'>
          <div className='flex justify-between items-center p-6 border-b border-gray-800/30'>
            <h2 className='text-xl font-medium text-white'>Menu</h2>
            <button
              onClick={handleClose}
              className='p-2 hover:bg-[#f1774e]/10 rounded-lg 
                       transition-colors duration-200'
              aria-label='Close menu'
            >
              <RxCross2 className='w-7 h-7 text-white/90 hover:text-white' />
            </button>
          </div>

          <div className='flex-1 overflow-y-auto custom-scrollbar'>
            <div className='py-6 space-y-6'>
              {token ? (
                <>
                  <MenuSection title='Account'>
                    <MenuItem
                      onClick={() => handleMenuClick(onOpenProfileModal)}
                      icon={<UserIcon className='w-6 h-6' />}
                    >
                      Profile
                    </MenuItem>
                    <MenuItem
                      onClick={() => handleMenuClick(onOpenNotificationModal)}
                      icon={<BellIcon className='w-6 h-6' />}
                    >
                      Notifications
                    </MenuItem>
                    <MenuItem
                      onClick={() => handleMenuClick(onOpenMessageModal)}
                      icon={<MessageIcon className='w-6 h-6' />}
                    >
                      Messages
                    </MenuItem>
                    <MenuItem
                      onClick={() => handleMenuClick(onOpenAddBalanceModal)}
                      icon={<LucideIcon icon={DollarSign} className='w-6 h-6' />}
                    >
                      Balance: ${balance.toFixed(2)}
                    </MenuItem>
                  </MenuSection>
                </>
              ) : (
                <>
                  <MenuSection title='Get Started'>
                    <MenuItem
                      onClick={() => handleMenuClick(onOpenSignInModal)}
                      className='font-medium text-[#f1774e] hover:text-[#ff8659] text-xl'
                    >
                      Log In
                    </MenuItem>
                    <MenuItem
                      onClick={() => handleMenuClick(onOpenSignUpModal)}
                      className='font-medium bg-[#f1774e]/10 hover:bg-[#f1774e]/20 text-xl'
                    >
                      Sign Up
                    </MenuItem>
                  </MenuSection>
                </>
              )}
<MenuSection title='Games'>
  <MenuItem
    onClick={handleClose}
    icon={<GamepadIcon className='w-6 h-6' />}
  >
    Browse Games
  </MenuItem>
  <MenuItem
    onClick={handleClose}
    icon={<LucideIcon icon={Star} className='w-6 h-6' />}
  >
    Featured Games
  </MenuItem>
  <MenuItem
    onClick={handleClose}
    icon={<LucideIcon icon={Gift} className='w-6 h-6' />}
  >
    Special Offers
  </MenuItem>
</MenuSection>

              <MenuSection title='Services'>
                <Link
                  to='/work-with-us'
                  className='block px-6 py-4 text-lg hover:bg-[#f1774e]/10 
                           rounded-lg transition-colors duration-200 text-white/90 
                           hover:text-white flex items-center gap-3 group'
                  onClick={handleClose}
                >
                  <LucideIcon
                    icon={Users}
                    className='w-6 h-6 group-hover:text-[#f1774e] transition-colors'
                  />
                  Work with us
                </Link>
                <Link
                  to='/support'
                  className='block px-6 py-4 text-lg hover:bg-[#f1774e]/10 
                           rounded-lg transition-colors duration-200 text-white/90 
                           hover:text-white flex items-center gap-3 group'
                  onClick={handleClose}
                >
                  <LucideIcon
                    icon={Headphones}
                    className='w-6 h-6 group-hover:text-[#f1774e] transition-colors'
                  />
                  Support
                </Link>
              </MenuSection>

              <MenuSection title='More'>
                <MenuItem
                  onClick={handleClose}
                  icon={<LucideIcon icon={Settings} className='w-6 h-6' />}
                >
                  Settings
                </MenuItem>
                <MenuItem
                  onClick={handleClose}
                  icon={<LucideIcon icon={HelpCircle} className='w-6 h-6' />}
                >
                  Help Center
                </MenuItem>
                <MenuItem
                  onClick={handleClose}
                  icon={<LucideIcon icon={Shield} className='w-6 h-6' />}
                >
                  Privacy & Security
                </MenuItem>
              </MenuSection>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};