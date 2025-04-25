import { Link } from 'react-router-dom';

import { ShoppingCartSummary } from '../../../components/ui/ShoppingCartSummary';
import { ROUTER_PATH } from '../../../enums/router-path';

export const CheckoutSummary = () => {
  return (
    <div className='flex flex-col gap-4 xl:gap-8 border border-brand-black-90 rounded-2xl p-5 xl:p-8'>
      <h3 className='first-letter:uppercase text-center font-zen-dots text-[clamp(1.25rem,4vw,2rem)]'>
        summary
      </h3>
      <div className='flex flex-col gap-3'>
        <hr className='rounded border border-brand-black-90' />

        <ShoppingCartSummary />
      </div>
      <div className=''>
        {/* <button
          type="button"
          // disabled={false}
          onClick={makePayment}
          className="flex mx-auto h-full justify-center items-center px-4 xl:px-6 py-2 text-[clamp(1.5rem,4vw,3rem)] leading-none rounded-md font-medium font-oxanium text-white bg-brand-primary-color-1 hover:bg-brand-primary-color-light hover:text-brand-primary-color-1 transition-all disabled:grayscale disabled:hover:grayscale disabled:cursor-not-allowed"
        >
          Proceed to payment
        </button> */}
        <Link
          type='button'
          to={ROUTER_PATH.CHECKOUT_PAYMENT}
          className='flex mx-auto h-full justify-center items-center px-4 xl:px-6 py-2 text-[clamp(1.5rem,4vw,3rem)] leading-none rounded-md font-medium font-oxanium text-white bg-brand-primary-color-1 hover:bg-brand-primary-color-light hover:text-brand-primary-color-1 transition-all disabled:grayscale disabled:hover:grayscale disabled:cursor-not-allowed'
        >
          Proceed to payment
        </Link>
      </div>
    </div>
  );
};
