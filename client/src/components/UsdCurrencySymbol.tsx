import { ComponentProps } from 'react';

import { CURRENCY_DATA, CURRENCY_VALUE } from './ui/SelectCurrencyDropdown';

export const UsdCurrencySymbol = (props: ComponentProps<'span'>) => {
  return (
    <span {...props}>
      {CURRENCY_DATA.find((item) => item.value === CURRENCY_VALUE.USD)?.symbol}
    </span>
  );
};
