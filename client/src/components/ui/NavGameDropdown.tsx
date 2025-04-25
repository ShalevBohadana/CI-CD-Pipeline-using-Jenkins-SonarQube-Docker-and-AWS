import { MouseEventHandler, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { v4 } from 'uuid';

import { ROUTE_PARAM, ROUTER_PATH } from '../../enums/router-path';
import { DESKTOP_SCREEN } from '../../hooks/useMatchMedia';
import { CategorySuggestion } from '../../pages/CreateGame/components/Main';
import { OFFER_TYPE } from '../../pages/CreateOffer/Main';
import { useGetGamesQuery } from '../../redux/features/game/gameApi';
import { useGetGameCurrenciesQuery } from '../../redux/features/gameCurrency/gameCurrencyApi';
import { useGetOffersQuery } from '../../redux/features/offer/offerApi';
import { ChevronRight } from '../icons/icons';
import { GameDataDb } from '@/pages/CreateGame/context/CreateGameContext';

interface INavGameDropdown {
  onCloseModal: () => void;
}
export const NavGameDropdown = ({ onCloseModal }: INavGameDropdown) => {
  const [games2, setGames2] = useState<GameDataDb[]>();
  const [activeGame2, setActiveGame2] = useState<GameDataDb>();
  const [activeGameCategory2, setActiveGameCategory2] = useState<CategorySuggestion>();
  const { data: gamesData } = useGetGamesQuery('', {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
  const gamesDataFromDb = gamesData?.data;
  const offerSearchParam = new URLSearchParams({
    page: '1',
    limit: '100',
    skip: '0',
    search: activeGame2?.uid || '',
  });
  const { data: offersData, isLoading: _ } = useGetOffersQuery(offerSearchParam.toString(), {
    skip: !activeGame2?.uid,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
  // console.log(activeGame2?.categories, activeGameCategory2);
  useEffect(() => {
    if (gamesDataFromDb) {
      setGames2(gamesDataFromDb);
      setActiveGame2(gamesDataFromDb[0]);
      const firstCategory = gamesDataFromDb[0].categories;
      setActiveGameCategory2(firstCategory[0]);
    }
  }, [gamesDataFromDb]);
  const gameCurrencyParams = new URLSearchParams({
    search: activeGame2?.uid || '',
  });
  const { data: gameCurrencyRes } = useGetGameCurrenciesQuery(gameCurrencyParams.toString(), {
    skip: !activeGame2?.uid,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
  const currentGameCurrency = gameCurrencyRes?.data[0];
  const handleActiveGame: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    const currentGameEl = event.currentTarget as HTMLElement;
    const currentGameId = currentGameEl?.dataset?.game;
    if (currentGameId) {
      const currentGame = games2?.find((game) => game?._id === currentGameId);

      if (currentGame) {
        // Set the active game based on the currentGame object
        setActiveGame2(currentGame);
        setActiveGameCategory2(currentGame.categories && currentGame?.categories[0]);
        // currentGameEl?.classList.add('active');
        const areaContainer = currentGameEl.closest(`[data-area-container="navbar"]`);
        const gamesArea = areaContainer?.querySelector(`[data-area="games"]`);
        const categoriesArea = areaContainer?.querySelector(`[data-area="categories"]`);

        const navBackBtn = areaContainer?.querySelector(`.nav-back-btn`);
        gamesArea?.classList.add('hidden');
        categoriesArea?.classList.remove('hidden');
        navBackBtn?.classList.remove('hidden');
      }
    }
  };

  const handleActiveGameCategory: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    // event.stopPropagation();
    const currentGameEl = event.currentTarget as HTMLElement;
    const [currentGameId, categoryId] = (currentGameEl?.dataset?.categoryRef as string).split(':');
    // if (currentGameEl?.parentElement) {
    //   [...currentGameEl.parentElement.children].forEach((btn) =>
    //     btn.classList.remove('active')
    //   );
    // }
    if (currentGameId) {
      const currentGameCategory = games2
        ?.find((game) => game?._id === currentGameId)
        ?.categories?.find((category) => category?.value === categoryId);

      if (currentGameCategory) {
        // Set the active game based on the currentGame object
        setActiveGameCategory2(currentGameCategory);
        // currentGameEl?.classList.add('active');
        const areaContainer = currentGameEl.closest(`[data-area-container="navbar"]`);
        const gamesArea = areaContainer?.querySelector(`[data-area="games"]`);
        const categoriesArea = areaContainer?.querySelector(`[data-area="categories"]`);
        const detailsArea = areaContainer?.querySelector(`[data-area="details"]`);
        gamesArea?.classList.add('hidden');
        categoriesArea?.classList.add('hidden');
        detailsArea?.classList.remove('hidden');
      }
    }
  };
  const handleNavBack: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    // event.stopPropagation();

    const backButtonEl = event.currentTarget as HTMLButtonElement;

    const areaContainer = backButtonEl.closest(`[data-area-container="navbar"]`);
    const gamesArea = areaContainer?.querySelector(`[data-area="games"]`);
    const categoriesArea = areaContainer?.querySelector(`[data-area="categories"]`);
    const detailsArea = areaContainer?.querySelector(`[data-area="details"]`);

    if (!detailsArea?.classList.contains('hidden')) {
      detailsArea?.classList.add('hidden');
      categoriesArea?.classList.remove('hidden');
      backButtonEl.classList.remove('hidden');
    } else if (!categoriesArea?.classList.contains('hidden')) {
      categoriesArea?.classList.add('hidden');
      gamesArea?.classList.remove('hidden');
      backButtonEl.classList.add('hidden');
    }
  };

  return (
    <div
      data-area-container='navbar'
      className={`grid xl:grid-cols-3 gap-[9px] xl:[grid-template-areas:"games_categories_details"]`}
    >
      <div className='flex justify-between items-center xl:hidden pb-5'>
        <button
          type='button'
          aria-label='Back'
          onClick={handleNavBack}
          className='hidden nav-back-btn'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            className='w-6 h-6 fill-white'
          >
            <path
              fillRule='evenodd'
              d='M15.694 18.694a1.043 1.043 0 0 0 0-1.476L10.47 12l5.224-5.218a1.043 1.043 0 0 0 0-1.476 1.046 1.046 0 0 0-1.478 0l-5.91 5.904a1.04 1.04 0 0 0-.305.79 1.04 1.04 0 0 0 .305.79l5.91 5.904c.408.408 1.07.408 1.478 0Z'
              clipRule='evenodd'
            />
          </svg>
        </button>
        <button
          type='button'
          aria-label='Cancel'
          onClick={onCloseModal}
          className='ml-auto inline-flex justify-center items-center fill-white'
        >
          <svg xmlns='http://www.w3.org/2000/svg' width='22' height='22' viewBox='0 0 22 22'>
            <path
              fillRule='evenodd'
              d='M6.148 4.852a.917.917 0 1 0-1.296 1.296L9.704 11l-4.852 4.852a.917.917 0 1 0 1.296 1.296L11 12.296l4.852 4.852a.917.917 0 0 0 1.296-1.296L12.296 11l4.852-4.852a.917.917 0 1 0-1.296-1.296L11 9.704 6.148 4.852Z'
              clipRule='evenodd'
            />
          </svg>
        </button>
      </div>
      <div data-area='games' className='xl:block xl:[grid-area:games]'>
        <h2 className='first-letter:capitalize text-sm leading-none pb-4'>Choose the game</h2>
        <div className='flex flex-col gap-1 max-h-[calc(100dvh-13rem)] xl:max-h-[calc(100dvh-24rem)] overflow-y-auto minimal-scrollbar pr-2'>
          {games2?.map((game) => (
            <button
              type='button'
              key={v4()}
              className={`${
                activeGame2?._id === game._id ? 'active' : ''
              }  text-start flex gap-2 justify-between items-center border border-transparent hover:border-brand-black-90 hover:bg-brand-black-110 [&.active]:border-brand-black-90 [&.active]:bg-brand-black-110 rounded-lg py-[15px] pl-3 pr-[9px] transition-colors text-brand-black-30`}
              data-game={game._id}
              onPointerEnter={(ev) => {
                if (window.matchMedia(DESKTOP_SCREEN).matches) {
                  handleActiveGame(ev);
                }
              }}
              onClick={handleActiveGame}
            >
              <span className=''>{game.name}</span>
              {game?.categories && game.categories ? (
                <span className=''>
                  <ChevronRight />
                </span>
              ) : null}
            </button>
          ))}
        </div>
      </div>

      <div data-area='categories' className='hidden xl:block xl:[grid-area:categories]'>
        <h2 className='first-letter:capitalize text-sm leading-none pb-4'>categories</h2>
        <div className='flex flex-col max-h-[calc(100dvh-13rem)] xl:max-h-[calc(100dvh-24rem)] overflow-y-auto minimal-scrollbar pr-2 gap-[9px] '>
          {activeGame2?.categories?.map((category) => {
            return (
              <button
                onPointerEnter={(ev) => {
                  if (window.matchMedia(DESKTOP_SCREEN).matches) {
                    handleActiveGameCategory(ev);
                  }
                }}
                onClick={handleActiveGameCategory}
                type='button'
                key={v4()}
                data-category-ref={`${activeGame2._id}:${category.value?.toString()}`}
                className={`${
                  category?.value === activeGameCategory2?.value ? 'active' : ''
                } text-start flex gap-2 justify-between items-center border border-transparent hover:border-brand-black-90 hover:bg-brand-black-110 [&.active]:border-brand-black-90 [&.active]:bg-brand-black-110 rounded-lg py-[15px] pl-3 pr-[9px] transition-colors text-brand-black-30`}
              >
                <span className=''>{category.label}</span>
              </button>
            );
          })}
          {currentGameCurrency ? (
            <Link
              key={v4()}
              to={ROUTER_PATH.CURRENCIES_SINGLE.replace(ROUTE_PARAM.UID, currentGameCurrency.uid)}
              onClick={onCloseModal}
              data-details-ref={currentGameCurrency._id}
              className='text-start flex gap-2 justify-between items-center border border-transparent hover:text-brand-primary-color-1 rounded-lg py-[15px] pl-3 pr-[9px] transition-colors text-brand-black-30'
            >
              {currentGameCurrency.name}
            </Link>
          ) : null}
        </div>
      </div>

      <div data-area='details' className='hidden xl:block xl:[grid-area:details]'>
        <h2 className='first-letter:capitalize text-sm leading-none pb-4'>details</h2>
        <div className='flex flex-col max-h-[calc(100dvh-13rem)] xl:max-h-[calc(100dvh-24rem)] overflow-y-auto minimal-scrollbar pr-2 gap-[9px] '>
          {offersData?.data
            ?.filter(
              (item) => activeGameCategory2?.value && item.categoryUid === activeGameCategory2.value
            )
            .map((offer) => (
              <Link
                key={v4()}
                to={
                  offer.offerType === OFFER_TYPE.REGULAR
                    ? ROUTER_PATH.OFFERS_SINGLE.replace(ROUTE_PARAM.UID, offer.gameUid).replace(
                        ROUTE_PARAM.UID,
                        offer.uid
                      )
                    : ROUTER_PATH.CURRENCIES_SINGLE.replace(ROUTE_PARAM.UID, offer.uid)
                }
                onClick={onCloseModal}
                data-details-ref={offer._id}
                className='text-start flex gap-2 justify-between items-center border border-transparent hover:text-brand-primary-color-1 rounded-lg py-[15px] pl-3 pr-[9px] transition-colors text-brand-black-30'
              >
                {offer.name}
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};
