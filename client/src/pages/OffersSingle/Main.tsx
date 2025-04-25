import { useMemo, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TbClockHour4 } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import { v4 } from 'uuid';

import { CartIcon, DottedChatIcon } from '../../components/icons/icons';
import { CurrencySymbol } from '../../components/ui/CurrencySymbol';
import { Money } from '../../components/ui/Money';
import { OfferLabel } from '../../components/ui/OfferLabel';
import { ROUTE_PARAM, ROUTER_PATH } from '../../enums/router-path';
import { useAddToCartMutation } from '../../redux/features/cart/cartApi';
import { CartItem } from '../../redux/features/cart/cartSlice';
import { openChatModal } from '../../redux/features/chat/chatSlice';
import {
  selectCurrentOfferState,
  selectDynamicFilters,
  selectRegionFilter,
  selectSelectedOfferPrice,
} from '../../redux/features/currentOffer/currentOfferSlice';
import { useGetGameQuery } from '../../redux/features/game/gameApi';
import { useGetGameCurrenciesQuery } from '../../redux/features/gameCurrency/gameCurrencyApi';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  CreateOfferCommonSchema,
  DynamicFilterInputs,
  OFFER_DISCOUNT_TYPE,
  OFFER_TYPE,
  OfferDiscount,
} from '../CreateOffer/Main';

import { DynamicFilterBox } from './components/DynamicFilterBox';
import { DynamicRegionFilterBox } from './components/DynamicRegionFilterBox';
import { OfferDetails } from './components/OfferDetails';
import {
  SHOW_OFFERS_CATEGORY_TYPE,
  ShowGameOffersCategories,
  ShowOffersCategoryType,
} from './components/ShowGameOffersCategories';

export const getComputedPrice = (amount: number, discount?: OfferDiscount) => {
  if (discount) {
    const discountedPrice =
      discount.type === OFFER_DISCOUNT_TYPE.PERCENT
        ? amount - amount * (discount.amount / 100)
        : amount - discount.amount;
    return discountedPrice;
  }
  return amount;

  // return discountedPrice || amount;
};

export const Main = () => {
  const offerFilterFormRef = useRef<HTMLFormElement>();

  const currentRegionFilter = useAppSelector(selectRegionFilter);
  const currentDynamicFilters = useAppSelector(selectDynamicFilters);
  const currentOfferPrice = useAppSelector(selectSelectedOfferPrice);
  const getCurrentOfferState = useAppSelector(selectCurrentOfferState);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [addToCartMutation] = useAddToCartMutation();

  //

  const { data: currentGameRes } = useGetGameQuery(getCurrentOfferState.offer?.gameUid || '', {
    skip: !getCurrentOfferState.offer?.gameUid,
    refetchOnFocus: true,
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
  });
  const currentGame = currentGameRes?.data;

  const categoryUid = String(
    getCurrentOfferState.offer?.categoryUid || currentGame?.categories?.[0].value
  );
  const [selectedCategory, setSelectedCategory] = useState(categoryUid);
  // const [categorizedOffers, setCategorizedOffers] = useState<
  //   CreateOfferCommonSchema[]
  // >([]);

  // const offersParam = new URLSearchParams({
  //   search: currentGame?.uid || '',
  //   limit: '100',
  // });
  // const { data: currentOffersRes } = useGetOffersQuery(offersParam.toString(), {
  //   skip: !uid,
  //   refetchOnFocus: true,
  //   refetchOnReconnect: true,
  //   refetchOnMountOrArgChange: true,
  // });

  // const currentOffers = useMemo(
  //   () => currentOffersRes?.data || [],
  //   [currentOffersRes?.data]
  // );
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

  // useEffect(() => {
  //   const eligibleOffers = currentOffers?.filter(
  //     (offer) => offer.categoryUid === categoryUid
  //   );
  //   setCategorizedOffers(eligibleOffers);
  // }, [categoryUid, currentOffers]);

  const handleCategoryChange = async (category: string, type: ShowOffersCategoryType) => {
    if (selectedCategory === category) {
      return; // Do nothing if the category is the same
    }
    setSelectedCategory(category);
    // console.log(type, category);
    if (type === SHOW_OFFERS_CATEGORY_TYPE.OFFER && currentGame?.uid) {
      navigate(ROUTER_PATH.GAMES_SINGLE.replace(ROUTE_PARAM.UID, currentGame.uid), {
        state: {
          categoryUid: category,
        },
      });
    }
  };
  //

  const chatModalOpener = () => {
    dispatch(openChatModal());
  };
  const {
    handleSubmit,

    formState: {},
  } = useForm<DynamicFilterInputs>();

  const onSubmit: SubmitHandler<DynamicFilterInputs> = (data) => {
    console.log(data);
  };

  if (!getCurrentOfferState?.offer) return undefined;

  const {
    offerPromo,
    image,

    // categoryUid,

    basePrice,
    approximateOrderCompletionInMinutes,
    discount,
  } = getCurrentOfferState.offer;

  const handleAddToCart = async () => {
    const cartPayload: CartItem = {
      itemType: OFFER_TYPE.REGULAR,
      itemId: Date.now(),
      seller: getCurrentOfferState.offer!.sellerId,
      offerId: getCurrentOfferState.offer!._id,
      offerName: getCurrentOfferState.offer!.name,
      offerImage: getCurrentOfferState.offer!.image,
      selected: getCurrentOfferState.selected,
    };
    // console.log(cartPayload);
    // dispatch(addToCart(cartPayload));
    await addToCartMutation(cartPayload);
  };
  return (
    <main className='relative isolate z-0 py-4 xl:py-4 grid gap-4 xl:grid-cols-[min(17rem,100%),1fr] items-start'>
      {currentGame && categoryUid ? (
        <div className='fb-container xl:m-0 xl:row-span-full xl:col-span-full w-full xl:max-w-[17rem] xl:flex-shrink-0 xl:sticky xl:top-[97px] z-10 2xl:px-4'>
          <ShowGameOffersCategories
            payload={{
              type: 'offer',
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

      <div className='fb-container xl:row-span-full xl:col-span-full'>
        <div className='pb-20 xl:ml-auto xl:max-w-[calc(100%-17rem)] 2xl:max-w-[calc(100%-10rem)] 3xl:max-w-none'>
          <div className='grid md:grid-cols-[min(24rem,100%),1fr] gap-8 xl:gap-12'>
            <form
              onSubmit={handleSubmit(onSubmit)}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              ref={offerFilterFormRef}
            >
              {/* search filters */}
              <div className='max-w-sm mx-auto xl:mx-0 w-full grid gap-3 rounded-md py-4 xl:py-8 px-3 xl:px-6 border border-brand-primary-color-1/20 bg-brand-primary-color-1/[0.03]'>
                {/* offer image  */}
                <figure className='grid relative isolate z-0 overflow-clip rounded-[.25rem] after:absolute after:inset-0 after:z-10 after:bg-[linear-gradient(0deg,theme(colors.black/.95)_10%,theme(colors.brand.black.120/.5)_60%)] after:pointer-events-none'>
                  <picture className='row-span-full col-span-full z-0'>
                    <source media='(min-width: 350px)' srcSet={image} />
                    <img
                      src={image}
                      alt='description'
                      className='w-full h-[18.75rem] object-cover object-center'
                      loading='lazy'
                      width='342'
                      height='300'
                      decoding='async'
                      // fetchPriority="low"
                    />
                  </picture>
                  <OfferLabel className='row-span-full col-span-full justify-self-start mt-4 ml-4 z-30'>
                    {offerPromo}
                  </OfferLabel>
                </figure>
                {/* filter boxes - region */}

                <div className='flex flex-col gap-4 rounded'>
                  {currentRegionFilter ? (
                    <DynamicRegionFilterBox payload={currentRegionFilter} />
                  ) : null}
                  {currentDynamicFilters?.map((filter) => (
                    <DynamicFilterBox key={v4()} payload={filter} />
                  ))}
                </div>

                {/* filter boxes - actions */}
                <div className='flex flex-col gap-4 p-4 bg-brand-primary-color-1/[.04] rounded-[.25rem]'>
                  <div className='flex flex-col py-1 gap-6'>
                    <div className='flex flex-col gap-2'>
                      <span className='text-lg xl:text-2xl leading-none font-medium text-white font-oxanium'>
                        <CurrencySymbol />
                        <Money value={currentOfferPrice} />{' '}
                        {discount ? (
                          <span className='line-through font-oxanium text-xs leading-none font-semibold text-brand-primary-color-light'>
                            <CurrencySymbol />
                            <Money value={basePrice} />

                            {/* {discount.type === OFFER_DISCOUNT_TYPE.PERCENT
                              ? `%`
                              : null} */}
                          </span>
                        ) : null}
                      </span>
                      <p className='flex items-end flex-wrap gap-2 text-sm leading-none font-normal text-brand-black-20 font-oxanium'>
                        <TbClockHour4 className='w-4 h-4' />
                        <span className=''>
                          {approximateOrderCompletionInMinutes} minutes order completion
                        </span>
                      </p>
                    </div>
                    <div className='flex flex-col sm:flex-row flex-wrap gap-2'>
                      <button type='button' className='flex grow' onClick={handleAddToCart}>
                        <div className='w-full flex justify-center items-center gap-2 capitalize text-sm leading-none font-medium text-white font-oxanium group bg-brand-primary-color-1 hover:bg-brand-primary-color-light transition-colors px-4 xl:px-8 py-1 xl:py-2.5 rounded-[.25rem]'>
                          <CartIcon className='group-hover:text-brand-primary-color-1 transition-colors' />
                          <span className='group-hover:text-brand-primary-color-1 transition-colors'>
                            add to cart
                          </span>
                        </div>
                      </button>

                      <button
                        type='button'
                        className='flex grow justify-center items-center gap-2 group px-4 xl:px-8 py-1 xl:py-2.5 rounded-[.25rem] border border-brand-primary-color-1/50 hover:border-brand-primary-color-1 transition-colors'
                        onClick={chatModalOpener}
                      >
                        <DottedChatIcon className='group-hover:text-brand-primary-color-1 w-5 h-5' />
                        <span className='capitalize text-sm leading-none font-medium text-white font-oxanium  transition-colors group-hover:text-brand-primary-color-1'>
                          chat
                        </span>
                      </button>

                      {/* <ChatButton>
                        <div className="w-full flex justify-center items-center gap-2 group px-4 xl:px-8 py-1 xl:py-2.5 rounded-[.25rem] border border-brand-primary-color-1/50 hover:border-brand-primary-color-1 transition-colors">
                          <MessageIcon className="group-hover:text-brand-primary-color-1 w-5 h-5" />
                          <span className="capitalize text-sm leading-none font-medium text-white font-oxanium  transition-colors group-hover:text-brand-primary-color-1">
                            chat
                          </span>
                        </div>
                      </ChatButton> */}
                    </div>
                  </div>
                </div>
              </div>
            </form>
            {/* offer details */}
            <div className='grow'>
              <OfferDetails />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
