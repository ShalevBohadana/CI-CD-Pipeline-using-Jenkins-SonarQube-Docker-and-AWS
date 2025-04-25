import { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';

import { GradientBordered } from '../../components/ui/GradientBordered';
import { GradientBorderedDateInput } from '../../components/ui/GradientBorderedDateInput';
import { GradientBorderedTimeInput } from '../../components/ui/GradientBorderedTimeInput';
import { SelectDropdown } from '../../components/ui/SelectDropdown';
import { ShowInputError } from '../../components/ui/ShowInputError';
import { UsdCurrencySymbol } from '../../components/UsdCurrencySymbol';
import { ROUTER_PATH } from '../../enums/router-path';
import { ResError } from '../../redux/api/apiSlice';
import {
  useCreatePromoMutation,
  useDeletePromoMutation,
  useGetPromoQuery,
  useUpdatePromoMutation,
} from '../../redux/features/promo/promoApi';
import { CommonParams } from '../../types/globalTypes';
import { DISCOUNT_TYPE_OPTIONS, OFFER_STATUS, offerDiscountSchema } from '../CreateOffer/Main';
import { GradientBorderedInput } from '../Profile/components/GradientBorderedInput';

export const PROMO_STATUS = {
  ACTIVATE: 'activate',
  SUSPEND: 'suspend',
} as const;

export type LabelValuePair = {
  label: string;
  value: string;
};

export const APPLICABLE_REGIONS_DATA: LabelValuePair[] = [
  {
    label: 'US',
    value: 'us',
  },
  {
    label: 'EU',
    value: 'eu',
  },
  {
    label: 'UK',
    value: 'uk',
  },
];

export const conditionsSchema = z.object({
  maxUsage: z
    .number({
      invalid_type_error: 'Max usage must be a positive number',
      required_error: 'Max usage is required',
    })
    .optional(),
  maxUsesPerUser: z
    .number({
      invalid_type_error: 'Max usage per user must be a positive number',
    })
    .optional(),
  minOrderAmount: z
    .number({
      invalid_type_error: 'Minimum order amount must be a positive number',
    })
    .positive('amount must be greater than 0')
    .multipleOf(0.01, 'Must be within 2 decimal points')
    .optional(),
  minOrderQuantity: z
    .number({
      invalid_type_error: 'Minimum order quantity must be a positive number',
    })
    .optional(),
  restrictRegions: z.array(z.string()).optional().default([]),
  isStackable: z.boolean().optional().default(false),
});

const createPromoFormInputsSchema = z.object({
  status: z.nativeEnum(PROMO_STATUS),
  code: z.string().trim().min(1, { message: 'Promo code is required' }),
  description: z.string().trim().min(1, { message: 'Promo short description is required' }),
  startDate: z.coerce.date({
    invalid_type_error: 'Please provide a valid start date',
    required_error: 'Start date is required',
  }),
  startTime: z.coerce.date({
    invalid_type_error: 'Please provide a valid start time',
    required_error: 'Start time is required',
  }),
  endDate: z.coerce.date({
    invalid_type_error: 'Please provide a valid end date',
    required_error: 'End date is required',
  }),
  endTime: z.coerce.date({
    invalid_type_error: 'Please provide a valid end time',
    required_error: 'End time is required',
  }),
  // usageCount: z.number().min(0).default(0).optional(),
  discount: offerDiscountSchema,
  // conditions: conditionsSchema.optional(),
});

export type CreatePromoFormInputs = z.infer<typeof createPromoFormInputsSchema>;

const defaultValues: Partial<CreatePromoFormInputs> = {};

export const Main = () => {
  // const { uid, promoData } = useCreatePromoContext();
  const { uid: code } = useParams<CommonParams>();
  const navigate = useNavigate();
  const isEditing = !!code;

  const { data: promoResponse } = useGetPromoQuery(code || '', {
    skip: !code,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
  const promoData = promoResponse?.data;
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<CreatePromoFormInputs>({
    defaultValues: promoData || defaultValues,
    resolver: zodResolver(createPromoFormInputsSchema),
  });
  const [createPromo] = useCreatePromoMutation();
  const [updatePromo] = useUpdatePromoMutation();
  const [deletePromo] = useDeletePromoMutation();
  // Update defaultValues when gameData changes
  useEffect(() => {
    if (promoData) {
      reset(promoData); // Update defaultValues with gameData
    }
  }, [promoData, reset]);

  const handlePromoRemove = async () => {
    if (!isEditing) return;
    // data for submit
    const result = await deletePromo(code).unwrap();
    if (result?.message) {
      toast.success(result?.message);
    }
    navigate(ROUTER_PATH.ADMIN_PROMOS);
  };

  const promoStatusValue = watch('status');

  const togglePromoStatus = async () => {
    if (!isEditing) return;
    setValue(
      'status',
      promoStatusValue === OFFER_STATUS.ACTIVATE ? OFFER_STATUS.SUSPEND : OFFER_STATUS.ACTIVATE
    );
    const result = await updatePromo({
      code: getValues().code,
      status: getValues().status,
    }).unwrap();
    if (result?.message) {
      toast.success(result?.message);
    }
    navigate(ROUTER_PATH.ADMIN_PROMOS);
  };

  const onSubmit: SubmitHandler<CreatePromoFormInputs> = async (data) => {
    try {
      let successMessage: string;
      if (isEditing) {
        const result = await updatePromo({
          ...data,
          code: promoData!.code,
        }).unwrap();
        successMessage = result.message;
      } else {
        const result = await createPromo(data).unwrap();
        successMessage = result.message;
      }
      if (successMessage) {
        toast.success(successMessage);
      }
      navigate(ROUTER_PATH.ADMIN_PROMOS);
    } catch (error) {
      const { message } = (error as ResError).data;
      if (message) toast.error(message);
    }
  };

  return (
    <main className='relative isolate z-0 py-4 xl:py-4'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type='hidden' defaultValue={PROMO_STATUS.ACTIVATE} {...register('status')} />
        {/* <input
          type="hidden"
          defaultValue={0}
          {...register('usageCount', {
            valueAsNumber: true,
          })}
        /> */}
        <div className='fb-container flex flex-col gap-4 xl:gap-8'>
          {/* control box */}
          <div className='flex flex-wrap gap-5 justify-center items-start z-20'>
            {promoData ? (
              <div className='flex flex-wrap gap-5 justify-center xl:justify-start'>
                <button
                  type='button'
                  onClick={togglePromoStatus}
                  className={`px-3 xl:px-8 py-3 xl:py-4 rounded-[.25rem] inline-flex justify-center items-center gap-1 xl:gap-2.5 ${
                    promoStatusValue === PROMO_STATUS.ACTIVATE
                      ? 'bg-brand-primary-color-1'
                      : 'bg-brand-blue-550'
                  } text-white hover:text-brand-primary-color-1 hover:bg-brand-primary-color-light transition-all`}
                >
                  <span className='first-letter:uppercase inline-block font-tti-regular font-normal text-base leading-none line-clamp-1 text-start'>
                    {promoStatusValue === PROMO_STATUS.ACTIVATE
                      ? PROMO_STATUS.SUSPEND
                      : PROMO_STATUS.ACTIVATE}{' '}
                    this promo
                  </span>
                </button>
                <button
                  type='button'
                  onClick={handlePromoRemove}
                  className='px-3 xl:px-8 py-3 xl:py-4 rounded-[.25rem] inline-flex justify-center items-center gap-1 xl:gap-2.5 bg-brand-primary-color-1 text-white hover:text-brand-primary-color-1 hover:bg-brand-primary-color-light transition-all'
                >
                  <span className='first-letter:uppercase inline-block font-tti-regular font-normal text-base leading-none line-clamp-1 text-start'>
                    remove this promo
                  </span>
                </button>
              </div>
            ) : null}

            {/* <div className="xl:ml-auto">
              <SelectDropdown
                placeholder="Prebuilt filters"
                onChange={(ev) => console.log(ev)}
                options={employeeCategoryOptions}
                displayPropName="label"
                valuePropName="value"
                buttonClassName="w-48"
              />
            </div> */}
          </div>

          <div className='grid gap-8 pb-8'>
            {/* promo info  */}
            <GradientBordered className='rounded-[.625rem] before:rounded-[.625rem] before:bg-gradient-bordered-light p-4 xl:p-9 bg-multi-gradient-1 grid gap-4 xl:gap-8 overflow-visible z-10'>
              <h2 className='capitalize text-center font-semibold font-tti-demi-bold text-[clamp(1.25rem,4vw,2rem)] leading-tight'>
                promo information
              </h2>
              <div className='grid gap-8'>
                <div className='xl:col-span-7 grid gap-5 items-start self-start'>
                  <GradientBorderedInput
                    label='Code'
                    placeholder='Promo code is case sensitive'
                    errors={errors}
                    register={register('code')}
                  />

                  <GradientBorderedInput
                    label='Short description'
                    placeholder='Promo short description'
                    errors={errors}
                    register={register('description')}
                  />

                  <div className='grid lg:grid-cols-2 gap-5 items-start'>
                    {/* <div className=""> */}
                    <GradientBorderedInput
                      label='Discount'
                      placeholder='5'
                      // defaultValue={0}
                      type='number'
                      errors={errors}
                      step={0.01}
                      icon={<UsdCurrencySymbol className='inline-flex pl-4' />}
                      register={register('discount.amount', {
                        valueAsNumber: true,
                      })}
                    />
                    {/* </div> */}

                    <div className='flex flex-col gap-2 xl:gap-4 relative'>
                      <p className='text-brand-black-10 text-sm xl:text-lg leading-none font-normal  '>
                        <span className='inline-block first-letter:uppercase'>discount type</span>
                      </p>

                      <Controller
                        name='discount.type'
                        control={control}
                        render={({ field: { onChange: offerDiscountTypeChange, value, name } }) => (
                          <SelectDropdown
                            placeholder='Select a type'
                            // onChange={(ev) => console.log(ev)}
                            onChange={offerDiscountTypeChange}
                            options={DISCOUNT_TYPE_OPTIONS}
                            displayPropName='label'
                            valuePropName='value'
                            selectedDefaultValue={value}
                            // buttonClassName="w-48"
                            errors={errors}
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            name={name}
                          />
                        )}
                      />
                    </div>
                  </div>

                  <div className='grid lg:grid-cols-2 gap-5 items-start'>
                    <div className='flex flex-col gap-2 xl:gap-4 '>
                      <label
                        htmlFor='startDate'
                        className='text-brand-black-10 text-sm xl:text-lg leading-none font-normal'
                      >
                        <span className='first-letter:uppercase'>Start date</span>
                      </label>

                      <Controller
                        name='startDate'
                        control={control}
                        // defaultValue={item.createdAt}
                        rules={{ required: true }}
                        render={({ field: { onChange: promoStartDateChange, value } }) => {
                          return (
                            <GradientBorderedDateInput
                              id='startDate'
                              placeholderText='Pick a date'
                              selected={value ? new Date(value) : null}
                              onChange={promoStartDateChange}
                              // onChangeRaw={() =>
                              //   setValue(`sliders.${index}.createdAt`, '')
                              // }
                            />
                          );
                        }}
                      />

                      <ShowInputError errors={errors} name='startDate' />
                    </div>

                    <div className='flex flex-col gap-2 xl:gap-4 '>
                      <label
                        htmlFor='startTime'
                        className='text-brand-black-10 text-sm xl:text-lg leading-none font-normal'
                      >
                        <span className='first-letter:uppercase'>Start time</span>
                      </label>

                      <Controller
                        name='startTime'
                        control={control}
                        // defaultValue={item.createdAt}
                        // rules={{ required: true }}
                        render={({ field: { onChange: promoStartTimeChange, value } }) => {
                          return (
                            <GradientBorderedTimeInput
                              id='startTime'
                              placeholderText='Pick a time'
                              selected={value ? new Date(value) : null}
                              onChange={promoStartTimeChange}
                              // onChangeRaw={() =>
                              //   setValue(`sliders.${index}.createdAt`, '')
                              // }
                            />
                          );
                        }}
                      />

                      <ShowInputError errors={errors} name='startTime' />
                    </div>
                  </div>

                  <div className='grid lg:grid-cols-2 gap-5 items-start'>
                    <div className='flex flex-col gap-2 xl:gap-4 '>
                      <label
                        htmlFor='endDate'
                        className='text-brand-black-10 text-sm xl:text-lg leading-none font-normal'
                      >
                        <span className='first-letter:uppercase'>End date</span>
                      </label>

                      <Controller
                        name='endDate'
                        control={control}
                        // defaultValue={item.createdAt}
                        rules={{ required: true }}
                        render={({ field: { onChange: promoEndDateChange, value } }) => {
                          return (
                            <GradientBorderedDateInput
                              id='endDate'
                              placeholderText='Pick a date'
                              selected={value ? new Date(value) : null}
                              onChange={promoEndDateChange}
                              // onChangeRaw={() =>
                              //   setValue(`sliders.${index}.createdAt`, '')
                              // }
                            />
                          );
                        }}
                      />

                      <ShowInputError errors={errors} name='endDate' />
                    </div>
                    <div className='flex flex-col gap-2 xl:gap-4 '>
                      <label
                        htmlFor='endTime'
                        className='text-brand-black-10 text-sm xl:text-lg leading-none font-normal'
                      >
                        <span className='first-letter:uppercase'>End time</span>
                      </label>

                      <Controller
                        name='endTime'
                        control={control}
                        // defaultValue={item.createdAt}
                        // rules={{ required: true }}
                        render={({ field: { onChange: promoEndTimeChange, value } }) => {
                          return (
                            <GradientBorderedTimeInput
                              id='endTime'
                              placeholderText='Pick a time'
                              selected={value ? new Date(value) : null}
                              onChange={promoEndTimeChange}
                              // onChangeRaw={() =>
                              //   setValue(`sliders.${index}.createdAt`, '')
                              // }
                            />
                          );
                        }}
                      />

                      <ShowInputError errors={errors} name='endTime' />
                    </div>
                  </div>
                </div>
              </div>
            </GradientBordered>

            {/* conditions info  */}
            {/* <GradientBordered className="rounded-[.625rem] before:rounded-[.625rem] before:bg-gradient-bordered-light p-4 xl:p-9 bg-multi-gradient-1 grid gap-4 xl:gap-8 overflow-visible">
              <h2 className="capitalize text-center font-semibold font-tti-demi-bold text-[clamp(1.25rem,4vw,2rem)] leading-tight">
                conditions
              </h2>

              <div className="flex flex-col gap-2 xl:gap-[.875rem] relative font-oxanium">
                <InputToggleBox
                  label="Usable with other promo codes"
                  type="checkbox"
                  checkMark="white"
                  defaultChecked={false}
                  register={register('conditions.isStackable')}
                />

                <ShowInputError
                  errors={errors}
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  name="conditions.isStackable"
                />
              </div>

              <div className="grid lg:grid-cols-2 gap-5 items-start self-start">
                <GradientBorderedInput
                  label="Max usage"
                  placeholder="Max usage count"
                  type="number"
                  errors={errors}
                  register={register('conditions.maxUsage', {
                    valueAsNumber: true,
                  })}
                />

                <GradientBorderedInput
                  label="Max usage per user"
                  placeholder="Max usage per user count"
                  type="number"
                  errors={errors}
                  register={register('conditions.maxUsesPerUser', {
                    valueAsNumber: true,
                  })}
                />

                <GradientBorderedInput
                  label="Minimum order amount"
                  placeholder="1"
                  type="number"
                  errors={errors}
                  step={0.01}
                  icon={<UsdCurrencySymbol className="inline-flex pl-4" />}
                  register={register('conditions.minOrderAmount', {
                    valueAsNumber: true,
                  })}
                />

                <GradientBorderedInput
                  label="Minimum order quantity"
                  placeholder="1"
                  type="number"
                  errors={errors}
                  step={1}
                  register={register('conditions.minOrderQuantity', {
                    valueAsNumber: true,
                  })}
                />
              </div>

              <div className="flex flex-col gap-4">
                <h2 className="text-brand-black-10 text-sm xl:text-lg leading-none font-normal">
                  Select restricted regions(s)
                </h2>

                <div className="grid xl:grid-cols-3 gap-4">
                  {APPLICABLE_REGIONS_DATA?.map((item) => (
                    <InputToggleBox
                      key={v4()}
                      label={item.label}
                      value={item.value}
                      type="checkbox"
                      checkMark="white"
                      register={register('conditions.restrictRegions')}
                    />
                  ))}
                </div>
                <ShowInputError
                  errors={errors}
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  name="conditions.restrictRegions"
                />
              </div>
            </GradientBordered> */}

            <div className=''>
              <div className='text-center'>
                <button
                  type='submit'
                  className='px-3 xl:px-8 py-3 xl:py-4 rounded-[.25rem] inline-flex justify-center items-center gap-1 xl:gap-2.5 bg-brand-primary-color-1 text-white hover:text-brand-primary-color-1 hover:bg-brand-primary-color-light transition-all'
                >
                  <span className='capitalize font-tti-regular font-normal text-base leading-none line-clamp-1 text-start'>
                    {code ? 'edit' : 'create'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
};
