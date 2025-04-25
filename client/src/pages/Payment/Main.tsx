import { useEffect, useState } from 'react';
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useGetCartQuery } from '../../redux/features/cart/cartApi';
import { useMakeSessionMutation } from '../../redux/features/payment/paymentApi';
import type { CartItem, Cart } from '../../redux/features/cart/cartApi';

interface SessionPayload {
  items: CartItem[];
  totalPrice: number;
  userId: string;
}

const stripe = loadStripe(import.meta.env.VITE_STRIPE_SECRET_KEY_PUB);

export const Main = () => {
  const [makeSession] = useMakeSessionMutation();
  const { data: cartResponse, isLoading } = useGetCartQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const cartData = cartResponse?.data;
  console.log(clientSecret);
  useEffect(() => {
    if (!clientSecret && cartData?.items?.length > 0 && cartData.userId) {
      const makeASession = async () => {
        try {
          const payload: SessionPayload = {
            items: cartData.items,
            totalPrice: cartData.totalPrice,
            userId: cartData.userId,
          };

          const { data: sessionData } = await makeSession(payload).unwrap();
          setClientSecret(sessionData.clientSecret);
        } catch (err) {
          console.error('Error creating session:', err);
        }
      };

      makeASession();
    }
  }, [cartData, clientSecret, makeSession]);

  if (isLoading) {
    return (
      <div className='min-h-screen bg-[#15191f] flex justify-center items-center'>
        <div className='animate-pulse text-brand-primary-color-1 text-xl font-tti-bold'>
          Loading...
        </div>
      </div>
    );
  }

  if (!cartData?.items?.length) {
    return (
      <div className='min-h-screen bg-[#15191f] flex justify-center items-center'>
        <div className='text-center max-w-md mx-auto p-8 bg-[#1c2128] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-lg border border-brand-primary-color-1/10'>
          <p className='text-brand-primary-color-1 text-xl font-tti-bold mb-6 first-letter:capitalize'>
            Your cart is empty
          </p>
          <button
            onClick={() => window.history.back()}
            className='px-8 py-3 bg-brand-primary-color-1 text-white rounded-xl font-tti-medium hover:bg-brand-primary-color-light transition-all duration-300 hover:shadow-[0_0_15px_rgba(var(--brand-primary-color-1-rgb),0.5)]'
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-[#15191f] py-8 px-4 md:px-8'>
      <div className='max-w-4xl mx-auto space-y-8'>
        {/* Cart Summary */}
        <div className='relative bg-[#1c2128] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] overflow-hidden border border-brand-primary-color-1/10 backdrop-blur-lg transition-transform hover:translate-y-[-2px]'>
          <div className='border-b border-brand-primary-color-1/10 p-6 bg-[#1c2128]/80 backdrop-blur'>
            <h2 className='text-2xl font-tti-bold bg-gradient-to-r from-brand-primary-color-1 to-brand-primary-color-light bg-clip-text text-transparent'>
              Order Summary
            </h2>
          </div>

          <div className='p-6'>
            {cartData.items.map((item, index) => (
              <div
                key={index}
                className='flex items-center gap-6 py-4 border-b border-brand-primary-color-1/5 last:border-b-0 group transition-all duration-300 hover:bg-brand-primary-color-1/5 rounded-xl px-4'
              >
                <div className='w-24 h-24 flex-shrink-0 transition-transform duration-300 group-hover:scale-105'>
                  <img
                    src={item.offerImage}
                    alt={item.offerName}
                    className='w-full h-full object-cover rounded-xl shadow-lg'
                  />
                </div>
                <div className='flex-1 min-w-0'>
                  <h3 className='text-lg font-tti-medium text-white/90 truncate group-hover:text-brand-primary-color-1 transition-colors'>
                    {item.offerName}
                  </h3>
                  <p className='text-brand-primary-color-1/80 mt-2 font-tti-regular'>
                    Price:{' '}
                    <span className='font-tti-medium text-brand-primary-color-light'>
                      ${item.selected.price.toFixed(2)}
                    </span>
                  </p>
                </div>
              </div>
            ))}

            <div className='mt-6 pt-6 border-t border-brand-primary-color-1/10'>
              <div className='flex justify-between items-center text-lg'>
                <span className='font-tti-medium text-white/90'>Total:</span>
                <span className='font-tti-bold text-brand-primary-color-1 text-xl'>
                  ${cartData.totalPrice.toFixed(2)}
                </span>
              </div>

              {cartData.promo && (
                <div className='mt-4 p-4 bg-brand-primary-color-1/5 rounded-xl border border-brand-primary-color-1/10 backdrop-blur-sm'>
                  <p className='text-brand-primary-color-light flex items-center gap-2'>
                    <span className='text-sm font-tti-medium'>
                      Promo code applied: {cartData.promo.code}
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stripe Checkout */}
        {clientSecret && (
          <div className='bg-[#1c2128] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] overflow-hidden border border-brand-primary-color-1/10 backdrop-blur-lg transition-all hover:translate-y-[-2px]'>
            <EmbeddedCheckoutProvider stripe={stripe} options={{ clientSecret }}>
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
          </div>
        )}
      </div>
    </div>
  );
};
