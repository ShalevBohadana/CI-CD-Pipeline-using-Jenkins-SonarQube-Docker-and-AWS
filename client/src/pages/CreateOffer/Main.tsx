import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { BiPlus } from 'react-icons/bi';
import { ReactQuill } from '../../components/form/QuillWrapper';
import { useNavigate, useParams } from 'react-router-dom';
import { ReactTags, type Tag } from '../../components/form/ReactTagsWrapper';
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
import { API_BASE_URL, ResError } from '../../redux/api/apiSlice';
import { useUserDataQuery } from '../../redux/features/auth/authApi';
import { useGetGameQuery, useGetGamesQuery } from '../../redux/features/game/gameApi';
import {
  useCreateOfferMutation,
  useDeleteOfferMutation,
  useGetOfferQuery,
  useGetPrebuiltFiltersQuery,
  useGetTagSuggestionsQuery,
  useUpdateOfferMutation,
} from '../../redux/features/offer/offerApi';
import { useGetPromosQuery } from '../../redux/features/promo/promoApi';
import { CommonParams } from '../../types/globalTypes';
import { kebabCasedUrl } from '../../utils';
import { ACCEPTED_IMAGE_FILE_TYPES } from '../../utils/constants';
import { twMergeClsx } from '../../utils/twMergeClsx';
import { uploadImage } from '../../utils/upload';
import { CategorySuggestion } from '../CreateGame/components/Main';
import { GradientBorderedInput } from '../Profile/components/GradientBorderedInput';

import { FieldArray } from './FieldArray';

import 'react-quill/dist/quill.snow.css';
import './css/offer-description-editor-wrapper.css';
import './css/offer-tags-wrapper.css';
import DiscountIcon from '../../components/layout/Navbar/components/DiscountIcon';
import { Controller } from '../../components/form/ControllerWrapper';
import {
  ImageUploading,
  type ImageListType,
  type ImageType,
} from '../../components/form/ImageUploadingWrapper';

export const OFFER_FILTER_TYPES = {
  CHECKBOX_MULTIPLE: 'checkbox',
  CHECKBOX_TOPOGRAPHIC: 'radio',
  BAR: 'bar',
  STANDALONE: 'standalone',
} as const;
export const OFFER_DISCOUNT_TYPE = {
  FIXED: 'fixed',
  PERCENT: 'percentage',
} as const;
export type TOfferFilterType = (typeof OFFER_FILTER_TYPES)[keyof typeof OFFER_FILTER_TYPES];

export const FILTER_TYPE_OPTIONS = Object.values(OFFER_FILTER_TYPES).map((value) => ({
  value,
  label: value,
}));
export const DISCOUNT_TYPE_OPTIONS = [
  {
    value: OFFER_DISCOUNT_TYPE.FIXED,
    label: OFFER_DISCOUNT_TYPE.FIXED,
  },
  {
    value: OFFER_DISCOUNT_TYPE.PERCENT,
    label: OFFER_DISCOUNT_TYPE.PERCENT,
  },
];
export const gameCategoryOptions = [
  {
    value: 'boosters-chat-support',
    label: 'Boosters Chat support',
  },
  {
    value: 'created-ai',
    label: 'Created AI',
  },
  {
    value: 'price',
    label: 'Price',
  },
  {
    value: 'duration',
    label: 'Duration',
  },
];

export const OFFER_STATUS = {
  ACTIVATE: 'activate',
  SUSPEND: 'suspend',
} as const;

export const OFFER_TYPE = {
  REGULAR: 'regular',
  CURRENCY: 'currency',
} as const;
export type OfferType = (typeof OFFER_TYPE)[keyof typeof OFFER_TYPE];
// export type TDynamicFilterCommonProps = {
//   name: string;
//   // type: TOfferFilterType;
//   fee: number;
// };
export type TDynamicFilterCommonPropsNested = {
  name: string;
  fee: number;
  children?: TDynamicFilterCommonPropsNested[];
};

// export type TDynamicFilter = {
//   type: TOfferFilterType;
//   children?: TDynamicFilterCommonProps[];
// } & TDynamicFilterCommonProps;

const dynamicFilterCommonSchema = z.lazy(() =>
  z.object({
    name: z.string().min(2, 'A name is required'),
    fee: z
      .number()
      .min(0, 'Fee can not be less than 0')
      .multipleOf(0.01, 'Must be within 2 decimal points'),
    children: z.array(dynamicFilterCommonSchema).optional(), // Recursive definition for nested filters
  })
);

const dynamicFilterSchema = z.lazy(() =>
  z.object({
    name: z
      .string({
        required_error: 'Filter title must be a string',
      })
      .min(2, 'Filter title is required'),
    fee: z
      .number()
      .min(0, 'Fee can not be less than 0')
      .multipleOf(0.01, 'Must be within 2 decimal points'),
    type: z.nativeEnum(OFFER_FILTER_TYPES),
    children: z.array(dynamicFilterCommonSchema).optional(), // Recursive definition for nested filters
  })
);
export type DynamicFilterInputs = z.infer<typeof dynamicFilterSchema>;
export const tagObjectSchema = z.object({
  value: z.union([z.string(), z.number(), z.symbol(), z.null()]),
  label: z.string({
    required_error: 'label is required',
  }),
});

export const offerDiscountSchema = z.object({
  amount: z
    .number({
      invalid_type_error: 'amount must be a positive number',
      required_error: 'amount is required',
    })
    .min(0)
    // .positive('amount must be greater than 0')
    .multipleOf(0.01, 'Must be within 2 decimal points'),
  type: z.nativeEnum(OFFER_DISCOUNT_TYPE),
});
export type OfferDiscount = z.infer<typeof offerDiscountSchema>;

export const createOfferCommonSchema = z.object({
  offerType: z.nativeEnum(OFFER_TYPE),
  status: z.nativeEnum(OFFER_STATUS),
  sellerId: z.string().trim().min(10),
  name: z.string().trim().min(1, { message: 'Offer name is required' }),
  uid: z.string().trim().min(1),
  gameUid: z
    .string({
      required_error: 'Game name is required',
    })
    .min(1, 'Game name is required'),
  categoryUid: z
    .string({
      required_error: 'Game category is required',
    })
    .min(1, 'Game category is required'),
  featuredList: z.array(z.string()).min(1).max(3).default([]),
  description: z
    .string({
      required_error: 'Offer Description is required',
    })
    .min(10, { message: 'Offer Description must be at least 10 characters' }),
  tags: z.array(tagObjectSchema).min(1, 'Please provide at least one tag name').default([]),
  image: z
    .string({
      required_error: 'Image is required',
    })
    .min(4, 'Image is required'),
  basePrice: z
    .number({
      invalid_type_error: 'Price must be a positive number',
      required_error: 'Price is required',
    })
    .positive('Price must be greater than 0')
    .min(1)
    .multipleOf(0.01, 'Must be within 2 decimal points'),
  offerPromo: z.string().optional(),
  discount: offerDiscountSchema.optional(),
});

export type CreateOfferCommonSchema = z.infer<typeof createOfferCommonSchema>;

export const createOfferFormSchema = z.object({
  ...createOfferCommonSchema.shape,
  dynamicFilters: z.array(dynamicFilterSchema).min(1).default([]),
  approximateOrderCompletionInMinutes: z
    .number({
      invalid_type_error: 'Please provide number in minutes',
      required_error: 'Approximate order completion time in minutes is required',
    })
    .min(0),
});

export type CreateOfferFormInputs = z.infer<typeof createOfferFormSchema>;

const defaultValues: Partial<CreateOfferFormInputs> = {
  gameUid: '',
  categoryUid: '',
  dynamicFilters: [
    {
      name: '',
      type: OFFER_FILTER_TYPES.CHECKBOX_MULTIPLE,
      fee: 0,
    },
  ],
  discount: {
    amount: 0,
    type: OFFER_DISCOUNT_TYPE.FIXED,
  },
};

export type TTagSuggestion = z.infer<typeof tagObjectSchema>;

export const isSuggestionValid = (value: string) => {
  // return /^[a-z]{4,12}$/i.test(value); // for single word
  return /^[a-z\s]{4,12}$/i.test(value); // for multi-words
};
export const RTE_COLOR_PLATTE = [
  '#f16334',
  '#ebddd0',
  '#000000',
  '#ffffff',
  //
  '#ffe6d6',
  '#f9b69f',
  '#d93c92',
] as const;
export const Main = () => {
  const { uid } = useParams<CommonParams>();
  const [savedFilter, setSavedFilter] = useState<Partial<CreateOfferFormInputs>>();

  const { data: offerResponse } = useGetOfferQuery(uid || '', {
    skip: !uid,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
  const offerData = offerResponse?.data;
  const { data: userRes } = useUserDataQuery(undefined, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });
  const sellerId = userRes?.data?._id;
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
  } = useForm<CreateOfferFormInputs>({
    defaultValues: savedFilter || offerData || defaultValues,
    resolver: zodResolver(createOfferFormSchema),
  });
  const FEATURED_LIST_MAX_ITEMS = 3;
  const FEATURED_LIST_ARRAY = Array.from(Array(FEATURED_LIST_MAX_ITEMS).keys());
  const [images, setImages] = useState<ImageType[]>([]);
  const [selected, setSelected] = useState<Tag[]>([]);

  const { data: filtersRes } = useGetPrebuiltFiltersQuery(undefined, {
    skip: !!isEditing,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
  const { data: tagsRes } = useGetTagSuggestionsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
  const prebuiltFilters =
    filtersRes?.data.map((filter) => ({
      label: filter.label,
      value: JSON.stringify(filter.value),
    })) || [];
  const tagSuggestions = tagsRes?.data || [];

  const { data: gamesData } = useGetGamesQuery('', {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
  const { data: promosData } = useGetPromosQuery('', {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
  const [deleteOffer] = useDeleteOfferMutation();
  const [createOffer] = useCreateOfferMutation();
  const [updateOffer] = useUpdateOfferMutation();

  const gameNameOptions = gamesData?.data?.map((game) => ({
    uid: game.uid,
    name: game.name,
  }));
  const promoNameOptions = promosData?.data?.map((promo) => ({
    value: promo.code,
    label: promo.code,
  }));

  // const [activeGameUid, setActiveGameUid] = useState('');
  const { data: currentGameRes } = useGetGameQuery(offerData?.gameUid || '', {
    skip: !offerData?.gameUid,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
  const currentGameCategories = useMemo(
    () => currentGameRes?.data?.categories,
    [currentGameRes?.data?.categories]
  );

  const [categoriesToShow, setCategoriesToShow] = useState<CategorySuggestion[]>([]);
  // Update defaultValues when offerData changes
  useEffect(() => {
    if (isEditing && currentGameCategories) {
      const gameCategories = currentGameCategories.filter(
        (game: CategorySuggestion) => game.value === getValues('categoryUid')
      );
      setCategoriesToShow(gameCategories);
    }
  }, [isEditing, gamesData, currentGameCategories, getValues]);
  useEffect(() => {
    if (offerData) {
      setSelected(offerData.tags.map((tag) => ({ value: tag.value, label: tag.label }) as Tag));
      reset(offerData); // Update defaultValues with offerData
    }
  }, [offerData, reset]);

  useEffect(() => {
    if (savedFilter) {
      reset(savedFilter); // Update defaultValues with selected filters
    }
  }, [savedFilter, reset]);

  // const { fields, remove, append } = useFieldArray({
  //   control,
  //   name: 'dynamicFilters',
  // });

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

  useEffect(() => {
    register('description');
  }, [register]);

  const onEditorStateChange = (editorState: string) => {
    setValue('description', editorState);
  };

  const handleOfferImageUpload = async (imageList: ImageListType) => {
    // data for submit
    // console.log(imageList, addUpdateIndex);
    setImages(imageList);

    if (imageList[0]?.file) {
      const result = await uploadImage({
        image: imageList[0].file,
        folderName: FOLDER_NAME.OFFER,
      });
      console.log({ API_BASE_URL, result: result.data });
      setValue('image', result.data);
    }
  };

  const handleOfferRemove = async () => {
    if (!isEditing) return;
    // data for submit
    const result = await deleteOffer(uid).unwrap();
    if (result?.message) {
      toast.success(result?.message);
    }
    navigate(ROUTER_PATH.ADMIN_OFFERS);
  };

  const offerStatusValue = watch('status');

  const toggleOfferStatus = async () => {
    if (!isEditing) return;
    setValue(
      'status',
      offerStatusValue === OFFER_STATUS.ACTIVATE ? OFFER_STATUS.SUSPEND : OFFER_STATUS.ACTIVATE
    );
    const result = await updateOffer({
      uid: getValues().uid,
      status: getValues().status,
    }).unwrap();
    if (result?.message) {
      toast.success(result?.message);
    }
    navigate(ROUTER_PATH.ADMIN_OFFERS);
  };

  const offerDescriptionContent = watch('description');
  const offerPromoValue = watch('offerPromo');

  const featuredImg = (images[0]?.dataUrl as string) || offerData?.image || defaultValues?.image;

  const onSubmit: SubmitHandler<CreateOfferFormInputs> = async (data) => {
    console.log(data);
    try {
      let successMessage: string;
      if (isEditing) {
        const result = await updateOffer({
          ...data,
          _id: offerData!._id,
        }).unwrap();
        successMessage = result.message;
      } else {
        const result = await createOffer(data).unwrap();
        successMessage = result.message;
      }
      if (successMessage) {
        toast.success(successMessage);
      }
      navigate(ROUTER_PATH.ADMIN_OFFERS);
    } catch (error) {
      const { message } = (error as ResError).data;
      if (message) toast.error(message);
    }
  };
  // if (sellerId) {
  //   setValue('sellerId', sellerId);
  // }
  return (
    <main className='relative isolate z-0 py-4 xl:py-4'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type='hidden'
          readOnly
          {...register('status')}
          defaultValue={OFFER_STATUS.ACTIVATE}
        />
        {!isEditing ? (
          <>
            <input
              type='hidden'
              readOnly
              {...register('offerType')}
              defaultValue={OFFER_TYPE.REGULAR}
            />
            <input type='hidden' readOnly {...register('sellerId')} defaultValue={sellerId} />
          </>
        ) : null}
        <div className='fb-container flex flex-col gap-4 xl:gap-8'>
          <div className='w-full flex flex-wrap items-center gap-5 font-bold font-tti-bold leading-none'>
            <label
              htmlFor='offerName'
              className='text-[clamp(1.25rem,3vw,2.25rem)] first-letter:uppercase'
            >
              offer name :
            </label>
            <input
              type='text'
              id='offerName'
              placeholder='Enter offer name'
              className='p-2 text-[clamp(1.5rem,4vw,3rem)] text-brand-primary-color-1/30 bg-clip-text bg-[linear-gradient(293deg,var(--tw-gradient-stops))] from-brand-primary-color-1 to-brand-primary-color-light animate-text-gradient border-b border-b-transparent placeholder-shown:border-b-brand-primary-color-1 grow xl:grow-[0.5] max-w-full'
              {...register('name', {
                onChange: (ev: ChangeEvent<HTMLInputElement>) => {
                  if (!isEditing) {
                    setValue('uid', kebabCasedUrl(ev.target.value));
                  }
                },
              })}
            />
            <div className='w-full'>
              <ShowInputError errors={errors} name='name' />
            </div>
          </div>

          {/* control box */}
          <div className='flex flex-wrap gap-5 justify-center items-start z-20'>
            {offerData ? (
              <div className='flex flex-wrap gap-5 justify-center xl:justify-start'>
                <button
                  type='button'
                  onClick={toggleOfferStatus}
                  className={`px-3 xl:px-8 py-3 xl:py-4 rounded-[.25rem] inline-flex justify-center items-center gap-1 xl:gap-2.5 ${
                    offerStatusValue === OFFER_STATUS.ACTIVATE
                      ? 'bg-brand-primary-color-1'
                      : 'bg-brand-blue-550'
                  } text-white hover:text-brand-primary-color-1 hover:bg-brand-primary-color-light transition-all`}
                >
                  <span className='first-letter:uppercase inline-block font-tti-regular font-normal text-base leading-none line-clamp-1 text-start'>
                    {offerStatusValue === OFFER_STATUS.ACTIVATE
                      ? OFFER_STATUS.SUSPEND
                      : OFFER_STATUS.ACTIVATE}{' '}
                    this offer
                  </span>
                </button>
                <button
                  type='button'
                  onClick={handleOfferRemove}
                  className='px-3 xl:px-8 py-3 xl:py-4 rounded-[.25rem] inline-flex justify-center items-center gap-1 xl:gap-2.5 bg-brand-primary-color-1 text-white hover:text-brand-primary-color-1 hover:bg-brand-primary-color-light transition-all'
                >
                  <span className='first-letter:uppercase inline-block font-tti-regular font-normal text-base leading-none line-clamp-1 text-start'>
                    remove this offer
                  </span>
                </button>
              </div>
            ) : null}

            {!isEditing ? (
              <div className='xl:ml-auto'>
                <SelectDropdown
                  placeholder='Prebuilt filters'
                  onChange={(val) => {
                    const selectedFilter = JSON.parse(val) as DynamicFilterInputs[];
                    setSavedFilter({ dynamicFilters: selectedFilter });
                    // console.log(savedFilter);
                  }}
                  options={prebuiltFilters}
                  displayPropName='label'
                  valuePropName='value'
                  buttonClassName='w-48'
                />
              </div>
            ) : null}
          </div>

          <div className='grid gap-8 pb-8'>
            {/* filter info */}
            <GradientBordered className='rounded-[1.25rem] before:rounded-[1.25rem] before:bg-gradient-bordered-light p-4 xl:p-9 bg-multi-gradient-1 overflow-visible z-10'>
              <div className='grid gap-5 xl:gap-8'>
                <FieldArray
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

            {/* offer details  */}
            <GradientBordered className='rounded-[.625rem] before:rounded-[.625rem] before:bg-gradient-bordered-light p-4 xl:p-9 bg-multi-gradient-1 overflow-visible grid gap-5 xl:gap-8'>
              <div className='w-full grid xl:grid-cols-3 items-start gap-5'>
                <Controller
                  name='gameUid'
                  control={control}
                  render={({ field, fieldState, formState }) => {
                    const { onChange: gameNameChange, value, name } = field;
                    return (
                      <SelectDropdown
                        label='Select game'
                        placeholder='game name'
                        // onChange={(ev) => console.log(ev)}
                        onChange={(ev) => {
                          gameNameChange(ev);
                          // setActiveGameUid(value);
                          const gameCategories = gamesData!.data!.find(
                            (game) => game.uid === getValues('gameUid')
                          )!.categories!;
                          setCategoriesToShow(gameCategories);
                        }}
                        options={gameNameOptions || [{ uid: '', name: '' }]}
                        displayPropName='name'
                        valuePropName='uid'
                        selectedDefaultValue={value}
                        buttonClassName='max-w-[clamp(15.25rem,80vw,19.25rem)] xl:max-w-[unset]'
                        errors={errors}
                        name='gameUid'
                      />
                    );
                  }}
                />

                <Controller
                  name='categoryUid'
                  control={control}
                  render={({ field: { onChange: gameCategoryChange, value, name } }) => (
                    <SelectDropdown
                      label='Select category'
                      placeholder='category name'
                      // onChange={(ev) => console.log(ev)}
                      onChange={gameCategoryChange}
                      options={categoriesToShow}
                      displayPropName='label'
                      valuePropName='value'
                      selectedDefaultValue={value}
                      buttonClassName='max-w-[clamp(15.25rem,80vw,19.25rem)] xl:max-w-[unset]'
                      errors={errors} 
                      name='categoryUid'
                    />
                  )}
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
            </GradientBordered>

            {/* images and meta info  */}
            <GradientBordered className='rounded-[.625rem] before:rounded-[.625rem] before:bg-gradient-bordered-light p-4 xl:p-9 bg-multi-gradient-1 grid gap-4 xl:gap-8 overflow-visible'>
              <div className='grid xl:grid-cols-2 gap-5'>
                {/* image uploading  */}
                <div className=''>
                  {/* offer image  */}
                  <ImageUploading
                    value={images}
                    onChange={handleOfferImageUpload}
                    multiple={false}
                    dataURLKey='dataUrl'
                    acceptType={[...ACCEPTED_IMAGE_FILE_TYPES]}
                    aria-label='upload image'
                  >
                    {(props) => {
                      const { imageList, onImageUpload, onImageUpdate, isDragging, dragProps } =
                        props;

                      return (
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
                                  <source
                                    media='(min-width: 350px)'
                                    srcSet={`${featuredImg} 291w`}
                                  />
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
                            <Controller
                              name='offerPromo'
                              control={control}
                              defaultValue=''
                              render={({ field: { onChange: offerPromoChange, value, name } }) => (
                                <SelectDropdown
                                  placeholder='Select promo'
                                  // onChange={(ev) => console.log(ev)}
                                  onChange={offerPromoChange}
                                  options={promoNameOptions || [{ value: '', label: '' }]}
                                  displayPropName='label'
                                  valuePropName='value'
                                  selectedDefaultValue={value}
                                  buttonClassName='w-48'
                                  errors={errors}
                                  name='offerPromo'
                                />
                              )}
                            />

                            <div className='max-w-[theme(width.48)]'>
                              <GradientBorderedInput
                                label='Discount'
                                placeholder='5'
                                type='number'
                                errors={errors}
                                step={0.01}
                                icon={
                                  <DiscountIcon
                                    type={watch('discount.type') as 'fixed' | 'percentage'}
                                  />
                                }
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
                      );
                    }}
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
              <div className='grid gap-5 lg:grid-cols-2 items-start'>
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
                <GradientBorderedInput
                  label='Approx. order completion time in minutes'
                  placeholder='10'
                  type='number'
                  errors={errors}
                  register={register('approximateOrderCompletionInMinutes', {
                    valueAsNumber: true,
                  })}
                />
              </div>
            </GradientBordered>

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
