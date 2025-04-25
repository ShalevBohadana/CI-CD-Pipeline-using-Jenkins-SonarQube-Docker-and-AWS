import { useEffect, useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { BiCheck } from 'react-icons/bi';
import { useParams } from 'react-router-dom';

import { LoadingCircle } from '../../../components/LoadingCircle';
import { GradientBordered } from '../../../components/ui/GradientBordered';
import { ShowInputError } from '../../../components/ui/ShowInputError';
import { ROLE } from '../../../enums/role';
import { useGetAllBoostersQuery } from '../../../redux/features/becomeBooster/becomeBoosterApi';
import { useGetGameQuery } from '../../../redux/features/game/gameApi';
import { useGetOfferByIdQuery } from '../../../redux/features/offer/offerApi';
import { useAssignOrderMutation, useGetOrderQuery } from '../../../redux/features/order/orderApi';
import { useAppSelector } from '../../../redux/hooks';
import { CommonParams } from '../../../types/globalTypes';
import { ORDER_STATUS } from '../../../enums';
import { RootState } from '@/redux/types';

export type AVAILABLE_BOOSTER = {
  name: string;
  id: string;
  rating: number;
  reviews: number;
};

export const AVAILABLE_BOOSTERS: Readonly<AVAILABLE_BOOSTER>[] = [
  {
    name: 'Blake Bush',
    id: '318f329b-b8e2-5e13-b0aa-07cac39c3a4a',
    rating: 4.7,
    reviews: 423,
  },
  {
    name: 'Christina Harris',
    id: '318f329b-b7gd-5e13-b0aa-07cac39c3a4a',
    rating: 4.7,
    reviews: 23,
  },
];
type AvailableBoostersFormInputs = {
  availableBooster: string;
};

export const AssignBoosterCard = () => {
  const auth = useAppSelector((state: RootState) => state.auth);
  const roles = (auth?.user?.roles as unknown as ROLE[]) || [ROLE.VISITOR];  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<AvailableBoostersFormInputs>();
  const { uid } = useParams<CommonParams>();
  const { data: currentOrderRes } = useGetOrderQuery(uid || '', {
    skip: !uid,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
  const orderData = useMemo(() => currentOrderRes?.data, [currentOrderRes?.data]);
  const { data: regularOfferRes } = useGetOfferByIdQuery(orderData?.item?.offerId || '', {
    skip: orderData?.item?.itemType !== 'regular',
    refetchOnFocus: true,
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
  });
  const { data: gameRes } = useGetGameQuery(regularOfferRes?.data.gameUid || '', {
    skip: orderData?.item?.itemType !== 'regular',
    refetchOnFocus: true,
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
  });
  const params = new URLSearchParams({
    limit: '10000',
    status: 'accepted',
    isApproved: 'true',
    selectedGames: gameRes?.data?._id || '',
  });
  const { data: allBoostersRes, refetch } = useGetAllBoostersQuery(params.toString(), {
    skip: !gameRes?.data?._id,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
  const availableBoostersData = useMemo(() => allBoostersRes?.data, [allBoostersRes?.data]);

  const [assignOrder, { isLoading: isAssigning }] = useAssignOrderMutation();
  const { activeUsers } = useAppSelector((state) => state.socket);

  useEffect(() => {
    if (availableBoostersData?.length) {
      refetch();
    }
  }, [activeUsers]);
  const onSubmit: SubmitHandler<AvailableBoostersFormInputs> = async ({ availableBooster }) => {
    const response = await assignOrder({
      _id: orderData?._id,
      partner: availableBooster,
      status: ORDER_STATUS.PROCESSING,
    });
    if (response) {
      toast.success('Order assigned successfully');
    }
  };
  if (isAssigning) {
    return <LoadingCircle />;
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='grid gap-8 text-center'>
      <GradientBordered
        className={`rounded-[1.25rem] before:rounded-[1.25rem] before:bg-gradient-bordered-light p-9 bg-multi-gradient-1 grid gap-8 py-8 px-6 ${
          roles.includes(ROLE.SUPPORT) ? 'text-center' : ''
        }`}
      >
        <div className='grid gap-4'>
          <h2 className='capitalize font-tti-demi-bold font-semibold text-[clamp(1.5rem,4vw,2rem)] leading-none text-white'>
            <span className='text-brand-primary-color-1'>Available</span>{' '}
            <span className=''>Boosters for specific order</span>{' '}
            <BiCheck className='w-5 h-5 text-white bg-brand-primary-color-1 rounded-circle' />
          </h2>
          <div className='bg-brand-black-90 rounded-[1.25rem] py-8 px-6 font-oxanium font-normal text-sm xl:text-base leading-none text-white'>
            <div className='flex flex-col gap-4 items-start max-h-60 h-full overflow-auto minimal-scrollbar'>
              {availableBoostersData?.map((booster) => {
                const avgRating =
                  booster.user.reviews.reduce((acc, review) => acc + review.rating, 0) /
                  booster.user.reviews.length;
                return (
                  <label
                    key={booster._id}
                    className='inline-flex gap-2 items-center flex-wrap cursor-pointer'
                  >
                    <input
                      type='radio'
                      className='sr-only peer'
                      value={booster?._id}
                      {...register('availableBooster', {
                        required: 'Please select an available booster from the list',
                      })}
                    />
                    <BiCheck
                      className={`w-3.5 h-3.5 text-white ${booster.user.online ? 'bg-green-500' : 'bg-yellow-300'} peer-checked:bg-brand-primary-color-1 rounded-circle transition-colors`}
                    />
                    <span className='leading-none'>
                      {booster.user.name
                        ? `${booster.user.name.firstName} ${booster.user.name.lastName}`
                        : booster.user.userName}{' '}
                      {avgRating || 0} ({booster.user.reviews.length})
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
          <ShowInputError errors={errors} name='availableBooster' />
        </div>
      </GradientBordered>
      <div className='self-end'>
        <button
          type='submit'
          className='inline-flex gap-2 items-center justify-center text-center text-sm xl:text-base leading-none font-medium font-tti-medium bg-brand-primary-color-1 hover:bg-brand-primary-color-light hover:text-brand-primary-color-1 transition-colors px-4 xl:px-6 py-2.5 rounded-md'
        >
          <span className='capitalize leading-loose'>Assign</span>
          <BiCheck className='w-5 h-5 text-white bg-brand-primary-color-1 rounded-circle border-black border' />
        </button>
      </div>
    </form>
  );
};
