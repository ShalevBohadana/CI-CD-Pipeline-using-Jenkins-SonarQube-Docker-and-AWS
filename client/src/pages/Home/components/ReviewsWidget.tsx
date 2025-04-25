import { motion } from 'framer-motion';
import { TrustPilotIcon } from '../../../components/icons/icons';

export const ReviewsWidget = () => {
  return (
    // ! hidden for not enough reviews
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className='bg-brand-black-100/30 backdrop-blur-sm rounded-xl p-6 flex flex-col sm:flex-row gap-4 items-center justify-center'
    >
      <div className='flex items-center gap-3'>
        <TrustPilotIcon className='w-8 h-8' />
        <span className='text-2xl font-tti-medium text-white'>Trustpilot</span>
      </div>
      <div className='flex flex-col gap-2 text-center sm:text-start'>
        <p className='font-tti-medium text-lg text-brand-primary-color-light'>
          Excellent 5.0 out of 5.0
        </p>
        <p className='font-oxanium text-sm text-brand-black-20'>Based on thousands of reviews</p>
      </div>
    </motion.div>
  );
};
