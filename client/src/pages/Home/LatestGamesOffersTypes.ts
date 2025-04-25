// src/pages/Home/LatestGamesOffersTypes.ts
import { Dispatch, SetStateAction } from 'react';
import { CreateOfferCommonSchema } from '../CreateOffer/Main';
import { TTagSuggestion } from '../CreateOffer/Main';

/**
 * טיפוסים משותפים לפתרון תלויות מעגליות בין:
 * - pages/Home/LatestGamesOffers.tsx
 * - components/ui/LatestOffersCategorySlider.tsx
 * - pages/Home/components/ShowLatestOfferGames.tsx
 */

// קבוע משותף
export const DEFAULT_CATEGORY_NAME = 'all';

// טיפוס הקונטקסט
export type TLatestGamesOffersContext = {
  selectedGameUid: string;
  setSelectedGameUid: Dispatch<SetStateAction<string>>;
  categories: TTagSuggestion[];
  setCategories: Dispatch<SetStateAction<TTagSuggestion[]>>;
  activeCategory: string;
  setActiveCategory: Dispatch<SetStateAction<string>>;
  gameCurrencyData?: CreateOfferCommonSchema;
  setGameCurrencyData: Dispatch<SetStateAction<CreateOfferCommonSchema | undefined>>;
};
