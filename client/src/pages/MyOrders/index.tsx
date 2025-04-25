import { createContext, useContext, useMemo, useState } from 'react';
import { motion } from '../../components/motion/MotionWrapper';
import { ErrorBoundary } from '../../components/error/ErrorBoundaryWrapper';
import { ExtendHead } from '../../components/ExtendHead';
import { PageTopBackground } from '../../components/ui/PageTopBackground';
import { ErrorFallback } from '../../error/ErrorFallback';
import { logError } from '../../error/logError';
import { ErrorBoundaryResetHandler } from '../../error/utils';

import { Main } from './Main';
import { Dropdown } from '../../components/ui/Dropdown';
import { IoIosSearch } from 'react-icons/io';
import { LARGE_SCREEN, useMatchMedia } from '../../hooks/useMatchMedia';
import { OrderDataDb } from './components/OrderItem';

const pageVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
    },
  },
};

const contentVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

// Define order status type
type OrderStatus = 'placed' | 'processing' | 'confirmed' | 'completed' | 'cancelled';

type TMyOrdersContext = {
  status: string;
  game: string;
  state: string;
  sort: string;
  setStatus: (value: string) => void;
  setGame: (value: string) => void;
  setState: (value: string) => void;
  setSort: (value: string) => void;
};

// Define header props type
interface HeaderProps {
  setStatus: (value: string) => void;
  setState: (value: string) => void;
  setGame: (value: string) => void;
  setSort: (value: string) => void;
}

const MyOrdersContext = createContext<TMyOrdersContext | undefined>(undefined);

const handleErrorBoundaryReset: ErrorBoundaryResetHandler = (...details) => {
  console.log('Resetting orders page state:', details);
};

export const MyOrders = () => {
  const [status, setStatus] = useState('');
  const [game, setGame] = useState('');
  const [state, setState] = useState('');
  const [sort, setSort] = useState('');

  const myOrdersContextValue = useMemo(
    () => ({
      status,
      game,
      state,
      sort,
      setStatus,
      setGame,
      setState,
      setSort,
    }),
    [status, game, state, sort]
  );
  return (
    <ErrorBoundary.Root
      FallbackComponent={ErrorFallback}
      onError={logError}
      onReset={handleErrorBoundaryReset}
    >
      <MyOrdersContext.Provider value={myOrdersContextValue}>
        <motion.div
          variants={pageVariants}
          initial='initial'
          animate='animate'
          className='min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 mt-[40px]'
        >
          <ExtendHead title='My Orders' description='View and manage your orders' />

          <motion.div variants={contentVariants}>
            <EnhancedHeader
              setStatus={setStatus}
              setGame={setGame}
              setState={setState}
              setSort={setSort}
            />
          </motion.div>

          <motion.div variants={contentVariants}>
            <Main status={status} game={game} state={state} sort={sort} />
          </motion.div>

          <PageTopBackground showMainImage showOvalShape />
        </motion.div>
      </MyOrdersContext.Provider>
    </ErrorBoundary.Root>
  );
};

export const useMyOrdersContext = () => {
  const context = useContext(MyOrdersContext);
  if (!context) {
    throw new Error('Could not find the My Orders page context');
  }
  return context;
};

// Header Component with enhanced styling
export const EnhancedHeader = ({ setStatus, setState, setGame, setSort }: HeaderProps) => {
  const gameOptions = [
    'Chief Data Manager',
    'Legacy Configuration Planner',
    'Product Group Consultant',
    'Direct Integration Architect',
    'Lead Quality Technician',
    'Customer Accounts Officer',
    'Direct Accountability Agent',
    'Dynamic Web Administrator',
  ];

  const statusOptions: OrderStatus[] = [
    'placed',
    'processing',
    'confirmed',
    'completed',
    'cancelled',
  ];
  const sortOptions = ['Created AI', 'Price', 'Duration'];

  return (
    <motion.header className='py-10 relative isolate z-50' variants={contentVariants}>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <motion.h2
          className='text-center font-bold text-4xl sm:text-5xl lg:text-6xl'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          My{' '}
          <span
            className='bg-gradient-to-r from-brand-primary-color-1 to-brand-primary-color-light 
                         text-transparent bg-clip-text animate-text-gradient'
          >
            Orders
          </span>
        </motion.h2>

        <motion.div className='mt-8 space-y-6' variants={contentVariants}>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            <Dropdown
              heightClassName='h-50'
              leftIcon={<IoIosSearch className='w-5 h-5' />}
              defaultLabel='Select Game'
              selectHandler={(value) => setGame(value)}
              options={gameOptions}
              className='w-full'
            />

            <Dropdown
              heightClassName='h-40'
              leftIcon={<IoIosSearch className='w-5 h-5' />}
              defaultLabel='Select State'
              selectHandler={(value) => setState(value)}
              options={gameOptions}
              className='w-full'
            />

            <Dropdown
              leftIcon={<IoIosSearch className='w-5 h-5' />}
              defaultLabel='Select Status'
              selectHandler={(value) => setStatus(value)}
              options={statusOptions}
              className='w-full'
            />
          </div>

          <div className='flex justify-end'>
            <Dropdown
              defaultLabel='Sort By'
              selectHandler={(value) => setSort(value)}
              options={sortOptions}
              className='w-40'
            />
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
};

// Status color mapping
const statusColorMap: Record<OrderStatus, string> = {
  placed: 'bg-yellow-500/20 text-yellow-300',
  processing: 'bg-blue-500/20 text-blue-300',
  confirmed: 'bg-green-500/20 text-green-300',
  completed: 'bg-purple-500/20 text-purple-300',
  cancelled: 'bg-red-500/20 text-red-300',
};

// Enhanced OrderItem component with animations
export const EnhancedOrderItem = ({ order }: { order: OrderDataDb }) => {
  const isLargeScreen = useMatchMedia(LARGE_SCREEN);
  const { createdAt, status, totalPrice, item } = order;
  const { offerName, offerImage, itemType } = item;

  const statusColor = statusColorMap[status as OrderStatus] || 'bg-gray-500/20 text-gray-300';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className='bg-gray-800/30 backdrop-blur-sm rounded-lg overflow-hidden 
                 shadow-lg hover:shadow-xl transition-all duration-300'
    >
      <div className='flex items-center gap-4 p-4'>
        {isLargeScreen && (
          <figure className='shrink-0 w-36 h-16 rounded-lg overflow-hidden'>
            <img
              src={offerImage}
              alt={offerName}
              className='w-full h-full object-cover'
              loading='lazy'
            />
          </figure>
        )}

        <div className='flex-1 min-w-0'>
          <div className='flex items-start justify-between gap-4'>
            <div>
              <h3 className='text-lg font-semibold text-white truncate'>
                {itemType === 'currency' ? offerName.replaceAll('-', ' ') : offerName}
              </h3>
              <p className='text-gray-400 text-sm'>{new Date(createdAt).toLocaleDateString()}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor}`}>
              {status}
            </span>
          </div>

          <div className='mt-2 flex items-center justify-between'>
            <span className='text-brand-primary-color-1 font-semibold'>
              ${totalPrice.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
