import React, { useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import moment from 'moment';
import { BoxedArrowTopRight } from '@/components/icons/icons';
import { GradientBordered } from '@/components/ui/GradientBordered';
import { SelectDropdownMultiple } from '@/components/ui/SelectDropdownMultiple';
import { SelectDropdown } from '@/components/ui/SelectDropdown';
import { GradientBorderedInput } from '@/pages/Profile/components/GradientBorderedInput';
import { useDashboardPageStatus } from '@/pages/Dashboard/components/DashboardProvider';
import { useUpdateUserMutation } from '@/redux/features/user/userApi';
import { User } from '@/types/user';
import { ROLE } from '@/enums/role';

type UserManagerFormInputs = {
  currentRole: string;
  dateHired: string;
  employeeCategory: string;
  ticketsCompleted: number;
  isOnline: boolean;
  activeTimeToday: string;
  contactInfo: string;
};

interface UserManagerFormProps {
  user: User;
}

export const UserManagerForm: React.FC<UserManagerFormProps> = ({ user }) => {
  const { setIsModalOpen } = useDashboardPageStatus();
  const [updateUser] = useUpdateUserMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState<string[]>(user?.roles || []);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UserManagerFormInputs>();

  const roleOptions = useMemo(() => {
    return Object.values(ROLE).map((value) => ({
      value,
      label: value,
    }));
  }, []);

  const employeeCategoryOptions = useMemo(
    () => [
      { value: 'Boosters Chat support', label: 'Boosters Chat support' },
      { value: 'Created AI', label: 'Created AI' },
      { value: 'Price', label: 'Price' },
      { value: 'Duration', label: 'Duration' },
    ],
    []
  );

  const onSubmit = async (data: UserManagerFormInputs) => {
    try {
      setIsSubmitting(true);

      if (!user?._id) {
        throw new Error('User ID is required');
      }

      const cleanedUpdateData = {
        roles: selectedRoles.length > 0 ? selectedRoles : undefined,
        ...(data.employeeCategory ? { employeeCategory: data.employeeCategory } : {}),
        history: [
          {
            action: 'user_update',
            details: {
              updatedBy: user._id,
              changes: {
                roles: selectedRoles,
                employeeCategory: data.employeeCategory,
              },
            },
            timestamp: new Date().toISOString(),
          },
        ],
      };

      const finalUpdateData = Object.fromEntries(
        Object.entries(cleanedUpdateData).filter(
          ([_, value]) => value !== undefined && value !== null && value !== ''
        )
      );

      if (Object.keys(finalUpdateData).length === 0) {
        toast.error('No data to update');
        return;
      }

      const result = await updateUser({
        userId: user._id,
        updateData: finalUpdateData,
      }).unwrap();

      if (result.success) {
        toast.success(result.message || 'User updated successfully');
        setIsModalOpen(false);
      }
    } catch (error: any) {
      console.error('Update failed:', error);
      toast.error(error?.data?.message || error?.message || 'Failed to update user');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    setSelectedRoles(user?.roles || []);
  }, [user?.roles]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='relative isolate z-10 grid items-start md:grid-cols-2 gap-x-4 md:gap-x-5 gap-y-5 md:gap-y-9 font-oxanium'
    >
      <Controller
        name='currentRole'
        control={control}
        render={({ field: { name } }) => (
          <SelectDropdownMultiple
            label='Current Role'
            onChange={setSelectedRoles}
            options={roleOptions}
            displayPropName='label'
            valuePropName='value'
            selectedDefaultValue={selectedRoles}
            errors={errors}
            name={name}
          />
        )}
      />

      {user?.roles?.some((role) => [ROLE.ADMIN, ROLE.SUPPORT].includes(role as any)) && (
        <Controller
          name='employeeCategory'
          control={control}
          defaultValue={employeeCategoryOptions[0]?.value}
          render={({ field: { onChange, value, name } }) => (
            <SelectDropdown
              label='Employee Categories'
              onChange={onChange}
              options={employeeCategoryOptions}
              displayPropName='label'
              valuePropName='value'
              selectedDefaultValue={value}
              errors={errors}
              name={name}
            />
          )}
        />
      )}

      <GradientBorderedInput
        label='Tickets completed'
        placeholder='0'
        value={30000}
        type='number'
        errors={errors}
        readOnly
        register={register('ticketsCompleted', {
          valueAsNumber: true,
        })}
      />

      <GradientBorderedInput
        label='Hired on'
        placeholder='24 Jun, 18:47 (GMT+4)'
        value={moment(user?.createdAt).format('DD MMM YYYY')}
        errors={errors}
        readOnly
        register={register('dateHired')}
      />

      <GradientBorderedInput
        label='Employee Online'
        placeholder='Yes'
        value={user?.online ? 'Yes' : 'No'}
        errors={errors}
        readOnly
        register={register('isOnline', {
          setValueAs: (val: string) => val.toLowerCase() === 'yes',
        })}
      />

      <GradientBorderedInput
        label='Active time today'
        placeholder='1 hr'
        value='15 mins'
        errors={errors}
        readOnly
        register={register('activeTimeToday')}
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
            value={`Email - ${user?.email}\nPhone - N/A`}
            rows={3}
            id='contactInfo'
            {...register('contactInfo')}
          />
        </GradientBordered>
      </div>

      <button
        type='submit'
        disabled={isSubmitting}
        className='inline-flex items-center self-center justify-self-center md:self-end md:justify-self-end gap-1 font-tti-medium font-medium text-base leading-none text-white bg-brand-primary-color-1 hover:bg-brand-primary-color-light hover:text-brand-primary-color-1 transition-colors rounded-[.25rem] px-4 xl:px-6 py-1.5 xl:py-2.5'
      >
        <span>{isSubmitting ? 'Updating...' : 'Apply Changes'}</span>
        <BoxedArrowTopRight />
      </button>
    </form>
  );
};
