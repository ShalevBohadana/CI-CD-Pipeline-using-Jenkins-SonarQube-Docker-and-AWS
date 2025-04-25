import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { BiPlus } from 'react-icons/bi';
import ImageUploading, { ImageListType, ImageType } from 'react-images-uploading';
import ReactQuill from 'react-quill';
import { useNavigate, useParams } from 'react-router-dom';
import { ReactTags, Tag } from 'react-tag-autocomplete';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';

import { GradientBordered } from '../../components/ui/GradientBordered';
import { OfferLabel } from '../../components/ui/OfferLabel';
import { SelectDropdown } from '../../components/ui/SelectDropdown';
import { ShowInputError } from '../../components/ui/ShowInputError';
import { UsdCurrencySymbol } from '../../components/UsdCurrencySymbol';
import { FOLDER_NAME } from '../../enums';
import { ROUTER_PATH } from '../../enums/router-path';
import { ResError } from '../../redux/api/apiSlice';
import { useUserDataQuery } from '../../redux/features/auth/authApi';
import { useGetGamesQuery } from '../../redux/features/game/gameApi';
import {
  useCreateGameCurrencyMutation,
  useDeleteGameCurrencyMutation,
  useGetGameCurrencyQuery,
  useUpdateGameCurrencyMutation,
} from '../../redux/features/gameCurrency/gameCurrencyApi';
import { useGetTagSuggestionsQuery } from '../../redux/features/offer/offerApi';
import { useGetPromosQuery } from '../../redux/features/promo/promoApi';
import { CommonParams, Pretty } from '../../types/globalTypes';
import { kebabCasedUrl } from '../../utils';
import { getAcceptedImageTypes } from '../../utils/constants';
import { twMergeClsx } from '../../utils/twMergeClsx';
import { uploadImage } from '../../utils/upload';
import {
  createOfferCommonSchema,
  DISCOUNT_TYPE_OPTIONS,
  isSuggestionValid,
  OFFER_DISCOUNT_TYPE,
  OFFER_STATUS,
  OFFER_TYPE,
} from '../CreateOffer/Main';
import { GradientBorderedInput } from '../Profile/components/GradientBorderedInput';

import { DynamicFilterFieldArray } from './components/DynamicFilterFieldArray';
import { ServersFieldArray } from './components/ServersFieldArray';

import 'react-quill/dist/quill.snow.css';
import '../CreateOffer/css/offer-description-editor-wrapper.css';
import '../CreateOffer/css/offer-tags-wrapper.css';

export const GAME_CURRENCY_FILTER_TYPES = {
  CHECKBOX_SINGLE: 'radio',
  CHECKBOX_MULTIPLE: 'checkbox',
} as const;

export type TGameCurrencyFilterType =
  (typeof GAME_CURRENCY_FILTER_TYPES)[keyof typeof GAME_CURRENCY_FILTER_TYPES];

export const FILTER_TYPE_OPTIONS = Object.values(GAME_CURRENCY_FILTER_TYPES).map((value) => ({
  value,
  label: value,
}));

export type TDynamicFilterCommonPropsNested = {
  name: string;
  children?: TDynamicFilterCommonPropsNested[];
};

const dynamicFilterCommonSchema = z.lazy(() =>
  z.object({
    name: z.string().min(2, 'A name is required'),
    children: z.array(dynamicFilterCommonSchema).optional(), // Recursive definition for nested filters
  }).strict()
);

const dynamicFilterSchema = z.lazy(() =>
  z.object({
    name: z
      .string({
        required_error: 'Filter title must be a string',
      })
      .min(2, 'Filter title is required'),
    type: z.nativeEnum(GAME_CURRENCY_FILTER_TYPES),
    children: z.array(dynamicFilterCommonSchema).optional(), // Recursive definition for nested filters
  })
);
export type DynamicFilterInputs = z.infer<typeof dynamicFilterSchema>;

// const gameCurrencyServerItemZ = z.object({
//   title: z.string().trim().min(1, { message: 'Offer title is required' }),
//   server: z.string().trim().min(1, { message: 'Server is required' }),
// });

const gameCurrencyServerSchema = z.object({
  title: z.string().trim().min(2, { message: 'Minimum 2 characters is required' }),
  region: z.string().trim().min(2, { message: 'Minimum 2 characters is required' }),
  label: z.string().trim().min(2, { message: 'Minimum 2 characters is required' }),
  value: z.string().trim().min(2, { message: 'Minimum 2 characters is required' }),
  // currencyServers: z
  //   .array(gameCurrencyServerItemZ)
  //   .min(1)
  //   .default([])
  //   .optional(),
});

export type GameCurrencyServer = z.infer<typeof gameCurrencyServerSchema>;

const createGameCurrencyFormSchema = z.object({
  ...createOfferCommonSchema.shape,
  dynamicFilters: z.array(dynamicFilterSchema).min(1).default([]),
  servers: z.array(gameCurrencyServerSchema).min(1).default([]),
});

export type CreateGameCurrencyFormInputs = Pretty<z.infer<typeof createGameCurrencyFormSchema>>;

const defaultValues: Partial<CreateGameCurrencyFormInputs> = {
  dynamicFilters: [
    {
      name: '',
      type: GAME_CURRENCY_FILTER_TYPES.CHECKBOX_MULTIPLE,
      children: [
        {
          name: '',
        },
      ],
    },
  ],
  servers: [
    {
      title: '',
      region: '',
      label: '',
      value: '',
    },
  ],
  discount: {
    amount: 0,
    type: OFFER_DISCOUNT_TYPE.PERCENT,
  },
};

export const Main = () => {
  const { uid } = useParams<CommonParams>();

  // const { uid, gameCurrencyData } = useCreateGameCurrencyContext();
  const { data: offerResponse } = useGetGameCurrencyQuery(uid || '', {
    skip: !uid,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
  const gameCurrencyData = offerResponse?.data;
  const { data: tagsRes } = useGetTagSuggestionsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
  const tagSuggestions =
    tagsRes?.data?.flat().map((tag) => ({ value: tag.value, label: tag.label })) || [];

  const { data: gamesData } = useGetGamesQuery('', {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  const gameNameOptions = gamesData?.data?.map((game) => ({
    uid: game.uid,
    name: game.name,
  }));

  const { data: promosData } = useGetPromosQuery('', {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  const promoNameOptions = promosData?.data?.map((promo) => ({
    value: promo.code,
    label: promo.code,
  }));

  const FEATURED_LIST_MAX_ITEMS = 3;
  const FEATURED_LIST_ARRAY = Array.from(Array(FEATURED_LIST_MAX_ITEMS).keys());
  const [images, setImages] = useState<ImageType[]>([]);
  const [selected, setSelected] = useState<Tag[]>([]);
  const navigate = useNavigate();
  const isEditing = !!uid;
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<CreateGameCurrencyFormInputs>({
    defaultValues: gameCurrencyData || defaultValues,
    resolver: zodResolver(createGameCurrencyFormSchema),
  });

  const [createOfferCurrency] = useCreateGameCurrencyMutation();
  const [deleteOfferCurrency] = useDeleteGameCurrencyMutation();
  const [updateOfferCurrency] = useUpdateGameCurrencyMutation();

  useEffect(() => {
    if (gameCurrencyData?.tags) {
      const formattedTags: Tag[] = gameCurrencyData.tags.map(tag => ({
        label: String(tag.label || ''),
        value: String(tag.value || '')
      }));
      setSelected(formattedTags);
      reset(gameCurrencyData);
    }
  }, [gameCurrencyData, reset]);

  useEffect(() => {
    register('description');
  }, [register]);

  const onEditorStateChange = (editorState: string) => {
    setValue('description', editorState);
  };
  const { data: userRes } = useUserDataQuery(undefined, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });
  const sellerId = userRes?.data?._id;
  const handleGameCurrencyImageUpload = async (imageList: ImageListType) => {
    // data for submit
    // console.log(imageList, addUpdateIndex);
    setImages(imageList);
    if (imageList[0]?.file) {
      const result = await uploadImage({
        image: imageList[0].file,
        folderName: FOLDER_NAME.OFFER_CURRENCY,
      });
      setValue('image', result.data);
    }
  };

  const handleGameCurrencyRemove = async () => {
    if (!isEditing) return;
    // data for submit
    const result = await deleteOfferCurrency(uid).unwrap();
    if (result?.message) {
      toast.success(result?.message);
    }
    navigate(ROUTER_PATH.ADMIN_CURRENCIES);
  };

  const offerCurrencyStatusValue = watch('status');

  const toggleGameCurrencyStatus = async () => {
    if (!isEditing) return;
    setValue(
      'status',
      offerCurrencyStatusValue === OFFER_STATUS.ACTIVATE
        ? OFFER_STATUS.SUSPEND
        : OFFER_STATUS.ACTIVATE
    );
    const result = await updateOfferCurrency({
      uid: getValues().uid,
      status: getValues().status,
    }).unwrap();
    if (result?.message) {
      toast.success(result?.message);
    }
    navigate(ROUTER_PATH.ADMIN_CURRENCIES);
  };

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

  const offerDescriptionContent = watch('description');
  const offerPromoValue = watch('offerPromo');

  const featuredImg =
    (images[0]?.dataUrl as string) || gameCurrencyData?.image || defaultValues?.image;

  const onSubmit: SubmitHandler<CreateGameCurrencyFormInputs> = async (data) => {
    try {
      let successMessage: string;
      if (isEditing) {
        const result = await updateOfferCurrency({
          ...data,
          _id: gameCurrencyData!._id,
        }).unwrap();
        successMessage = result.message;
      } else {
        const result = await createOfferCurrency(data).unwrap();
        successMessage = result.message;
      }
      if (successMessage) {
        toast.success(successMessage);
      }
      navigate(ROUTER_PATH.ADMIN_CURRENCIES);
    } catch (error) {
      const { message } = (error as ResError).data;
      if (message) toast.error(message);
    }
  };
  // if (sellerId) {
  //   setValue('sellerId', sellerId);
  // }
  console.log(errors, getValues());
  // console.log(gameCurrencyData);
  return (
    <main className='relative isolate z-0 py-4 xl:py-4'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type='hidden' {...register('status')} defaultValue={OFFER_STATUS.ACTIVATE} />
        {!isEditing ? (
          <>
            <input
              type='hidden'
              readOnly
              {...register('offerType')}
              defaultValue={OFFER_TYPE.CURRENCY}
            />
            <input type='hidden' readOnly {...register('sellerId')} defaultValue={sellerId} />
          </>
        ) : null}
        <div className='fb-container flex flex-col gap-4 xl:gap-8'>
          {/* control box */}
          <div className='flex flex-wrap gap-5 justify-center items-start z-20'>
            {gameCurrencyData ? (
              <div className='flex flex-wrap gap-5 justify-center xl:justify-start'>
                <button
                  type='button'
                  onClick={toggleGameCurrencyStatus}
                  className={`px-3 xl:px-8 py-3 xl:py-4 rounded-[.25rem] inline-flex justify-center items-center gap-1 xl:gap-2.5 ${
                    offerCurrencyStatusValue === OFFER_STATUS.ACTIVATE
                      ? 'bg-brand-primary-color-1'
                      : 'bg-brand-blue-550'
                  } text-white hover:text-brand-primary-color-1 hover:bg-brand-primary-color-light transition-all`}
                >
                  <span className='first-letter:uppercase inline-block font-tti-regular font-normal text-base leading-none line-clamp-1 text-start'>
                    {offerCurrencyStatusValue === OFFER_STATUS.ACTIVATE
                      ? OFFER_STATUS.SUSPEND
                      : OFFER_STATUS.ACTIVATE}{' '}
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
                currency info
              </h2>

              {/* offer details  */}
              <div className='w-full grid xl:grid-cols-3 items-start gap-5'>
                {gameNameOptions ? (
                  <Controller
                    name='gameUid'
                    control={control}
                    render={({ field: { onChange: gameNameChange, value, name } }) => (
                      <SelectDropdown
                        label='Select game'
                        placeholder='game name'
                        // onChange={(ev) => console.log(ev)}
                        onChange={gameNameChange}
                        options={gameNameOptions}
                        displayPropName='name'
                        valuePropName='uid'
                        selectedDefaultValue={value}
                        buttonClassName='max-w-[clamp(15.25rem,80vw,19.25rem)] xl:max-w-[unset]'
                        errors={errors}
                        name={name}
                      />
                    )}
                  />
                ) : null}

                <GradientBorderedInput
                  label='Currency name'
                  placeholder='Currency name'
                  errors={errors}
                  register={register('name', {
                    onChange: (ev: ChangeEvent<HTMLInputElement>) => {
                      if (!isEditing) {
                        setValue('uid', kebabCasedUrl(ev.target.value));
                        setValue('categoryUid', kebabCasedUrl(ev.target.value));
                      }
                    },
                  })}
                />

                <GradientBorderedInput
                  label='Base price'
                  placeholder='10'
                  // defaultValue={0}
                  type='number'
                  errors={errors}
                  step={0.01}
                  icon={<UsdCurrencySymbol className='inline-flex pl-4' />}
                  register={register('basePrice', {
                    valueAsNumber: true,
                  })}
                />
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
                  <ShowInputError errors={errors} name='description' />
                </div>
              </div>
            </GradientBordered>

            {/* images and meta info  */}
            <GradientBordered className='rounded-[.625rem] before:rounded-[.625rem] before:bg-gradient-bordered-light p-4 xl:p-9 bg-multi-gradient-1 grid gap-4 xl:gap-8 overflow-visible z-10'>
              <div className='grid xl:grid-cols-2 gap-5'>
                {/* image uploading  */}
                <div className=''>
                  {/* offer image  */}
                  <ImageUploading
                    value={images}
                    onChange={handleGameCurrencyImageUpload}
                    multiple={false}
                    dataURLKey='dataUrl'
                    acceptType={getAcceptedImageTypes()}
                    aria-label='upload image'
                  >
                    {({
                      imageList,
                      onImageUpload,

                      onImageUpdate,

                      isDragging,
                      dragProps,
                    }) => (
                      // write your building UI
                      <div className='flex flex-col flex-wrap justify-center xl:justify-start gap-5 md:flex-row'>
                        <div
                          role='button'
                          tabIndex={0}
                          onKeyUp={() => {}}
                          className={twMergeClsx(`group relative isolate z-0 overflow-clip flex cursor-pointer items-center justify-center rounded-lg bg-brand-black-90 [&.active]:bg-brand-black-110 outline-1 outline-dashed max-w-xs w-full min-h-[20.625rem] transition-colors ${
                            imageList?.length
                              ? 'outline-transparent'
                              : 'outline-brand-primary-color-light'
                          } 
                      ${
                        isDragging ? 'text-brand-primary-color-1 outline-brand-primary-color-1' : ''
                      }
                      `)}
                          onClick={onImageUpload}
                          {...dragProps}
                        >
                          {featuredImg ? (
                            <figure className='grid relative isolate z-0 overflow-clip rounded-[.25rem] after:absolute after:inset-0 after:z-10 after:bg-[linear-gradient(0deg,theme(colors.black/.95)_10%,theme(colors.brand.black.120/.5)_60%)] after:pointer-events-none max-w-xs w-full max-h-[20.625rem] h-full'>
                              <picture className='row-span-full col-span-full z-0'>
                                <source media='(min-width: 350px)' srcSet={`${featuredImg} 291w`} />
                                <img
                                  src={featuredImg}
                                  alt='description'
                                  className='w-full h-full object-cover object-center'
                                  loading='lazy'
                                  width='291'
                                  height='300'
                                  decoding='async'
                                  // fetchPriority="low"
                                />
                              </picture>
                              {offerPromoValue ? (
                                <OfferLabel className='row-span-full col-span-full justify-self-start mt-4 ml-4 z-30'>
                                  {offerPromoValue}
                                </OfferLabel>
                              ) : null}
                            </figure>
                          ) : (
                            <span className='flex h-full w-full items-center justify-center rounded-md px-5 py-2.5 text-center'>
                              Click or Drop here to
                              <br /> upload an image
                            </span>
                          )}
                        </div>

                        <div className='grid gap-4 place-items-start justify-center xl:justify-between'>
                          {promoNameOptions ? (
                            <Controller
                              name='offerPromo'
                              control={control}
                              defaultValue=''
                              render={({ field: { onChange: offerPromoChange, value, name } }) => (
                                <SelectDropdown
                                  placeholder='Select promo'
                                  // onChange={(ev) => console.log(ev)}
                                  onChange={offerPromoChange}
                                  options={promoNameOptions}
                                  displayPropName='label'
                                  valuePropName='value'
                                  selectedDefaultValue={value}
                                  buttonClassName='w-48'
                                  errors={errors}
                                  name={name}
                                />
                              )}
                            />
                          ) : null}

                          <div className='max-w-[theme(width.48)]'>
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
                          </div>

                          <Controller
                            name='discount.type'
                            control={control}
                            render={({ field: { onChange: offerPromoChange, value, name } }) => (
                              <SelectDropdown
                                placeholder='Discount type'
                                // onChange={(ev) => console.log(ev)}
                                onChange={offerPromoChange}
                                options={DISCOUNT_TYPE_OPTIONS}
                                displayPropName='label'
                                valuePropName='value'
                                selectedDefaultValue={value}
                                buttonClassName='w-48'
                                errors={errors}
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                name={name}
                              />
                            )}
                          />

                          <button
                            type='button'
                            onClick={() => onImageUpdate(0)}
                            className='self-center justify-self-center xl:justify-self-start xl:self-end group px-3 xl:px-6 py-2.5 rounded-[.25rem] inline-flex justify-center items-center gap-1 xl:gap-2.5 bg-brand-primary-color-1 text-white hover:text-brand-primary-color-1 hover:bg-brand-primary-color-light transition-all'
                          >
                            <BiPlus className='w-5 h-5 shrink-0' />
                            <span className='capitalize font-tti-regular font-normal text-base leading-none line-clamp-1 text-start'>
                              picture
                              {/* {imageList?.length ? 'update' : 'upload'}
                        <br className="hidden xl:block" /> image */}
                            </span>
                          </button>
                        </div>
                      </div>
                    )}
                  </ImageUploading>
                  {/* image uploading status */}
                  <div className=''>
                    <input type='hidden' {...register('image')} className='sr-only' />
                    <ShowInputError errors={errors} name='image' />
                  </div>
                </div>
                {/* featured list  */}
                <div className='flex flex-col gap-2 xl:gap-4 relative overflow-clip'>
                  <p className='text-brand-black-10 text-sm xl:text-lg leading-none font-normal first-letter:uppercase'>
                    featured list
                  </p>
                  <div className='flex flex-col gap-6'>
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
              </div>
              <div className='grid gap-5 items-start'>
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
                        suggestions={tagSuggestions}
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
            </GradientBordered>

            {/* filter info */}
            <GradientBordered className='rounded-[1.25rem] before:rounded-[1.25rem] before:bg-gradient-bordered-light p-4 xl:p-9 bg-multi-gradient-1 overflow-visible'>
              <div className='grid gap-5 xl:gap-8'>
                <DynamicFilterFieldArray
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
                <ShowInputError errors={errors} name='dynamicFilters' />
              </div>
            </GradientBordered>

            {/* currency servers  */}
            <GradientBordered className='rounded-[.625rem] before:rounded-[.625rem] before:bg-gradient-bordered-light p-4 xl:p-9 bg-multi-gradient-1 grid gap-4 xl:gap-8 overflow-visible'>
              <div className=''>
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
            </GradientBordered>

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
