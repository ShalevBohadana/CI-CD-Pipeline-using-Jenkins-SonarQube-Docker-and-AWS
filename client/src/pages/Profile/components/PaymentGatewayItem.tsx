import { HTMLProps } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import { CURRENCY_DATA, CURRENCY_VALUE } from '../../../components/ui/SelectCurrencyDropdown';

import { PaymentMethod } from './WalletDepositTabContent';

type Props = {
  gateway: PaymentMethod;
  register?: UseFormRegisterReturn;
  showFee?: boolean;
} & Omit<HTMLProps<HTMLInputElement>, 'ref' | 'type' | 'id'>;

export const PaymentGatewayItem = ({
  gateway: { id, name, logo, serviceFee },
  register = undefined,
  showFee = false,
  ...attributes
}: Props) => {
  const symbol = CURRENCY_DATA?.find((c) => c?.value === CURRENCY_VALUE?.USD)?.symbol;

  return (
    <div
      className={`relative isolate z-0 p-1 overflow-clip w-full max-w-[theme(width.72)] mx-auto ${
        showFee ? 'flex flex-col gap-1' : ''
      }`}
    >
      <input
        type='radio'
        id={id}
        value={name}
        className='sr-only peer'
        {...register}
        {...attributes}
      />

      {/* מסגרת מיוחדת לאחר בחירה */}
      <div className='absolute inset-0 bg-gradient-to-r from-brand-primary-color-1 via-brand-primary-color-light to-brand-primary-color-1 opacity-0 peer-checked:opacity-100 transition-all duration-300 rounded-xl' />

      {/* תוכן הכרטיס */}
      <label
        htmlFor={id}
        className='relative grid w-full overflow-clip justify-center text-center gap-1 xl:gap-2 border border-transparent bg-brand-primary-color-1/[.03] rounded-xl transition-all cursor-pointer py-4 select-none peer-checked:translate-y-[1px] peer-checked:scale-[0.99] hover:bg-brand-primary-color-1/[.05]'
      >
        <picture className='inline-flex justify-center items-center max-w-[theme(width.48)] h-10'>
          <source media='(min-width: 350px)' srcSet={logo} />
          <img
            src={logo}
            alt='description'
            className='h-full object-contain select-none'
            loading='lazy'
            width='190'
            height='40'
            decoding='async'
            draggable={false}
          />
        </picture>
        <span className='first-letter:uppercase text-brand-black peer-checked:text-black text-sm xl:text-base leading-none font-oxanium select-none transition-colors'>
          {name}
        </span>
      </label>

      {showFee && (
        <p className='text-center font-oxanium text-sm leading-none text-white/90 select-none first-letter:uppercase'>
          service fee: {symbol} {serviceFee}
        </p>
      )}
    </div>
  );
};
