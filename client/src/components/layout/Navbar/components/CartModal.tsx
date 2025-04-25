import React, { useState, useEffect } from 'react';
import { FaDollarSign } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';
import { useAppSelector } from '@/redux/hooks';
import { LoadingCircle } from '@/components/LoadingCircle';
import { CurrencySymbol } from '@/components/ui/CurrencySymbol';
import { Money } from '@/components/ui/Money';
import { ROUTER_PATH } from '@/enums/router-path';
import { useGetCartQuery, useRemoveFromCartMutation } from '@/redux/features/cart/cartApi';
import { useCreateOrderWithBalanceMutation } from '@/redux/features/order/orderApi';
import { useGetUserQuery } from '@/redux/features/user/userApi';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export const XIcon: React.FC<IconProps> = ({ 
  size = 24, 
  strokeWidth = 2, 
  className = '', 
  ...props 
}) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth={strokeWidth} 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={`lucide lucide-x ${className}`}
      {...props}
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
};

export const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  // Get auth state
  const authState = useAppSelector((state) => state.auth);

  // Queries and Mutations
  const { data: cartData, isLoading: isCartLoading } = useGetCartQuery(undefined);
  const { data: userData } = useGetUserQuery(authState?.user?._id || '');
  const [removeFromCart] = useRemoveFromCartMutation();
  const [createOrderWithBalance] = useCreateOrderWithBalanceMutation();

  // Animation handling
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setIsClosing(false);
    } else if (shouldRender) {
      setIsClosing(true);
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!shouldRender) return null;

  const cartItems = cartData?.data?.items || [];
  const totalPrice = cartData?.data?.totalPrice || 0;
  const tax = totalPrice * 0.1; // 10% tax
  const finalTotal = totalPrice + tax;

  const handleRemoveItem = async (itemId: number) => {
    try {
      await removeFromCart({ itemId }).unwrap();
      toast.success('Item removed from cart');
    } catch (error) {
      toast.error('Failed to remove item');
    }
  };

  const handleBalanceCheckout = async () => {
    console.log('Starting checkout process...');
    debugger;
    if (!cartItems.length) {
      console.log('Cart is empty');
      toast.error('Your cart is empty');
      return;
    }

    if (!userData?.data?._id) {
      console.log('User not logged in or missing ID');
      console.log('userData:', userData);
      toast.error('Please log in to checkout');
      return;
    }

    try {
      console.log('Setting processing state...');
      setIsProcessing(true);

      // Create order payload
      const orderPayload = {
        item: cartItems.map((item) => ({
          ...item,
          offerId: item.offerId,
          seller: item.seller,
        })),
        userId: userData.data.userId,
        totalPrice: finalTotal,
        buyer: userData.data._id,
        payment: null,
        isPaymentConfirmed: false,
        isConfirmedByClient: false,
        isConfirmedByPartner: false,
        isChannelCreated: false,
        inviteUrl: '',
        status: 'pending',
      };

      console.log('Order payload:', orderPayload);

      const response = await createOrderWithBalance(orderPayload).unwrap();
      console.log('Order response:', response);

      if (response?.data?.paymentId) {
        console.log('Order created successfully');
        onClose();
        navigate(`/checkout/success?orderId=${response.data.paymentId}`);
        toast.success('Order placed successfully');
      } else {
        console.log('Missing order ID in response');
        toast.error('Failed to create order');
      }
    } catch (error: any) {
      console.error('Checkout error details:', error);
      console.error('Error response:', error.data);
      toast.error(error.data?.message || 'Failed to process order');
    } finally {
      setIsProcessing(false);
      console.log('Checkout process completed');
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/70 backdrop-blur-lg z-50 transition-opacity duration-300
                   ${isClosing ? 'opacity-0' : 'opacity-100'}`}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`fixed right-0 top-[85px] xl:top-[97px] xl:right-4 w-full xl:w-[480px] 
                   h-[calc(100dvh-5.3125rem)] z-50 ${isClosing ? 'animate-slideOutRight' : 'animate-slideInRight'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className='h-full bg-[#15191f] border border-gray-800/50 rounded-lg shadow-2xl'>
          {/* Header */}
          <div className='sticky top-0 flex items-center justify-between p-4 border-b border-gray-700/30 backdrop-blur-md bg-[#15191f]/95'>
            <h2 className='text-lg font-medium text-white/90'>
              Shopping Cart ({cartItems.length})
            </h2>
            <button
              onClick={onClose}
              type='button'
              className='p-2 hover:bg-[#f1774e]/10 rounded-full transition-all duration-200 hover:scale-105'
              aria-label='Close cart'
            >
              <XIcon className='w-5 h-5 text-[#f1774e]' />
            </button>
          </div>

          {/* Content */}
          <div className='h-[calc(100%-220px)] overflow-auto p-4 scrollbar-thin scrollbar-thumb-[#f1774e]/20 scrollbar-track-transparent'>
            {isCartLoading ? (
              <div className='flex items-center justify-center h-full'>
                <LoadingCircle />
              </div>
            ) : cartItems.length === 0 ? (
              <div className='flex flex-col items-center justify-center h-full text-center'>
                <p className='text-gray-400 mb-4'>Your cart is empty</p>
                <button
                  onClick={onClose}
                  className='text-[#f1774e] hover:text-[#f1774e]/80 transition-all duration-200 hover:scale-105'
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className='space-y-4'>
                {cartItems.map((item) => (
                  <div
                    key={uuidv4()}
                    className='flex items-center gap-4 p-4 bg-gray-800/20 rounded-lg border border-gray-700/20 
                             hover:border-gray-700/40 transition-all duration-200'
                  >
                    <img
                      src={item.offerImage}
                      alt={item.offerName}
                      className='w-16 h-16 object-cover rounded-md shadow-lg'
                    />
                    <div className='flex-1'>
                      <h3 className='text-white/90 font-medium'>{item.offerName}</h3>
                      <p className='text-gray-400 text-sm'>
                        <CurrencySymbol />
                        <Money value={item.selected.price} />
                      </p>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item.itemId)}
                      className='p-2 hover:bg-[#f1774e]/10 rounded-full transition-all duration-200 hover:scale-105'
                    >
                      <XIcon className='w-4 h-4 text-[#f1774e]' />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className='sticky bottom-0 p-4 border-t border-gray-700/30 backdrop-blur-md bg-[#15191f]/95'>
            <div className='space-y-4'>
              <div className='space-y-3'>
                <div className='flex justify-between text-gray-400'>
                  <span>Subtotal</span>
                  <span className='font-medium'>
                    <CurrencySymbol />
                    <Money value={totalPrice} />
                  </span>
                </div>
                <div className='flex justify-between text-gray-400'>
                  <span>Tax</span>
                  <span className='font-medium'>
                    <CurrencySymbol />
                    <Money value={tax} />
                  </span>
                </div>
                <div className='flex justify-between text-lg font-medium text-white/90 pt-2 border-t border-gray-700/30'>
                  <span>Total</span>
                  <span>
                    <CurrencySymbol />
                    <Money value={finalTotal} />
                  </span>
                </div>
              </div>

              <div className='grid grid-cols-2 gap-3'>
                <Link
                  to={ROUTER_PATH.CHECKOUT_PAYMENT}
                  onClick={onClose}
                  className={`flex justify-center items-center px-4 py-3 rounded-lg font-medium text-center
                    ${
                      cartItems.length === 0
                        ? 'bg-gray-600/50 cursor-not-allowed'
                        : 'bg-[#f1774e] hover:bg-[#f1774e]/90 hover:scale-[1.02]'
                    } 
                    text-white/90 transition-all duration-200 shadow-lg`}
                  aria-disabled={cartItems.length === 0}
                >
                  Checkout
                </Link>

                <button
                  onClick={() => {
                    console.log('Button clicked!');
                    handleBalanceCheckout();
                  }}
                  disabled={isProcessing || cartItems.length === 0}
                  className='flex justify-center items-center gap-2 px-4 py-3 bg-[#f1774e] text-white/90 rounded-lg
           hover:bg-[#f1774e]/90 hover:scale-[1.02] transition-all duration-200 font-medium shadow-lg
           disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100'
                >
                  <FaDollarSign />
                  {isProcessing ? 'Processing...' : 'Pay with Balance'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
