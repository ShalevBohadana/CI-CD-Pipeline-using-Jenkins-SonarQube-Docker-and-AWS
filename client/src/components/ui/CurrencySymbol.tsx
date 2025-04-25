import { ComponentProps } from 'react';
import { twMergeClsx } from '../../utils/twMergeClsx';

export const CURRENCY_DATA = [
  { value: 'USD', label: 'USD', symbol: '$' },
  { value: 'EUR', label: 'EUR', symbol: '€' },
  { value: 'GBP', label: 'GBP', symbol: '£' },
] as const;

export type CurrencyValue = (typeof CURRENCY_DATA)[number]['value'];

interface CurrencySymbolProps extends ComponentProps<'span'> {
  currency?: CurrencyValue;
  showCode?: boolean;
}

export const CurrencySymbol = ({
  currency = 'USD',
  showCode = false,
  className,
  ...props
}: CurrencySymbolProps) => {
  const currencyInfo = CURRENCY_DATA.find((c) => c.value === currency);
  const symbol = currencyInfo?.symbol || '$';
  const code = currencyInfo?.value || 'USD';

  return (
    <span className={twMergeClsx('font-medium', className)} {...props}>
      {symbol}
      {showCode && <span className='ml-1'>{code}</span>}
    </span>
  );
};
