import { MouseEventHandler, PropsWithChildren, useState } from 'react';
import toast from 'react-hot-toast';
import Modal from 'react-responsive-modal';

import { LoadingCircle } from '../../../components/LoadingCircle';
import { useConfirmDeliveryMutation } from '../../../redux/features/order/orderApi';

// contains scrollable modal
export const ConfirmDeliveryButton = ({
  children,
  orderId,
}: PropsWithChildren & { orderId: string }) => {
  const [openConfirmDeliveryModal, setOpenConfirmDeliveryModal] = useState<boolean>(false);
  const onOpenConfirmDeliveryModal = () => setOpenConfirmDeliveryModal(true);
  const onCloseConfirmDeliveryModal = () => setOpenConfirmDeliveryModal(false);
  const [confirmDelivery, { isLoading }] = useConfirmDeliveryMutation();
  const handleConfirmDelivery: MouseEventHandler<HTMLButtonElement> = async () => {
    const result = await confirmDelivery({ _id: orderId });
    onCloseConfirmDeliveryModal();
    if (result) {
      toast.success('Order Confirm successfully');
    }
  };
  if (isLoading) {
    return <LoadingCircle />;
  }
  return (
    <>
      <button
        onClick={onOpenConfirmDeliveryModal}
        type='button'
        className='flex w-full h-full gap-2 items-center justify-center text-center text-sm xl:text-base leading-none font-medium font-tti-medium bg-brand-primary-color-1 hover:bg-brand-primary-color-light hover:text-brand-primary-color-1 transition-colors px-4 xl:px-6 py-2.5 rounded-md'
      >
        <span className=''>Confirm delivery</span>
        {children}
      </button>
      {/* ConfirmDelivery */}
      <Modal
        open={openConfirmDeliveryModal}
        onClose={onCloseConfirmDeliveryModal}
        showCloseIcon={false}
        closeOnOverlayClick
        classNames={{
          overlay: 'backdrop-blur-lg',
          modalContainer: 'grid place-items-center',
          modal: 'px-0 py-0 !my-0 mx-auto bg-transparent shadow-none',
        }}
      >
        <div className='relative max-h-[calc(100dvh-5rem)] overflow-auto minimal-scrollbar isolate rounded-[20px] w-[calc(100vw-2rem)] max-w-[700px] bg-brand-black-100/60 p-6 mx-auto grid gap-5 xl:gap-8'>
          <div className='text-center grid gap-4 text-base xl:text-lg'>
            <h2 className='capitalize font-tti-demi-bold font-semibold text-[clamp(1.5rem,4vw,2rem)] leading-none text-brand-primary-color-1'>
              Confirm delivery
            </h2>
            <p className=''>Are you sure?</p>
          </div>
          <div className='flex flex-wrap gap-4 justify-end'>
            <button
              onClick={onCloseConfirmDeliveryModal}
              type='button'
              className='inline-flex gap-4 items-center justify-center text-center text-sm xl:text-base leading-none font-medium font-tti-medium bg-transparent hover:bg-brand-primary-color-1 hover:text-white transition-colors px-4 xl:px-6 py-2.5 rounded-md border border-brand-primary-color-1'
            >
              Cancel
            </button>

            <button
              onClick={handleConfirmDelivery}
              type='button'
              className='inline-flex gap-4 items-center justify-center text-center text-sm xl:text-base leading-none font-medium font-tti-medium bg-brand-primary-color-1 hover:bg-brand-primary-color-light hover:text-brand-primary-color-1 transition-colors px-4 xl:px-6 py-2.5 rounded-md'
            >
              Confirm
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};
