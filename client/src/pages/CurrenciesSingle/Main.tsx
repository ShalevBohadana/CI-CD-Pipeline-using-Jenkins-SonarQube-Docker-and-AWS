/* eslint-disable react/button-has-type */
import { useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IoIosSearch } from 'react-icons/io';
import { useParams } from 'react-router-dom';

import { LoadingCircle } from '../../components/LoadingCircle';
import { Dropdown } from '../../components/ui/Dropdown';
import { GradientFadePrimaryHr } from '../../components/ui/GradientFadePrimaryHr';
import { useGetGameQuery } from '../../redux/features/game/gameApi';
import { useGetGameCurrencyQuery } from '../../redux/features/gameCurrency/gameCurrencyApi';
import { useGetGameCurrencyOffersQuery } from '../../redux/features/gameCurrencyOffer/gameCurrencyOfferApi';
import { CommonParams } from '../../types/globalTypes';
import { sanitizeHTML } from '../../utils/DOMPurifier';

import { GameCurrencyOfferListItem } from './components/GameCurrencyOfferListItem';
import { ThemeRadioInputBox } from './components/ThemeRadioInputBox';

import '../OffersSingle/css/dynamic-markup.css';

type OfferFilterFormInputs = {
  region: string[];
  faction: string[];
  boostMethod: string[];
  executionOptions: string[];
  additionalOptions: string[];
  currentLevel: number;
  desiredLevel: number;
};

export const Main = () => {
  const { uid } = useParams<CommonParams>();
  const { data: gameCurrencyRes } = useGetGameCurrencyQuery(uid || '', {
    skip: !uid,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
  const gameCurrency = gameCurrencyRes?.data;
  const gameCurrencyOffersParams = new URLSearchParams({
    search: uid || '',
    limit: '1000',
  });
  const { data: gameCurrencyOffersRes } = useGetGameCurrencyOffersQuery(
    gameCurrencyOffersParams.toString(),
    {
      skip: !uid,
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
      refetchOnReconnect: true,
    }
  );
  const currentCurrencyOffers = useMemo(
    () => gameCurrencyOffersRes?.data,
    [gameCurrencyOffersRes?.data]
  );
  const { data: gameData } = useGetGameQuery(gameCurrency?.gameUid || '', {
    skip: !gameCurrency?.gameUid,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
  const gameName = gameData?.data?.name;

  const {
    handleSubmit,

    formState: {},
  } = useForm<OfferFilterFormInputs>();

  const onSubmit: SubmitHandler<OfferFilterFormInputs> = (data) => {
    console.log(data);
  };

  if (!gameCurrency) {
    return <LoadingCircle />;
  }
  const { name, dynamicFilters, servers, description } = gameCurrency;

  // console.log(filters);
  const serverOptions = [...servers.map((server) => server.label)];
  const handleServerSelect = (value: string) => {
    console.log(`Selected state: ${value}`);
  };

  const sortOptions = ['Featured', 'Created AI', 'Price', 'Duration'];
  const handleSortSelect = (value: string) => {
    console.log(`Selected sort: ${value}`);
  };

  return (
    <main className='relative isolate z-0 py-4 xl:py-4'>
      <div className='fb-container grid gap-8'>
        <div className='grid gap-8 xl:gap-12'>
          {/* details  */}
          <div className='grid gap-5 font-tti-regular text-sm xl:text-lg leading-normal text-brand-black-20'>
            <div className='grid gap-3'>
              <h1 className='text-brand-primary-color-1'>
                {name} - {gameName}
              </h1>
              <GradientFadePrimaryHr />
            </div>

            <div
              data-dynamic-markup='offer-details'
              className='grid gap-0.5 font-tti-regular text-base xl:text-lg leading-none text-brand-black-20 font-normal'
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: sanitizeHTML(description || ''),
              }}
            />
          </div>
          {/* filters  */}
          <div className='grid gap-4 xl:gap-6'>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* search filters */}
              <div className='w-full h-full flex items-center flex-wrap gap-4 xl:gap-6'>
                {/* filter boxes */}
                {dynamicFilters?.map((filter) => (
                  <ThemeRadioInputBox key={filter.name} data={filter} />
                ))}

                {/* select server dropdown  */}
                <div className='w-56 max-w-full'>
                  <Dropdown
                    heightClassName='h-auto'
                    leftIcon={<IoIosSearch className='w-5 h-5 shrink-0' />}
                    defaultLabel='Find your server'
                    selectHandler={handleServerSelect}
                    options={serverOptions}
                    className='bg-brand-primary-color-1/[.03] h-full text-sm xl:text-base leading-none font-tti-medium font-medium text-brand-black-20'
                  />
                </div>
                <ThemeRadioInputBox
                  data={{
                    type: 'radio',
                    name: 'currency-status',
                    children: [{ name: 'offline' }, { name: 'online' }],
                  }}
                />
                <div className='xl:ml-auto'>
                  <button
                    type='reset'
                    className='text-sm xl:text-base leading-none font-tti-medium font-medium text-brand-black-20 bg-brand-primary-color-1/[.03] p-2 border border-brand-primary-color-1 rounded-md capitalize'
                  >
                    reset filters
                  </button>
                </div>
              </div>
            </form>
            <GradientFadePrimaryHr />
            {/* sort dropdown  */}
            <div className='xl:pt-6 xl:justify-self-end w-56 xl:w-40 max-w-full'>
              <Dropdown
                defaultLabel='sort by'
                selectHandler={handleSortSelect}
                options={sortOptions}
                className='bg-brand-primary-color-1/[.03]'
              />
            </div>
          </div>
        </div>

        {/* server list  */}
        <div className='p-4 xl:p-7 bg-brand-primary-color-1/[.03] rounded-xl'>
          <div className='w-full h-full max-h-[25rem] overflow-auto minimal-scrollbar p-1 grid gap-4 xl:gap-7'>
            {currentCurrencyOffers?.map((offer) => (
              <GameCurrencyOfferListItem key={offer._id} currencyName={name} payload={offer} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};
