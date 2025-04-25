import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { TrustPilotIcon } from '../../../components/icons/icons';
import { CheckoutFeaturedGames } from './CheckoutFeaturedGames';
import { useVerifyPaymentMutation } from '../../../redux/features/payment/paymentApi';

export const CompletedTabContent = () => {
  const { search } = useLocation();
  const [paymentId, setPaymentId] = useState<string>('');
  const sessionId = new URLSearchParams(search).get('session_id');
  const isDemoMode = new URLSearchParams(search).get('demo') === 'true';
  const isProcessing = useRef(true);
  const orderId = new URLSearchParams(search).get('orderId');

  const [verifyPayment, { data: verifiedPaymentData }] = useVerifyPaymentMutation();

  useEffect(() => {
    if (sessionId && isProcessing.current === true && !orderId) {
      const processPayment = async () => {
        try {
          if (isDemoMode) {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setPaymentId(`demo_${Date.now()}`);
          } else {
            const result = await verifyPayment({ sessionId }).unwrap();
            setPaymentId(result.data.paymentId);
          }
        } catch (err) {
          console.error('Payment verification error:', err);
        }
        isProcessing.current = false;
      };

      processPayment();
    }
  }, [verifyPayment, sessionId, isDemoMode]);

  const getPaymentStatus = () => {
    if (isDemoMode) return 'paid';
    if (orderId) return 'paid'; // אם יש orderId, זה אומר שזה תשלום מהארנק
    return verifiedPaymentData?.data?.paymentStatus;
  };

  const getTransactionId = () => {
    if (isDemoMode) return paymentId;
    if (orderId) return orderId; // אם יש orderId, נשתמש בו
    return verifiedPaymentData?.data?.paymentId || paymentId;
  };

  return (
    <div className='pt-10 grid gap-10 xl:gap-20'>
      <div className=''>
        {isDemoMode && (
          <div className='bg-brand-primary-color-1/[0.1] border border-brand-primary-color-1/[0.2] rounded-xl p-4 mb-6 max-w-md mx-auto'>
            <p className='text-white/80 text-sm text-center'>
              Demo Mode: This is a simulated transaction
            </p>
          </div>
        )}

        <h2 className='text-center font-bold font-tti-bold text-[clamp(1.75rem,5vw,3.5rem)] leading-tight capitalize text-brand-primary-color-1/30 bg-clip-text bg-[linear-gradient(293deg,var(--tw-gradient-stops))] from-brand-primary-color-1 to-brand-primary-color-light animate-text-gradient'>
          {getPaymentStatus() === 'paid' || orderId
            ? `${isDemoMode ? 'Demo ' : ''}Purchase complete, Thank you!`
            : 'Nothing to see for now'}
        </h2>

        {(verifiedPaymentData || orderId || isDemoMode) && (
          <div className='w-full text-center py-2'>
            Your {isDemoMode ? 'demo ' : ''}transaction id is:{' '}
            <span className='font-medium'>{getTransactionId()}</span>
          </div>
        )}

        {!isDemoMode && (
          <div className='flex flex-wrap items-baseline justify-center gap-0.5'>
            <span className='text-brand-black-20 font-tti-regular font-normal text-xl xl:text-2xl leading-none'>
              Rate us on
            </span>
            <TrustPilotIcon className='w-6 h-6' />
            <span className='pt-[3px] text-xl xl:text-2xl leading-none font-medium font-tti-medium'>
              Trustpilot
            </span>
          </div>
        )}
      </div>

      {!isDemoMode && <CheckoutFeaturedGames />}
    </div>
  );
};
