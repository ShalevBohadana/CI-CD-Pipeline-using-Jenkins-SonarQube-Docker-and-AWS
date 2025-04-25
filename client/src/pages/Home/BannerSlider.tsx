/* eslint-disable import/no-unresolved */
import { Autoplay, Navigation, Pagination, Parallax } from 'swiper/modules';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/parallax';

import bannerBg0 from '../../assets/images/home-banner-image-0.webp';
import bannerBg1 from '../../assets/images/home-banner-image-1.png';
import bannerBg2 from '../../assets/images/home-banner-image-2.png';
import bannerBg3 from '../../assets/images/home-banner-image-3.png';
import bannerBg4 from '../../assets/images/home-banner-image-4.png';
import bannerBg5 from '../../assets/images/home-banner-image-5.png';

import { Banner, IBanner } from './components/Banner';

import './css/banner-slider.css';

export const BANNERS_DATA: Readonly<IBanner>[] = [
  {
    id: '6a2fb5e0-22a9-5dfb-8c2b-fba5c9166g12',
    title: {
      regular: {
        1: 'Acquire',
        2: 'to fuel your gaming experience',
      },
      gradient: {
        1: 'game currencies,',
        2: 'boost and coaching',
      },
    },
    imageUrl: bannerBg0,
  },
  {
    id: '6a2fb5e0-22a9-5bab-8c2b-fba5c9166g12',
    title: {
      regular: {
        1: 'dfgohu',
        2: 'pig regular chosen fighting',
      },
      gradient: {
        1: 'government yes',
        2: 'journey near repeat dfhkg',
      },
    },
    imageUrl: bannerBg1,
  },
  {
    id: '6a2fb5e0-22a9-5bab-8c2b-fba5c9166f12',
    title: {
      regular: {
        1: 'voluptatem',
        2: 'natus neque sed dfhuj niro',
      },
      gradient: {
        1: 'id animi sdfh vitae',
        2: 'possimus odio labor iosam',
      },
    },
    imageUrl: bannerBg2,
  },
  {
    id: 'ccb880be-e345-522f-8e32-6cad0fbbbc89',
    title: {
      regular: {
        1: 'iure',
        2: 'qui nobis voluptas trju cdfjhef',
      },
      gradient: {
        1: 'est ape friam iure dfh',
        2: 'dolo ribus illo totam sdg',
      },
    },
    imageUrl: bannerBg3,
  },
  {
    id: '20c30529-d406-52ad-9e47-c7ec08ab3bd1',
    title: {
      regular: {
        1: 'rerum',
        2: 'aut et ducimus df edjik tyhlkg',
      },
      gradient: {
        1: 'quia fdh suscipit illo',
        2: 'autem dolor dfh eum',
      },
    },
    imageUrl: bannerBg4,
  },
  {
    id: '20c30529-d406-52ad-48hr-c7ec08ab3bd1',
    title: {
      regular: {
        1: 'redfrum',
        2: 'aut etimus df edjik tyhlkg',
      },
      gradient: {
        1: 'quia fdh suscipit illo',
        2: 'aut fyrtg lor dfh eum',
      },
    },
    imageUrl: bannerBg5,
  },
];

export const BannerSlider = () => {
  return (
    <header className='relative isolate z-0 overflow-hidden mt-3'>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        parallax
        speed={600}
        // breakpoints={{
        //   640: {
        //     slidesPerView: 2,
        //     spaceBetween: 18,
        //   },
        //   1024: {
        //     slidesPerView: 3,
        //     spaceBetween: 25,
        //   },
        //   1280: {
        //     slidesPerView: 4,
        //     spaceBetween: 31,
        //   },
        // }}
        pagination={{
          clickable: false,
          // dynamicBullets: true,
        }}
        autoplay={{
          delay: 15000,
          disableOnInteraction: false,
        }}
        loop
        modules={[Pagination, Autoplay, Navigation, Parallax]}
        // onSlideChange={() => console.log('slide change')}
        // onSwiper={(swiper) => console.log(swiper)}
        className='banner-slider relative isolate z-0 overflow-hidden'
      >
        {BANNERS_DATA?.map((banner) => (
          <SwiperSlide key={banner.id}>
            <Banner banner={banner} />
          </SwiperSlide>
        ))}
      </Swiper>
    </header>
  );
};
