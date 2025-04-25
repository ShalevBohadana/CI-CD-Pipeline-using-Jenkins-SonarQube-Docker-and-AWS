import { useCallback, useState, useRef, useEffect } from 'react';
import { BiCaretDown } from 'react-icons/bi';
import { Link } from 'react-router-dom';

import { UserImageIcon } from './UserImageIcon';
import { ROUTER_PATH } from '../../enums/router-path';

import { useAppSelector } from '../../redux/hooks';
import { useUserLogoutMutation } from '../../redux/features/auth/authApi';
import { useDashboardPageStatus } from '../../pages/Dashboard/components/DashboardProvider';
// Import USER_ROLE_ENUM to use for type safety
import { USER_ROLE_ENUM } from '@/types/user';

export const ProfileMenuDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const authState = useAppSelector((state) => state.auth);
  const user = authState.user; // Access the user property from auth state
  const [userLogout] = useUserLogoutMutation();
  const { isInDashboardPage } = useDashboardPageStatus();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = useCallback(() => {
    userLogout({});
    setIsOpen(false);
  }, [userLogout]);

  const getDashboardPath = useCallback(() => {
    if (!user || !user.roles) {
      console.log('No user data or roles');
      return null;
    }

    // Use type assertion to convert string to USER_ROLE_ENUM
    // Alternative 1: if USER_ROLE_ENUM.OWNER exists, use: if (user.roles.includes(USER_ROLE_ENUM.OWNER))
    // Alternative 2: if you can import ROLE enum, use: if (user.roles.includes(ROLE.OWNER))
    if (user.roles.includes('owner' as unknown as USER_ROLE_ENUM)) {
      console.log('Is owner');
      return ROUTER_PATH.DB_ADMIN;
    }

    console.log('Not owner');
    return null;
  }, [user]);

  const dashboardPath = getDashboardPath();

  return (
    <div className='relative inline-flex justify-center items-center' ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='inline-flex justify-center items-center flex-shrink-0 relative isolate z-0 overflow-clip focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'
        aria-expanded={isOpen}
        aria-haspopup='true'
      >
        <UserImageIcon
          className='aspect-square w-12 h-12 inline-flex justify-center items-center rounded-circle'
          width='48'
          height='48'
          loading='lazy'
          decoding='async'
        />
        <BiCaretDown
          className={`transition-all h-4 w-4 hover:text-brand-black-20 text-brand-black-40 ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
          aria-hidden='true'
        />
      </button>

      <div
        className={`absolute right-0 top-full mt-2 origin-top-right bg-brand-black-100/90 xl:w-auto max-w-sm cursor-auto text-base leading-none font-normal font-tti-regular ring-1 ring-black/5 focus:outline-none transition-all duration-200 ease-out 
                  ${
                    isOpen
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-1 pointer-events-none'
                  }`}
      >
        <div className='grid text-start xl:whitespace-nowrap'>
          <Link
            to={ROUTER_PATH.PROFILE}
            className={`py-4 px-5 hover:text-brand-primary-color-1 transition-colors duration-200`}
            onClick={() => setIsOpen(false)}
          >
            My Profile
          </Link>

          {dashboardPath && !isInDashboardPage && (
            <Link
              to={ROUTER_PATH.DB_ADMIN}
              className={`py-4 px-5 hover:text-brand-primary-color-1 transition-colors duration-200`}
              onClick={() => setIsOpen(false)}
            >
              Admin Dashboard
            </Link>
          )}

          <button
            onClick={handleLogout}
            type='button'
            className={`w-full text-start py-4 px-5 hover:text-brand-primary-color-1 transition-colors duration-200`}
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};
