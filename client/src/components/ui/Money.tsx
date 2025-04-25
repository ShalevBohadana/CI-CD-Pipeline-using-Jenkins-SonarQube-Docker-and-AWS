import { ComponentProps } from 'react';

import { useAppSelector } from '../../redux/hooks';

type Props = {
  value: number;
} & ComponentProps<'span'>;

/**
 * The Money component takes a value and multiplies it by the current currency rate, then displays the
 * result in a span element with any additional attributes passed to it.
 * @param {Props}  - - `value`: The value of the money to be converted.
 * @returns The Money component is returning a span element with the calculated result value.
 */
export const Money = ({ value, ...attributes }: Props) => {
  const { rate } = useAppSelector((state) => state.currency);
  const result = Number((rate * value).toFixed(3));
  return <span {...attributes}>{result}</span>;
};
