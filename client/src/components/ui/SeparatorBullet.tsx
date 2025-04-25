import { ComponentProps } from 'react';

import { twMergeClsx } from '../../utils/twMergeClsx';

export const SeparatorBullet = (props: ComponentProps<'hr'>) => {
  const { className, ...rest } = props;
  return (
    <hr
      className={twMergeClsx(
        `border-none inline-flex justify-center items-center aspect-square rounded-circle shrink-0 w-1 h-1 bg-brand-primary-color-1  ${
          className || ''
        }`
      )}
      {...rest}
    />
  );
};
