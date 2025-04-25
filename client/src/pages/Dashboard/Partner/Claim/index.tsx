import { createContext, SetStateAction, useContext, useMemo, useState } from 'react';

import { ExtendHead } from '../../../../components/ExtendHead';
import { LoadingCircle } from '../../../../components/LoadingCircle';
import { useGetClaimableOrdersQuery } from '../../../../redux/features/order/orderApi';
import { useGetUserQuery } from '../../../../redux/features/user/userApi';
import { useAppSelector } from '../../../../redux/hooks';
import { ExtendedOrder, Order } from '../../../MyOrders/components/OrderItem';
import { ClaimOrderCard } from '../components/ClaimOrderCard';
import { ORDER_STATUS } from '../../../../enums';

// Define or import missing types
type PaymentMethod = 'credit_card' | 'paypal' | 'bitcoin' | 'google_pay' | 'apple_pay';
type OrderStatus = 'completed' | 'pending' | 'cancelled' | 'processing' | 'failed';

type PartnerClaimContextType = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  orderSummary?: Order;
  setOrderSummary: React.Dispatch<SetStateAction<Order | undefined>>;
};

const PartnerClaimContext = createContext<PartnerClaimContextType | undefined>(undefined);

export const PartnerClaim = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [orderSummary, setOrderSummary] = useState<Order>();
  
  // Access auth state correctly based on your store structure
  const authState = useAppSelector((state) => state.auth);
  const user = authState.user || { _id: '' };
  const userId = user._id || '';
  
  // Loading state for wallet data
  const { data: walletData, isLoading: isWalletLoading } = useGetUserQuery(userId, {
    skip: !userId
  });

  const partnerClaimContextValue = useMemo(
    () => ({ isOpen, setIsOpen, orderSummary, setOrderSummary }),
    [isOpen, orderSummary]
  );

  const { data: ordersData, isLoading: isOrderLoading } = useGetClaimableOrdersQuery(``, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  const orders = ordersData?.data;

  if (isOrderLoading) {
    return <LoadingCircle />;
  }

  if (isWalletLoading) {
    return <LoadingCircle />;
  }

  if (!orders || orders.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center h-full'>
        <p className='text-lg text-gray-500'>No claimable orders found</p>
      </div>
    );
  }

  return (
    <PartnerClaimContext.Provider value={partnerClaimContextValue}>
      <main className='flex flex-col gap-8 overflow-auto minimal-scrollbar min-h-[theme(height.40)]'>
        <ExtendHead title='Claim - Partner Dashboard' description='Claim Partner dashboard' />
        <h2 className='capitalize font-semibold font-tti-demi-bold text-[clamp(1.35rem,4vw,2rem)] leading-tight'>
          <span className='text-brand-primary-color-1/30 bg-clip-text bg-[linear-gradient(293deg,var(--tw-gradient-stops))] from-brand-primary-color-1 to-brand-primary-color-light animate-text-gradient'>
            claim
          </span>
        </h2>
        <div className='h-[inherit] grid gap-y-4 overflow-auto minimal-scrollbar'>
          {Array.isArray(orders) ? (
            orders.map((item) => {
              // Map status to allowed OrderStatus values
              const mapStatus = (status: string): OrderStatus => {
                switch(status) {
                  case 'placed':
                    return 'pending';
                  case 'completed':
                    return 'completed';
                  case 'cancelled':
                    return 'cancelled';
                  case 'processing':
                    return 'processing';
                  case 'failed':
                    return 'failed';
                  default:
                    return 'pending';
                }
              };

              // Add the missing properties required by ExtendedOrder
              const extendedItem: ExtendedOrder = {
                ...item,
                title: item.item.offerName,
                extendedTitle: item.item.itemType,
                imageUrl: item.item.offerImage,
                currency: 'USD', // Default to USD since currency is not available in the Order type
                id: item._id,
                ordererName: item.buyer.name
                  ? `${item.buyer.name.firstName} ${item.buyer.name.lastName}`
                  : item.buyer.userName,
                price: item.totalPrice,
                uid: item.buyer._id,
                rating: 0, // Default value since buyer might not have rating
                status: mapStatus(item.status || 'pending'),
                date: item.createdAt,
                paymentMethod: 'credit_card' as PaymentMethod, // Cast to valid payment method
                amount: item.totalPrice,
                gameType: item.item.itemType || 'Unknown',
                quantity: 1, // Default to 1 if quantity is not available
                customerEmail: item.buyer.email || '',
                deliveryStatus: 'pending',
                reviewCount: 0 // Default value
              };

              return (
                <ClaimOrderCard
                  key={item._id}
                  payload={extendedItem}
                  showImage={!!item.item.offerImage}
                />
              );
            })
          ) : (
            <p className='text-lg text-gray-500'>No orders available</p>
          )}
        </div>
      </main>
    </PartnerClaimContext.Provider>
  );
};

export const usePartnerClaimContext = () => {
  const context = useContext(PartnerClaimContext);
  if (!context) {
    throw new Error('usePartnerClaimContext must be used within a PartnerClaimContextProvider');
  }
  return context;
};