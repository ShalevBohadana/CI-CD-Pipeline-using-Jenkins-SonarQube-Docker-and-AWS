import { useEffect, useMemo, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { useGetGameQuery } from '../../redux/features/game/gameApi';
import { useGetGameCurrenciesQuery } from '../../redux/features/gameCurrency/gameCurrencyApi';
import { useGetOffersQuery } from '../../redux/features/offer/offerApi';
import { CommonParams } from '../../types/globalTypes';
import { CreateOfferCommonSchema } from '../CreateOffer/Main';
import { ShowGameOffersCategories } from '../OffersSingle/components/ShowGameOffersCategories';

import { GameOffers } from './components/GameOffers';

export const Main = () => {
  const { uid } = useParams<CommonParams>();
  const { state } = useLocation();
  const { data: currentGameRes } = useGetGameQuery(uid || '', {
    skip: !uid,
    refetchOnFocus: true,
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
  });
  const currentGame = currentGameRes?.data;
  const [categorizedOffers, setCategorizedOffers] = useState<CreateOfferCommonSchema[]>([]);

  const offersParam = new URLSearchParams({
    search: currentGame?.uid || '',
    limit: '100',
  });
  const { data: currentOffersRes } = useGetOffersQuery(offersParam.toString(), {
    skip: !uid,
    refetchOnFocus: true,
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
  });

  const currentOffers = useMemo(() => currentOffersRes?.data || [], [currentOffersRes?.data]);
  const currencyParams = new URLSearchParams({
    search: currentGame?.uid || '',
  });
  const { data: currentGameCurrencyRes } = useGetGameCurrenciesQuery(currencyParams.toString(), {
    skip: !currentGame?.uid,
    refetchOnFocus: true,
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
  });
  const currentGameCurrency = useMemo(
    () => currentGameCurrencyRes?.data?.[0] as CreateOfferCommonSchema | undefined,
    [currentGameCurrencyRes?.data]
  );
  const categoryUid = useMemo(
    () =>
      String(
        state?.categoryUid || currentGameCurrency?.categoryUid || currentGame?.categories?.[0].value
      ),
    [currentGameCurrency?.categoryUid, currentGame?.categories, state?.categoryUid]
  );
  const [selectedCategory, setSelectedCategory] = useState(categoryUid);

  useEffect(() => {
    const eligibleOffers: CreateOfferCommonSchema[] = [...currentOffers];
    if (currentGameCurrency) {
      eligibleOffers.unshift(currentGameCurrency);
    }
    const result = eligibleOffers.filter((offer) => offer?.categoryUid === categoryUid);
    setCategorizedOffers(result);
  }, [currentOffers, currentGameCurrency, categoryUid]);

  const handleCategoryChange = async (category: string) => {
    if (selectedCategory === category) {
      return; // Do nothing if the category is the same
    }
    setSelectedCategory(category);
    if (currentGameCurrency) {
      const eligibleOffers = [currentGameCurrency, ...currentOffers]?.filter(
        (offer) => offer?.categoryUid === category
      );
      setCategorizedOffers(eligibleOffers);
    }
    if (!currentGameCurrency) {
      const eligibleOffers = [...currentOffers]?.filter((offer) => offer?.categoryUid === category);
      setCategorizedOffers(eligibleOffers);
    }
  };

  return (
    <main className='relative isolate z-0 py-4 xl:py-4 grid gap-4 xl:grid-cols-[min(17rem,100%),1fr] items-start'>
      {currentGame && categoryUid ? (
        <div className='fb-container xl:m-0 xl:row-span-full xl:col-span-full w-full xl:max-w-[17rem] xl:flex-shrink-0 xl:sticky xl:top-[97px] z-10 2xl:px-4'>
          <ShowGameOffersCategories
            payload={{
              type: 'game',
              currentGame,
              currentGameCurrency,
              categoryUid,
              selectedCategory,
              setSelectedCategory,
              handleCategoryChange,
            }}
          />
        </div>
      ) : null}
      {currentGame && categorizedOffers ? (
        <div className='fb-container xl:row-span-full xl:col-span-full'>
          <div className='pb-20 xl:ml-auto xl:max-w-[calc(100%-17rem)] 2xl:max-w-[calc(100%-10rem)] 3xl:max-w-none'>
            <GameOffers
              payload={{
                game: currentGame,
                currency: currentGameCurrency,
                offers: categorizedOffers,
                categoryUid: selectedCategory,
              }}
            />
          </div>
        </div>
      ) : null}
    </main>
  );
};
