import { useCallback, useEffect, useMemo, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import ReactQuill from 'react-quill';
import { useNavigate, useParams } from 'react-router-dom';
import { ReactTags, Tag } from 'react-tag-autocomplete';
import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';

import { GradientBordered } from '../../components/ui/GradientBordered';
import { SelectDropdown } from '../../components/ui/SelectDropdown';
import { ShowInputError } from '../../components/ui/ShowInputError';
import { UsdCurrencySymbol } from '../../components/UsdCurrencySymbol';
import { ROUTE_PARAM, ROUTER_PATH } from '../../enums/router-path';
import { ResError } from '../../redux/api/apiSlice';
import {
  useGetGameCurrenciesQuery,
  useGetGameCurrencyTagSuggestionsQuery,
} from '../../redux/features/gameCurrency/gameCurrencyApi';
import {
  useCreateGameCurrencyOfferMutation,
  useDeleteGameCurrencyOfferMutation,
  useGetGameCurrencyOfferQuery,
  useUpdateGameCurrencyOfferMutation,
} from '../../redux/features/gameCurrencyOffer/gameCurrencyOfferApi';
import { CommonParams } from '../../types/globalTypes';
import { CategorySuggestion } from '../CreateGame/components/Main';
import { isSuggestionValid, RTE_COLOR_PLATTE, tagObjectSchema } from '../CreateOffer/Main';
import { GradientBorderedInput } from '../Profile/components/GradientBorderedInput';

import { DynamicItemsFieldArray } from './components/DynamicItemsFieldArray';

import 'react-quill/dist/quill.snow.css';
import '../CreateOffer/css/offer-description-editor-wrapper.css';
import '../CreateOffer/css/offer-tags-wrapper.css';

export const GAME_CURRENCY_OFFER_STATUS = {
  ACTIVATE: 'activate',
  SUSPEND: 'suspend',
} as const;

export type GameCurrencyOfferStatus =
  (typeof GAME_CURRENCY_OFFER_STATUS)[keyof typeof GAME_CURRENCY_OFFER_STATUS];

const dynamicCurrencyOfferItemSchema = z.object({
  label: z
    .string({
      required_error: 'Label must be a string',
    })
    .min(2, 'Label is required'),
  value: z
    .string({
      required_error: 'Value must be a string',
    })
    .min(2, 'Value is required'),
});
export type DynamicCurrencyOfferItem = z.infer<typeof dynamicCurrencyOfferItemSchema>;
const createGameCurrencyOfferFormSchema = z.object({
  status: z.nativeEnum(GAME_CURRENCY_OFFER_STATUS),
  // name: z.string().trim().min(1, { message: 'Game Currency name is required' }),
  uid: z.string().trim().min(1),
  currencyUid: z
    .string({
      required_error: 'Game name is required',
    })
    .min(1, 'Game name is required'),
  serverUid: z
    .string({
      required_error: 'Game name is required',
    })
    .min(1, 'Game name is required'),
  price: z
    .number({
      invalid_type_error: 'Price must be a positive number',
      required_error: 'Price is required',
    })
    .positive('Price must be greater than 0')
    .min(0.01)
    .multipleOf(0.01, 'Must be within 2 decimal points'),
  quantity: z
    .number({
      invalid_type_error: 'Quantity must be a positive number',
      required_error: 'Quantity is required',
    })
    .positive('Quantity must be greater than 0')
    .min(1),
  minPurchase: z
    .number({
      invalid_type_error: 'Minimum purchase must be a positive number',
      required_error: 'Minimum purchase is required',
    })
    .positive('Minimum purchase must be greater than 0')
    .min(1),
  description: z
    .string({
      required_error: 'Description is required',
    })
    .min(10, { message: 'Description must be at least 10 characters' }),
  dynamicItems: z.array(dynamicCurrencyOfferItemSchema).min(1).default([]),
  approximateOrderCompletionInMinutes: z
    .number({
      invalid_type_error: 'Please provide number in minutes',
      required_error: 'Approximate order completion time in minutes is required',
    })
    .min(0),
  inStock: z
    .number({
      invalid_type_error: 'Please provide number in minutes',
      required_error: 'Approximate order completion time in minutes is required',
    })
    .min(0),
  tags: z.array(tagObjectSchema).min(1, 'Please provide at least one tag name').default([]),
});
export type CreateGameCurrencyOfferFormInputs = z.infer<typeof createGameCurrencyOfferFormSchema>;

const defaultValues: Partial<CreateGameCurrencyOfferFormInputs> = {
  dynamicItems: [
    {
      label: '',
      value: '',
    },
  ],
};

export const Main = () => {
  const { uid } = useParams<CommonParams>();
  const isEditing = !!uid;
  const { data: gameCurrencyOfferRes } = useGetGameCurrencyOfferQuery(uid || '', {
    skip: !uid,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
  const gameCurrencyData = useMemo(() => gameCurrencyOfferRes?.data, [gameCurrencyOfferRes?.data]);

  const currenciesParams = new URLSearchParams({
    limit: '100',
  });
  const { data: currenciesRes } = useGetGameCurrenciesQuery(currenciesParams.toString(), {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
  const currencies = useMemo(() => currenciesRes?.data || [], [currenciesRes?.data]);
  const currencyNameOptions = currencies.map((item) => ({
    uid: item.uid,
    name: item.name,
  }));
  console.log({ isEditing });
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<CreateGameCurrencyOfferFormInputs>({
    defaultValues: gameCurrencyData || defaultValues,
    resolver: zodResolver(createGameCurrencyOfferFormSchema),
  });
  const [serversToShow, setServersToShow] = useState<CategorySuggestion[]>([]);
  const [selected, setSelected] = useState<Tag[]>([]);
  const navigate = useNavigate();

  const [createGameCurrencyOffer] = useCreateGameCurrencyOfferMutation();
  const [deleteGameCurrencyOffer] = useDeleteGameCurrencyOfferMutation();
  const [updateGameCurrencyOffer] = useUpdateGameCurrencyOfferMutation();
  const { data: tagsRes } = useGetGameCurrencyTagSuggestionsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
  const tagSuggestions = tagsRes?.data || [];
  const offerDescriptionContent = watch('description');

  useEffect(() => {
    if (gameCurrencyData) {
      const formattedTags = gameCurrencyData.tags.map(tag => ({
        label: String(tag.label || tag.value),
        value: tag.value
      }));
      setSelected(formattedTags);
      reset(gameCurrencyData);
    }
  }, [gameCurrencyData, reset]);

  // Update defaultValues when offerData changes
  useEffect(() => {
    if (isEditing && currencies) {
      const gameServers = currencies?.find(
        (currency) => currency.uid === getValues('currencyUid')
      )?.servers;
      if (gameServers) {
        setServersToShow(gameServers);
      }
    }
  }, [isEditing, currencies, getValues]);

  useEffect(() => {
    register('description');
  }, [register]);

  const onEditorStateChange = (editorState: string) => {
    setValue('description', editorState);
  };

  const handleGameCurrencyRemove = async () => {
    if (!isEditing) return;
    // data for submit
    const result = await deleteGameCurrencyOffer(uid).unwrap();
    if (result?.message) {
      toast.success(result?.message);
    }
    navigate(ROUTER_PATH.CURRENCIES_SINGLE.replace(ROUTE_PARAM.UID, currencyUid!));
  };
  const toggleGameCurrencyStatus = async () => {
    if (!isEditing) return;
    setValue(
      'status',
      statusValue === GAME_CURRENCY_OFFER_STATUS.ACTIVATE
        ? GAME_CURRENCY_OFFER_STATUS.SUSPEND
        : GAME_CURRENCY_OFFER_STATUS.ACTIVATE
    );
    const result = await updateGameCurrencyOffer({
      uid: getValues().uid,
      status: getValues().status,
    }).unwrap();
    if (result?.message) {
      toast.success(result?.message);
    }
    navigate(ROUTER_PATH.CURRENCIES_SINGLE.replace(ROUTE_PARAM.UID, currencyUid!));
  };

  const statusValue = watch('status');
  const serverUid = watch('serverUid');
  const currencyUid = watch('currencyUid');

  useEffect(() => {
    if (serverUid && currencyUid) {
      setValue('uid', `${serverUid}-${currencyUid}`.toLowerCase());
    }
  }, [serverUid, currencyUid, setValue]);

  const onAdd = useCallback(
    (newTag: Tag) => {
      setSelected([...selected, newTag]);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setValue('tags', [...selected, newTag]);
    },
    [selected, setValue]
  );

  const onDelete = useCallback(
    (tagIndex: number) => {
      setSelected(selected.filter((_, i) => i !== tagIndex));
      setValue(
        'tags',
        selected.filter((_, i) => i !== tagIndex)
      );
    },
    [selected, setValue]
  );

  const onValidate = useCallback((value: string) => isSuggestionValid(value), []);

  const onSubmit: SubmitHandler<CreateGameCurrencyOfferFormInputs> = async (data) => {
    console.log(data);
    try {
      let successMessage: string;
      if (isEditing) {
        const result = await updateGameCurrencyOffer({
          ...data,
          _id: gameCurrencyData!._id,
        }).unwrap();
        successMessage = result.message;
      } else {
        const result = await createGameCurrencyOffer(data).unwrap();
        successMessage = result.message;
      }
      if (successMessage) {
        toast.success(successMessage);
      }
      navigate(ROUTER_PATH.CURRENCIES_SINGLE.replace(ROUTE_PARAM.UID, currencyUid!));
    } catch (error) {
      const { message } = (error as ResError).data;
      if (message) toast.error(message);
    }
  };
  console.log(errors, getValues());
  // console.log(gameCurrencyData);
  return (
    <main className='relative isolate z-0 py-4 xl:py-4'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type='hidden'
          defaultValue={GAME_CURRENCY_OFFER_STATUS.ACTIVATE}
          {...register('status')}
        />

        <div className='fb-container flex flex-col gap-4 xl:gap-8'>
          {/* control box */}
          <div className='flex flex-wrap gap-5 justify-center items-start z-20'>
            {isEditing ? (
              <div className='flex flex-wrap gap-5 justify-center xl:justify-start'>
                <button
                  type='button'
                  onClick={toggleGameCurrencyStatus}
                  className={`px-3 xl:px-8 py-3 xl:py-4 rounded-[.25rem] inline-flex justify-center items-center gap-1 xl:gap-2.5 ${
                    statusValue === GAME_CURRENCY_OFFER_STATUS.ACTIVATE
                      ? 'bg-brand-primary-color-1'
                      : 'bg-brand-blue-550'
                  } text-white hover:text-brand-primary-color-1 hover:bg-brand-primary-color-light transition-all`}
                >
                  <span className='first-letter:uppercase inline-block font-tti-regular font-normal text-base leading-none line-clamp-1 text-start'>
                    {statusValue === GAME_CURRENCY_OFFER_STATUS.ACTIVATE
                      ? GAME_CURRENCY_OFFER_STATUS.SUSPEND
                      : GAME_CURRENCY_OFFER_STATUS.ACTIVATE}{' '}
                    this currency
                  </span>
                </button>
                <button
                  type='button'
                  onClick={handleGameCurrencyRemove}
                  className='px-3 xl:px-8 py-3 xl:py-4 rounded-[.25rem] inline-flex justify-center items-center gap-1 xl:gap-2.5 bg-brand-primary-color-1 text-white hover:text-brand-primary-color-1 hover:bg-brand-primary-color-light transition-all'
                >
                  <span className='first-letter:uppercase inline-block font-tti-regular font-normal text-base leading-none line-clamp-1 text-start'>
                    remove this currency
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
            {/* currency info */}
            <GradientBordered className='rounded-[1.25rem] before:rounded-[1.25rem] before:bg-gradient-bordered-light p-4 xl:p-9 bg-multi-gradient-1 overflow-visible z-10 grid grid-cols-1 items-start gap-5 xl:gap-8'>
              <h2 className='capitalize text-center font-semibold font-tti-demi-bold text-[clamp(1.25rem,4vw,2rem)] leading-tight'>
                currency offer info
              </h2>

              {/* <div className="grid items-start xl:grid-cols-5 gap-5 xl:gap-8"> */}
              <div className='w-full grid xl:grid-cols-2 items-start gap-5 xl:gap-8'>
                <Controller
                  name='currencyUid'
                  control={control}
                  render={({ field: { onChange: currencyNameChange, value, name } }) => (
                    <SelectDropdown
                      label='Select currency'
                      placeholder='currency name'
                      // onChange={(ev) => console.log(ev)}
                      onChange={(ev) => {
                        currencyNameChange(ev);
                        // setActiveGameUid(value);
                        const gameServers = currencies!.find(
                          (currency) => currency.uid === getValues('currencyUid')
                        )!.servers;
                        setServersToShow(gameServers);
                      }}
                      options={currencyNameOptions}
                      displayPropName='name'
                      valuePropName='uid'
                      selectedDefaultValue={value}
                      buttonClassName='max-w-[clamp(15.25rem,80vw,19.25rem)] xl:max-w-[unset]'
                      errors={errors}
                      name={name}
                    />
                  )}
                />

                <Controller
                  name='serverUid'
                  control={control}
                  render={({ field: { onChange: currencyServerNameChange, value, name } }) => (
                    <SelectDropdown
                      label='Select server'
                      placeholder='server name'
                      // onChange={(ev) => console.log(ev)}
                      onChange={currencyServerNameChange}
                      options={serversToShow}
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
              {/* </div> */}

              <div className='w-full grid xl:grid-cols-2 items-start gap-5 xl:gap-8'>
                <GradientBorderedInput
                  label='Price'
                  placeholder='10'
                  // defaultValue={0}
                  type='number'
                  errors={errors}
                  step={0.01}
                  icon={<UsdCurrencySymbol className='inline-flex pl-4' />}
                  register={register('price', {
                    valueAsNumber: true,

                    // required: 'Price is required',
                    // min: {
                    //   value: 0,
                    //   message: `Can't be a negative number`,
                    // },
                  })}
                />
                <GradientBorderedInput
                  label='Unit quantity'
                  placeholder='100'
                  type='number'
                  errors={errors}
                  register={register('quantity', {
                    valueAsNumber: true,
                  })}
                />
                <GradientBorderedInput
                  label='In stock'
                  placeholder='10'
                  // defaultValue={0}
                  type='number'
                  errors={errors}
                  step={1}
                  register={register('inStock', {
                    valueAsNumber: true,

                    // required: 'Price is required',
                    // min: {
                    //   value: 0,
                    //   message: `Can't be a negative number`,
                    // },
                  })}
                />
                <GradientBorderedInput
                  label='Minimum purchase'
                  placeholder='10'
                  type='number'
                  errors={errors}
                  register={register('minPurchase', {
                    valueAsNumber: true,
                  })}
                />
                <GradientBorderedInput
                  label='Delivery time in minutes'
                  placeholder='10'
                  type='number'
                  errors={errors}
                  register={register('approximateOrderCompletionInMinutes', {
                    valueAsNumber: true,
                  })}
                />
                <div className='flex flex-col gap-2 xl:gap-4 relative'>
                  <p className='text-brand-black-10 text-sm xl:text-lg leading-none font-normal'>
                    <span className='first-letter:uppercase inline-block'>tags</span>
                  </p>
                  <GradientBordered className='offer-tags-wrapper rounded-[.625rem] before:rounded-[.625rem] before:bg-gradient-bordered-deep overflow-visible px-4 py-[.675rem] z-10'>
                    {tagSuggestions ? (
                      <ReactTags
                        allowNew
                        // collapseOnSelect
                        // labelText="Enter new tags"
                        onAdd={onAdd}
                        onDelete={onDelete}
                        onValidate={onValidate}
                        selected={selected}
                        suggestions={tagSuggestions[0]}
                        classNames={{
                          root: 'react-tags',
                          rootIsActive: 'is-active',
                          rootIsDisabled: 'is-disabled',
                          rootIsInvalid: 'is-invalid',
                          label: 'react-tags__label',
                          tagList: 'react-tags__list empty:sr-only',
                          tagListItem: 'react-tags__list-item',
                          tag: 'react-tags__tag',
                          tagName: 'react-tags__tag-name',
                          comboBox: 'react-tags__combobox',
                          input: 'react-tags__combobox-input',
                          listBox: 'react-tags__listbox minimal-scrollbar',
                          option: 'react-tags__listbox-option',
                          optionIsActive: 'is-active',
                          highlight: 'react-tags__listbox-option-highlight',
                        }}
                      />
                    ) : null}
                  </GradientBordered>
                  <ShowInputError errors={errors} name='tags' />
                </div>
              </div>
              <div className='font-oxanium text-sm xl:text-base leading-none font-normal'>
                <div className='flex flex-col gap-2 xl:gap-4 relative'>
                  <label
                    htmlFor='description'
                    className='text-brand-black-10 first-letter:uppercase'
                  >
                    description
                  </label>
                  <GradientBordered className='rounded-[.625rem] before:rounded-[.625rem] before:bg-gradient-bordered-deep overflow-visible'>
                    <ReactQuill
                      theme='snow'
                      value={offerDescriptionContent}
                      id='description'
                      placeholder='Type here...'
                      onChange={onEditorStateChange}
                      className='offer-description-editor-wrapper'
                      modules={{
                        toolbar: [
                          [{ header: [1, 2, 3, false] }],
                          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                          [{ script: 'sub' }, { script: 'super' }],
                          [{ align: [] }],
                          [
                            {
                              color: RTE_COLOR_PLATTE,
                            },
                            { background: RTE_COLOR_PLATTE },
                          ],
                          [
                            { list: 'ordered' },
                            { list: 'bullet' },
                            { indent: '-1' },
                            { indent: '+1' },
                          ],
                          ['link'],
                          ['clean'],
                        ],
                      }}
                    />
                  </GradientBordered>
                  <ShowInputError errors={errors} name='description' />
                </div>
              </div>

              {/* featured list  */}
              {/* <div className="grid items-start gap-5 xl:gap-8">
                <div className="flex flex-col gap-2 xl:gap-4 relative overflow-clip">
                  <p className="text-brand-black-10 text-sm xl:text-lg leading-none font-normal first-letter:uppercase">
                    featured list
                  </p>
                  <div className="flex flex-col gap-6">
                    {FEATURED_LIST_ARRAY?.map((item) => (
                      <GradientBorderedInput
                        key={uuidv4()}
                        placeholder={`Item ${item + 1}`}
                        errors={errors}
                        register={register(`featuredList.${item}`)}
                      />
                    ))}
                  </div>
                </div>
              </div> */}

              {/* <div className="font-oxanium text-sm xl:text-base leading-none font-normal">
                <div className="flex flex-col gap-2 xl:gap-4 relative">
                  <label
                    htmlFor="description"
                    className="text-brand-black-10 first-letter:uppercase"
                  >
                    description
                  </label>
                  <GradientBordered className="rounded-[.625rem] before:rounded-[.625rem] before:bg-gradient-bordered-deep overflow-visible">
                    <ReactQuill
                      theme="snow"
                      value={descriptionContent}
                      id="description"
                      placeholder="Type here..."
                      onChange={onEditorStateChange}
                      className="offer-description-editor-wrapper"
                      modules={{
                        toolbar: [
                          [{ header: [1, 2, 3, false] }],
                          [
                            'bold',
                            'italic',
                            'underline',
                            'strike',
                            'blockquote',
                          ],
                          [{ script: 'sub' }, { script: 'super' }],
                          [{ align: [] }],
                          [{ color: [] }, { background: [] }],
                          [
                            { list: 'ordered' },
                            { list: 'bullet' },
                            { indent: '-1' },
                            { indent: '+1' },
                          ],
                          ['link'],
                          ['clean'],
                        ],
                      }}
                    />
                  </GradientBordered>
                  <ShowInputError errors={errors} name="description" />
                </div>
              </div> */}
            </GradientBordered>

            {/* filter info */}
            <GradientBordered className='rounded-[1.25rem] before:rounded-[1.25rem] before:bg-gradient-bordered-light p-4 xl:p-9 bg-multi-gradient-1 overflow-visible z-10'>
              <div className='grid gap-5 xl:gap-8'>
                <DynamicItemsFieldArray
                  {...{
                    control,
                    register,
                    defaultValues,
                    getValues,
                    watch,
                    setValue,
                    errors,
                  }}
                />
                <ShowInputError errors={errors} name='dynamicItems' />
              </div>
            </GradientBordered>

            {/* currency servers  */}
            {/* <GradientBordered className="rounded-[.625rem] before:rounded-[.625rem] before:bg-gradient-bordered-light p-4 xl:p-9 bg-multi-gradient-1 grid gap-4 xl:gap-8 overflow-visible">
              <div className="">
                <ServersFieldArray
                  {...{
                    control,
                    register,
                    defaultValues,
                    getValues,
                    watch,
                    setValue,
                    errors,
                  }}
                />
              </div>
            </GradientBordered> */}

            {/* images and meta info  */}

            <div className=''>
              <div className='text-center'>
                {/* <button
                  type="submit"
                  className='capitalize inline-flex w-44 justify-center items-center px-3 xl:px-6 py-3 xl:py-4 text-lg xl:text-xl leading-tight rounded-md font-semibold font-oxanium text-white bg-fading-theme-gradient-light-to-deep hover:bg-[linear-gradient(theme("colors.brand.primary.color-1")_100%,theme("colors.brand.primary.color-1")_100%)] transition-all'
                >
                  create
                </button> */}
                <button
                  type='submit'
                  className='px-3 xl:px-8 py-3 xl:py-4 rounded-[.25rem] inline-flex justify-center items-center gap-1 xl:gap-2.5 bg-brand-primary-color-1 text-white hover:text-brand-primary-color-1 hover:bg-brand-primary-color-light transition-all'
                >
                  <span className='capitalize font-tti-regular font-normal text-base leading-none line-clamp-1 text-start'>
                    {uid ? 'edit' : 'create'}
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
