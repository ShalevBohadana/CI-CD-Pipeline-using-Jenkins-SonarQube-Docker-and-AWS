import { FC } from 'react';

import { ORDER_STATUS } from '../../enums';
import { twMergeClsx } from '../../utils/twMergeClsx';

export const ColoredStatusText: FC<{ value: string }> = ({ value }) => {
  return (
    <span
      className={twMergeClsx(`
    ${value === ORDER_STATUS.COMPLETED ? 'text-brand-green-850' : ''}
    ${value === ORDER_STATUS.PROCESSING ? 'text-brand-yellow-850' : ''}
    ${value === ORDER_STATUS.CONFIRMED ? 'text-brand-green-850' : ''}
    `)}
    >
      {value}
    </span>
  );
};
