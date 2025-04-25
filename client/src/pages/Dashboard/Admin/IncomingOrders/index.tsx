import React from 'react';
import { createContext, SetStateAction, useContext, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ExtendHead } from '../../../../components/ExtendHead';
import { useGetOrdersQuery } from '../../../../redux/features/order/orderApi';
import { UpComOrder } from '../../Partner/components/UpComOrder';
import { LoadingCircle } from '../../../../components/LoadingCircle';

type AdminIncomingOrdersContextType = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
};

const AdminIncomingOrdersContext = createContext<AdminIncomingOrdersContextType | undefined>(
  undefined
);

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

export const AdminIncomingOrders = () => {
  const [isOpen, setIsOpen] = useState(false);
  const adminIncomingOrdersContextValue = useMemo(
    () => ({ isOpen, setIsOpen }),
    [isOpen, setIsOpen]
  );

  const { data: ordersData, isLoading: isOrderLoading } = useGetOrdersQuery(
    'isApproved=false&&status=pending',
    {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
      refetchOnReconnect: true,
    }
  );

  const orders = ordersData?.data;

  if (isOrderLoading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <LoadingCircle />
      </div>
    );
  }

  return (
    <AdminIncomingOrdersContext.Provider value={adminIncomingOrdersContextValue}>
      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <ExtendHead
          title='Incoming Orders - Admin Dashboard'
          description='Incoming Orders Admin dashboard'
        />

        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>Incoming Orders</h1>
          <p className='mt-2 text-sm text-gray-500 dark:text-gray-400'>
            Manage and review all incoming orders
          </p>
        </div>

        {orders?.length ? (
          <motion.div
            variants={containerVariants}
            initial='hidden'
            animate='visible'
            className='grid gap-6 pb-8'
          >
            {orders?.map((item: any) => (
              <motion.div
                key={item._id}
                variants={itemVariants}
                className='bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200'
              >
                <UpComOrder
                  payload={{
                    ...item,
                    title: item?.item?.offerName,
                    extendedTitle: item?.item?.itemType,
                    imageUrl: item?.item?.offerImage,
                    id: item?._id,
                    ordererName: item?.buyer?.name
                      ? `${item?.buyer?.name?.firstName} ${item?.buyer?.name?.lastName}`
                      : item?.buyer?.userName,
                    price: item?.totalPrice,
                    shortDescription: item?.item?.offerDescription,
                    uid: item?.userId,
                    rating: item?.buyer?.rating,
                  }}
                  showImage={item?.item?.offerImage}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='flex flex-col items-center justify-center min-h-[400px] bg-gray-50 dark:bg-gray-800 rounded-lg'
          >
            <h1 className='text-2xl font-semibold text-gray-900 dark:text-white'>
              No Orders Found
            </h1>
            <p className='mt-2 text-gray-500 dark:text-gray-400'>
              New orders will appear here when they arrive
            </p>
          </motion.div>
        )}
      </main>
    </AdminIncomingOrdersContext.Provider>
  );
};

export const useAdminIncomingOrdersContext = () => {
  const context = useContext(AdminIncomingOrdersContext);
  if (!context) {
    throw new Error('useAdminIncomingOrdersContext must be used within AdminIncomingOrders');
  }
  return context;
};
