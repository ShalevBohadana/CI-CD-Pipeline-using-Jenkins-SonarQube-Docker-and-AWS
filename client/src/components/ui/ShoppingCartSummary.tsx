import { FormEventHandler, useState } from 'react';
import toast from 'react-hot-toast';

import { GradientBorderedInput } from '../../pages/Profile/components/GradientBorderedInput';
import { validateNoSpecialChars } from '../../pages/RateOrder/Main';
import { useApplyPromoMutation, useGetCartQuery } from '../../redux/features/cart/cartApi';
import { selectCartItemsTotal, selectCartSubTotal } from '../../redux/features/cart/cartSlice';
import { useAppSelector } from '../../redux/hooks';
import { PromosIcon } from '../icons/icons';

import { CurrencySymbol } from './CurrencySymbol';
import { Money } from './Money';

export const ShoppingCartSummary = () => {
  const [applyPromo] = useApplyPromoMutation();
  const { data: cartData, isLoading: _ } = useGetCartQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
  const [isExpanded, setIsExpanded] = useState(false);
  const [promoCode, setPromoCode] = useState<string>(cartData?.data?.promo?.code || '');
  const itemsTotal = useAppSelector(selectCartItemsTotal);
  const subTotal = useAppSelector(selectCartSubTotal);
  const getCartItemsCount = cartData?.data.items ? cartData.data.items.length : 0;
  const togglePromoCodeBox = async () => {
    setIsExpanded((prev) => !prev);
  };
  /**
   * The function `handlePromoCodeChange` is a TypeScript React function that handles the change event of
   * a promo code input field, validates the input value, and updates the promo code state or displays an
   * error message using toast.
   * @param ev - The parameter `ev` is an event object that represents the event that triggered the
   * change event handler. In this case, it is an event object for the change event on an input element.
   */

  const handlePromoCodeChange: FormEventHandler<HTMLInputElement> = (ev) => {
    const currentValue = ev.currentTarget.value.trim();
    const validatedValue = validateNoSpecialChars(currentValue);

    if (validatedValue === true) {
      setPromoCode(currentValue);
    } else {
      toast.error(validatedValue);
    }
  };

  /**
   * The function handles the application of a promo code and logs the code to the console while
   * displaying a success message.
   */
  const handleApplyPromoCode = async () => {
    if (promoCode) {
      const promo = await applyPromo({ code: promoCode }).unwrap();
      toast.success('Promo code has been applied successfully');
      console.log(promo);
    }
  };

  return (
    <div className='flex flex-col gap-3'>
      <p className='flex items-center justify-between gap-4 font-tti-bold font-bold text-[clamp(1rem,3vw,1.125rem)] leading-tight'>
        <span className=''>Item{getCartItemsCount >= 2 ? 's' : ''}</span>{' '}
        <span className=''>
          <CurrencySymbol className='inline-flex justify-center w-3' />
          <Money value={itemsTotal} />
        </span>
      </p>
      <hr className='rounded border border-brand-black-90' />
      <div
        className={`grid grid-cols-[1fr_auto] items-center justify-between ${
          isExpanded ? 'gap-4' : 'gap-0'
        } font-tti-bold font-bold text-[clamp(1rem,3vw,1.125rem)] leading-tight`}
      >
        <span className=''>Apply promo code</span>{' '}
        <button
          type='button'
          className=''
          aria-label='Apply promo code'
          onClick={togglePromoCodeBox}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='w-4 h-4 fill-current group'
            viewBox='0 0 160 160'
          >
            <rect
              className={`transition-all duration-300 origin-center scale-y-100 ${
                isExpanded ? 'scale-y-0' : ''
              } h-40 w-5 vertical-line`}
              x='70'
            />
            <rect
              className='transition-all duration-300 origin-center scale-y-100 w-40 h-5 horizontal-line '
              y='70'
            />
          </svg>
        </button>
        <div
          className={`col-span-2 grid grid-cols-[1fr_auto] grid-rows-[0fr] [&.active]:grid-rows-[1fr] ${
            isExpanded ? 'active' : ''
          } transition-[grid-template-rows] duration-300 items-center justify-between overflow-hidden`}
        >
          <div className='overflow-hidden grid grid-cols-[1fr_auto] gap-4 font-normal'>
            <GradientBorderedInput
              className='grow'
              icon={<PromosIcon className='ml-4 -mr-2 shrink-0 grayscale' />}
              placeholder='Enter promo code'
              value={promoCode}
              onChange={handlePromoCodeChange}
            />
            <button
              type='button'
              onClick={handleApplyPromoCode}
              disabled={!promoCode}
              className='inline-flex justify-center items-center bg-brand-black-90/50 border border-brand-primary-color-1/50 px-4 py-1 rounded-[.65rem] group hover:border-brand-primary-color-1 transition-colors disabled:hover:bg-brand-black-90/50 disabled:border-brand-primary-color-1/50 disabled:cursor-not-allowed'
            >
              <span className='inline-block first-letter:uppercase text-white group-hover:text-brand-primary-color-1 transition-colors group-disabled:text-white'>
                {promoCode === cartData?.data?.promo?.code ? 'applied' : 'apply'}
              </span>
            </button>
          </div>
        </div>
      </div>
      <hr className='rounded border border-brand-black-90' />
      <p className='flex items-center justify-between gap-4 font-tti-bold font-bold text-[clamp(1rem,3vw,1.125rem)] leading-tight'>
        <span className=''>Subtotal</span>{' '}
        <span className=''>
          <CurrencySymbol className='inline-flex justify-center w-3' />
          <Money value={subTotal} />
        </span>
      </p>
    </div>
  );
};
