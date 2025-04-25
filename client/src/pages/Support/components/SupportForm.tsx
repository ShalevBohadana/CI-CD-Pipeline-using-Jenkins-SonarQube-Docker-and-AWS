import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';

import { GradientBordered } from '../../../components/ui/GradientBordered';
import { SelectDropdown } from '../../../components/ui/SelectDropdown';
import { ShowInputError } from '../../../components/ui/ShowInputError';
import { SITE_INFO } from '../../../enums';
import { useGetGamesQuery } from '../../../redux/features/game/gameApi';
import { useCreateTicketMutation } from '../../../redux/features/ticket/ticketApi';
import { validateNoSpecialChars } from '../../RateOrder/Main';

const SupportTicketFormSchema = z.object({
  category: z.string().min(1, 'Please select a category'),
  game: z.string().min(1, 'Please select a game'),
  issue: z.string().min(1, 'Please describe your issue'),
});
export type SupportTicketFormInputs = z.infer<typeof SupportTicketFormSchema>;

export const SupportTicketForm = () => {
  const {
    register,
    handleSubmit,
    reset,

    clearErrors,
    control,
    formState: { errors },
  } = useForm<SupportTicketFormInputs>({
    resolver: zodResolver(SupportTicketFormSchema),
  });
  const [category] = useState<string>();
  const [game] = useState<string>();
  const [createTicket] = useCreateTicketMutation();
  const { data: gamesData } = useGetGamesQuery('', {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
  const gameNameOptions = gamesData?.data?.map((gameData) => ({
    _id: gameData._id,
    name: gameData.name,
  }));
  const categoryOptions = [
    { value: 'chief-data-manager', label: 'Chief Data Manager' },
    {
      value: 'legacy-configuration-planner',
      label: 'Legacy Configuration Planner',
    },
    { value: 'product-group-consultant', label: 'Product Group Consultant' },
    {
      value: 'direct-integration-architect',
      label: 'Direct Integration Architect',
    },
    { value: 'lead-quality-technician', label: 'Lead Quality Technician' },
    { value: 'customer-accounts-officer', label: 'Customer Accounts Officer' },
    {
      value: 'direct-accountability-agent',
      label: 'Direct Accountability Agent',
    },
    { value: 'dynamic-web-administrator', label: 'Dynamic Web Administrator' },
  ];

  useEffect(() => {
    if (category) {
      clearErrors('category');
    }
    if (game) {
      clearErrors('game');
    }
  }, [category, game, clearErrors]);

  const onSubmit: SubmitHandler<SupportTicketFormInputs> = async (data) => {
    data.issue = data.issue.trim();
    await createTicket(data);
    toast.success('Ticket created successfully');
    reset();
  };

  return (
    <GradientBordered className='rounded-[.625rem] before:rounded-[.625rem] before:bg-gradient-bordered-light bg-brand-primary-color-1/[.03] py-8'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='grid gap-8'>
          <div className='flex flex-wrap items-start justify-center gap-5 xl:gap-10'>
            {/* category dropdown  */}
            {/* <div className="w-56 max-w-full">
              <Dropdown
                heightClassName="h-50"
                leftIcon={<IoIosSearch className="w-5 h-5 shrink-0" />}
                defaultLabel="category"
                selectHandler={(val) => {
                  setValue('category', val);
                  setCategory(val);
                }}
                options={categoryOptions}
              />
              <input
                type="hidden"
                {...register('category', {
                  required: 'Please select a category',
                })}
              />
              <ShowInputError errors={errors} name="category" />
            </div> */}
            <div className='w-56 max-w-full'>
              <Controller
                name='category'
                control={control}
                render={({ field: { onChange: categoryNameChange, value, name } }) => (
                  <SelectDropdown
                    // label="Select game"
                    placeholder='category'
                    // onChange={(ev) => console.log(ev)}
                    onChange={(ev) => {
                      categoryNameChange(ev);
                    }}
                    options={categoryOptions || [{ uid: '', name: '' }]}
                    displayPropName='label'
                    valuePropName='value'
                    selectedDefaultValue={value}
                    buttonClassName='max-w-[clamp(15.25rem,80vw,19.25rem)] xl:max-w-[unset]'
                    errors={errors}
                    name={name}
                  />
                )}
              />
            </div>
            <div className='w-56 max-w-full'>
              <Controller
                name='game'
                control={control}
                render={({ field: { onChange: gameNameChange, value, name } }) => (
                  <SelectDropdown
                    // label="Select game"
                    placeholder='game name'
                    // onChange={(ev) => console.log(ev)}
                    onChange={(ev) => {
                      gameNameChange(ev);
                    }}
                    options={gameNameOptions || [{ _id: '', name: '' }]}
                    displayPropName='name'
                    valuePropName='_id'
                    selectedDefaultValue={value}
                    buttonClassName='max-w-[clamp(15.25rem,80vw,19.25rem)] xl:max-w-[unset]'
                    errors={errors}
                    name={name}
                  />
                )}
              />
            </div>
            {/* topic dropdown  */}
            {/* <div className="w-56 max-w-full">
              <Dropdown
                heightClassName="h-40"
                leftIcon={<IoIosSearch className="w-5 h-5 shrink-0" />}
                defaultLabel="topic"
                selectHandler={(val) => {
                  setValue('topic', val);
                  setTopic(val);
                }}
                options={topicOptions}
              />
              <input
                type="hidden"
                {...register('topic', {
                  required: 'Please select a topic',
                })}
              />
              <ShowInputError errors={errors} name="topic" />
            </div> */}
          </div>

          {/* issue */}
          <div className='px-5'>
            <div className='font-oxanium text-sm xl:text-base leading-none font-normal'>
              <div className='flex flex-col gap-4 xl:gap-8 relative'>
                <label
                  htmlFor='issue'
                  className='text-start font-bold font-tti-bold text-[clamp(1.25rem,4vw,2rem)] leading-tight'
                >
                  Tell{' '}
                  <span className='text-brand-primary-color-1'>{SITE_INFO.name.capitalized}</span>{' '}
                  about your issue:
                </label>
                <GradientBordered className='px-4 py-3 rounded-[.625rem] before:rounded-[.625rem] before:bg-gradient-bordered-deep bg-brand-primary-color-1/[.03]'>
                  <textarea
                    id='issue'
                    className='flex min-h-[7rem] max-h-52 w-full h-full bg-transparent outline-none text-brand-black-5'
                    placeholder='Type here...'
                    // cols={30}
                    rows={10}
                    {...register('issue', {
                      required: 'Please state your issue.',
                      validate: {
                        noSpecialChars: validateNoSpecialChars,
                      },
                    })}
                  />
                </GradientBordered>
                <ShowInputError errors={errors} name='issue' />
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
  );
};
