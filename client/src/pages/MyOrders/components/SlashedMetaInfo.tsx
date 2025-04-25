import { PropsWithChildren } from 'react';

type SlashedMetaInfoProps = {
  title: string;
  hideSlash?: boolean;
} & PropsWithChildren;

export const SlashedMetaInfo = ({ title, hideSlash = false, children }: SlashedMetaInfoProps) => {
  return (
    <div className='flex items-center justify-between gap-2'>
      {hideSlash ? (
        false
      ) : (
        <svg xmlns='http://www.w3.org/2000/svg' className='w-3 h-12 fill-none' viewBox='0 0 10 46'>
          <path
            className='opacity-20'
            d='M1.09839 1L8.97274 45.6654'
            stroke='url(#shopping-cart-item-bar-gradient)'
          />
          <defs>
            <linearGradient
              id='shopping-cart-item-bar-gradient'
              x1='0.286544'
              y1='-48.0189'
              x2='15.7369'
              y2='-46.6046'
              gradientUnits='userSpaceOnUse'
            >
              <stop stopColor='#EBDDD0' />
              <stop offset='1' stopColor='#F16334' />
            </linearGradient>
          </defs>
        </svg>
      )}

      <div className='flex flex-col gap-1 justify-center items-center text-center font-oxanium font-normal leading-none capitalize'>
        <h3 className='text-sm text-brand-black-40'>{title}</h3>

        <p className='text-base leading-none text-white xl:min-w-[10ch]'>{children}</p>
      </div>
    </div>
  );
};
