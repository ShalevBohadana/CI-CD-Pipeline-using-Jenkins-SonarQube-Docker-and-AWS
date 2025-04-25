import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { useGetUserOrdersQuery } from '../../redux/features/order/orderApi';
import { useAppSelector } from '../../redux/hooks';
import { OrderItem } from './components/OrderItem';

interface Props {
  status: string;
  game: string;
  state: string;
  sort: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const Main = ({ status, game, sort }: Props) => {
  const authStateData = useAppSelector((state) => state.auth);

  const {
    data: userOrdersRes,
    isLoading,
    isFetching,
  } = useGetUserOrdersQuery(authStateData?.user?._id || '', {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  // Filter and sort orders based on props
  const filteredOrders = useMemo(() => {
    if (!userOrdersRes?.data) return [];

    return userOrdersRes.data
      .filter((order) => {
        const matchesStatus = !status || order.status === status;
        const matchesGame =
          !game || order.item.offerName.toLowerCase().includes(game.toLowerCase());
        return matchesStatus && matchesGame;
      })
      .sort((a, b) => {
        switch (sort) {
          case 'Price':
            return b.totalPrice - a.totalPrice;
          case 'Created AI':
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          case 'Duration':
            // Add your duration logic here
            return 0;
          default:
            return 0;
        }
      });
  }, [userOrdersRes?.data, status, game, sort]);

  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-[32rem]'>
        <div className='flex justify-center py-4'>loging</div>
      </div>
    );
  }

  return (
    <motion.main
      initial='hidden'
      animate='visible'
      variants={containerVariants}
      className='relative isolate z-0 py-4 xl:py-11'
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <motion.div
          className='bg-gray-800/30 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden'
          variants={containerVariants}
        >
          <div className='p-6'>
            {/* Orders Stats */}
            <div className='grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6'>
              <div className='bg-gray-700/30 rounded-lg p-4'>
                <p className='text-gray-400 text-sm'>Total Orders</p>
                <p className='text-2xl font-bold text-white'>{filteredOrders.length}</p>
              </div>
              <div className='bg-gray-700/30 rounded-lg p-4'>
                <p className='text-gray-400 text-sm'>Total Spent</p>
                <p className='text-2xl font-bold text-white'>
                  ${filteredOrders.reduce((sum, order) => sum + order.totalPrice, 0).toFixed(2)}
                </p>
              </div>
              <div className='bg-gray-700/30 rounded-lg p-4'>
                <p className='text-gray-400 text-sm'>Active Orders</p>
                <p className='text-2xl font-bold text-white'>
                  {
                    filteredOrders.filter((order) =>
                      ['processing', 'pending'].includes(order.status)
                    ).length
                  }
                </p>
              </div>
              <div className='bg-gray-700/30 rounded-lg p-4'>
                <p className='text-gray-400 text-sm'>Completed Orders</p>
                <p className='text-2xl font-bold text-white'>
                  {filteredOrders.filter((order) => order.status === 'completed').length}
                </p>
              </div>
            </div>

            {/* Orders List */}
            <div className='grid gap-6 max-h-[32rem] overflow-auto minimal-scrollbar'>
              {filteredOrders.length === 0 ? (
                <motion.div
                  variants={itemVariants}
                  className='flex flex-col items-center justify-center py-16'
                >
                  <div className='text-2xl font-semibold text-white mb-2'>No Orders Found</div>
                  <p className='text-gray-400 text-center'>
                    Try adjusting your filters or check back later
                  </p>
                </motion.div>
              ) : (
                filteredOrders.map((order) => (
                  <motion.div key={order._id} variants={itemVariants}>
                    <OrderItem order={order} />
                  </motion.div>
                ))
              )}
            </div>

            {/* Loading Indicator */}
            {isFetching && <div className='flex justify-center py-4'>loging</div>}
          </div>
        </motion.div>
      </div>
    </motion.main>
  );
};
