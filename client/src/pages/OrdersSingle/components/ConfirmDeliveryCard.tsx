import logoImgSrc from '../../../assets/images/logo.svg';
import { GradientBordered } from '../../../components/ui/GradientBordered';
import { SITE_INFO } from '../../../enums';

import { ConfirmDeliveryButton } from './ConfirmDeliveryButton';

export const ConfirmDeliveryCard = ({ orderId }: { orderId: string }) => {
  return (
    <GradientBordered className='rounded-[1.25rem] before:rounded-[1.25rem] before:bg-gradient-bordered-light p-9 bg-multi-gradient-1 grid gap-8 py-8 px-6'>
      <div className='grid gap-4'>
        <figure className=''>
          <picture className=''>
            <source media='(min-width: 350px)' srcSet={logoImgSrc} />
            <img
              src={logoImgSrc}
              alt='description'
              className='xl:w-44 h-8'
              loading='lazy'
              width='176'
              height='32'
              decoding='async'
              // fetchPriority="low"
            />
          </picture>
        </figure>
        <p className='text-base leading-relaxed font-tti-regular font-regular text-brand-black-10'>
          Thank you for choosing {SITE_INFO.name.capitalized} for this order. You may contact us any
          time by using the chat in the bottom right corner of your screen!
        </p>
      </div>
      <div className='self-end'>
        <ConfirmDeliveryButton orderId={orderId}>
          <svg
            className='w-5 h-5'
            viewBox='0 0 20 20'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              className='fill-white'
              d='M14.168 2.0249H5.83464C3.33464 2.0249 1.66797 3.69157 1.66797 6.19157V11.1916C1.66797 13.6916 3.33464 15.3582 5.83464 15.3582H9.16797L12.8763 17.8249C13.4263 18.1916 14.168 17.7999 14.168 17.1332V15.3582C16.668 15.3582 18.3346 13.6916 18.3346 11.1916V6.19157C18.3346 3.69157 16.668 2.0249 14.168 2.0249ZM12.918 9.3749H7.08464C6.74297 9.3749 6.45964 9.09157 6.45964 8.7499C6.45964 8.40824 6.74297 8.1249 7.08464 8.1249H12.918C13.2596 8.1249 13.543 8.40824 13.543 8.7499C13.543 9.09157 13.2596 9.3749 12.918 9.3749Z'
            />
          </svg>
        </ConfirmDeliveryButton>
      </div>
    </GradientBordered>
  );
};
