/* eslint-disable prettier/prettier */
import { MouseEventHandler, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { BsCheck } from 'react-icons/bs';
import { v4 } from 'uuid';

import logoSrc from '../../../assets/images/logo.svg';
import { CurrencySymbol } from '../../../components/ui/CurrencySymbol';
import { GradientBordered } from '../../../components/ui/GradientBordered';
import { Money } from '../../../components/ui/Money';
import { SITE_INFO } from '../../../enums';
import { useAddToCartMutation } from '../../../redux/features/cart/cartApi';
import { CartItem } from '../../../redux/features/cart/cartSlice';
import { useGetGameCurrencyQuery } from '../../../redux/features/gameCurrency/gameCurrencyApi';
import { sanitizeHTML } from '../../../utils/DOMPurifier';
import { OfferGameCurrencyDataDb } from '../../CreateGameCurrencyOffer';
import { OFFER_TYPE } from '../../CreateOffer/Main';
import { GradientBorderedInput } from '../../Profile/components/GradientBorderedInput';

import { ProfileLevelIcon } from './ProfileLevelIcon';
import { ServerReviewItem } from './ServerReviewItem';

import '../../OffersSingle/css/dynamic-markup.css';

type Props = {
  currencyName: string;
  payload: OfferGameCurrencyDataDb;
  closer: () => void;
};
type ServerCartFormInputs = {
  characterName: string;
  amount: number;
};

export const GameCurrencyOfferDetails = ({ currencyName, payload, closer }: Props) => {
  // const { gameCurrency, gameName } = useSingleCurrencyContext();
  const [longDescription, setLongDescription] = useState(false);
  const [reviewsStep, setReviewsCount] = useState(3);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ServerCartFormInputs>();
  const {
    inStock,
    uid,

    description,
    price,
    tags,
    minPurchase,
    dynamicItems,
    // rating = 5,
    currencyUid,
    // name = 'name',
    // reviewCount = 50,
    reviews,
    quantity,
  } = payload;
  console.log(reviews);
  const [, setDynamicDescription] = useState<string>();
  const [addToCartMutation] = useAddToCartMutation();
  const image = useGetGameCurrencyQuery(currencyUid).data?.data.image;
  const setDescription = (desc: string) => {
    if (desc.length >= 120) {
      setDynamicDescription(`${desc.slice(0, 120)}...`);
    } else {
      setDynamicDescription(desc);
    }
  };

  useEffect(() => {
    if (description) {
      setDescription(description);
    }
  }, [description]);

  const toggleDescription: MouseEventHandler<HTMLButtonElement> = () => {
    setLongDescription(!longDescription);
    setDescription(description);
  };

  const handleLoadMoreReviews: MouseEventHandler<HTMLButtonElement> = () => {
    console.log(reviewsStep);
    setReviewsCount((prev) => prev + 3);
  };
  // const tags = [
  //   gameName,
  //   isCurrencyServerGold(server) && server?.faction,
  //   isCurrencyServerGold(server) && server?.details?.minPurchase,
  // ].filter((value) => !!value);

  const getPrice = (inp: number) => Number(((inp / quantity) * price).toFixed(3));

  const onSubmit: SubmitHandler<ServerCartFormInputs> = async (data) => {
    const { amount } = data;
    const finalPrice = getPrice(amount);
    const itemData: CartItem = {
      itemType: OFFER_TYPE.CURRENCY,
      itemId: Date.now(),
      offerId: payload._id,
      seller: payload.sellerId._id,
      offerImage: image!,
      offerName: payload.uid,
      selected: {
        ...data,
        price: finalPrice,
        region: payload.serverUid.split('-')[1],
      },
    };
    await addToCartMutation(itemData);
    closer();
    toast.success('Added to cart');
  };

  return (
    <div className='grid xl:grid-cols-[1fr,min(100%,19rem)] gap-5'>
      <div className='grid items-start gap-5 p-3'>
        <h2 className='text-start font-bold font-tti-bold text-[clamp(1.15rem,3vw,2rem)] leading-tight capitalize text-brand-primary-color-1/30 bg-clip-text bg-[linear-gradient(293deg,var(--tw-gradient-stops))]  from-brand-primary-color-1 to-brand-primary-color-light animate-text-gradient'>
          {uid}
        </h2>
        {/* tags */}
        <div className='flex flex-wrap gap-4'>
          {tags?.map((tag) => (
            <span
              key={String(tag.value)}
              className='capitalize inline-flex justify-center items-center bg-brand-primary-color-1/10 border border-brand-primary-color-1/50 text-brand-black-5 font-tti-medium font-medium text-[clamp(.75rem,3vw,.9375rem)] leading-none rounded-md py-4 px-6 transition-colors'
            >
              {tag.label}
            </span>
          ))}
          {/* <span className="capitalize inline-flex justify-center items-center bg-brand-primary-color-1/10 border border-brand-primary-color-1/50 text-brand-black-5 font-tti-medium font-medium text-[clamp(.75rem,3vw,.9375rem)] leading-none rounded-md py-4 px-6 transition-colors cursor-default">
            gameName
          </span> */}
          {dynamicItems?.map((item) => (
            <span
              key={String(item.value)}
              className='capitalize inline-flex justify-center items-center bg-brand-primary-color-1/10 border border-brand-primary-color-1/50 text-brand-black-5 font-tti-medium font-medium text-[clamp(.75rem,3vw,.9375rem)] leading-none rounded-md py-4 px-6 transition-colors cursor-default'
            >
              {item.label}
            </span>
          ))}

          <span className='capitalize inline-flex justify-center items-center bg-brand-primary-color-1/10 border border-brand-primary-color-1/50 text-brand-black-5 font-tti-medium font-medium text-[clamp(.75rem,3vw,.9375rem)] leading-none rounded-md py-4 px-6 transition-colors cursor-default'>
            {minPurchase} Minimum purchase
          </span>
        </div>
        <div className='grid gap-5'>
          {/* reviews with logo and level  */}
          <div className='grid gap-2'>
            <figure className=''>
              <picture className='inline-flex justify-center items-center'>
                <source media='(min-width: 350px)' srcSet={`${logoSrc} 176w`} />
                <img
                  src={logoSrc}
                  alt={`${SITE_INFO.name.capitalized} full logo`}
                  className='inline-flex object-contain xl:w-44 xl:h-9'
                  loading='lazy'
                  width='176'
                  height='36'
                  decoding='async'
                  // fetchPriority="low"
                />
              </picture>
            </figure>
            <div className='flex flex-wrap items-center gap-4 font-oxanium leading-none font-normal'>
              {/* <p className="flex gap-2 flex-wrap items-baseline">
                <span className="first-letter:uppercase text-sm text-brand-black-40">
                  review
                </span>
                <span className="text-base text-white">reviewCount</span>
              </p> */}
              <ProfileLevelIcon level={1} />
            </div>
          </div>
          <hr className='border-none h-0.5 w-full bg-brand-black-90' />

          {description.length < 120 ? (
            <div
              data-dynamic-markup='offer-details'
              className='grid gap-0.5 font-tti-regular text-base xl:text-lg leading-none text-brand-black-20 font-normal'
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: sanitizeHTML(description),
              }}
            />
          ) : null}

          {description.length > 120 ? (
            <>
              <div
                data-dynamic-markup='offer-details'
                className='grid gap-0.5 font-tti-regular text-base xl:text-lg leading-none text-brand-black-20 font-normal'
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  __html: sanitizeHTML(
                    !longDescription ? description.slice(0, 120).concat('...') : description
                  ),
                }}
              />
              <div className='grid gap-6 xl:gap-4'>
                <GradientBordered className='rounded-xl before:rounded-xl p-px before:bg-gradient-bordered-deep max-w-md mx-auto'>
                  <button
                    type='button'
                    onClick={toggleDescription}
                    className='flex justify-center items-center text-center w-full h-full bg-brand-primary-color-1/[.03] uppercase font-tti-bold font-bold text-lg xl:text-2xl leading-none text-white py-3 px-4 hover:text-brand-primary-color-1 transition-colors disabled:opacity-60 disabled:hover:text-white disabled:cursor-not-allowed'
                  >
                    {longDescription ? 'hide' : 'show'} full description
                  </button>
                </GradientBordered>
              </div>
            </>
          ) : null}

          {reviews?.length ? (
            <>
              <hr className='border-none h-0.5 w-full bg-brand-black-90' />
              {/* reviews  */}
              <div className='grid gap-6'>
                <h2 className=''>
                  <span className='font-tti-bold font-bold text-lg xl:text-2xl leading-none text-white capitalize'>
                    Latest reviews
                  </span>{' '}
                  <span className='text-brand-black-30 font-tti-medium font-medium text-sm leading-none'>
                    ({reviews?.length} review{reviews?.length >= 2 ? 's' : ''})
                  </span>
                </h2>
                <div className='grid gap-2 font-oxanium text-sm xl:text-base font-normal leading-none text-brand-black-10'>
                  {payload.reviews.slice(0, reviewsStep).map((rev) => (
                    <ServerReviewItem key={v4()} review={rev} />
                  ))}
                </div>
                {reviewsStep <= reviews?.length ? (
                  <GradientBordered className='rounded-xl before:rounded-xl p-px before:bg-gradient-bordered-deep max-w-md mx-auto'>
                    <button
                      type='button'
                      disabled={reviewsStep >= reviews?.length}
                      onClick={handleLoadMoreReviews}
                      className='flex justify-center items-center text-center w-full h-full bg-brand-primary-color-1/[.03] uppercase font-tti-bold font-bold text-lg xl:text-2xl leading-none text-white py-3 px-4 hover:text-brand-primary-color-1 transition-colors disabled:opacity-60 disabled:hover:text-white disabled:cursor-not-allowed'
                    >
                      show more
                    </button>
                  </GradientBordered>
                ) : null}
              </div>
            </>
          ) : null}
        </div>
      </div>
      <GradientBordered className='rounded-[1.25rem] before:rounded-[1.25rem] p-px before:bg-gradient-bordered-light'>
        <aside className='bg-black/50 px-3 py-6 h-full rounded-[1.25rem] flex flex-col gap-7'>
          <h2 className='font-tti-demi-bold font-semibold text-lg xl:text-xl leading-none text-white'>
            {inStock}{' '}
            <span className='uppercase'>
              {currencyName}
              {inStock >= 2 ? 's' : ''}
            </span>{' '}
            in stock
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className='grid gap-6'>
            <GradientBorderedInput
              className='bg-brand-primary-color-1/[.03]'
              label='Amount'
              errors={errors}
              type='number'
              placeholder='0'
              step={quantity}
              register={register('amount', {
                required: 'Please specify an amount to buy',
                min: {
                  value: minPurchase,
                  message: `Please specify an amount larger or equivalent to ${minPurchase}`,
                },
                max: {
                  value: inStock,
                  message: `Please specify an amount smaller than ${inStock}`,
                },
                valueAsNumber: true,
              })}
            />
            <GradientBorderedInput
              className='bg-brand-primary-color-1/[.03]'
              label='Character name'
              errors={errors}
              placeholder='Dragon Master'
              register={register('characterName', {
                required: 'Please enter your character name',
                minLength: {
                  value: 2,
                  message: 'Character name must be at least 2 characters',
                },
                maxLength: {
                  value: 30,
                  message: 'Character name must be at most 30 characters',
                },
              })}
            />
            <hr className='border-none h-0.5 w-full bg-brand-black-90' />
            <div className='grid gap-2'>
              <p className='text-start font-bold font-tti-bold text-[clamp(1.5rem,4vw,2.25rem)] leading-tight text-white'>
                <CurrencySymbol className='inline-flex justify-center w-3' />{' '}
                <Money value={watch('amount') ? getPrice(watch('amount')) : price} />
              </p>
              <p className='flex flex-nowrap justify-start items-center gap-1'>
                <span className='shrink-0 inline-flex justify-center items-center w-4 aspect-square bg-green-400 text-white rounded-circle overflow-clip'>
                  <BsCheck />
                </span>
                <span className='text-brand-black-10 text-xs leading-none font-oxanium font-normal'>
                  Hope you enjoy your shopping with {SITE_INFO.name.capitalized}
                </span>
              </p>
            </div>

            <div className='grid gap-5'>
              <button
                type='submit'
                className='inline-flex gap-2 items-center justify-center text-center text-sm xl:text-base leading-none font-medium font-tti-medium bg-brand-primary-color-1 hover:bg-brand-primary-color-light hover:text-brand-primary-color-1 transition-colors px-4 xl:px-6 py-2.5 rounded-md uppercase'
              >
                add to cart
              </button>
              <button
                type='button'
                className='inline-flex gap-2 items-center justify-center text-center text-sm xl:text-base leading-none font-medium font-tti-medium bg-brand-primary-color-1 hover:bg-brand-primary-color-light hover:text-brand-primary-color-1 transition-colors px-4 xl:px-6 py-2.5 rounded-md uppercase'
              >
                contact seller
              </button>
            </div>
          </form>
        </aside>
      </GradientBordered>
    </div>
  );
};
