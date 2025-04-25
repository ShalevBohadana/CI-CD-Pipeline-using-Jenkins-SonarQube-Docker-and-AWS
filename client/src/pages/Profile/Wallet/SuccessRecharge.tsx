import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useVerifyBalanceRechargeMutation } from '../../../redux/features/wallet/walletApi';

export const SuccessRecharge = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [verifyRecharge] = useVerifyBalanceRechargeMutation();

  useEffect(() => {
    const sessionId = searchParams.get('session_id');

    if (sessionId) {
      verifyRecharge({ sessionId })
        .unwrap()
        .then(() => {
          toast.success('Payment successful!');
          navigate('/profile/wallet');
        })
        .catch((error) => {
          toast.error(error.data?.message || 'Failed to verify payment');
          navigate('/profile/wallet');
        });
    }
  }, [searchParams]);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <h1 className='text-2xl font-bold mb-4'>Processing your payment...</h1>
      <p className='text-gray-600'>Please wait while we verify your payment.</p>
    </div>
  );
};
