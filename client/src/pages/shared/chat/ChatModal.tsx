import { BiMessageDots } from 'react-icons/bi';
import { BsChevronDown } from 'react-icons/bs';
import Modal from 'react-responsive-modal';

import { closeChatModal, toggleChatModal } from '../../../redux/features/chat/chatSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';

import { ChatModalBody } from './ChatModalBody';

export const ChatModal = () => {
  const { isOpen } = useAppSelector((state) => state.chat);
  const dispatch = useAppDispatch();

  const chatModalCloser = () => {
    dispatch(closeChatModal());
  };

  const chatModalToggler = () => {
    dispatch(toggleChatModal());
  };

  return (
    <>
      <button
        aria-label='Cancel'
        type='button'
        onClick={chatModalToggler}
        className='fixed z-[500] bottom-4 right-4 bg-brand-primary-color-1 rounded-circle inline-flex w-12 h-12 justify-center items-center text-center p-2'
      >
        {isOpen ? <BsChevronDown className='w-5 h-5' /> : <BiMessageDots className='w-5 h-5' />}
      </button>
      <Modal
        open={isOpen}
        onClose={chatModalCloser}
        showCloseIcon={false}
        closeOnOverlayClick={false}
        closeOnEsc={false}
        blockScroll={false}
        classNames={{
          // Remove the 'root' property
          overlay: 'backdrop-blur-lg overflow-auto h-0',
          modalContainer:
            'grid place-items-center w-fit top-[unset] left-[unset] right-4 bottom-24', // Move root styles here
          modal: 'px-0 py-0 !my-0 mx-auto bg-transparent shadow-none',
        }}
      >
        <div className='relative isolate rounded-[20px] w-[calc(100vw-2rem)] max-w-2xl bg-brand-black-100 p-6 mx-auto'>
          <div className='flex justify-end'>
            <button
              type='button'
              aria-label='Cancel'
              onClick={chatModalCloser}
              className='ml-auto inline-flex justify-center items-center fill-white'
            >
              <svg xmlns='http://www.w3.org/2000/svg' width='22' height='22' viewBox='0 0 22 22'>
                <path
                  fillRule='evenodd'
                  d='M6.148 4.852a.917.917 0 1 0-1.296 1.296L9.704 11l-4.852 4.852a.917.917 0 1 0 1.296 1.296L11 12.296l4.852 4.852a.917.917 0 0 0 1.296-1.296L12.296 11l4.852-4.852a.917.917 0 1 0-1.296-1.296L11 9.704 6.148 4.852Z'
                  clipRule='evenodd'
                />
              </svg>
            </button>
          </div>
          {isOpen ? <ChatModalBody /> : null}
        </div>
      </Modal>
    </>
  );
};
