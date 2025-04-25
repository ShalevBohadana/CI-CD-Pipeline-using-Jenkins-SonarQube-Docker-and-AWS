import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { ImageListType, ImageType } from 'react-images-uploading';
import { useNavigate } from 'react-router-dom';
import { ReactTags } from '../../../components/form/ReactTagsWrapper';
import { Tag, TagSuggestion } from 'react-tag-autocomplete';
import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';

import { GameUpsellDisplay } from '../../../components/ui/GameUpsellDisplay';
import { GradientBordered } from '../../../components/ui/GradientBordered';
import { ShowInputError } from '../../../components/ui/ShowInputError';
import { FOLDER_NAME } from '../../../enums';
import { ROUTER_PATH } from '../../../enums/router-path';
import { ResError } from '../../../redux/api/apiSlice';
import {
  useCreateGameMutation,
  useDeleteGameMutation,
  useGetCategoriesQuery,
  useUpdateGameMutation,
} from '../../../redux/features/game/gameApi';
import { kebabCasedUrl } from '../../../utils';
import { ACCEPTED_IMAGE_FILE_TYPES } from '../../../utils/constants';
import { twMergeClsx } from '../../../utils/twMergeClsx';
import { uploadImage } from '../../../utils/upload';
import { isSuggestionValid } from '../../CreateOffer/Main';
import { GradientBorderedInput } from '../../Profile/components/GradientBorderedInput';

import { FieldArray } from './FieldArray';

import '../css/offer-tags-wrapper.css';
import { useCreateGameContext } from '../context/CreateGameContext';
import { ImageUploading } from '../../../components/form/ImageUploadingWrapper';

export const GAME_STATUS = {
  ACTIVATE: 'activate',
  SUSPEND: 'suspend',
} as const;

const gameSliderSchema = z.object({
  heading: z.string().trim().min(1, { message: 'Slider title is required' }),
  imageUrl: z.string().trim().url(),
  videoUrl: z.union([z.string().url(), z.literal('')]).optional(),
  createdAt: z.coerce.date({
    invalid_type_error: 'Please provide a valid date',
    required_error: 'Date is required',
  }),
});
export type GameSlider = z.infer<typeof gameSliderSchema>;

const categorySuggestionSchema = z.object({
  value: z.union([z.string(), z.number(), z.symbol(), z.null()]),
  label: z.string({
    required_error: 'label is required',
  }),
});
export type CategorySuggestion = z.infer<typeof categorySuggestionSchema>;

const gameUpsellSchema = z.object({
  title: z.union([
    z.string().trim().min(2, { message: 'Upsell title is required' }),
    z.literal(''),
  ]),
  description: z.union([
    z.string().trim().min(2, { message: 'Upsell description is required' }),
    z.literal(''),
  ]),
  imageUrl: z.union([z.string().trim().url(), z.literal('')]),
});
export type GameUpsell = z.infer<typeof gameUpsellSchema>;

const createGameFormInputsSchema = z.object({
  status: z.nativeEnum(GAME_STATUS),
  name: z.string().trim().min(1, { message: 'Game name is required' }),
  uid: z.string().trim().min(1),
  title: z.string().trim().min(1, { message: 'Game title is required' }),
  showInMenu: z.boolean(),
  isFeatured: z.boolean(),

  bannerUrl: z.string().trim().url(),
  imageUrl: z.string().trim().url(),

  sliders: z.array(gameSliderSchema).min(1).default([]),
  categories: z
    .array(categorySuggestionSchema)
    .min(1, 'Please provide at least one category name')
    .default([]),

  upsell: gameUpsellSchema.optional(),
  // 'upsell:title': z.union([
  //   z.string().trim().min(2, { message: 'Upsell title is required' }),
  //   z.literal(''),
  // ]),
  // 'upsell:description': z.union([
  //   z.string().trim().min(2, { message: 'Upsell description is required' }),
  //   z.literal(''),
  // ]),
  // 'upsell:imageUrl': z.union([z.string().trim().url(), z.literal('')]),
  // // 'upsell:actionLabel': z
  // //   .string()
  // //   .trim()
  // //   .min(1, { message: 'Upsell button label is required' })
  // //   .optional(),
  // // 'upsell:actionUrl': z.string().trim().url().optional(),
});
export type CreateGameFormInputs = z.infer<typeof createGameFormInputsSchema>;

const defaultValues: Partial<CreateGameFormInputs> = {
  showInMenu: true,
  isFeatured: false,
  sliders: [
    {
      heading: '',
      imageUrl: '',
      createdAt: new Date(Date.now()),
    },
  ],
};
export const Main = () => {
  const { uid, gameData } = useCreateGameContext();
  const navigate = useNavigate();
  const isEditing = !!uid;

  const [deleteGame] = useDeleteGameMutation();
  const [createGame] = useCreateGameMutation();
  const [updateGame] = useUpdateGameMutation();
  const [gameImages, setGameImages] = useState<ImageType[]>([]);
  const [gameBannerImages, setGameBannerImages] = useState<ImageType[]>([]);
  const [upsellImages, setUpsellImages] = useState<ImageType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Tag[]>([]);
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    watch,
    control,

    formState: { errors },
  } = useForm<CreateGameFormInputs>({
    defaultValues: gameData || defaultValues,
    resolver: zodResolver(createGameFormInputsSchema),
  });

  const { data: categories } = useGetCategoriesQuery(undefined, {
    // skip: !isEditing,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    refetchOnFocus: true,
  });
  const categorySuggestions = (categories?.data || []).map(
    (tag): TagSuggestion => ({
      value: tag.value || '',
      label: tag.label || '',
    })
  );
  // Update defaultValues when gameData changes
  useEffect(() => {
    if (gameData) {
      setSelectedCategory(
        gameData.categories.map((category) => ({
          value: category.value,
          label: category.label || '',
        }))
      );
      reset(gameData); // Update defaultValues with gameData
    }
  }, [gameData, reset]);

  const onAdd = useCallback(
    (newCategory: Tag) => {
      const formatted = {
        value: kebabCasedUrl(newCategory.value as string),
        label: newCategory.label,
      };
      setSelectedCategory([...selectedCategory, formatted]);
      setValue('categories', [...selectedCategory, formatted]);
    },
    [selectedCategory, setValue]
  );

  const onDelete = useCallback(
    (tagIndex: number) => {
      setSelectedCategory(selectedCategory.filter((_, i) => i !== tagIndex));
      setValue(
        'categories',
        selectedCategory.filter((_, i) => i !== tagIndex)
      );
    },
    [selectedCategory, setValue]
  );

  const onValidate = useCallback((value: string) => isSuggestionValid(value), []);

  const handleCreateGameImageUpload = async (imageList: ImageListType) => {
    // data for submit
    // console.log(imageList, addUpdateIndex);
    setGameImages(imageList);

    if (imageList[0]?.file) {
      const result = await uploadImage({
        image: imageList[0].file,
        folderName: FOLDER_NAME.GAME,
      });
      setValue('imageUrl', result.data);
    }
  };

  const handleGameBannerImageUpload = async (imageList: ImageListType) => {
    // data for submit
    // console.log(imageList, addUpdateIndex);
    setGameBannerImages(imageList);
    if (imageList[0]?.file) {
      const result = await uploadImage({
        image: imageList[0].file,
        folderName: FOLDER_NAME.GAME,
      });
      setValue('bannerUrl', result.data);
    }
  };
  const handleUpsellImageUpload = async (imageList: ImageListType) => {
    // data for submit
    // console.log(imageList, addUpdateIndex);
    setUpsellImages(imageList);
    if (imageList[0]?.file) {
      const result = await uploadImage({
        image: imageList[0].file,
        folderName: FOLDER_NAME.GAME,
      });
      setValue('upsell.imageUrl', result.data);
    }
  };

  const handleGameRemove = async () => {
    if (!isEditing) return;
    // data for submit
    const result = await deleteGame(uid).unwrap();
    if (result?.message) {
      toast.success(result?.message);
    }
    navigate(ROUTER_PATH.ADMIN_GAMES);
  };

  const gameStatusValue = watch('status');
  const toggleGameStatus = async () => {
    if (!isEditing) return;
    setValue(
      'status',
      gameStatusValue === GAME_STATUS.ACTIVATE ? GAME_STATUS.SUSPEND : GAME_STATUS.ACTIVATE
    );
    const result = await updateGame({
      ...getValues(),
      _id: gameData!._id,
    }).unwrap();
    if (result?.message) {
      toast.success(result?.message);
    }
    navigate(ROUTER_PATH.ADMIN_GAMES);
  };

  // create a function that'll toggle the game status

  const uploadedGameImage =
    (gameImages[0]?.dataUrl as string) || gameData?.imageUrl || defaultValues?.imageUrl;

  const uploadedGameBannerImage =
    (gameBannerImages[0]?.dataUrl as string) || gameData?.bannerUrl || defaultValues?.bannerUrl;

  // const uploadedUpsellImage =
  //   (upsellImages[0]?.dataUrl as string) ||
  //   gameData?.['upsell:imageUrl'] ||
  //   defaultValues?.['upsell:imageUrl'];
  const uploadedUpsellImage =
    (upsellImages[0]?.dataUrl as string) ||
    gameData?.upsell?.imageUrl ||
    defaultValues?.upsell?.imageUrl;

  const onSubmit: SubmitHandler<CreateGameFormInputs> = async (data) => {
    let successMessage: string;
    try {
      if (isEditing) {
        const result = updateGame({ ...data, _id: gameData!._id }).unwrap();
        successMessage = (await result).message;
      } else {
        const result = createGame(data).unwrap();
        successMessage = (await result).message;
      }
      toast.success(successMessage);
      navigate(ROUTER_PATH.ADMIN_GAMES);
    } catch (error) {
      const { message } = (error as ResError).data;
      if (message) toast.error(message);
    }
  };

  return (
    <main className='relative isolate z-0 py-4 xl:py-4'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type='hidden' {...register('status')} defaultValue={GAME_STATUS.ACTIVATE} />
        {/* <input type="hidden" {...register('upsell')} /> */}
        {isEditing && <input type='hidden' {...register('uid')} defaultValue={uid} />}
        <div className='fb-container flex flex-col gap-4 xl:gap-8'>
          {/* <div className="w-full flex flex-wrap items-center gap-5 font-bold font-tti-bold leading-none">
            <label
              htmlFor="gameName"
              className="text-[clamp(1.25rem,3vw,2.25rem)] first-letter:uppercase"
            >
              game name :
            </label>
            <input
              type="text"
              id="gameName"
              placeholder="Enter game name"
              className="p-2 text-[clamp(1.5rem,4vw,3rem)] text-brand-primary-color-1/30 bg-clip-text bg-[linear-gradient(293deg,var(--tw-gradient-stops))] from-brand-primary-color-1 to-brand-primary-color-light animate-text-gradient border-b border-b-transparent placeholder-shown:border-b-brand-primary-color-1 grow xl:grow-[0.5] max-w-full"
              {...register('name', {
                onChange: (ev: ChangeEvent<HTMLInputElement>) => {
                  setValue('uid', kebabCasedUrl(ev.target.value));
                },
              })}
            />
            <div className="w-full">
              <ShowInputError errors={errors} name="name" />
            </div>
          </div> */}

          {/* control box */}
          <div className='flex flex-wrap gap-5 justify-center items-start z-20'>
            {gameData ? (
              <div className='flex flex-wrap gap-5 justify-center xl:justify-start'>
                <button
                  type='button'
                  onClick={toggleGameStatus}
                  className={`px-3 xl:px-8 py-3 xl:py-4 rounded-[.25rem] inline-flex justify-center items-center gap-1 xl:gap-2.5 ${
                    gameStatusValue === GAME_STATUS.ACTIVATE
                      ? 'bg-brand-primary-color-1'
                      : 'bg-brand-blue-550'
                  } text-white hover:text-brand-primary-color-1 hover:bg-brand-primary-color-light transition-all`}
                >
                  <span className='first-letter:uppercase inline-block font-tti-regular font-normal text-base leading-none line-clamp-1 text-start'>
                    {gameStatusValue === GAME_STATUS.ACTIVATE
                      ? GAME_STATUS.SUSPEND
                      : GAME_STATUS.ACTIVATE}{' '}
                    this game
                  </span>
                </button>
                <button
                  type='button'
                  onClick={handleGameRemove}
                  className='px-3 xl:px-8 py-3 xl:py-4 rounded-[.25rem] inline-flex justify-center items-center gap-1 xl:gap-2.5 bg-brand-primary-color-1 text-white hover:text-brand-primary-color-1 hover:bg-brand-primary-color-light transition-all'
                >
                  <span className='first-letter:uppercase inline-block font-tti-regular font-normal text-base leading-none line-clamp-1 text-start'>
                    remove this game
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
            {/* game info  */}
            <GradientBordered className='rounded-[.625rem] before:rounded-[.625rem] before:bg-gradient-bordered-light p-4 xl:p-9 bg-multi-gradient-1 grid gap-4 xl:gap-8 overflow-visible'>
              <h2 className='capitalize text-center font-semibold font-tti-demi-bold text-[clamp(1.25rem,4vw,2rem)] leading-tight'>
                game information
              </h2>
              <div className='grid xl:grid-cols-10 gap-8'>
                {/* game image  */}
                <div className='xl:col-span-3 flex flex-col gap-2 xl:gap-4'>
                  <p className='first-letter:uppercase text-brand-black-10 text-sm xl:text-lg leading-none font-normal'>
                    image
                  </p>
                  <ImageUploading
                    value={gameImages}
                    onChange={handleCreateGameImageUpload}
                    multiple={false}
                    dataURLKey='dataUrl'
                    acceptType={[...ACCEPTED_IMAGE_FILE_TYPES]}
                    aria-label='upload image'
                  >
                    {({
                      imageList,
                      onImageUpload,

                      isDragging,
                      dragProps,
                    }) => {
                      return (
                        <div className='flex flex-col flex-wrap justify-center xl:justify-start gap-5 md:flex-row'>
                          <div
                            role='button'
                            tabIndex={0}
                            onKeyUp={() => {}}
                            className={twMergeClsx(`group relative isolate z-0 overflow-clip flex cursor-pointer items-center justify-center rounded-lg ${
                              uploadedGameImage
                                ? ''
                                : 'bg-brand-black-90 [&.active]:bg-brand-black-110'
                            }  outline-1 outline-dashed w-full max-w-xs h-96 max-h-[22.5rem] transition-colors ${
                              imageList?.length || uploadedGameImage
                                ? 'outline-transparent'
                                : 'outline-brand-primary-color-light'
                            }
                        ${
                          isDragging
                            ? 'text-brand-primary-color-1 outline-brand-primary-color-1'
                            : ''
                        }
                        `)}
                            onClick={onImageUpload}
                            {...dragProps}
                          >
                            {uploadedGameImage ? (
                              <figure className='max-w-xs mx-auto w-full h-full relative isolate z-0 top-left-sharp-cut rounded-[.625rem] overflow-clip group'>
                                <picture className='inline-flex justify-center items-center w-full h-full'>
                                  <source media='(min-width: 350px)' srcSet={uploadedGameImage} />
                                  <img
                                    src={uploadedGameImage}
                                    alt='description'
                                    className='object-cover group-hover:scale-110 transition-transform w-full h-full'
                                    loading='lazy'
                                    width='420'
                                    height='470'
                                    decoding='async'
                                    // fetchPriority="low"
                                  />
                                </picture>
                                <figcaption className='absolute inset-0 z-10 bg-brand-black-100/[.65] text-white group-hover:text-brand-primary-color-1 transition-colors font-zen-dots text-[clamp(1.5rem,4vw,3rem)] md:text-[clamp(1.5rem,2vw,2rem)] font-normal leading-tight text-center flex items-center justify-center'>
                                  {watch('name')}
                                </figcaption>
                              </figure>
                            ) : (
                              <span className='flex h-full w-full items-center justify-center rounded-md px-5 py-2.5 text-center'>
                                Click or Drop here to
                                <br /> upload an image
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    }}
                  </ImageUploading>
                  {/* image uploading status */}
                  <input type='hidden' {...register('imageUrl')} className='sr-only' />
                  <ShowInputError errors={errors} name='imageUrl' />
                </div>
                <div className='xl:col-span-7 grid gap-5 items-start self-start'>
                  <GradientBorderedInput
                    label='Name'
                    placeholder='Game name'
                    type='text'
                    errors={errors}
                    register={register('name', {
                      onChange: (ev: ChangeEvent<HTMLInputElement>) => {
                        if (!isEditing) {
                          setValue('uid', kebabCasedUrl(ev.target.value));
                        }
                      },
                    })}
                  />

                  <GradientBorderedInput
                    label='Page title'
                    placeholder='Page title'
                    type='text'
                    errors={errors}
                    register={register('title')}
                  />

                  <div className='flex flex-col gap-2 xl:gap-4 relative'>
                    <p className='text-brand-black-10 text-sm xl:text-lg leading-none font-normal'>
                      <span className='first-letter:uppercase inline-block'>categories</span>
                    </p>
                    <GradientBordered className='offer-tags-wrapper rounded-[.625rem] before:rounded-[.625rem] before:bg-gradient-bordered-deep overflow-visible px-4 py-[.675rem] z-10'>
                      {categorySuggestions ? (
                        <ReactTags
                          allowNew
                          placeholderText='Add a category'
                          onAdd={onAdd}
                          onDelete={onDelete}
                          onValidate={onValidate}
                          selected={selectedCategory as Tag[]}
                          suggestions={categorySuggestions}
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
                    <ShowInputError errors={errors} name='categories' />
                  </div>
                </div>
              </div>

              {/* game banner  */}
              <div className='flex flex-col gap-2 xl:gap-4 relative'>
                <p className='text-brand-black-10 text-sm xl:text-lg leading-none font-normal'>
                  <span className='first-letter:uppercase inline-block'>banner image</span>
                </p>
                <ImageUploading
                  value={gameBannerImages}
                  onChange={handleGameBannerImageUpload}
                  multiple={false}
                  dataURLKey='dataUrl'
                  acceptType={[...ACCEPTED_IMAGE_FILE_TYPES]}
                  aria-label='upload image'
                >
                  {({
                    imageList,
                    onImageUpload,

                    isDragging,
                    dragProps,
                  }) => (
                    // write your building UI
                    <div className='flex flex-col flex-wrap justify-center xl:justify-start gap-5 md:flex-row'>
                      <div
                        role='button'
                        tabIndex={0}
                        onKeyUp={() => {}}
                        className={twMergeClsx(`group relative isolate z-0 overflow-clip flex cursor-pointer items-center justify-center rounded-2xl bg-brand-black-90 [&.active]:bg-brand-black-110 outline-1 outline-dashed w-full h-96 xl:h-[28rem] max-h-[27.125rem] transition-colors ${
                          imageList?.length || uploadedGameBannerImage
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
                        {uploadedGameBannerImage ? (
                          <picture className='flex justify-center items-center w-full h-full select-none group-hover:opacity-80 transition-opacity'>
                            <source media='(min-width: 350px)' srcSet={uploadedGameBannerImage} />
                            <img
                              src={uploadedGameBannerImage}
                              alt='description'
                              className='w-full h-full object-cover object-[60%] xl:object-left-top'
                              loading='lazy'
                              width='1280'
                              height='434'
                              decoding='async'
                              // fetchPriority="low"
                              draggable='false'
                            />
                          </picture>
                        ) : (
                          // <figure className="grid relative isolate z-0 overflow-clip rounded-[.25rem] after:absolute after:inset-0 after:z-10 after:bg-[linear-gradient(0deg,theme(colors.black/.95)_10%,theme(colors.brand.black.120/.5)_60%)] after:pointer-events-none max-w-xs w-full max-h-[20.625rem] h-full">
                          //   <picture className="row-span-full col-span-full z-0">
                          //     <source
                          //       media="(min-width: 350px)"
                          //       srcSet={`${uploadedGameBannerImage} 291w`}
                          //     />
                          //     <img
                          //       src={uploadedGameBannerImage}
                          //       alt="description"
                          //       className="w-full h-full object-cover object-center"
                          //       loading="lazy"
                          //       width="291"
                          //       height="300"
                          //       decoding="async"
                          //       // fetchPriority="low"
                          //     />
                          //   </picture>
                          // </figure>
                          <span className='flex h-full w-full items-center justify-center rounded-md px-5 py-2.5 text-center'>
                            Click or Drop here to
                            <br /> upload an image
                          </span>
                        )}
                      </div>

                      {/* <div className="grid gap-4 place-items-start justify-center xl:justify-between">
                        <button
                          type="button"
                          onClick={() => onImageUpdate(0)}
                          className="self-center justify-self-center xl:justify-self-start xl:self-end group px-3 xl:px-6 py-2.5 rounded-[.25rem] inline-flex justify-center items-center gap-1 xl:gap-2.5 bg-brand-primary-color-1 text-white hover:text-brand-primary-color-1 hover:bg-brand-primary-color-light transition-all"
                        >
                          <BiPlus className="w-5 h-5 shrink-0" />
                          <span className="capitalize font-tti-regular font-normal text-base leading-none line-clamp-1 text-start">
                            picture
                          </span>
                        </button>
                      </div> */}
                    </div>
                  )}
                </ImageUploading>
                {/* image uploading status */}
                <input type='hidden' {...register('bannerUrl')} className='sr-only' />
                <ShowInputError errors={errors} name='bannerUrl' />
              </div>

              <div className='flex flex-col gap-2 xl:gap-[.875rem] relative font-oxanium'>
                <label className='flex grow gap-3 items-end relative isolate z-0 cursor-pointer text-sm leading-none font-normal text-brand-black-20 font-oxanium'>
                  <input
                    type='checkbox'
                    id='showInMenu'
                    className='appearance-none sr-only peer'
                    defaultChecked={defaultValues?.showInMenu}
                    {...register('showInMenu')}
                  />
                  <span className='peer-checked:bg-brand-primary-color-1 transition-colors checked-bg-image-check-mark-black bg-center bg-no-repeat inline-flex w-4 aspect-square border-2 border-brand-primary-color-1/50 bg-transparent rounded-sm shrink-0' />
                  <span className='inline-block first-letter:uppercase'>
                    Display this game in menu
                  </span>
                </label>

                <ShowInputError errors={errors} name='showInMenu' />
              </div>
              <div className='flex flex-col gap-2 xl:gap-[.875rem] relative font-oxanium'>
                <label className='flex grow gap-3 items-end relative isolate z-0 cursor-pointer text-sm leading-none font-normal text-brand-black-20 font-oxanium'>
                  <input
                    type='checkbox'
                    id='isFeatured'
                    className='appearance-none sr-only peer'
                    defaultChecked={defaultValues?.isFeatured}
                    {...register('isFeatured')}
                  />
                  <span className='peer-checked:bg-brand-primary-color-1 transition-colors checked-bg-image-check-mark-black bg-center bg-no-repeat inline-flex w-4 aspect-square border-2 border-brand-primary-color-1/50 bg-transparent rounded-sm shrink-0' />
                  <span className='inline-block first-letter:uppercase'>Feature this game</span>
                </label>

                <ShowInputError errors={errors} name='showInMenu' />
              </div>
            </GradientBordered>

            {/* slider info */}
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
                <ShowInputError errors={errors} name='sliders' />
              </div>
            </GradientBordered>

            {/* game upsell  */}
            <GradientBordered className='rounded-[.625rem] before:rounded-[.625rem] before:bg-gradient-bordered-light p-4 xl:p-9 bg-multi-gradient-1 overflow-clip flex flex-col gap-5 xl:gap-8'>
              <h2 className='capitalize text-center font-semibold font-tti-demi-bold text-[clamp(1.25rem,4vw,2rem)] leading-tight'>
                game display
              </h2>

              <div className='xl:col-span-3 flex flex-col gap-2 xl:gap-4'>
                <p className='first-letter:uppercase text-brand-black-10 text-sm xl:text-lg leading-none font-normal'>
                  image
                </p>
                <ImageUploading
                  value={upsellImages}
                  onChange={handleUpsellImageUpload}
                  multiple={false}
                  dataURLKey='dataUrl'
                  acceptType={[...ACCEPTED_IMAGE_FILE_TYPES]}
                  aria-label='upload image'
                >
                  {({
                    imageList,
                    onImageUpload,

                    isDragging,
                    dragProps,
                  }) => (
                    // write your building UI
                    <div className='flex flex-col flex-wrap justify-center xl:justify-start gap-5 md:flex-row'>
                      <div
                        role='button'
                        tabIndex={0}
                        onKeyUp={() => {}}
                        className={twMergeClsx(`group relative isolate z-0 overflow-clip flex cursor-pointer items-center justify-center rounded-lg bg-brand-black-90 [&.active]:bg-brand-black-110 outline-1 outline-dashed w-full h-full min-h-[6rem] transition-colors ${
                          imageList?.length || uploadedUpsellImage
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
                        {uploadedUpsellImage ? (
                          <GameUpsellDisplay
                            payload={{
                              title: watch('upsell.title'),
                              description: watch('upsell.description'),
                              imageUrl: uploadedUpsellImage,
                            }}
                          />
                        ) : (
                          // <figure className="grid relative isolate z-0 overflow-clip rounded-[.25rem] after:absolute after:inset-0 after:z-10 after:bg-[linear-gradient(0deg,theme(colors.black/.95)_10%,theme(colors.brand.black.120/.5)_60%)] after:pointer-events-none max-w-xs w-full max-h-[20.625rem] h-full">
                          //   <picture className="row-span-full col-span-full z-0">
                          //     <source
                          //       media="(min-width: 350px)"
                          //       srcSet={`${uploadedUpsellImage} 291w`}
                          //     />
                          //     <img
                          //       src={uploadedUpsellImage}
                          //       alt="description"
                          //       className="w-full h-full object-cover object-center"
                          //       loading="lazy"
                          //       width="291"
                          //       height="300"
                          //       decoding="async"
                          //       // fetchPriority="low"
                          //     />
                          //   </picture>
                          // </figure>
                          <span className='flex h-full w-full items-center justify-center rounded-md px-5 py-2.5 text-center'>
                            Click or Drop here to
                            <br /> upload an image
                          </span>
                        )}
                      </div>

                      {/* <div className="grid gap-4 place-items-start justify-center xl:justify-between">
                      <button
                        type="button"
                        onClick={() => onImageUpdate(0)}
                        className="self-center justify-self-center xl:justify-self-start xl:self-end group px-3 xl:px-6 py-2.5 rounded-[.25rem] inline-flex justify-center items-center gap-1 xl:gap-2.5 bg-brand-primary-color-1 text-white hover:text-brand-primary-color-1 hover:bg-brand-primary-color-light transition-all"
                      >
                        <BiPlus className="w-5 h-5 shrink-0" />
                        <span className="capitalize font-tti-regular font-normal text-base leading-none line-clamp-1 text-start">
                          picture
                        </span>
                      </button>
                    </div> */}
                    </div>
                  )}
                </ImageUploading>
                {/* image uploading status */}
                <input type='hidden' {...register('upsell.imageUrl')} className='sr-only' />
                <ShowInputError
                  errors={errors}
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  name='upsell.imageUrl'
                />
              </div>

              <div className='w-full grid xl:grid-cols-2 items-start gap-5'>
                <GradientBorderedInput
                  label='Title'
                  placeholder='Enter title'
                  type='text'
                  errors={errors}
                  register={register('upsell.title')}
                />

                {/* <GradientBorderedInput
                  label="Action label"
                  placeholder="Enter label"
                  type="text"
                  errors={errors}
                  register={register('upsell.actionLabel')}
                /> */}

                {/* <GradientBorderedInput
                  label="Action URL"
                  placeholder="Enter URL"
                  type="url"
                  errors={errors}
                  register={register('upsell.actionUrl')}
                /> */}

                <GradientBorderedInput
                  label='Description'
                  placeholder='Single line description'
                  type='text'
                  errors={errors}
                  register={register('upsell.description')}
                />
              </div>
            </GradientBordered>

            <div className=''>
              <div className='text-center'>
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
