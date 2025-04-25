import { ComponentProps } from 'react';

import { twMergeClsx } from '../utils/twMergeClsx';

export const ANIMATED_LOADING_DATA_IMG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' style='margin: auto; background: none; display: block; shape-rendering: auto;' width='78px' height='78px' viewBox='0 0 100 100' preserveAspectRatio='xMidYMid'%3E%3Ccircle cx='50' cy='50' fill='none' stroke='%23F16334' stroke-width='10' r='35' stroke-linecap='round' stroke-dasharray='164.93361431346415 56.97787143782138'%3E%3CanimateTransform attributeName='transform' type='rotate' repeatCount='indefinite' dur='1s' values='0 50 50;360 50 50' keyTimes='0;1'%3E%3C/animateTransform%3E%3C/circle%3E%3C/svg%3E`;

export const LoadingCircle = (
  props: Omit<ComponentProps<'img'>, 'src' | 'srcset' | 'alt' | 'loading' | 'decoding' | 'children'>
) => {
  const { className, ...rest } = props;
  return (
    <picture className='flex flex-wrap w-full justify-center items-center'>
      <img
        src={ANIMATED_LOADING_DATA_IMG}
        alt='loading'
        loading='lazy'
        decoding='async'
        // fetchpriority="low"
        className={twMergeClsx(
          `inline-flex justify-center items-center aspect-square w-10 ${className || ''}`
        )}
        width='40'
        height='40'
        {...rest}
      />
    </picture>
  );
};
