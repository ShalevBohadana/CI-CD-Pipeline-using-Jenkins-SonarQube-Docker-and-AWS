import { ComponentProps } from 'react';

import { useAppSelector } from '../../redux/hooks';

/**
 * The `SelectedCurrency` component displays the currently selected currency value.
 * @param props - The `props` parameter is an object that contains the properties passed to the
 * `SelectedCurrency` component. These properties can include any valid HTML attributes that can be
 * applied to a `<span>` element, such as `className`, `style`, `onClick`, etc.
 * @returns The SelectedCurrency component is returning a span element with the currency value.
 */
export const SelectedCurrency = (props: ComponentProps<'span'>) => {
  const { currency } = useAppSelector((state) => state.currency);
  return <span {...props}>{currency}</span>;
};
