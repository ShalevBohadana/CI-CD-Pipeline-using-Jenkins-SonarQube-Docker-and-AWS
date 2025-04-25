import { Fragment } from 'react';

import { GradientBordered } from '../../../../components/ui/GradientBordered';
import { lazilyLoadable } from '../../../../utils/lazilyLoadable';

import { usePartnerClaimContext } from '.';
import { Transition } from '@headlessui/react';

import { Dialog } from '@headlessui/react';

const { OrderSummaryModalContent } = lazilyLoadable(() => import('./OrderSummaryModalContent'));

export const OrderSummaryModal = () => {
  const { isOpen, setIsOpen } = usePartnerClaimContext();
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as='div'
        className='relative z-10'
        onClose={() => setIsOpen(false)}
        onClick={() => setIsOpen(false)}
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
        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <div
                onClick={(ev) => ev.stopPropagation()}
                onKeyUp={() => {}}
                tabIndex={-1}
                role='menu'
                className='w-full max-w-md transform overflow-clip rounded-[1.25rem] bg-black align-middle shadow-xl transition-all'
              >
                <GradientBordered className='rounded-[1.25rem] before:rounded-[1.25rem] before:bg-gradient-bordered-deep p-5 overflow-clip'>
                  <OrderSummaryModalContent />
                </GradientBordered>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
