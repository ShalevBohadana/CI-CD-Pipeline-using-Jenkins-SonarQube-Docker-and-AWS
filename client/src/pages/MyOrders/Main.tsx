import React from 'react';
import { useGetUserOrdersQuery } from '../../redux/features/order/orderApi';
import { useAppSelector } from '../../redux/hooks';
import { OrderItem } from './components/OrderItem';

interface MainProps {
  status?: string;
  game?: string;
  state?: string;
  sort?: string;
}
// Sample orders data with diverse statuses and types
export const ORDERS_DATA = [
  {
    _id: '1',
    uid: 'ORD-001',
    title: 'Fortnite V-Bucks - 1000',
    status: 'completed',
    createdAt: '2024-01-14T10:00:00.000Z',
    paymentMethod: 'credit_card',
    amount: 7.99,
    currency: 'USD',
    gameType: 'Fortnite',
    quantity: 1000,
    customerEmail: 'user1@example.com',
    deliveryStatus: 'delivered',
    deliveredAt: '2024-01-14T10:05:00.000Z',
  },
  {
    _id: '2',
    uid: 'ORD-002',
    title: 'Roblox Robux - 2000',
    status: 'pending',
    createdAt: '2024-01-14T11:30:00.000Z',
    paymentMethod: 'paypal',
    amount: 19.99,
    currency: 'USD',
    gameType: 'Roblox',
    quantity: 2000,
    customerEmail: 'user2@example.com',
    deliveryStatus: 'processing',
  },
  {
    _id: '3',
    uid: 'ORD-003',
    title: 'PUBG UC - 3000',
    status: 'cancelled',
    createdAt: '2024-01-13T15:00:00.000Z',
    paymentMethod: 'bitcoin',
    amount: 29.99,
    currency: 'USD',
    gameType: 'PUBG',
    quantity: 3000,
    customerEmail: 'user3@example.com',
    deliveryStatus: 'cancelled',
    cancelReason: 'Customer request',
  },
  {
    _id: '4',
    uid: 'ORD-004',
    title: 'Free Fire Diamonds - 5000',
    status: 'completed',
    createdAt: '2024-01-12T09:00:00.000Z',
    paymentMethod: 'credit_card',
    amount: 49.99,
    currency: 'USD',
    gameType: 'FreeFire',
    quantity: 5000,
    customerEmail: 'user4@example.com',
    deliveryStatus: 'delivered',
    deliveredAt: '2024-01-12T09:10:00.000Z',
  },
  {
    _id: '5',
    uid: 'ORD-005',
    title: 'Minecraft Coins - 1500',
    status: 'processing',
    createdAt: '2024-01-14T13:00:00.000Z',
    paymentMethod: 'google_pay',
    amount: 14.99,
    currency: 'USD',
    gameType: 'Minecraft',
    quantity: 1500,
    customerEmail: 'user5@example.com',
    deliveryStatus: 'pending',
  },
  {
    _id: '6',
    uid: 'ORD-006',
    title: 'Call of Duty Points - 2400',
    status: 'completed',
    createdAt: '2024-01-13T16:30:00.000Z',
    paymentMethod: 'apple_pay',
    amount: 19.99,
    currency: 'USD',
    gameType: 'CallOfDuty',
    quantity: 2400,
    customerEmail: 'user6@example.com',
    deliveryStatus: 'delivered',
    deliveredAt: '2024-01-13T16:40:00.000Z',
  },
  {
    _id: '7',
    uid: 'ORD-007',
    title: 'Valorant Points - 1000',
    status: 'pending',
    createdAt: '2024-01-14T14:20:00.000Z',
    paymentMethod: 'credit_card',
    amount: 9.99,
    currency: 'USD',
    gameType: 'Valorant',
    quantity: 1000,
    customerEmail: 'user7@example.com',
    deliveryStatus: 'processing',
  },
  {
    _id: '8',
    uid: 'ORD-008',
    title: 'Genshin Impact Crystals - 3000',
    status: 'completed',
    createdAt: '2024-01-11T12:00:00.000Z',
    paymentMethod: 'paypal',
    amount: 29.99,
    currency: 'USD',
    gameType: 'GenshinImpact',
    quantity: 3000,
    customerEmail: 'user8@example.com',
    deliveryStatus: 'delivered',
    deliveredAt: '2024-01-11T12:15:00.000Z',
  },
  {
    _id: '9',
    uid: 'ORD-009',
    title: 'League of Legends RP - 2000',
    status: 'failed',
    createdAt: '2024-01-14T08:00:00.000Z',
    paymentMethod: 'credit_card',
    amount: 15.99,
    currency: 'USD',
    gameType: 'LeagueOfLegends',
    quantity: 2000,
    customerEmail: 'user9@example.com',
    deliveryStatus: 'failed',
    failureReason: 'Payment declined',
  },
  {
    _id: '10',
    uid: 'ORD-010',
    title: 'Steam Wallet Code - $50',
    status: 'completed',
    createdAt: '2024-01-13T10:00:00.000Z',
    paymentMethod: 'bitcoin',
    amount: 50.0,
    currency: 'USD',
    gameType: 'Steam',
    quantity: 1,
    customerEmail: 'user10@example.com',
    deliveryStatus: 'delivered',
    deliveredAt: '2024-01-13T10:05:00.000Z',
  },
];
export const Main: React.FC<MainProps> = () => {
  // Only destructure what we need
  const authState = useAppSelector((state) => state.auth);

  const { data: userOrdersRes } = useGetUserOrdersQuery(authState?.user?._id || '', {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  const userOrders = userOrdersRes?.data;

  return (
    <main className='relative isolate z-0 py-4 xl:py-11'>
      <div className='fb-container'>
        <div
          className='grid h-full max-h-[32rem] minimal-scrollbar overflow-auto gap-10 xl:gap-8 
                       p-6 bg-brand-primary-color-1/[0.03] rounded-xl'
        >
          {!userOrders?.length ? (
            <div
              className='text-white text-[clamp(1rem,3vw,1.75rem)] leading-none 
                          font-semibold font-tti-demi-bold pl-1'
            >
              No Orders Found
            </div>
          ) : (
            userOrders.map((order) => <OrderItem key={order?._id} order={order} />)
          )}
        </div>
      </div>
    </main>
  );
};

export default Main;
