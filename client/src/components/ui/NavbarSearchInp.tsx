import { ChangeEvent, Fragment, useState } from 'react';
import { BiCheck, BiChevronDown } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { Transition } from '@headlessui/react';

import { ROUTE_PARAM, ROUTER_PATH } from '../../enums/router-path';
import { useDebounce } from '../../hooks/useDebounce';
import { OfferCurrencyDataDb } from '../../pages/CreateGameCurrency';
import { OfferDataDb } from '../../pages/CreateOffer';
import { OFFER_TYPE } from '../../pages/CreateOffer/Main';
import { useLazyGetGamesQuery } from '../../redux/features/game/gameApi';
import { useLazyGetGameCurrenciesQuery } from '../../redux/features/gameCurrency/gameCurrencyApi';
import { useLazyGetOffersQuery } from '../../redux/features/offer/offerApi';
import { SearchIcon } from '../icons/icons';
import { GameDataDb } from '@/pages/CreateGame/context/CreateGameContext';
import { Combobox } from '@headlessui/react';

export const NavbarSearchInp = () => {
  const [selectedItem, setSelectedItem] = useState<
    GameDataDb | OfferDataDb | OfferCurrencyDataDb
  >();
  const [query, setQuery] = useState('');

  const [searchGames, { data: gamesData }] = useLazyGetGamesQuery();
  const [searchOffers, { data: offersData }] = useLazyGetOffersQuery();
  const [searchOfferCurrencies, { data: offerCurrenciesData }] = useLazyGetGameCurrenciesQuery();
  const navigate = useNavigate();
  const debouncedRequest = useDebounce(async () => {
    const searchParams = new URLSearchParams({
      search: query,
    });
    searchGames(searchParams.toString());
    searchOffers(searchParams.toString());
    searchOfferCurrencies(searchParams.toString());

    // access to latest state here
    // console.log(value);
  }, 1000);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setQuery(value);
    debouncedRequest();
  };

  const isGameNotFound = gamesData?.data?.length === 0 && query !== '';
  const combinedSearchResult = [
    ...Array.from(gamesData?.data || []),
    ...Array.from(offersData?.data || []),
    ...Array.from(offerCurrenciesData?.data || []),
  ];

  const comboBoxChange = async (pickedItem: GameDataDb | OfferDataDb | OfferCurrencyDataDb) => {
    if (!isGameNotFound) {
      setSelectedItem(pickedItem);

      if ('categories' in pickedItem) {
        navigate(ROUTER_PATH.GAMES_SINGLE.replace(ROUTE_PARAM.UID, pickedItem.uid));
      }
      if ('offerType' in pickedItem && pickedItem.offerType === OFFER_TYPE.CURRENCY) {
        navigate(ROUTER_PATH.CURRENCIES_SINGLE.replace(ROUTE_PARAM.UID, pickedItem.uid));
      }
      if ('offerType' in pickedItem && pickedItem.offerType === OFFER_TYPE.REGULAR) {
        navigate(
          ROUTER_PATH.OFFERS_SINGLE.replace(ROUTE_PARAM.UID, pickedItem.gameUid).replace(
            ROUTE_PARAM.UID,
            pickedItem.uid
          )
        );
      }
    }
  };

  return (
    <div className='relative isolate z-10 w-full max-w-full self-center'>
      <Combobox value={selectedItem} onChange={comboBoxChange} name='searchGames'>
        <div className='relative'>
          <div className='relative w-full cursor-default overflow-clip rounded-lg flex flex-nowrap gap-1 items-center bg-brand-black-80 px-3 xl:px-4'>
            <SearchIcon />
            <Combobox.Input
              className='w-full border-none py-2.5 xl:py-3 leading-5 text-white bg-transparent outline-none'
              displayValue={(item: { name: string }) => item.name}
              placeholder='Search'
              onChange={onChange}
            />
            <Combobox.Button
              className='flex items-center'
              onClick={async () => {
                searchGames(' ');
                searchOffers(' ');
                searchOfferCurrencies(' ');
              }}
            >
              {({ open }) => (
                <BiChevronDown
                  className={`h-5 w-5 text-gray-400 transition-transform ${
                    open ? 'rotate-180' : 'rotate-0'
                  }`}
                  aria-hidden='true'
                />
              )}
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
            // leave="transition-all ease-in duration-100"
            // leaveFrom="opacity-100 scale-120"
            // leaveTo="opacity-0 scale-50"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className='absolute mt-1 max-h-60 w-full overflow-auto minimal-scrollbar rounded-md bg-brand-black-80 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
              {isGameNotFound ? (
                <div className='relative cursor-default select-none py-2 px-4 text-gray-400'>
                  Nothing found.
                </div>
              ) : (
                combinedSearchResult?.map((item) => (
                  <Combobox.Option
                    key={item._id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-brand-primary-color-1 text-white' : 'text-gray-400'
                      }`
                    }
                    value={item}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}
                        >
                          {item.name}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-white' : 'text-brand-primary-color-1'
                            }`}
                          >
                            <BiCheck className='h-5 w-5' aria-hidden='true' />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};
