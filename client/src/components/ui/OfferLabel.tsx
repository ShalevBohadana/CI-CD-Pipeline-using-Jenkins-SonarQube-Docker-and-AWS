import { ComponentProps, PropsWithChildren } from 'react';

import { twMergeClsx } from '../../utils/twMergeClsx';
import { HotOfferIcon } from '../icons/icons';

export const OfferLabel = ({ children, ...props }: ComponentProps<'span'> & PropsWithChildren) => {
  if (typeof children !== 'string') {
    return null;
  }

  return (
    <span
      {...props}
      className={twMergeClsx(
        `flex gap-2 items-center max-h-10 max-w-[10rem] h-full z-10 font-bebas-neue font-bold text-base leading-none text-white tracking-wider bg-fading-theme-gradient-light-to-deep py-3 px-5 rounded-tr-lg [clip-path:polygon(0_0,100%_0,100%_87%,13%_100%)] ${
          props?.className ? `${props?.className}` : 'justify-self-end'
        }`
      )}
    >
      {children?.toLowerCase().includes('hot offer') ? <HotOfferIcon /> : null}
      {children}
    </span>
  );
};
