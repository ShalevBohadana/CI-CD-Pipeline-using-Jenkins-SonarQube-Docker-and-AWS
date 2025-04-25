/* eslint-disable import/no-unresolved */
import { useEffect, useState } from 'react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import { CustomerReview, ReviewCard } from '../../../components/ui/ReviewCard';

import '../css/reviews-slider.css';
import { motion } from 'framer-motion';

export const ReviewsSlider = () => {
  const [reviews, setReviews] = useState<CustomerReview[]>();
  useEffect(() => {
    if (reviews?.length === undefined || reviews.length === 0) {
      fetch('/data/reviews.json')
        .then((res) => res.json())
        .then((data: CustomerReview[]) => {
          setReviews(data);
        })
        .catch(console.error);
    }
  }, [reviews?.length]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <Swiper
        spaceBetween={24}
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 24,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 32,
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 32,
          },
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop
        modules={[Pagination, Autoplay, Navigation]}
        className='reviews-slider'
      >
        {reviews?.map((review) => (
          <SwiperSlide key={`review-${review.id}`}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <ReviewCard review={review} />
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
};
