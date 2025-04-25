import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUserDataQuery } from '@/redux/features/auth/authApi';
import { UserImageIcon } from '@/components/ui/UserImageIcon';

// Custom UserIcon component to replace lucide-react dependency
const UserIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

// Custom ChevronDown icon component
const ChevronsUpDown = (props: React.SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="m7 15 5 5 5-5" />
    <path d="m7 9 5-5 5 5" />
  </svg>
);

const ROLE = {
  OWNER: 'owner',
  ADMIN: 'admin',
  SUPPORT: 'support',
  PARTNER: 'partner',
  CUSTOMER: 'customer',
  VISITOR: 'visitor',
} as const;

interface UserData {
  userId: string;
  roles: string[];
  exp: number;
}

interface UserMenuProps {
  userData: UserData;
  onLogout: () => void;
}

export const UserMenu = ({ userData, onLogout }: UserMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  
  const { data: userRes } = useUserDataQuery(undefined, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  // Close menu when clicking outside
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

  const isAdmin = userData.roles.includes(ROLE.ADMIN) || userData.roles.includes(ROLE.OWNER);

  const menuItems = isAdmin
    ? [
        { label: 'Profile', path: '/profile' },
        { label: 'My Orders', path: '/my-orders' },
        { label: 'Admin Dashboard', path: '/dashboard/admin' },
        { label: 'User Manager', path: '/dashboard/admin/user-manager' },
        { label: 'Partner Manager', path: '/dashboard/admin/partner-manager' },
      ]
    : [
        { label: 'Profile', path: '/profile' },
        { label: 'My Orders', path: '/my-orders' },
      ];

  return (
    <div className='relative' ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='flex items-center space-x-2 p-2 rounded-lg 
                 hover:bg-gray-700/10 transition-all duration-300'
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {userRes?.data?.avatar ? (
          <UserImageIcon className='w-10 h-10 rounded-full object-cover border-2 border-blue-500/30' />
        ) : (
          <div className='w-8 h-8 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 flex items-center justify-center'>
            <UserIcon className='w-4 h-4 text-white' />
          </div>
        )}
        {/* <span className="hidden lg:block text-sm font-medium text-white">
          {userData.userId}
          {isAdmin && ' (Admin)'}
        </span> */}
      </button>

      {/* Menu dropdown with animation */}
      <div
        className={`absolute right-0 mt-2 w-48 origin-top-right rounded-lg
                  bg-gray-900 border border-gray-800
                  shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none
                  divide-y divide-gray-800 transition-all duration-200 ease-out
                  ${isOpen 
                    ? 'transform scale-100 opacity-100' 
                    : 'transform scale-95 opacity-0 pointer-events-none'}`}
      >
        <div className='px-1 py-1'>
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="group flex w-full items-center rounded-md px-2 py-2 text-sm text-white hover:bg-blue-500/10"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className='px-1 py-1'>
          <button
            onClick={() => {
              onLogout();
              setIsOpen(false);
            }}
            className="group flex w-full items-center rounded-md px-2 py-2 text-sm text-red-400 hover:bg-blue-500/10"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};