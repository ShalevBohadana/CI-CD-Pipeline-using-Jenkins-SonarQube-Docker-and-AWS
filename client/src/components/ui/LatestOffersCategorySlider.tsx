/* eslint-disable import/no-unresolved */
import { useRef } from 'react';
import { Navigation } from 'swiper/modules';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';

import { DEFAULT_CATEGORY_NAME } from '../../pages/Home/LatestGamesOffersTypes';
import { useLatestGamesOffersContext } from '../../pages/Home/LatestGamesOffersContext';

import '../../assets/css/offers-category-slider.css';

export const LatestOffersCategorySlider = () => {
  const navigationNextRef = useRef(null);
  const navigationPrevRef = useRef(null);

  const { categories, activeCategory, gameCurrencyData, selectedGameUid, setActiveCategory } =
    useLatestGamesOffersContext();

  return (
    <div className='flex items-center offers-category-slider-parent'>
      <button ref={navigationPrevRef} type='button' aria-label='Cancel'>
        <svg
          width='48'
          height='48'
          viewBox='0 0 48 48'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <circle
            cx='24'
            cy='24'
            r='23.5'
            transform='matrix(-1 0 0 1 48 0)'
            fill='#F16334'
            fillOpacity='0.24'
            stroke='url(#paint0_linear_216_85947)'
          />
          <g clipPath='url(#clip0_216_85947)'>
            <path
              d='M26.5 17.75L20.25 24L26.5 30.25'
              stroke='white'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </g>
          <defs>
            <linearGradient
              id='paint0_linear_216_85947'
              x1='60'
              y1='-28.5'
              x2='11'
              y2='51'
              gradientUnits='userSpaceOnUse'
            >
              <stop stopColor='#FCB543' />
              <stop offset='1' stopColor='#F16534' />
            </linearGradient>
            <clipPath id='clip0_216_85947'>
              <rect width='20' height='20' fill='white' transform='matrix(-1 0 0 1 34 14)' />
            </clipPath>
          </defs>
        </svg>
      </button>
      <Swiper
        // ref={sliderRef}
        slidesPerView='auto'
        spaceBetween={30}
        navigation={{
          prevEl: navigationPrevRef.current,
          nextEl: navigationNextRef.current,
        }}
        modules={[Navigation]}
        className='justify-start !mx-0 offers-category-slider'
      >
        <SwiperSlide className='!w-auto'>
          <button
            type='button'
            onClick={() => setActiveCategory(DEFAULT_CATEGORY_NAME)}
            className={`${
              activeCategory === DEFAULT_CATEGORY_NAME ? 'active' : ''
            } capitalize inline-flex text-base leading-none font-medium font-tti-medium text-brand-black-30 hover:text-white transition-colors border-x border-transparent [&.active]:text-brand-primary-color-1 [&.active]:border-x-brand-primary-color-1/50 relative isolate z-0 overflow-hidden [&.active]:after:absolute [&.active]:after:-z-10 [&.active]:after:bottom-0 [&.active]:after:left-1/2 [&.active]:after:-translate-x-1/2 [&.active]:after:w-1/4 [&.active]:after:h-[.125rem] [&.active]:after:bg-brand-primary-color-1 [&.active]:after:rounded-t-md [&.active]:before:absolute [&.active]:before:w-11/12 [&.active]:before:h-full [&.active]:before:-top-px [&.active]:before:left-1/2 [&.active]:before:-translate-x-1/2 [&.active]:before:backdrop-blur-lg`}
          >
            <span className='w-full h-full  px-4 py-2 flex justify-center items-center relative z-10'>
              {DEFAULT_CATEGORY_NAME}
            </span>
          </button>
        </SwiperSlide>

        {gameCurrencyData && gameCurrencyData.gameUid === selectedGameUid ? (
          <SwiperSlide className='!w-auto'>
            <button
              type='button'
              onClick={() => setActiveCategory(gameCurrencyData.categoryUid)}
              className={`${
                activeCategory === gameCurrencyData.categoryUid ? 'active' : ''
              } capitalize inline-flex text-base leading-none font-medium font-tti-medium text-brand-black-30 hover:text-white transition-colors border-x border-transparent [&.active]:text-brand-primary-color-1 [&.active]:border-x-brand-primary-color-1/50 relative isolate z-0 overflow-hidden [&.active]:after:absolute [&.active]:after:-z-10 [&.active]:after:bottom-0 [&.active]:after:left-1/2 [&.active]:after:-translate-x-1/2 [&.active]:after:w-1/4 [&.active]:after:h-[.125rem] [&.active]:after:bg-brand-primary-color-1 [&.active]:after:rounded-t-md [&.active]:before:absolute [&.active]:before:w-11/12 [&.active]:before:h-full [&.active]:before:-top-px [&.active]:before:left-1/2 [&.active]:before:-translate-x-1/2 [&.active]:before:backdrop-blur-lg`}
            >
              <span className='w-full h-full  px-4 py-2 flex justify-center items-center relative z-10'>
                {gameCurrencyData.name}
              </span>
            </button>
          </SwiperSlide>
        ) : null}

        {categories?.map((category, idx) => {
          return (
            <SwiperSlide key={`category-${idx + 1}`} className='!w-auto'>
              <button
                type='button'
                onClick={() => setActiveCategory(String(category.value))}
                className={`${
                  activeCategory === String(category.value) ? 'active' : ''
                } capitalize inline-flex text-base leading-none font-medium font-tti-medium text-brand-black-30 hover:text-white transition-colors border-x border-transparent [&.active]:text-brand-primary-color-1 [&.active]:border-x-brand-primary-color-1/50 relative isolate z-0 overflow-hidden [&.active]:after:absolute [&.active]:after:-z-10 [&.active]:after:bottom-0 [&.active]:after:left-1/2 [&.active]:after:-translate-x-1/2 [&.active]:after:w-1/4 [&.active]:after:h-[.125rem] [&.active]:after:bg-brand-primary-color-1 [&.active]:after:rounded-t-md [&.active]:before:absolute [&.active]:before:w-11/12 [&.active]:before:h-full [&.active]:before:-top-px [&.active]:before:left-1/2 [&.active]:before:-translate-x-1/2 [&.active]:before:backdrop-blur-lg`}
              >
                <span className='w-full h-full px-4 py-2 flex justify-center items-center relative z-10'>
                  {category.label}
                </span>
              </button>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <button ref={navigationNextRef} type='button' aria-label='Cancel'>
        <svg
          width='48'
          height='48'
          viewBox='0 0 48 48'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <circle
            cx='24'
            cy='24'
            r='23.5'
            fill='#F16334'
            fillOpacity='0.24'
            stroke='url(#paint0_linear_216_85947)'
          />
          <g clipPath='url(#clip0_216_85947)'>
            <path
              d='M21.5 17.75L27.75 24L21.5 30.25'
              stroke='white'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </g>
          <defs>
            <linearGradient
              id='paint0_linear_216_85947'
              x1='60'
              y1='-28.5'
              x2='11'
              y2='51'
              gradientUnits='userSpaceOnUse'
            >
              <stop stopColor='#FCB543' />
              <stop offset='1' stopColor='#F16534' />
            </linearGradient>
            <clipPath id='clip0_216_85947'>
              <rect width='20' height='20' fill='white' transform='translate(14 14)' />
            </clipPath>
          </defs>
        </svg>
      </button>
    </div>
  );
};
