import React from 'react';
import { GradientBordered } from '../components/ui/GradientBordered';
import { SITE_INFO } from '../enums';

interface JoinServerCardProps {
  orderId?: string;
  userId?: string;
  channelInviteUrl?: string;
  isChannelCreated?: boolean;
}

export const JoinServerCard: React.FC<JoinServerCardProps> = ({
  channelInviteUrl,
  isChannelCreated,
}) => {
  const handleJoinServer = () => {
    if (channelInviteUrl) {
      // Using window.open safely in the browser
      if (typeof window !== 'undefined') {
        window.open(channelInviteUrl, '_blank');
      }
    }
  };

  // Don't show the card if there's no invite URL or channel isn't created
  if (!channelInviteUrl || !isChannelCreated) {
    return null;
  }

  return (
    <GradientBordered className='rounded-[1.25rem] before:rounded-[1.25rem] before:bg-gradient-bordered-light p-9 bg-multi-gradient-1 grid gap-8 py-8 px-6'>
      <div className='grid gap-4'>
        <h2 className='capitalize font-tti-demi-bold font-semibold text-[clamp(1.5rem,4vw,2rem)] leading-none text-white'>
          <span className='text-brand-primary-color-1'>Connect with</span>{' '}
          {SITE_INFO.name.capitalized} <br className='hidden xl:block' />
          <span className='text-brand-primary-color-1'>on Discord!</span>
        </h2>
        <p className='text-base leading-relaxed font-tti-regular font-regular text-brand-black-10'>
          Please join our completely private Discord server for faster communication, to receive
          updates on your orders, and get secret deals for our Discord members only!
        </p>
      </div>
      <div className='self-end inline-flex w-52 '>
        <button
          type='button'
          onClick={handleJoinServer}
          className='inline-flex gap-2 items-center justify-center text-center text-sm xl:text-base leading-none font-medium font-tti-medium bg-brand-primary-color-1 hover:bg-brand-primary-color-light hover:text-brand-primary-color-1 transition-colors px-4 xl:px-6 py-2.5 rounded-md'
        >
          <span className='capitalize'>Join server</span>
          <svg
            className='w-5 h-5'
            viewBox='0 0 21 20'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M11.332 9.16683L18.1654 2.3335'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M18.832 5.6665V1.6665H14.832'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M9.66797 1.6665H8.0013C3.83464 1.6665 2.16797 3.33317 2.16797 7.49984V12.4998C2.16797 16.6665 3.83464 18.3332 8.0013 18.3332H13.0013C17.168 18.3332 18.8346 16.6665 18.8346 12.4998V10.8332'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </button>
      </div>
    </GradientBordered>
  );
};
