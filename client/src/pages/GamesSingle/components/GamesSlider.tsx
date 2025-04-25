/* eslint-disable import/no-unresolved */
import { useState } from 'react';
import toast from 'react-hot-toast';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { Autoplay, Navigation, Pagination, Parallax, Scrollbar } from 'swiper/modules';
// Import Swiper React components
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { v4 } from 'uuid';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/parallax';
import 'swiper/css/scrollbar';

import { useGetGameQuery } from '../../../redux/features/game/gameApi';
import { CommonParams } from '../../../types/globalTypes';
import { GameSlider } from '../../CreateGame/components/Main';

import { Banner } from './Banner';

import '../css/games-slider.css';

export const GamesSlider = () => {
  const { uid } = useParams<CommonParams>();
  const swiper = useSwiper();
  const [swiperController, setSwiperController] = useState(swiper);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const { data: currentGameRes } = useGetGameQuery(uid || '', {
    skip: !uid,
    refetchOnFocus: true,
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
  });
  const gameSliders = currentGameRes?.data?.sliders || [];
  const handlePlayTrailer =
    ({ videoUrl }: GameSlider) =>
    async () => {
      if (!videoUrl) {
        toast.error('No video available yet');
        swiperController.autoplay.resume();
        return;
      }
      setShowVideoPlayer(true);
      swiperController.autoplay.pause();
    };

  const handleNavigation = async () => {
    setShowVideoPlayer(false);
    swiperController.autoplay.resume();
  };

  const pagination = {
    clickable: false,
    renderBullet(index: number, className: string) {
      return `<img src="${gameSliders[index].imageUrl}" alt="${gameSliders[index].heading}" class="${className} !w-14 !h-7 xl:!w-24 xl:!h-14 object-cover !rounded-lg !opacity-100 [&.swiper-pagination-bullet-active]:bg-brand-primary-color-1/75 [&.swiper-pagination-bullet-active]:outline [&.swiper-pagination-bullet-active]:outline-4 [&.swiper-pagination-bullet-active]:outline-brand-black-1/80 inline-flex justify-center items-center" />`;
    },
  };
  return (
    <header className='relative isolate z-0 overflow-hidden'>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        parallax
        speed={600}
        pagination={pagination}
        autoplay={{
          delay: 5500,
          disableOnInteraction: false,
        }}
        loop
        navigation={{
          nextEl: '.next-item',
          prevEl: '.prev-item',
        }}
        scrollbar={{
          // hide: true,
          draggable: true,
        }}
        modules={[Pagination, Autoplay, Navigation, Parallax, Scrollbar]}
        // onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper2) => setSwiperController(swiper2)}
        className='games-slider !flex relative isolate z-0 overflow-clip'
      >
        {gameSliders?.map((banner) => (
          <SwiperSlide key={v4()}>
            <Banner
              payload={{
                banner,
                handlePlayTrailer,
                showVideoPlayer,
              }}
            />
          </SwiperSlide>
        ))}
        <div className='games-slider-navigation self-end flex gap-4 xl:max-w-md items-center justify-between relative z-10 px-2 pointer-events-none'>
          <MdNavigateBefore
            onClick={handleNavigation}
            className='prev-item w-6 h-6 rounded-circle bg-brand-primary-color-1 hover:bg-brand-primary-color-light hover:text-brand-primary-color-1 transition-colors pointer-events-auto cursor-pointer'
          />
          <MdNavigateNext
            onClick={handleNavigation}
            className='next-item w-6 h-6 rounded-circle bg-brand-primary-color-1 hover:bg-brand-primary-color-light hover:text-brand-primary-color-1 transition-colors pointer-events-auto cursor-pointer'
          />
        </div>
      </Swiper>
    </header>
  );
};
