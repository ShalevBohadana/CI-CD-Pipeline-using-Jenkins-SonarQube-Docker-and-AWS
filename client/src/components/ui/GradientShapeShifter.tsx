import { PropsWithChildren } from 'react';

import { LARGE_SCREEN, useMatchMedia } from '../../hooks/useMatchMedia';

export const GradientShapeShifter = ({ children }: PropsWithChildren) => {
  const isLargeScreen = useMatchMedia(LARGE_SCREEN);

  return (
    <div
      className={`z-0 grow w-full mx-auto flex items-center justify-between gap-2 transition-colors outline-none relative isolate rounded-md overflow-hidden ${
        !isLargeScreen
          ? 'gradient-bordered before:p-[.125rem] before:rounded-md before:bg-gradient-bordered-deep'
          : ''
      }`}
    >
      {/* background  */}
      {isLargeScreen ? (
        <figure className='absolute inset-0 -z-10 w-full h-full'>
          <svg
            width='100%'
            height='100%'
            viewBox='0 0 1249 74'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            preserveAspectRatio='none'
          >
            <path
              d='M1.5522 18.426L6.94557 5.8474C8.20651 2.9066 11.0985 1 14.2982 1H1233.11C1236.11 1 1238.86 2.67931 1240.23 5.34947L1247.12 18.7812C1247.7 19.9108 1248 21.1621 1248 22.4317V65C1248 69.4183 1244.42 73 1240 73H33.191C30.2939 73 27.6231 71.4337 26.2089 68.9052L1.92274 25.4838C0.710402 23.3163 0.5735 20.7086 1.5522 18.426Z'
              className='fill-brand-primary-color-1'
              fillOpacity='0.03'
              stroke='url(#paint0_linear_801_31281)'
            />
            <defs>
              <linearGradient
                id='paint0_linear_801_31281'
                x1='-979.002'
                y1='-56.5'
                x2='-111.428'
                y2='967.486'
                gradientUnits='userSpaceOnUse'
              >
                <stop stopColor='#EBDDD0' />
                <stop offset='1' stopColor='#F16334' />
              </linearGradient>
            </defs>
          </svg>
        </figure>
      ) : (
        false
      )}
      {/* content  */}
      {children}
    </div>
  );
};
