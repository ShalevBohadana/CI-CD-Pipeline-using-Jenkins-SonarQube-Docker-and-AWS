import React, { FC, ReactNode } from 'react';

type ModalProps = {
  children: ReactNode;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Modal: FC<ModalProps> = ({ children, showModal, setShowModal }) => {
  return (
    <div className=''>
      <div className=''>
        <div
          className={`${
            showModal ? 'flex' : 'hidden'
          } h-full w-full fixed left-0 min-h-screen isolate z-20 items-center justify-center top-0 xl:mx-auto md:px-28 md:py-10 px-4 py-9 `}
        >
          <div
            className='bg-black bg-opacity-70 backdrop-blur-md w-full h-full absolute cursor-pointer'
            onClick={() => setShowModal(false)}
            role='button'
            tabIndex={-1}
            aria-label='modal-bg'
            onKeyDown={() => {}}
          />
          {children}
        </div>
      </div>
    </div>
  );
};
