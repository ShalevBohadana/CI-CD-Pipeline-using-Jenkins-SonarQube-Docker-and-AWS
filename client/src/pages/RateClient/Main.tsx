import { Rating } from 'primereact/rating';
import { useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';

import { RatingStarOffIcon, RatingStarOnIcon } from '../../components/icons/icons';
import { LoadingCircle } from '../../components/LoadingCircle';
import { GradientBordered } from '../../components/ui/GradientBordered';
import { ORDER_STATUS, SITE_INFO } from '../../enums';
import { ResError } from '../../redux/api/apiSlice';
import { useGetOrderQuery } from '../../redux/features/order/orderApi';
import { useAddSellerReviewMutation } from '../../redux/features/sellerReview.ts/sellerReviewApi';
import { useCurrentUserQuery } from '../../redux/features/user/userApi';
import { CommonParams, NormalizedDbData, Pretty } from '../../types/globalTypes';
import { OFFER_TYPE } from '../CreateOffer/Main';
import { UserDataDb } from '../Profile/components/AccountInfo';

const createOrderReviewSchema = z.object({
  order: z.string(), // fk
  reviewer: z.string(), // fk
  offerRegular: z.string().optional(), // fk
  offerCurrency: z.string().optional(), // fk
  itemType: z.nativeEnum(OFFER_TYPE),
  review: z.coerce.string().optional().or(z.literal('')).default(''),
  rating: z.number().min(1).max(5),
});
export type RateOrderFormInputs = z.infer<typeof createOrderReviewSchema>;
export type OrderReviewDataDb = Pretty<
  RateOrderFormInputs &
    NormalizedDbData & {
      reviewer: UserDataDb;
    }
>;
// Custom validation rule to check for special characters
export const validateNoSpecialChars = (value: string) => {
  // Regular expression to match special characters
  const specialCharsRegex = /[#$%^&*()+=[\]{}\\|<>/]+/;
  if (specialCharsRegex.test(value.trim())) {
    return 'No special characters are allowed'; // Validation fails
  }
  return true; // Validation passes
};

export const Main = () => {
  // const {
  //   order: { ordererName, id, status, date },
  // } = useRateOrderContext();
  const { uid } = useParams<CommonParams>();
  const { data: currentOrderRes, isLoading } = useGetOrderQuery(uid || '', {
    skip: !uid,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
  const orderData = useMemo(() => currentOrderRes?.data, [currentOrderRes?.data]);
  const [addOrderReview, { isLoading: addReviewLoading }] = useAddSellerReviewMutation();
  const [userRating, setUserRating] = useState(4);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<RateOrderFormInputs>({
    resolver: zodResolver(createOrderReviewSchema),
    defaultValues: {
      rating: userRating,
      review: '',
    },
  });
  const { data: currentUser } = useCurrentUserQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
  if (!orderData) {
    return <p className='text-red-500 text-center'>No valid order ID found!</p>;
  }

  // const { createdAt } = orderData;
  const status = ORDER_STATUS.COMPLETED;

  const onSubmit: SubmitHandler<RateOrderFormInputs> = async (data) => {
    data.review = data.review.trim();
    try {
      const { message } = await addOrderReview(data).unwrap();
      reset({
        rating: userRating,
      });
      toast.success(message);
    } catch (error) {
      const { message } = (error as ResError).data;
      toast.error(message || 'Something went wrong');
    }
  };

  if (status !== ORDER_STATUS.COMPLETED) {
    return <p className='text-red-500 text-center'>Not eligible for rating yet.</p>;
  }
  if (isLoading || addReviewLoading) {
    return <LoadingCircle />;
  }
  return (
    <main className='relative isolate z-0 py-4 xl:py-4'>
      <div className='fb-container'>
        <div className='grid gap-8 pb-8'>
          <GradientBordered className='rounded-[.625rem] before:rounded-[.625rem] before:bg-gradient-bordered-light bg-brand-primary-color-1/[.03] py-8'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input type='hidden' defaultValue={uid} {...register('order')} readOnly />
              <input
                type='hidden'
                defaultValue={currentUser?.data?._id as unknown as string}
                {...register('reviewer')}
                readOnly
              />
              <input
                type='hidden'
                defaultValue={orderData.item.itemType}
                {...register('itemType')}
                readOnly
              />
              {orderData.item.itemType === OFFER_TYPE.REGULAR ? (
                <input
                  type='hidden'
                  defaultValue={orderData.item.offerId}
                  {...register('offerRegular')}
                  readOnly
                />
              ) : (
                <input
                  type='hidden'
                  defaultValue={orderData.item.offerId}
                  {...register('offerCurrency')}
                  readOnly
                />
              )}

              <div className='grid gap-8'>
                {/* rating */}
                <div className='px-5'>
                  <div className='grid gap-8'>
                    <h2 className='text-start font-bold font-tti-bold text-[clamp(1.25rem,4vw,2rem)] leading-tight'>
                      How would you rate you order?
                    </h2>
                    <div className='flex justify-center py-4'>
                      <input
                        type='hidden'
                        readOnly
                        {...register('rating', {
                          valueAsNumber: true,
                        })}
                      />
                      <div className=''>
                        <Rating
                          className='flex justify-center gap-2'
                          value={userRating}
                          stars={5}
                          onChange={(e) => {
                            setUserRating(Number(e.value));
                            setValue('rating', Number(e.value));
                          }}
                          onIcon={<RatingStarOnIcon />}
                          offIcon={<RatingStarOffIcon />}
                          cancel={false}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* review */}
                <div className='px-5'>
                  <div className='font-oxanium text-sm xl:text-base leading-none font-normal'>
                    <div className='flex flex-col gap-4 xl:gap-8 relative'>
                      <label
                        htmlFor='review'
                        className='text-start font-bold font-tti-bold text-[clamp(1.25rem,4vw,2rem)] leading-tight'
                      >
                        Let{' '}
                        <span className='text-brand-primary-color-1'>
                          {SITE_INFO.name.capitalized}
                        </span>{' '}
                        know how your order went:
                      </label>
                      <GradientBordered className='px-4 py-3 rounded-[.625rem] before:rounded-[.625rem] before:bg-gradient-bordered-deep bg-brand-primary-color-1/[.03]'>
                        <textarea
                          id='review'
                          className='flex min-h-[7rem] max-h-52 w-full h-full bg-transparent outline-none text-brand-black-5'
                          placeholder='Type here'
                          // cols={30}
                          rows={10}
                          defaultValue=''
                          {...register('review', {
                            validate: {
                              noSpecialChars: validateNoSpecialChars,
                            },
                          })}
                        />
                      </GradientBordered>
                      {errors?.review ? (
                        <p className='text-red-500'>
                          {errors.review?.message || 'No special characters are allowed!'}
                        </p>
                      ) : (
                        false
                      )}
                      <p className='text-brand-black-20 text-sm xl:text-base leading-none font-normal'>
                        Thank you!
                      </p>
                    </div>
                  </div>
                </div>

                <hr className='border-0 border-t border-brand-primary-color-light/30' />

                <div className='text-center'>
                  <button
                    type='submit'
                    className='inline-flex w-44 justify-center items-center px-3 xl:px-6 py-3 xl:py-4 text-lg xl:text-xl leading-tight rounded-md font-semibold font-oxanium text-white bg-fading-theme-gradient-light-to-deep hover:bg-[linear-gradient(theme("colors.brand.primary.color-1")_100%,theme("colors.brand.primary.color-1")_100%)] transition-all'
                  >
                    Apply
                  </button>
                </div>
              </div>
            </form>
          </GradientBordered>
        </div>
      </div>
    </main>
  );
};
