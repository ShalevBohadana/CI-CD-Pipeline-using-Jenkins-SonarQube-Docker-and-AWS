import { Link } from 'react-router-dom';
import { LogoImg } from '../../../ui/LogoImg';
import { ROUTER_PATH } from '../../../../enums/router-path';

export const NavLogo = () => {
  return (
    <Link
      to={ROUTER_PATH.ROOT}
      className='group relative flex items-center transition-transform duration-300 hover:scale-105'
    >
      {/* Desktop Logo */}
      <div className='hidden xl:flex w-44 h-8'>
        <LogoImg className='w-full h-full object-contain' />
      </div>

      {/* Mobile Logo */}
      <div className='xl:hidden flex w-28 h-8'>
        <LogoImg className='w-full h-full object-contain' />
      </div>

      {/* Hover Effect */}
      <div
        className='absolute inset-0 bg-gradient-to-r from-brand-primary-color-1/0 to-brand-primary-color-1/10 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300'
      />
    </Link>
  );
};
