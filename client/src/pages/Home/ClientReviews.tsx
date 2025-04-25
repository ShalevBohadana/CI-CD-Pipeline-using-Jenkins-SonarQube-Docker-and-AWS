import { motion } from 'framer-motion';
import { ReviewsSlider } from './components/ReviewsSlider';
import { ReviewsWidget } from './components/ReviewsWidget';

export const ClientReviews = () => {
  return (
    <section className='py-24 relative isolate z-0 overflow-hidden'>
      {/* Decorative Elements */}
      <div className='absolute inset-0 -z-10'>
        <div className='absolute top-0 w-full h-32 bg-gradient-to-b from-brand-black-100/20 to-transparent' />
        <div className='absolute bottom-0 w-full h-32 bg-gradient-to-t from-brand-black-100/20 to-transparent' />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ duration: 1 }}
          className='absolute left-0 top-1/4 w-96 h-96 rounded-full bg-brand-primary-color-1 blur-3xl'
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className='absolute right-0 bottom-1/4 w-96 h-96 rounded-full bg-brand-primary-color-light blur-3xl'
        />
      </div>

      <div className='fb-container'>
        <div className='flex flex-col gap-16'>
          {/* Header Section */}
          <div className='flex flex-col lg:flex-row gap-8 justify-between items-center'>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className='text-center lg:text-left max-w-xl'
            >
              <span className='block text-white font-bold font-tti-bold text-4xl xl:text-5xl mb-2'>
                What Our Clients
              </span>
              <span className='text-brand-primary-color-1/30 bg-clip-text bg-gradient-to-r from-brand-primary-color-1 to-brand-primary-color-light animate-text-gradient font-bold font-tti-bold text-4xl xl:text-5xl'>
                Are Saying
              </span>
            </motion.h2>
            <ReviewsWidget />
          </div>

          {/* Reviews Slider */}
          <ReviewsSlider />
        </div>
      </div>
    </section>
  );
};
