/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from 'moment';
import { useEffect, useMemo, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { BoxedArrowTopRight } from '../../../../../components/icons/icons';
import { LoadingCircle } from '../../../../../components/LoadingCircle';
import { GradientBordered } from '../../../../../components/ui/GradientBordered';
import { SelectDropdown } from '../../../../../components/ui/SelectDropdown';
import { ROLE, Role } from '../../../../../enums/role';
import { useGetGamesQuery } from '../../../../../redux/features/game/gameApi';
import { GradientBorderedInput } from '../../../../Profile/components/GradientBorderedInput';
import { BecomeBoosterDataDb } from '../../components/WorkWithUsSummaryItem';

type UserManagerFormInputs = {
  currentRole: Role;
  dateJoined: string;
  partnerCategory: string;
  ordersCompleted: number;
  ordersClaimedRightNow: number;
  partnerLevel: number;
  isOnline: boolean;
  averageCompletionTime: number;
  contactInfo: string;
  activeTimeToday: string;
};
export const PartnerManagerForm = ({ partner }: { partner: BecomeBoosterDataDb }) => {
  console.log(partner);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<UserManagerFormInputs>();

  const roleOptions = useMemo(() => {
    return Object.values(ROLE)
      .filter((userRole) => userRole !== ROLE.VISITOR)
      .map((value) => ({
        value,
        label: value,
      }));
  }, []);

  const partnerCategoryOptions = [
    {
      value: 'Boosters Chat support',
      label: 'Boosters Chat support',
    },
    {
      value: 'Created AI',
      label: 'Created AI',
    },
    {
      value: 'Price',
      label: 'Price',
    },
    {
      value: 'Duration',
      label: 'Duration',
    },
  ];

  const onSubmit: SubmitHandler<UserManagerFormInputs> = (data) => {
    console.log(data);
  };
  const { data: gamesData, isLoading } = useGetGamesQuery('', {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  const [games, setGames] = useState<{ label: string; value: string }[]>([]);

  useEffect(() => {
    if (gamesData?.data) {
      gamesData.data.forEach((item) => {
        // Check if the game with the same value already exists in the state
        if (!games.find((game) => game.value === item.name)) {
          setGames((prev) => [...prev, { label: item.title, value: item.name }]);
        }
      });
    }
  }, [gamesData, games]);

  if (isLoading) {
    return <LoadingCircle />;
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='relative isolate z-10 grid items-start md:grid-cols-2 gap-x-4 md:gap-x-5 gap-y-5 md:gap-y-9 font-oxanium'
    >
      <Controller
        name='currentRole'
        control={control}
        defaultValue={ROLE.SUPPORT}
        // rules={{
        //   required: 'Please select a role',
        // }}
        render={({ field: { onChange, value, name } }) => (
          <SelectDropdown
            label='Current Role'
            onChange={onChange}
            options={roleOptions}
            displayPropName='label'
            valuePropName='value'
            selectedDefaultValue={value}
            errors={errors}
            name={name}
          />
        )}
      />

      <Controller
        name='partnerCategory'
        control={control}
        defaultValue={partnerCategoryOptions?.length ? partnerCategoryOptions[0].value : ''}
        // rules={{
        //   required: 'Please select a role',
        // }}
        render={({ field: { onChange, name } }) => (
          <SelectDropdown
            label='Selected Games'
            onChange={onChange}
            options={games}
            displayPropName='label'
            valuePropName='value'
            selectedDefaultValue={games[0]?.value}
            errors={errors}
            name={name}
          />
        )}
      />

      <GradientBorderedInput
        label='Amount of orders completed'
        placeholder='0'
        value={30000}
        type='number'
        errors={errors}
        readOnly
        register={register('ordersCompleted', {
          valueAsNumber: true,
        })}
      />
      <GradientBorderedInput
        label='Created'
        placeholder='24 Jun, 18:47 (GMT+4)'
        value={moment(partner.createdAt).format('DD MMM YYYY')}
        errors={errors}
        readOnly
        register={register('dateJoined', {})}
      />
      <GradientBorderedInput
        label='Partner Online'
        placeholder='Yes'
        value={partner.user.online ? 'Yes' : 'No'}
        errors={errors}
        readOnly
        register={register('isOnline', {
          setValueAs: (val: string) => val.toLowerCase() === 'Yes'.toLowerCase(),
        })}
      />
      <GradientBorderedInput
        label='Avg. Completion Time'
        placeholder='1 hr'
        value={partner.hoursCommitment}
        errors={errors}
        readOnly
        register={register('averageCompletionTime', {})}
      />

      <GradientBorderedInput
        label='Orders Claimed right now'
        placeholder='0'
        value={3}
        type='number'
        errors={errors}
        readOnly
        register={register('ordersClaimedRightNow', {
          valueAsNumber: true,
        })}
      />
      <GradientBorderedInput
        label='Partner level'
        placeholder='0'
        value={4165}
        type='number'
        errors={errors}
        readOnly
        register={register('partnerLevel', {
          valueAsNumber: true,
        })}
      />

      <div className='flex flex-col gap-2 xl:gap-4 relative overflow-clip'>
        <label
          htmlFor='contactInfo'
          className='text-brand-black-10 text-sm xl:text-lg leading-none font-normal flex justify-start gap-1'
        >
          <span className='first-letter:uppercase'>Contact info</span>
        </label>
        <GradientBordered className='px-4 py-3 rounded-[.625rem] before:rounded-[.625rem] before:bg-gradient-bordered-deep'>
          <textarea
            className='flex min-h-[7rem] max-h-52 w-full h-full bg-transparent outline-none text-brand-black-5'
            placeholder='Type here'
            readOnly
            value={`Discord - ${partner.discordTag}
Email - ${partner.email}
Phone - ${partner.phone ? partner.phone : 'N/A'}`}
            // cols={30}
            rows={3}
            id='contactInfo'
            {...register('contactInfo', {})}
          />
        </GradientBordered>
      </div>

      <div className='flex flex-col justify-between h-full gap-8'>
        <GradientBorderedInput
          label='Active time today'
          placeholder='1 hr'
          value='15 mins'
          errors={errors}
          readOnly
          register={register('activeTimeToday', {})}
        />
        <button
          type='submit'
          disabled={isSubmitting}
          className='inline-flex items-center self-center justify-self-center md:self-end md:justify-self-end gap-1 font-tti-medium font-medium text-base leading-none text-white bg-brand-primary-color-1 hover:bg-brand-primary-color-light hover:text-brand-primary-color-1 transition-colors rounded-[.25rem] px-4 xl:px-6 py-1.5 xl:py-2.5'
        >
          <span className=''>Apply Changes</span>
          <BoxedArrowTopRight />
        </button>
      </div>
    </form>
  );
};
