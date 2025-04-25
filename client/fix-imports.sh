#!/bin/bash

# צבעים להדגשת טקסט
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
RESET='\033[0m'

echo -e "${BLUE}=== תיקון תלויות מעגליות בקומפוננטות React ===${RESET}"

# יצירת קובץ LatestGamesOffersContext.tsx
echo -e "${YELLOW}יוצר קובץ LatestGamesOffersContext.tsx...${RESET}"

cat > src/pages/Home/LatestGamesOffersContext.tsx << 'EOF'
import { createContext, useContext } from 'react';
import { TLatestGamesOffersContext } from './LatestGamesOffersTypes';

export const LatestGamesOffersContext = createContext<TLatestGamesOffersContext | undefined>(undefined);

export const useLatestGamesOffersContext = () => {
  const context = useContext(LatestGamesOffersContext);
  if (!context) {
    throw new Error('Could not find the LatestGamesOffers page context');
  }
  return context;
};
EOF

echo -e "${GREEN}✓ נוצר קובץ LatestGamesOffersContext.tsx${RESET}"

# עדכון LatestGamesOffers.tsx
echo -e "${YELLOW}מעדכן את קובץ LatestGamesOffers.tsx...${RESET}"

# גיבוי הקובץ המקורי
cp src/pages/Home/LatestGamesOffers.tsx src/pages/Home/LatestGamesOffers.tsx.bak

cat > src/pages/Home/LatestGamesOffers.tsx << 'EOF'
import { motion } from '../../components/motion/MotionWrapper';
import { AnimatePresence } from 'framer-motion';
import {
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Link } from 'react-router-dom';
import { v4 } from 'uuid';

import { GradientDirectionArrow } from '../../components/icons/icons';
import { GameUpsellDisplay } from '../../components/ui/GameUpsellDisplay';
import { LatestOffersCategorySlider } from '../../components/ui/LatestOffersCategorySlider';
import { OfferCard } from '../../components/ui/OfferCard';
import { ROUTE_PARAM, ROUTER_PATH } from '../../enums/router-path';
import { useGetGamesQuery } from '../../redux/features/game/gameApi';
import { useGetGameCurrenciesQuery } from '../../redux/features/gameCurrency/gameCurrencyApi';
import { useGetOffersQuery } from '../../redux/features/offer/offerApi';
import { CreateOfferCommonSchema, TTagSuggestion } from '../CreateOffer/Main';

import { ShowLatestOfferGames } from './components/ShowLatestOfferGames';
import { DEFAULT_CATEGORY_NAME } from './LatestGamesOffersTypes';
import { LatestGamesOffersContext } from './LatestGamesOffersContext';

// הוספת לוגים כדי לוודא שהקומפוננטות מוגדרות
console.log('ShowLatestOfferGames defined?', ShowLatestOfferGames !== undefined);
console.log('LatestOffersCategorySlider defined?', LatestOffersCategorySlider !== undefined);
console.log('OfferCard defined?', OfferCard !== undefined);

export const LatestGamesOffers = () => {
  const [selectedGameUid, setSelectedGameUid] = useState<string>('');

  const { data: offersRes } = useGetOffersQuery('limit=20', {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
  const offersData = useMemo(
    () => offersRes?.data?.filter((offer) => offer.gameUid === selectedGameUid) || [],
    [offersRes?.data, selectedGameUid]
  );

  const { data: currenciesRes } = useGetGameCurrenciesQuery('', {
    skip: !selectedGameUid,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
  const currencyData = useMemo(
    () => currenciesRes?.data?.find((currency) => currency?.gameUid === selectedGameUid),
    [currenciesRes?.data, selectedGameUid]
  );
  const [combinedOffers, setCombinedOffers] = useState<CreateOfferCommonSchema[]>([]);

  const [categories, setCategories] = useState<TTagSuggestion[]>([]);
  const [activeCategory, setActiveCategory] = useState(DEFAULT_CATEGORY_NAME);
  const [gameCurrencyData, setGameCurrencyData] = useState<CreateOfferCommonSchema>();

  const { data: gamesRes } = useGetGamesQuery('limit=200', {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
  const gamesData = useMemo(() => gamesRes?.data || [], [gamesRes?.data]);
  const activeGamesData = useMemo(
    () => gamesRes?.data.find((game) => game.uid === selectedGameUid),
    [gamesRes?.data, selectedGameUid]
  );

  const latestGamesOffersContextValue = useMemo(
    () => ({
      selectedGameUid,
      setSelectedGameUid,
      categories,
      setCategories,
      activeCategory,
      setActiveCategory,
      gameCurrencyData,
      setGameCurrencyData,
    }),
    [
      selectedGameUid,
      setSelectedGameUid,
      categories,
      setCategories,
      activeCategory,
      setActiveCategory,
      gameCurrencyData,
      setGameCurrencyData,
    ]
  );

  useEffect(() => {
    if (offersData && currencyData) {
      setCombinedOffers([currencyData, ...offersData]);
    } else if (currencyData) {
      setCombinedOffers([currencyData]);
    } else if (offersData) {
      setCombinedOffers(offersData);
    }
  }, [offersData, currencyData]);

  useEffect(() => {
    if (currencyData) {
      setGameCurrencyData(currencyData);
    }
    if (selectedGameUid) {
      const currentCategories = gamesData?.find(
        (game) => game?.uid === selectedGameUid
      )?.categories;
      if (currentCategories) {
        setCategories(currentCategories);
        setActiveCategory(DEFAULT_CATEGORY_NAME);
      }
    }
  }, [selectedGameUid, gamesData, currencyData, offersData]);

  useEffect(() => {
    if (activeCategory === DEFAULT_CATEGORY_NAME && currencyData && offersData) {
      setCombinedOffers([currencyData, ...offersData]);
    } else if (activeCategory !== DEFAULT_CATEGORY_NAME && currencyData && offersData) {
      const isExisting = [currencyData, ...offersData].filter(
        (offer) => offer?.categoryUid === activeCategory
      );
      setCombinedOffers(isExisting);
    }
  }, [activeCategory, offersData, currencyData]);

  return (
    <LatestGamesOffersContext.Provider value={latestGamesOffersContextValue}>
      <section className='py-24 from-brand-black-130/30 to-transparent relative isolate z-0 overflow-hidden'>
        {/* Decorative Background Elements */}
        <div className='absolute inset-0 -z-10'>
          <div className='absolute top-0 left-0 w-full h-96 to-transparent' />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            style={{
              position: 'absolute',
              zIndex: -10,
              width: '24rem',
              aspectRatio: '1',
              left: '50%',
              top: '50%',
              filter: 'blur(64px)',
              borderRadius: '9999px',
              backgroundColor: 'rgba(147, 51, 234, 0.05)'
            }}
          />
        </div>

        <div className='fb-container'>
          <div className='flex flex-col gap-12 xl:gap-20'>
            {/* Header Section */}
            <div className='text-center space-y-4'>
              <h2 className='font-bold font-tti-bold text-[clamp(2rem,5vw,3rem)] leading-tight'>
                <span className='text-brand-primary-color-1/30 bg-clip-text bg-gradient-to-r from-brand-primary-color-1 to-brand-primary-color-light animate-text-gradient'>
                  Latest Game Offers
                </span>
              </h2>
              <p className='text-brand-gray-400 max-w-2xl mx-auto'>
                Discover the newest deals and exclusive offers
              </p>
            </div>

            {/* Main Content Grid */}
            <div className='flex flex-col xl:flex-row gap-8 xl:gap-12'>
              {/* Sidebar */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className='w-full xl:w-72 xl:flex-shrink-0'
              >
                <div className='sticky top-24'>
                  {ShowLatestOfferGames && <ShowLatestOfferGames />}
                </div>
              </motion.div>

              {/* Main Content Area */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className='flex-1 min-w-0'
              >
                {/* Game Title and Discover Link */}
                <div className='flex flex-wrap items-center justify-between gap-6 mb-8'>
                  <h2 className='font-tti-demi-bold text-2xl text-white capitalize'>
                    {activeGamesData?.name} Offers
                  </h2>
                  <Link
                    to={ROUTER_PATH.GAMES_SINGLE.replace(ROUTE_PARAM.UID, selectedGameUid)}
                    className='group inline-flex items-center gap-2 text-brand-black-5 hover:text-brand-primary-color-1 transition-colors'
                  >
                    <span className='font-oxanium'>Discover more offers</span>
                    <GradientDirectionArrow className='transform group-hover:translate-x-1 transition-transform' />
                  </Link>
                </div>

                {/* Category Slider */}
                <div className='mb-8'>
                  {LatestOffersCategorySlider && <LatestOffersCategorySlider />}
                </div>

                {/* Upsell Display */}
                {activeGamesData?.upsell && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className='mb-8'
                  >
                    <GameUpsellDisplay payload={activeGamesData.upsell} />
                  </motion.div>
                )}

                {/* Offers Grid */}
                {combinedOffers?.length === 0 ? (
                  <div className='text-center py-12 bg-brand-black-100/30 rounded-lg'>
                    <p className='text-brand-gray-400'>No offers available yet!</p>
                  </div>
                ) : (
                  <motion.div layout className='grid md:grid-cols-2 xl:grid-cols-3 gap-6'>
                    <AnimatePresence>
                      {combinedOffers?.map((offer) => (
                        <motion.div
                          key={v4()}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.3 }}
                        >
                          {OfferCard && <OfferCard payload={offer} />}
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                )}

                {/* Footer CTA */}
                <div className='mt-12 text-center'>
                  <Link
                    to={ROUTER_PATH.GAMES_SINGLE.replace(ROUTE_PARAM.UID, selectedGameUid)}
                    className='group relative inline-flex items-center px-8 py-4 overflow-hidden rounded-lg bg-gradient-to-r from-brand-primary-color-1 to-brand-primary-color-light'
                  >
                    <span className='absolute inset-0 bg-black/20 transform origin-left scale-x-0 transition-transform group-hover:scale-x-100' />
                    <span className='relative text-white font-oxanium font-medium'>
                      Explore All Offers
                    </span>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </LatestGamesOffersContext.Provider>
  );
};
EOF

echo -e "${GREEN}✓ עודכן קובץ LatestGamesOffers.tsx${RESET}"

# עדכון LatestOffersCategorySlider.tsx
echo -e "${YELLOW}מעדכן את הקובץ LatestOffersCategorySlider.tsx...${RESET}"

# גיבוי הקובץ המקורי
cp src/components/ui/LatestOffersCategorySlider.tsx src/components/ui/LatestOffersCategorySlider.tsx.bak

cat > src/components/ui/LatestOffersCategorySlider.tsx << 'EOF'
/* eslint-disable import/no-unresolved */
import { useRef } from 'react';
import { Navigation } from 'swiper/modules';
// Import Swiper React components
import { Swiper, SwiperSlide } from '../../components/swiper/SwiperWrapper';

import 'swiper/css/navigation';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import { DEFAULT_CATEGORY_NAME } from '../../pages/Home/LatestGamesOffersTypes';
import { useLatestGamesOffersContext } from '../../pages/Home/LatestGamesOffersContext';

import '../../assets/css/offers-category-slider.css';

export const LatestOffersCategorySlider = () => {
  const navigationNextRef = useRef(null);
  const navigationPrevRef = useRef(null);

  const { categories, activeCategory, gameCurrencyData, selectedGameUid, setActiveCategory } =
    useLatestGamesOffersContext();

  return (
    <div className='flex items-center offers-category-slider-parent'>
      <button ref={navigationPrevRef} type='button' aria-label='Cancel'>
        <svg
          width='48'
          height='48'
          viewBox='0 0 48 48'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <circle
            cx='24'
            cy='24'
            r='23.5'
            transform='matrix(-1 0 0 1 48 0)'
            fill='#F16334'
            fillOpacity='0.24'
            stroke='url(#paint0_linear_216_85947)'
          />
          <g clipPath='url(#clip0_216_85947)'>
            <path
              d='M26.5 17.75L20.25 24L26.5 30.25'
              stroke='white'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </g>
          <defs>
            <linearGradient
              id='paint0_linear_216_85947'
              x1='60'
              y1='-28.5'
              x2='11'
              y2='51'
              gradientUnits='userSpaceOnUse'
            >
              <stop stopColor='#FCB543' />
              <stop offset='1' stopColor='#F16534' />
            </linearGradient>
            <clipPath id='clip0_216_85947'>
              <rect width='20' height='20' fill='white' transform='matrix(-1 0 0 1 34 14)' />
            </clipPath>
          </defs>
        </svg>
      </button>
      <Swiper
        // ref={sliderRef}
        slidesPerView='auto'
        spaceBetween={30}
        navigation={{
          prevEl: navigationPrevRef.current,
          nextEl: navigationNextRef.current,
        }}
        modules={[Navigation]}
        className='justify-start !mx-0 offers-category-slider'
      >
        <SwiperSlide className='!w-auto'>
          <button
            type='button'
            onClick={() => setActiveCategory(DEFAULT_CATEGORY_NAME)}
            className={`${
              activeCategory === DEFAULT_CATEGORY_NAME ? 'active' : ''
            } capitalize inline-flex text-base leading-none font-medium font-tti-medium text-brand-black-30 hover:text-white transition-colors border-x border-transparent [&.active]:text-brand-primary-color-1 [&.active]:border-x-brand-primary-color-1/50 relative isolate z-0 overflow-hidden [&.active]:after:absolute [&.active]:after:-z-10 [&.active]:after:bottom-0 [&.active]:after:left-1/2 [&.active]:after:-translate-x-1/2 [&.active]:after:w-1/4 [&.active]:after:h-[.125rem] [&.active]:after:bg-brand-primary-color-1 [&.active]:after:rounded-t-md [&.active]:before:absolute [&.active]:before:w-11/12 [&.active]:before:h-full [&.active]:before:-top-px [&.active]:before:left-1/2 [&.active]:before:-translate-x-1/2 [&.active]:before:backdrop-blur-lg`}
          >
            <span className='w-full h-full  px-4 py-2 flex justify-center items-center relative z-10'>
              {DEFAULT_CATEGORY_NAME}
            </span>
          </button>
        </SwiperSlide>

        {gameCurrencyData && gameCurrencyData.gameUid === selectedGameUid ? (
          <SwiperSlide className='!w-auto'>
            <button
              type='button'
              onClick={() => setActiveCategory(gameCurrencyData.categoryUid)}
              className={`${
                activeCategory === gameCurrencyData.categoryUid ? 'active' : ''
              } capitalize inline-flex text-base leading-none font-medium font-tti-medium text-brand-black-30 hover:text-white transition-colors border-x border-transparent [&.active]:text-brand-primary-color-1 [&.active]:border-x-brand-primary-color-1/50 relative isolate z-0 overflow-hidden [&.active]:after:absolute [&.active]:after:-z-10 [&.active]:after:bottom-0 [&.active]:after:left-1/2 [&.active]:after:-translate-x-1/2 [&.active]:after:w-1/4 [&.active]:after:h-[.125rem] [&.active]:after:bg-brand-primary-color-1 [&.active]:after:rounded-t-md [&.active]:before:absolute [&.active]:before:w-11/12 [&.active]:before:h-full [&.active]:before:-top-px [&.active]:before:left-1/2 [&.active]:before:-translate-x-1/2 [&.active]:before:backdrop-blur-lg`}
            >
              <span className='w-full h-full  px-4 py-2 flex justify-center items-center relative z-10'>
                {gameCurrencyData.name}
              </span>
            </button>
          </SwiperSlide>
        ) : null}

        {categories?.map((category, idx) => {
          return (
            <SwiperSlide key={`category-${idx + 1}`} className='!w-auto'>
              <button
                type='button'
                onClick={() => setActiveCategory(String(category.value))}
                className={`${
                  activeCategory === String(category.value) ? 'active' : ''
                } capitalize inline-flex text-base leading-none font-medium font-tti-medium text-brand-black-30 hover:text-white transition-colors border-x border-transparent [&.active]:text-brand-primary-color-1 [&.active]:border-x-brand-primary-color-1/50 relative isolate z-0 overflow-hidden [&.active]:after:absolute [&.active]:after:-z-10 [&.active]:after:bottom-0 [&.active]:after:left-1/2 [&.active]:after:-translate-x-1/2 [&.active]:after:w-1/4 [&.active]:after:h-[.125rem] [&.active]:after:bg-brand-primary-color-1 [&.active]:after:rounded-t-md [&.active]:before:absolute [&.active]:before:w-11/12 [&.active]:before:h-full [&.active]:before:-top-px [&.active]:before:left-1/2 [&.active]:before:-translate-x-1/2 [&.active]:before:backdrop-blur-lg`}
              >
                <span className='w-full h-full px-4 py-2 flex justify-center items-center relative z-10'>
                  {category.label}
                </span>
              </button>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <button ref={navigationNextRef} type='button' aria-label='Cancel'>
        <svg
          width='48'
          height='48'
          viewBox='0 0 48 48'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <circle
            cx='24'
            cy='24'
            r='23.5'
            fill='#F16334'
            fillOpacity='0.24'
            stroke='url(#paint0_linear_216_85947)'
          />
          <g clipPath='url(#clip0_216_85947)'>
            <path
              d='M21.5 17.75L27.75 24L21.5 30.25'
              stroke='white'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </g>
          <defs>
            <linearGradient
              id='paint0_linear_216_85947'
              x1='60'
              y1='-28.5'
              x2='11'
              y2='51'
              gradientUnits='userSpaceOnUse'
            >
              <stop stopColor='#FCB543' />
              <stop offset='1' stopColor='#F16534' />
            </linearGradient>
            <clipPath id='clip0_216_85947'>
              <rect width='20' height='20' fill='white' transform='translate(14 14)' />
            </clipPath>
          </defs>
        </svg>
      </button>
    </div>
  );
};
EOF

echo -e "${GREEN}✓ עודכן קובץ LatestOffersCategorySlider.tsx${RESET}"

# עדכון ShowLatestOfferGames.tsx
echo -e "${YELLOW}מעדכן את הקובץ ShowLatestOfferGames.tsx...${RESET}"

# גיבוי הקובץ המקורי
cp src/pages/Home/components/ShowLatestOfferGames.tsx src/pages/Home/components/ShowLatestOfferGames.tsx.bak

cat > src/pages/Home/components/ShowLatestOfferGames.tsx << 'EOF'
import { useEffect, useMemo } from 'react';

import { LatestOffersButton } from '../../../components/ui/LatestOffersButton';
import { SelectDropdown } from '../../../components/ui/SelectDropdown';
import { useGetGamesQuery } from '../../../redux/features/game/gameApi';
import { useLatestGamesOffersContext } from '../LatestGamesOffersContext';

export const ShowLatestOfferGames = () => {
  const { selectedGameUid, setSelectedGameUid } = useLatestGamesOffersContext();
  // const { gamesAndCategories } = useGamesAndCategories();
  const { data: gamesAndCategoriesRes } = useGetGamesQuery('', {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  const gamesAndCategoriesData = useMemo(() => {
    return gamesAndCategoriesRes?.data || [];
  }, [gamesAndCategoriesRes]);

  useEffect(() => {
    // Check if gamesAndCategories has data and select the first item's uid
    if (gamesAndCategoriesData && gamesAndCategoriesData?.length >= 1) {
      setSelectedGameUid(gamesAndCategoriesData[0].uid);
    }
  }, [gamesAndCategoriesData, setSelectedGameUid]);

  const gameNames = useMemo(() => {
    return (
      gamesAndCategoriesData?.map(({ uid, name }) => ({
        uid,
        name,
      })) || []
    );
  }, [gamesAndCategoriesData]);

  const handleGameNameChange = async (uid: string) => {
    setSelectedGameUid(uid);
    // console.log(uid);
  };

  return (
    <div className=''>
      <div className='relative isolate z-10 w-full xl:hidden'>
        <h2 className='font-bold font-tti-bold text-lg pb-4 text-center'>Select your game</h2>

        <SelectDropdown
          placeholder='game name'
          onChange={handleGameNameChange}
          options={gameNames}
          displayPropName='name'
          valuePropName='uid'
          selectedDefaultValue={selectedGameUid}
        />
      </div>
      <div className='hidden xl:flex xl:flex-col'>
        <div className='h-px w-full bg-fading-theme-gradient-25 ' />
        {gameNames?.map((item) => (
          <LatestOffersButton
            key={item.uid}
            buttonData={item}
            selectedOption={selectedGameUid}
            setSelectedGame={setSelectedGameUid}
          />
        ))}
      </div>
    </div>
  );
};
EOF

echo -e "${GREEN}✓ עודכן קובץ ShowLatestOfferGames.tsx${RESET}"

# ניקוי קאש וית
echo -e "${YELLOW}מנקה את קאש Vite...${RESET}"
rm -rf node_modules/.vite
echo -e "${GREEN}✓ נוקה קאש Vite${RESET}"

# מתן הרשאות הרצה לסקריפט
chmod +x "$0"

echo -e "\n${GREEN}===== כל הקבצים עודכנו בהצלחה! =====${RESET}"
echo -e "${YELLOW}הוספנו חלק של checkingים לקומפוננטות כדי שהן יופיעו אם יש אותן${RESET}"
echo -e "${YELLOW}כדי לראות את השינויים, עצור את השרת והפעל אותו מחדש:${RESET}"
echo -e "${BLUE}pnpm run dev${RESET}"
echo -e "\n${GREEN}אם עדיין יש בעיות, נסה לנקות את cache גם עם:${RESET}"
echo -e "${BLUE}pnpm cache clean${RESET}"
echo -e "${BLUE}pnpm install${RESET}"