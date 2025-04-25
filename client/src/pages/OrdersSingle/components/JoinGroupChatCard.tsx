import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { GradientBordered } from '@/components/ui/GradientBordered';
import { ROLE } from '@/enums/role';
import { useAppSelector } from '@/redux/hooks';
import { useJoinGroupChatMutation } from '@/redux/features/order/orderApi';

interface ErrorResponse {
  data: {
    errorMessages?: Array<{ message: string }>;
    message?: string;
    status: string | boolean;
    statusCode?: number;
    stack?: string;
  };
  status: number;
}

const BoxedArrowTopRight = () => (
  <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M5.83334 14.1667L14.1667 5.83334'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M5.83334 5.83334H14.1667V14.1667'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

const JoinGroupChatCard = () => {
  const { uid } = useParams<{ uid: string }>();
  const [joinGroupChat] = useJoinGroupChatMutation();
  const auth = useAppSelector((state) => state.auth);
  const roles: ROLE[] = (auth?.user?.roles || [ROLE.VISITOR]) as ROLE[];
  const [inviteUrl, setInviteUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errorType, setErrorType] = useState<'user' | 'discord' | 'general' | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const handleError = (err: any) => {
    console.error('Discord chat error:', err);

    let errorMessage = 'Unable to create Discord channel. Please try again later.';
    let type: 'user' | 'discord' | 'general' = 'general';

    // Check for specific error conditions from the server response
    if (err?.data?.statusCode === 404 || err?.data?.message?.includes('User not found')) {
      errorMessage = 'Unable to find user information. Please contact support.';
      type = 'user';
    } else if (err?.data?.message?.includes('Discord') || err?.data?.stack?.includes('Discord')) {
      errorMessage =
        'Unable to create Discord channel due to permission issues. Our team has been notified.';
      type = 'discord';
    } else if (err?.data?.message) {
      errorMessage = err.data.message;
    }

    setError(errorMessage);
    setErrorType(type);
    toast.error(errorMessage);
  };

  const initializeChat = useCallback(async () => {
    if (!uid) return;

    try {
      setIsLoading(true);
      setError(null);
      setErrorType(null);

      const response = await joinGroupChat({ _id: uid }).unwrap();

      if (response?.data?.inviteUrl) {
        setInviteUrl(response.data.inviteUrl);
        setRetryCount(0); // Reset retry count on success
      } else {
        throw new Error('Discord invite link not available');
      }
    } catch (err) {
      setRetryCount((prev) => prev + 1);
      handleError(err);
    } finally {
      setIsLoading(false);
    }
  }, [uid, joinGroupChat]);

  useEffect(() => {
    initializeChat();
  }, [initializeChat]);

  const handleJoinGroupChat = () => {
    if (inviteUrl) {
      window.open(inviteUrl, '_blank');
    } else {
      toast.error('Discord invite link not available');
    }
  };

  const handleRetry = () => {
    if (retryCount >= 3) {
      toast.error('Maximum retry attempts reached. Please contact support.');
      return;
    }
    if (errorType === 'user' || errorType === 'discord') {
      toast.error('This error requires support intervention. Please contact our support team.');
      return;
    }
    initializeChat();
  };

  const getButtonText = () => {
    if (isLoading) return 'Initializing...';
    if (error) {
      if (errorType === 'user' || errorType === 'discord') return 'Contact Support';
      return 'Retry';
    }
    return 'Join group chat';
  };

  const handleButtonClick = () => {
    if (error) {
      if (errorType === 'user' || errorType === 'discord') {
        // Here you could open a support modal or redirect to support
        toast.error('Please contact our support team for assistance.');
        return;
      }
      handleRetry();
    } else {
      handleJoinGroupChat();
    }
  };

  return (
    <GradientBordered
      className={`rounded-[1.25rem] before:rounded-[1.25rem] before:bg-gradient-bordered-light p-9 bg-multi-gradient-1 grid gap-8 py-8 px-6 ${
        roles.includes(ROLE.SUPPORT) ? 'text-center' : ''
      }`}
    >
      <div className='grid gap-4'>
        <h2 className='capitalize font-tti-demi-bold font-semibold text-[clamp(1.5rem,4vw,2rem)] leading-none text-white'>
          <span className='text-brand-primary-color-1'>Connect with</span>{' '}
          {roles.includes(ROLE.CUSTOMER) ? 'Your' : null}
          {roles.includes(ROLE.SUPPORT) ? 'Our' : null}
          <br className='hidden xl:block' />
          Client <span className='text-brand-primary-color-1'>on Discord!</span>
        </h2>
        {roles.includes(ROLE.CUSTOMER) ? (
          <p className='text-base leading-relaxed font-tti-regular font-regular text-brand-black-10'>
            Please join our completely private Discord group chat for faster communication, to
            receive updates on your order.
          </p>
        ) : null}
        {error && (
          <div className='mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg'>
            <p className='text-red-400 text-sm font-medium'>
              {error}
              {(errorType === 'user' || errorType === 'discord' || retryCount >= 3) && (
                <span className='block mt-1 text-xs'>
                  Please contact our support team for assistance.
                </span>
              )}
            </p>
          </div>
        )}
      </div>
      <div className='self-end'>
        <button
          type='button'
          disabled={isLoading}
          onClick={handleButtonClick}
          className='inline-flex gap-2 items-center justify-center text-center text-sm xl:text-base leading-none font-medium font-tti-medium bg-brand-primary-color-1 hover:bg-brand-primary-color-light hover:text-brand-primary-color-1 transition-colors px-4 xl:px-6 py-2.5 rounded-md disabled:opacity-50 disabled:cursor-not-allowed'
        >
          <span className='capitalize'>{getButtonText()}</span>
          {!isLoading && <BoxedArrowTopRight />}
        </button>
      </div>
    </GradientBordered>
  );
};

export default JoinGroupChatCard;
