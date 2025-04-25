import { useState, useRef, useEffect } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { IEmployeeData } from '../../../redux/features/employee/employeApi';
import { Employee, Partner } from './ManageUserCard';

type Props = {
  payload: Employee | Partner | IEmployeeData;
};

export const ManageUserMenu = ({ payload }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Handle clicking outside to close the menu
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

  const handleUserCardEdit = (user: Employee | Partner | IEmployeeData) => () => {
    console.log(user);
    setIsOpen(false);
  };

  return (
    <div className='relative inline-block text-left z-10' ref={menuRef}>
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className='inline-flex justify-center items-center text-brand-primary-color-1 bg-brand-primary-color-1/[.06] hover:text-white hover:bg-brand-primary-color-1 transition-colors rounded-[.25rem]'
          aria-expanded={isOpen}
          aria-haspopup='true'
        >
          <BsThreeDots className='w-6 h-6 shrink-0' />
        </button>
      </div>

      {/* Custom dropdown menu with animation */}
      <div
        className={`absolute right-0 mt-2 w-52 max-w-[theme(width.40)] origin-top-right rounded-md bg-black text-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition-all duration-100 ease-out
                   ${
                     isOpen
                       ? 'transform opacity-100 scale-100'
                       : 'transform opacity-0 scale-95 pointer-events-none'
                   }`}
      >
        <div className='px-1 py-1 grid'>
          <button
            onClick={handleUserCardEdit(payload)}
            type='button'
            className='group inline-flex items-center rounded-md px-2 py-2 text-sm text-start hover:bg-brand-primary-color-1 hover:text-white'
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};
