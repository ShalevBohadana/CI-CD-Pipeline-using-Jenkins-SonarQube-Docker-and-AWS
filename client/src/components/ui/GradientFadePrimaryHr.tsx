import { ComponentProps } from 'react';

import { twMergeClsx } from '../../utils/twMergeClsx';

/* This component is a custom
horizontal rule (`<hr>`) element that has a gradient fade effect. */
export const GradientFadePrimaryHr = ({ ...otherProps }: ComponentProps<'hr'>) => {
  return (
    <hr
      {...otherProps}
      className={twMergeClsx(
        `border-none flex w-full h-px bg-[linear-gradient(293deg,var(--tw-gradient-stops))] 
        from-brand-primary-color-1/5 to-brand-primary-color-1/30 ${
          otherProps?.className ? otherProps?.className : ''
        }`
      )}
    />
  );
};
