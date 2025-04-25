import { useState } from 'react';
import Modal from 'react-responsive-modal';

import { SearchIcon } from '../icons/icons';

import { NavbarSearchInp } from './NavbarSearchInp';

import 'react-responsive-modal/styles.css';

export const NavSearchForm = () => {
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  return (
    <form
      className='xl:rounded-3xs xl:rounded-[.625rem]
xl:bg-brand-black-80 xl:w-full xl:max-w-[18.75rem] xl:h-12 flex xl:flex-row xl:py-0 xl:px-0 xl:items-center xl:justify-start xl:gap-0'
    >
      <button
        aria-label='Open'
        type='button'
        className='rounded-3xl inline-flex items-center justify-center p-2.5 text-brand-black-30 bg-[linear-gradient(90deg,var(--tw-gradient-stops))] from-brand-primary-color-1/[.24] to-brand-violet-550/[.24] xl:bg-none xl:p-0 xl:pointer-events-none xl:touch-none xl:text-brand-black-60 xl:hidden'
        onClick={onOpenModal}
      >
        <SearchIcon />
      </button>

      <Modal
        open={open}
        onClose={onCloseModal}
        closeOnOverlayClick
        classNames={{
          overlay: '',
          modal: 'w-full max-w-full h-[20rem] m-0 !mb-0 bg-transparent shadow-none',
        }}
      >
        <div className='z-50 fixed top-0 w-full h-[84px] right-0 cursor-auto font-tti-medium font-medium text-base leading-none bg-brand-black-90/[.16] isolate'>
          <div className=' bg-brand-black-100 h-full relative isolate z-0 flex px-4 gap-4'>
            <button
              aria-label='Cancel'
              type='button'
              className='inline-flex justify-center items-center shrink-0'
              onClick={onCloseModal}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                className='w-5 h-5 shrink-0 fill-white '
              >
                <path
                  fillRule='evenodd'
                  d='M15.694 18.694a1.043 1.043 0 0 0 0-1.476L10.47 12l5.224-5.218a1.043 1.043 0 0 0 0-1.476 1.046 1.046 0 0 0-1.478 0l-5.91 5.904a1.04 1.04 0 0 0-.305.79 1.04 1.04 0 0 0 .305.79l5.91 5.904c.408.408 1.07.408 1.478 0Z'
                  clipRule='evenodd'
                />
              </svg>
            </button>
            <NavbarSearchInp />
            <button
              aria-label='Submit'
              type='submit'
              className='inline-flex justify-center items-center p-3 shrink-0 bg-brand-primary-color-1 self-center rounded-md'
            >
              <svg
                className='w-4 h-4'
                viewBox='0 0 16 16'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  className='fill-white'
                  d='M6.33341 0.083252C7.49839 0.0832051 8.6402 0.408763 9.62998 1.02319C10.6198 1.63761 11.4181 2.51644 11.9349 3.56051C12.4518 4.60457 12.6665 5.7723 12.5549 6.93193C12.4433 8.09155 12.0099 9.19691 11.3034 10.1233L15.2559 14.0774C15.4054 14.2274 15.4921 14.4286 15.4986 14.6402C15.5051 14.8519 15.4307 15.058 15.2907 15.2168C15.1507 15.3756 14.9555 15.4752 14.7447 15.4953C14.5339 15.5153 14.3234 15.4544 14.1559 15.3249L14.0776 15.2558L10.1234 11.3033C9.33425 11.905 8.41313 12.3102 7.43628 12.4852C6.45943 12.6603 5.45494 12.6002 4.50591 12.31C3.55689 12.0198 2.69062 11.5077 1.97879 10.8162C1.26696 10.1247 0.730031 9.27363 0.412434 8.33341C0.0948375 7.39319 0.00570322 6.39085 0.152407 5.40934C0.29911 4.42784 0.677434 3.49537 1.25607 2.68911C1.83471 1.88285 2.59703 1.22597 3.47995 0.772824C4.36287 0.319681 5.341 0.0833043 6.33341 0.083252ZM6.33341 1.74992C5.11784 1.74992 3.95205 2.2328 3.09251 3.09235C2.23296 3.95189 1.75008 5.11768 1.75008 6.33325C1.75008 7.54883 2.23296 8.71462 3.09251 9.57416C3.95205 10.4337 5.11784 10.9166 6.33341 10.9166C7.54899 10.9166 8.71478 10.4337 9.57432 9.57416C10.4339 8.71462 10.9167 7.54883 10.9167 6.33325C10.9167 5.11768 10.4339 3.95189 9.57432 3.09235C8.71478 2.2328 7.54899 1.74992 6.33341 1.74992Z'
                  fill='#707376'
                />
              </svg>
            </button>
          </div>
        </div>
      </Modal>

      <div className='hidden xl:inline-flex xl:w-full'>
        <NavbarSearchInp />
      </div>
    </form>
  );
};
