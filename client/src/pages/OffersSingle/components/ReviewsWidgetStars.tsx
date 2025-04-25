import { TrustPilotIcon, TrustPilotIconFill } from '../../../components/icons/icons';

export const ReviewsWidgetStars = () => {
  return (
    <div className='hidden flex-col gap-4 items-center justify-center text-brand-black-20 text-[clamp(1rem,3vw,1.5rem)] leading-none font-normal'>
      <div className='flex flex-col-reverse sm:flex-row items-center sm:items-baseline justify-center gap-2'>
        <span className=''>
          Based on <span className='text-white'>24,749</span> reviews
        </span>
        <p className='flex flex-wrap items-baseline gap-1'>
          <TrustPilotIcon className='w-6 h-6 shrink-0' />
          <span className='font-medium font-tti-medium'>Trustpilot</span>
        </p>
      </div>
      <div className='flex flex-row flex-wrap gap-2 items-center text-center sm:text-start'>
        <span className=''>Overall Rating</span>
        <div className='flex gap-1 items-center'>
          <TrustPilotIconFill className='w-6 h-6 shrink-0' />
          <TrustPilotIconFill className='w-6 h-6 shrink-0' />
          <TrustPilotIconFill className='w-6 h-6 shrink-0' />
          <TrustPilotIconFill className='w-6 h-6 shrink-0' />
          <TrustPilotIconFill className='w-6 h-6 shrink-0' />
        </div>
      </div>
    </div>
  );
};
