import { ComponentProps } from 'react';

import logoImgSrc from '../../assets/images/logo.svg';
import { SITE_INFO } from '../../enums';
import { twMergeClsx } from '../../utils/twMergeClsx';

export const LogoImg = (props: Omit<ComponentProps<'img'>, 'src' | 'srcSet' | 'alt'>) => {
  return (
    <picture className='inline-flex justify-center items-center shrink-0 grow-0'>
      <source media='(min-width: 80rem)' srcSet={`${logoImgSrc} 176w`} />
      <source media='(min-width: 10rem)' srcSet={`${logoImgSrc} 112w`} />
      <img
        src={logoImgSrc}
        alt={`${SITE_INFO.name.capitalized} logo`}
        className={twMergeClsx(`w-28 h-5 xl:w-44 xl:h-8 select-none ${props?.className}`)}
        loading='lazy'
        width='176'
        height='32'
        decoding='async'
        // fetchPriority="low"
        {...props}
      />
    </picture>
  );
};
