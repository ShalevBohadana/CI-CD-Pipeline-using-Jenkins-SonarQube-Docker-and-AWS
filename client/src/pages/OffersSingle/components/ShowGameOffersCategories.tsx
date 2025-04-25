import { Dispatch, SetStateAction, useEffect, useMemo } from 'react';
import { GoChevronRight } from 'react-icons/go';
import { Link } from 'react-router-dom';
import { v4 } from 'uuid';

import { SelectDropdown } from '../../../components/ui/SelectDropdown';
import { ROUTER_PATH } from '../../../enums/router-path';
import { CreateOfferCommonSchema } from '../../CreateOffer/Main';
import { GameDataDb } from '@/pages/CreateGame/context/CreateGameContext';

export const SHOW_OFFERS_CATEGORY_TYPE = {
  GAME: 'game',
  OFFER: 'offer',
} as const;
export type ShowOffersCategoryType =
  (typeof SHOW_OFFERS_CATEGORY_TYPE)[keyof typeof SHOW_OFFERS_CATEGORY_TYPE];
type Props = {
  payload: {
    type: ShowOffersCategoryType;
    currentGame: GameDataDb;
    currentGameCurrency: CreateOfferCommonSchema | undefined;
    categoryUid: string;
    selectedCategory: string;
    setSelectedCategory: Dispatch<SetStateAction<string>>;
    handleCategoryChange: (category: string, type: ShowOffersCategoryType) => Promise<void>;
  };
};

export const ShowGameOffersCategories = ({
  payload: {
    type,
    currentGame,
    currentGameCurrency,
    categoryUid,
    selectedCategory,
    setSelectedCategory,
    handleCategoryChange,
  },
}: Props) => {
  const handleCategoryChangeButton = (category: string) => async () => {
    handleCategoryChange(category, type);
  };

  useEffect(() => {
    if (categoryUid) {
      setSelectedCategory(categoryUid);
    }
  }, [categoryUid, setSelectedCategory]);
  const currencyCategoryName = useMemo(
    () => ({
      value: currentGameCurrency?.uid as string | number | symbol | null,
      label: currentGameCurrency?.name as string,
    }),
    [currentGameCurrency]
  );
  const categoryNames = useMemo(() => {
    return [currencyCategoryName, ...(currentGame?.categories || [])];
  }, [currentGame?.categories, currencyCategoryName]);

  return (
    <div className=''>
      <div className='relative isolate z-10 w-full max-w-sm mx-auto xl:hidden'>
        <h2 className='font-bold font-tti-bold text-lg pb-4 text-center'>
          Select Available Offers
        </h2>
        <SelectDropdown
          placeholder='category name'
          onChange={(val) => handleCategoryChange(val, type)}
          options={categoryNames}
          displayPropName='label'
          valuePropName='value'
          selectedDefaultValue={selectedCategory}
          // buttonClassName="max-w-[clamp(15.25rem,80vw,19.25rem)] xl:max-w-[unset]"
        />
      </div>
      <div className='hidden xl:flex xl:flex-col'>
        <Link
          to={ROUTER_PATH.GAMES}
          className='inline-flex w-full h-full flex-col justify-center items-center gap-2 px-4 xl:px-5 py-px font-tti-medium font-medium text-lg my-4 leading-none text-brand-primary-color-1 uppercase transition-colors cursor-pointer hover:text-brand-primary-color-light'
        >
          <span className=''>{currentGame?.name}</span>
        </Link>
        <div className='h-px w-full bg-fading-theme-gradient-25 ' />
        {categoryNames?.map(({ value, label }) => {
          if (label) {
            return (
              <button
                type='button'
                key={v4()}
                onClick={handleCategoryChangeButton(String(value))}
                className={`${
                  selectedCategory === String(value) ? 'active' : ''
                } relative isolate rounded-md overflow-hidden hover:bg-brand-primary-color-1/[0.03] gradient-bordered [&.active]:before:p-px [&.active]:before:rounded-md [&.active]:before:bg-[linear-gradient(91.55deg,theme('colors.brand.primary.color-light'/.25),rgba(241,101,52,.75))] hover:before:p-px hover:before:rounded-md hover:before:bg-[linear-gradient(91.55deg,theme('colors.brand.primary.color-light'/.25),rgba(241,101,52,.75))] inline-flex w-full h-full flex-col justify-center items-center gap-2 px-4 xl:px-5 py-px font-tti-medium font-medium text-base leading-none text-brand-black-30 hover:text-white [&.active]:text-white transition-colors`}
              >
                <span className='flex-grow w-full text-start flex gap-2 justify-between items-center py-[15px]'>
                  <span className='capitalize'>{label}</span>
                  <GoChevronRight className='w-5 h-5 shrink-0' />
                </span>
                <span className='h-px w-full bg-fading-theme-gradient-25 flex absolute bottom-0 ' />
              </button>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};
