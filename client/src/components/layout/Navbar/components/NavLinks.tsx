import React, { useState, useEffect, ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { NavLink, useNavigate } from 'react-router-dom';
import { BsChevronDown } from 'react-icons/bs';

interface IconProps extends React.SVGAttributes<SVGElement> {
  size?: number;
  strokeWidth?: number;
}
import { OfferDataDb } from '@/pages/CreateOffer';
import { useGetGamesQuery } from '@/redux/features/game/gameApi';
import { useGetOffersQuery } from '@/redux/features/offer/offerApi';
import { ROUTER_PATH } from '@/enums/router-path';
import {
  useGetWalletQuery,
  useMakeBalanceOrderMutation,
} from '@/redux/features/payment/paymentApi';
import toast from 'react-hot-toast';
import { useAppSelector } from '@/redux/hooks';
import { useAddToCartMutation } from '@/redux/features/cart/cartApi';
import { CurrencySymbol } from '@/components/ui/CurrencySymbol';
import { Money } from '@/components/ui/Money';

export const Gamepad2: React.FC<IconProps> = ({ 
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
      className={`lucide lucide-gamepad-2 ${className}`}
      {...props}
    >
      <line x1="6" y1="11" x2="10" y2="11" />
      <line x1="8" y1="9" x2="8" y2="13" />
      <line x1="15" y1="12" x2="15.01" y2="12" />
      <line x1="18" y1="10" x2="18.01" y2="10" />
      <path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.544-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z" />
    </svg>
  );
};

export const Search: React.FC<IconProps> = ({ 
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
      className={`lucide lucide-search ${className}`}
      {...props}
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
};
interface OrderSelected {
  time?: number;
  region: string;
  price: number;
  filters: any[];
  isDiscountApplied: boolean;
  characterName: string;
  amount: number;
}

interface OrderItem {
  itemType: 'regular';
  itemId: number;
  offerName: string;
  offerImage: string;
  selected: OrderSelected;
  price: number;
  description?: string;
  features?: string[];
}
interface GamesDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  token?: string;
  authStateData?: any;
}
interface OrderPayload {
  offerId: string;
  amount: number;
  totalPrice: number;
  userId: string;
  item: OrderItem[];
}
// Interfaces
export interface GameDataDb {
  _id: string;
  createdAt: string;
  updatedAt: string;
  status?: 'activate' | 'suspend';
  name?: string;
  uid?: string;
  title?: string;
  showInMenu?: boolean;
  isFeatured?: boolean;
  bannerUrl?: string;
  imageUrl?: string;
  sliders?: {
    imageUrl?: string;
    heading?: string;
    videoUrl?: string;
    createdAt?: Date;
  }[];
  categories?: { value?: string | number | symbol; label?: string }[];
  upsell?: { title?: string; description?: string; price?: number };
  services?: string[];
}

interface GameProduct {
  title: string;
  image: string;
  features: string[];
  price: string;
  offerId?: string;
  sellerId?: string; // Added sellerId property
  discount?: {
    amount: number;
    type: 'fixed' | 'percent';
  };
  description?: string;
  approximateTime?: number;
}

interface GameService {
  title: string;
  items: string[];
  products?: GameProduct[];
}

interface GameCategory {
  title: string;
  path: string;
  icon?: ReactNode;
  backgroundImage: string;
  services: Record<string, GameService>;
  products?: GameProduct[];
  id?: string;
  uid?: string;
  status?: string;
  showInMenu?: boolean;
  isFeatured?: boolean;
  bannerUrl?: string;
  categories?: { value?: string | number | symbol; label?: string }[];
  upsell?: { title?: string; description?: string; price?: number };
  sliders?: {
    imageUrl?: string;
    heading?: string;
    videoUrl?: string;
    createdAt?: Date;
  }[];
}

interface NavLinksProps {
  isDesktop: boolean;
  isInDashboardPage: boolean;
  token?: string;
  authStateData?: {
    roles?: string[];
  };
  data?: {
    roles?: string[];
  };
  onOpenGamesModal: () => void;
}

const transformGameToCategory = (gameData: GameDataDb, offers?: OfferDataDb[]): GameCategory => {
  const gameOffers = offers?.filter((offer) => offer.gameUid === gameData.uid) || [];
  console.log('gameOffers:', gameOffers);
  const products: GameProduct[] = gameOffers.map((offer) => ({
    title: offer.name,
    image: offer.image,
    features: offer.featuredList || [],
    price: offer.basePrice.toString(),
    offerId: offer._id,
    sellerId: offer.sellerId, // Added sellerId from the offer
    ...(offer.discount && {
      discount: {
        amount: Number(offer.discount.amount),
        type: offer.discount.type === 'percentage' ? 'percent' : 'fixed',
      },
    }),
    description: offer.description,
    approximateTime: offer.approximateOrderCompletionInMinutes,
  }));

  const services: Record<string, GameService> = {};
  gameData.categories?.forEach((category) => {
    const serviceKey = category.value?.toString().toLowerCase().replace(/\s+/g, '_') || '';
    if (serviceKey) {
      services[serviceKey] = {
        title: category.label || '',
        items: gameData.services || [],
      };
    }
  });

  return {
    title: gameData.name,
    path: `/game/${gameData._id}`,
    icon: <Gamepad2 className='w-4 h-4' />,
    backgroundImage: gameData.imageUrl || '/images/default-background.jpg',
    services,
    products,
    id: gameData._id,
    uid: gameData.uid,
    status: gameData.status,
    showInMenu: gameData.showInMenu,
    isFeatured: gameData.isFeatured,
    bannerUrl: gameData.bannerUrl,
    categories: gameData.categories,
    upsell: gameData.upsell,
    sliders: gameData.sliders?.map((slider) => ({
      heading: slider.heading,
      imageUrl: slider.imageUrl,
      videoUrl: slider.videoUrl,
      createdAt: slider.createdAt,
    })),
  };
};

const GamesSearch = () => (
  <div className='relative'>
    <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-white/50 w-4 h-4' />
    <input
      type='text'
      dir='auto'
      placeholder='Search game...'
      className='w-full bg-brand-black-100/50 border border-brand-black-80 
      rounded-lg px-10 py-2 text-white placeholder-white/50
      focus:outline-none focus:ring-2 focus:ring-brand-primary-color-1'
    />
  </div>
);

const GamesDropdown = ({ isOpen, onClose }: GamesDropdownProps) => {
  const { data: gamesResponse } = useGetGamesQuery('');
  const navigate = useNavigate();
  const { token } = useAppSelector((state) => state.auth);

  const [selectedGame, setSelectedGame] = useState<GameCategory | null>(null);
  const { data: offersResponse } = useGetOffersQuery('');
  const [addToCart] = useAddToCartMutation();

  const handleAddToCart = async (product: GameProduct) => {
    try {
      if (!token) {
        toast.error('Please log in to add items to cart');
        return;
      }

      if (!product.offerId) {
        toast.error('Invalid offer ID');
        return;
      }

      const itemId = parseInt(product.offerId);
      if (isNaN(itemId)) {
        toast.error('Invalid item ID format');
        return;
      }

      const cartItem = {
        itemType: 'regular',
        itemId,
        seller: product.sellerId || '',
        offerId: product.offerId,
        offerName: product.title,
        offerImage: product.image,
        selected: {
          time: product.approximateTime || 0,
          region: 'global',
          price: Number(product.price),
          filters: [],
          isDiscountApplied: !!product.discount,
          characterName: 'default',
          amount: Number(product.price),
        },
      };

      const response = await addToCart(cartItem).unwrap();

      if (response.success) {
        toast.success('Item added to cart');
      }
    } catch (error: any) {
      console.error('Failed to add to cart:', error);
      toast.error(error.data?.message || 'Failed to add item to cart');
    }
  };

  const games = (gamesResponse?.data || []).map((game) =>
    transformGameToCategory(game, offersResponse?.data)
  );

  useEffect(() => {
    if (games.length && !selectedGame) {
      setSelectedGame(games[0]);
    }
  }, [games, selectedGame]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
          onMouseLeave={onClose}
          className='fixed top-16 left-0 right-0 bg-brand-black-90/95 backdrop-blur-xl border-y border-brand-black-80 overflow-hidden z-50'
        >
          <div className='container mx-auto px-4 lg:px-0'>
            <div className='flex flex-col md:flex-row py-6 lg:py-8'>
              {/* Games List */}
              <div className='w-full md:w-64 md:shrink-0 md:border-r border-brand-black-80 pr-0 md:pr-6 mb-6 md:mb-0'>
                <h3 className='text-white/80 font-medium mb-4'>Available Games</h3>
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-1 gap-2'>
                  {games.map((game) => (
                    <button
                      key={game.path}
                      onMouseEnter={() => setSelectedGame(game)}
                      onClick={() => setSelectedGame(game)}
                      className={`flex items-center w-full text-left
                        ${
                          selectedGame?.path === game.path
                            ? 'text-brand-primary-color-1 bg-brand-black-80/50'
                            : 'text-white/70 hover:text-brand-primary-color-1 hover:bg-brand-black-80/30'
                        } px-3 py-2 rounded transition-colors`}
                    >
                      {game.icon && <span className='mr-3'>{game.icon}</span>}
                      <span>{game.title}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Game Details */}
              {selectedGame && (
                <div className='flex-1 md:pl-6 relative'>
                  <div
                    className='absolute inset-0 opacity-10 transition-opacity duration-500 rounded-xl'
                    style={{
                      backgroundImage: `url(${selectedGame.backgroundImage})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                  <div className='relative z-10'>
                    <h3 className='text-xl md:text-2xl font-semibold text-white mb-4 md:mb-6'>
                      {selectedGame.title}
                    </h3>

                    {selectedGame.products && selectedGame.products.length > 0 && (
                      <div className='mt-6'>
                        <h3 className='text-white/80 font-medium mb-4'>Available Products</h3>
                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                          {selectedGame.products.map((product, index) => (
                            <div
                              key={index}
                              className='bg-brand-black-80/30 rounded-lg overflow-hidden'
                            >
                              <div className='aspect-video relative'>
                                <img
                                  src={product.image}
                                  alt={product.title}
                                  className='absolute inset-0 w-full h-full object-cover'
                                />
                              </div>
                              <div className='p-4'>
                                <h4 className='text-brand-primary-color-1 font-medium mb-2'>
                                  {product.title}
                                </h4>
                                <ul className='space-y-1 mb-4'>
                                  {product.features.map((feature, idx) => (
                                    <li
                                      key={idx}
                                      className='text-white/70 text-sm flex items-start'
                                    >
                                      <span className='text-brand-primary-color-1 mr-2'>•</span>
                                      {feature}
                                    </li>
                                  ))}
                                </ul>
                                <button
                                  onClick={() => handleAddToCart(product)}
                                  className='w-full py-2 px-4 bg-brand-primary-color-1 
                                           text-white rounded hover:bg-brand-primary-color-light 
                                           transition-colors'
                                >
                                  Add to Cart - <CurrencySymbol />
                                  <Money value={Number(product.price)} />
                                  {product.discount && (
                                    <span className='ml-2 text-sm'>
                                      {product.discount.type === 'percent'
                                        ? `-${product.discount.amount}%`
                                        : `-${product.discount.amount}€`}
                                    </span>
                                  )}
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const NavLinks = ({
  isDesktop,
  isInDashboardPage,
  token,
  authStateData,
  data,
  onOpenGamesModal,
}: NavLinksProps) => {
  const [isGamesOpen, setIsGamesOpen] = useState(false);

  const linkBaseClass = `
    relative text-white/90 hover:text-white transition-all duration-300
    after:absolute after:bottom-0 after:left-0 after:h-0.5
    after:w-0 hover:after:w-full after:bg-brand-primary-color-1
    after:transition-all after:duration-300
  `;

  const activeClassName = `
    ${linkBaseClass}
    text-brand-primary-color-1
    after:w-full
  `;

  if (isInDashboardPage) return null;

  return (
    <div className='hidden lg:flex items-center space-x-8'>
      {/* Games Dropdown */}
      <div className='relative group'>
        <button
          onMouseEnter={() => setIsGamesOpen(true)}
          onClick={() => setIsGamesOpen(!isGamesOpen)}
          className='relative group flex items-center px-4 py-2 rounded-lg
                    bg-gradient-to-r from-brand-primary-color-1 to-brand-primary-color-1/80
                    hover:from-brand-primary-color-light hover:to-brand-primary-color-light/80
                    transition-all duration-300'
        >
          <span className='relative text-white group-hover:text-white/90 transition-colors mr-2'>
            Games
          </span>
          <BsChevronDown
            className={`w-4 h-4 transition-transform duration-300 ${
              isGamesOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        <GamesDropdown isOpen={isGamesOpen} onClose={() => setIsGamesOpen(false)} token={token} />
      </div>

      {/* Regular Navigation Links */}
      <NavLink
        to='/work-with-us'
        className={({ isActive }) => (isActive ? activeClassName : linkBaseClass)}
      >
        Work with us
      </NavLink>

      <NavLink
        to='/support'
        className={({ isActive }) => (isActive ? activeClassName : linkBaseClass)}
      >
        Support
      </NavLink>

      {token && authStateData?.roles && (
        <NavLink
          to={authStateData.roles.includes('ADMIN') ? '/dashboard/admin' : '/dashboard/partner'}
          className={({ isActive }) => (isActive ? activeClassName : linkBaseClass)}
        >
          Dashboard
        </NavLink>
      )}
       <NavLink
        to={ROUTER_PATH.CONNECT_WALLET}
        className={({ isActive }) => (isActive ? activeClassName : linkBaseClass)}
      >
        Connect Wallet
      </NavLink>
    </div>
  );
};

export default NavLinks;
