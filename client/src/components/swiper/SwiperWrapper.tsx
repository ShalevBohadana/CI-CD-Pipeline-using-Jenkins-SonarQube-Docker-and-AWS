import React from 'react';
import { Swiper as SwiperBase, SwiperSlide as SwiperSlideBase } from 'swiper/react';
import type { SwiperProps, SwiperSlideProps } from 'swiper/react';

type SlideData = {
  isActive: boolean;
  isVisible: boolean;
  isDuplicate: boolean;
  isPrev: boolean;
  isNext: boolean;
};

type SwiperChildren = React.ReactNode | ((slideData: SlideData) => React.ReactNode);

type SwiperWrapperProps = Omit<SwiperProps, 'children'> & {
  children: SwiperChildren | SwiperChildren[];
};

type SlideWrapperProps = Omit<SwiperSlideProps, 'children'> & {
  children: SwiperChildren;
};

export const Swiper = SwiperBase;
export const SwiperSlide = SwiperSlideBase;
