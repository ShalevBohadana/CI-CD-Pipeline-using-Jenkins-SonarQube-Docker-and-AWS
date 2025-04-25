// import { motion } from '../../components/motion/MotionWrapper';
// import { AnimatePresence } from 'framer-motion';
// import {
//   useEffect,
//   useMemo,
//   useState,
// } from 'react';
// import { Link } from 'react-router-dom';
// import { v4 } from 'uuid';

// import { GradientDirectionArrow } from '../../components/icons/icons';
// import { GameUpsellDisplay } from '../../components/ui/GameUpsellDisplay';
// import { LatestOffersCategorySlider } from '../../components/ui/LatestOffersCategorySlider';
// import { OfferCard } from '../../components/ui/OfferCard';
// import { ROUTE_PARAM, ROUTER_PATH } from '../../enums/router-path';
// import { useGetGamesQuery } from '../../redux/features/game/gameApi';
// import { useGetGameCurrenciesQuery } from '../../redux/features/gameCurrency/gameCurrencyApi';
// import { useGetOffersQuery } from '../../redux/features/offer/offerApi';
// import { CreateOfferCommonSchema, TTagSuggestion } from '../CreateOffer/Main';

// import { ShowLatestOfferGames } from './components/ShowLatestOfferGames';
// import { DEFAULT_CATEGORY_NAME } from './LatestGamesOffersTypes';
// import { LatestGamesOffersContext } from './LatestGamesOffersContext';

// // הוספת לוגים כדי לוודא שהקומפוננטות מוגדרות
// console.log('ShowLatestOfferGames defined?', ShowLatestOfferGames !== undefined);
// console.log('LatestOffersCategorySlider defined?', LatestOffersCategorySlider !== undefined);
// console.log('OfferCard defined?', OfferCard !== undefined);

// export const LatestGamesOffers = () => {
//   const [selectedGameUid, setSelectedGameUid] = useState<string>('');

//   const { data: offersRes } = useGetOffersQuery('limit=20', {
//     refetchOnMountOrArgChange: true,
//     refetchOnFocus: true,
//     refetchOnReconnect: true,
//   });
//   const offersData = useMemo(
//     () => offersRes?.data?.filter((offer) => offer.gameUid === selectedGameUid) || [],
//     [offersRes?.data, selectedGameUid]
//   );

//   const { data: currenciesRes } = useGetGameCurrenciesQuery('', {
//     skip: !selectedGameUid,
//     refetchOnMountOrArgChange: true,
//     refetchOnFocus: true,
//     refetchOnReconnect: true,
//   });
//   const currencyData = useMemo(
//     () => currenciesRes?.data?.find((currency) => currency?.gameUid === selectedGameUid),
//     [currenciesRes?.data, selectedGameUid]
//   );
//   const [combinedOffers, setCombinedOffers] = useState<CreateOfferCommonSchema[]>([]);

//   const [categories, setCategories] = useState<TTagSuggestion[]>([]);
//   const [activeCategory, setActiveCategory] = useState(DEFAULT_CATEGORY_NAME);
//   const [gameCurrencyData, setGameCurrencyData] = useState<CreateOfferCommonSchema>();

//   const { data: gamesRes } = useGetGamesQuery('limit=200', {
//     refetchOnMountOrArgChange: true,
//     refetchOnFocus: true,
//     refetchOnReconnect: true,
//   });
//   const gamesData = useMemo(() => gamesRes?.data || [], [gamesRes?.data]);
//   const activeGamesData = useMemo(
//     () => gamesRes?.data.find((game) => game.uid === selectedGameUid),
//     [gamesRes?.data, selectedGameUid]
//   );

//   const latestGamesOffersContextValue = useMemo(
//     () => ({
//       selectedGameUid,
//       setSelectedGameUid,
//       categories,
//       setCategories,
//       activeCategory,
//       setActiveCategory,
//       gameCurrencyData,
//       setGameCurrencyData,
//     }),
//     [
//       selectedGameUid,
//       setSelectedGameUid,
//       categories,
//       setCategories,
//       activeCategory,
//       setActiveCategory,
//       gameCurrencyData,
//       setGameCurrencyData,
//     ]
//   );

//   useEffect(() => {
//     if (offersData && currencyData) {
//       setCombinedOffers([currencyData, ...offersData]);
//     } else if (currencyData) {
//       setCombinedOffers([currencyData]);
//     } else if (offersData) {
//       setCombinedOffers(offersData);
//     }
//   }, [offersData, currencyData]);

//   useEffect(() => {
//     if (currencyData) {
//       setGameCurrencyData(currencyData);
//     }
//     if (selectedGameUid) {
//       const currentCategories = gamesData?.find(
//         (game) => game?.uid === selectedGameUid
//       )?.categories;
//       if (currentCategories) {
//         setCategories(currentCategories);
//         setActiveCategory(DEFAULT_CATEGORY_NAME);
//       }
//     }
//   }, [selectedGameUid, gamesData, currencyData, offersData]);

//   useEffect(() => {
//     if (activeCategory === DEFAULT_CATEGORY_NAME && currencyData && offersData) {
//       setCombinedOffers([currencyData, ...offersData]);
//     } else if (activeCategory !== DEFAULT_CATEGORY_NAME && currencyData && offersData) {
//       const isExisting = [currencyData, ...offersData].filter(
//         (offer) => offer?.categoryUid === activeCategory
//       );
//       setCombinedOffers(isExisting);
//     }
//   }, [activeCategory, offersData, currencyData]);

//   return (
//     <LatestGamesOffersContext.Provider value={latestGamesOffersContextValue}>
//       <section className='py-24 from-brand-black-130/30 to-transparent relative isolate z-0 overflow-hidden'>
//         {/* Decorative Background Elements */}
//         <div className='absolute inset-0 -z-10'>
//           <div className='absolute top-0 left-0 w-full h-96 to-transparent' />

//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 1, delay: 0.2 }}
//             style={{
//               position: 'absolute',
//               zIndex: -10,
//               width: '24rem',
//               aspectRatio: '1',
//               left: '50%',
//               top: '50%',
//               filter: 'blur(64px)',
//               borderRadius: '9999px',
//               backgroundColor: 'rgba(147, 51, 234, 0.05)'
//             }}
//           />
//         </div>

//         <div className='fb-container'>
//           <div className='flex flex-col gap-12 xl:gap-20'>
//             {/* Header Section */}
//             <div className='text-center space-y-4'>
//               <h2 className='font-bold font-tti-bold text-[clamp(2rem,5vw,3rem)] leading-tight'>
//                 <span className='text-brand-primary-color-1/30 bg-clip-text bg-gradient-to-r from-brand-primary-color-1 to-brand-primary-color-light animate-text-gradient'>
//                   Latest Game Offers
//                 </span>
//               </h2>
//               <p className='text-brand-gray-400 max-w-2xl mx-auto'>
//                 Discover the newest deals and exclusive offers
//               </p>
//             </div>

//             {/* Main Content Grid */}
//             <div className='flex flex-col xl:flex-row gap-8 xl:gap-12'>
//               {/* Sidebar */}
//               <motion.div
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.5 }}
//                 className='w-full xl:w-72 xl:flex-shrink-0'
//               >
//                 <div className='sticky top-24'>
//                   {ShowLatestOfferGames && <ShowLatestOfferGames />}
//                 </div>
//               </motion.div>

//               {/* Main Content Area */}
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ duration: 0.5, delay: 0.2 }}
//                 className='flex-1 min-w-0'
//               >
//                 {/* Game Title and Discover Link */}
//                 <div className='flex flex-wrap items-center justify-between gap-6 mb-8'>
//                   <h2 className='font-tti-demi-bold text-2xl text-white capitalize'>
//                     {activeGamesData?.name} Offers
//                   </h2>
//                   <Link
//                     to={ROUTER_PATH.GAMES_SINGLE.replace(ROUTE_PARAM.UID, selectedGameUid)}
//                     className='group inline-flex items-center gap-2 text-brand-black-5 hover:text-brand-primary-color-1 transition-colors'
//                   >
//                     <span className='font-oxanium'>Discover more offers</span>
//                     <GradientDirectionArrow className='transform group-hover:translate-x-1 transition-transform' />
//                   </Link>
//                 </div>

//                 {/* Category Slider */}
//                 <div className='mb-8'>
//                   {LatestOffersCategorySlider && <LatestOffersCategorySlider />}
//                 </div>

//                 {/* Upsell Display */}
//                 {activeGamesData?.upsell && (
//                   <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.5 }}
//                     className='mb-8'
//                   >
//                     <GameUpsellDisplay payload={activeGamesData.upsell} />
//                   </motion.div>
//                 )}

//                 {/* Offers Grid */}
//                 {combinedOffers?.length === 0 ? (
//                   <div className='text-center py-12 bg-brand-black-100/30 rounded-lg'>
//                     <p className='text-brand-gray-400'>No offers available yet!</p>
//                   </div>
//                 ) : (
//                   <motion.div layout className='grid md:grid-cols-2 xl:grid-cols-3 gap-6'>
//                     <AnimatePresence>
//                       {combinedOffers?.map((offer) => (
//                         <motion.div
//                           key={v4()}
//                           initial={{ opacity: 0, scale: 0.95 }}
//                           animate={{ opacity: 1, scale: 1 }}
//                           exit={{ opacity: 0, scale: 0.95 }}
//                           transition={{ duration: 0.3 }}
//                         >
//                           {OfferCard && <OfferCard payload={offer} />}
//                         </motion.div>
//                       ))}
//                     </AnimatePresence>
//                   </motion.div>
//                 )}

//                 {/* Footer CTA */}
//                 <div className='mt-12 text-center'>
//                   <Link
//                     to={ROUTER_PATH.GAMES_SINGLE.replace(ROUTE_PARAM.UID, selectedGameUid)}
//                     className='group relative inline-flex items-center px-8 py-4 overflow-hidden rounded-lg bg-gradient-to-r from-brand-primary-color-1 to-brand-primary-color-light'
//                   >
//                     <span className='absolute inset-0 bg-black/20 transform origin-left scale-x-0 transition-transform group-hover:scale-x-100' />
//                     <span className='relative text-white font-oxanium font-medium'>
//                       Explore All Offers
//                     </span>
//                   </Link>
//                 </div>
//               </motion.div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </LatestGamesOffersContext.Provider>
//   );
// };
import { useState } from 'react';
import { LatestGamesOffersContext } from './LatestGamesOffersContext';
import { DEFAULT_CATEGORY_NAME } from './LatestGamesOffersTypes';

export const LatestGamesOffers = () => {
  const [selectedGameUid, setSelectedGameUid] = useState('');
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(DEFAULT_CATEGORY_NAME);
  const [gameCurrencyData, setGameCurrencyData] = useState();

  const contextValue = {
    selectedGameUid,
    setSelectedGameUid,
    categories,
    setCategories,
    activeCategory,
    setActiveCategory,
    gameCurrencyData,
    setGameCurrencyData,
  };

  // פשוט הצגת פלייסהולדר לבדיקה
  return (
    <LatestGamesOffersContext.Provider value={contextValue}>
      <section className='py-24'>
        <div>LatestGamesOffers Component need to check why its not work</div>
      </section>
    </LatestGamesOffersContext.Provider>
  );
};
