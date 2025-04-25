import { Fragment, PropsWithChildren, useRef } from 'react';
import { useDashboardPageStatus } from './DashboardProvider';
import { Transition } from '@headlessui/react';

import { Dialog } from '@headlessui/react';

export const DashboardModal = ({ children }: PropsWithChildren) => {
  const { isModalOpen, setIsModalOpen } = useDashboardPageStatus();
  const completeButtonRef = useRef(null);

  return (
    <Transition appear show={isModalOpen} as={Fragment}>
      <Dialog
        initialFocus={completeButtonRef}
        as='div'
        className='relative z-10'
        onClose={() => setIsModalOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto minimal-scrollbar'>
          <div className='grid grid-rows-1 grid-cols-1 min-h-full items-center justify-center p-4'>
            <Transition.Child
              as='div'
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
              ref={completeButtonRef}
              className='w-full transform overflow-clip align-middle shadow-xl transition-all'
            >
              <div onClick={(e) => e.stopPropagation()}>{children}</div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
