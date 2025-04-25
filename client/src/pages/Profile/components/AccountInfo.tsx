import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import ReactImageUploading, { ImageListType, ImageType } from 'react-images-uploading';
import { Link } from 'react-router-dom';

import levelMeterImg from '../../../assets/images/levels/level-meter.svg';
import { ShowInputError } from '../../../components/ui/ShowInputError';
import { DEFAULT_AVATAR_IMG, UserImageIcon } from '../../../components/ui/UserImageIcon';
import { FOLDER_NAME } from '../../../enums';
import { ROLE } from '../../../enums/role';
import { ROUTER_PATH } from '../../../enums/router-path';
import { useUserDataQuery } from '../../../redux/features/auth/authApi';
import { useUpdateAvatarMutation } from '../../../redux/features/user/userApi';
import { NormalizedDbData, Pretty } from '../../../types/globalTypes';
import { ACCEPTED_IMAGE_FILE_TYPES } from '../../../utils/constants';
import { twMergeClsx } from '../../../utils/twMergeClsx';
import { uploadImage } from '../../../utils/upload';
import { ProfileLevelIcon } from '../../CurrenciesSingle/components/ProfileLevelIcon';
import { OrderReviewDataDb } from '../../RateOrder/Main';

import { GradientBorderedInput } from './GradientBorderedInput';

export type UserDataDb = Pretty<
  NormalizedDbData & {
    name: {
      firstName: string;
      lastName: string;
    };
    isEmailVerified: false;
    userId: string;
    email: string;
    roles: string[];
    userName: string;
    avatar: string;
    online: boolean;
    reviews: OrderReviewDataDb[];
  }
>;

type AccountInfoFormInputs = {
  avatar: string;
};

export const AccountInfo = () => {
  const [avatarImages, setAvatarImages] = useState<ImageType[]>([]);

  const {
    register,
    handleSubmit,

    setValue,
    getValues,
    formState: { errors },
  } = useForm<AccountInfoFormInputs>();
  const { data: userRes } = useUserDataQuery(undefined, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });
  const [updateAvatar] = useUpdateAvatarMutation();
  const { name, email, userName, roles } = userRes?.data || {};
  const currentAvatar = getValues('avatar');
  const uploadedAvatar = currentAvatar || (avatarImages[0]?.dataUrl as string);

  const handleAvatarImageUpload = async (imageList: ImageListType) => {
    // data for submit
    // console.log(imageList, addUpdateIndex);
    setAvatarImages(imageList);

    if (imageList[0]?.file) {
      const result = await uploadImage({
        image: imageList[0].file,
        folderName: FOLDER_NAME.AVATAR,
      });
      setValue('avatar', result.data);
    }
  };

  const handleDeleteAvatar = async () => {
    const result = await updateAvatar({ avatar: { avatar: DEFAULT_AVATAR_IMG } }).unwrap();
    setValue('avatar', result?.data?.avatar);

    toast.success('Avatar changed to default');
  };

  const onSubmit: SubmitHandler<AccountInfoFormInputs> = async (data) => {
    // console.log(data);
    if (!data.avatar.startsWith('http')) {
      toast.error('Please upload a valid image');
      return;
    }
    await updateAvatar({ avatar: { avatar: data.avatar } });
    toast.success('Avatar updated successfully');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className=''>
      <div className='grid items-start gap-6 xl:gap-8 p-3 lg:p-6 xl:p-12 font-oxanium'>
        <div className='flex flex-col gap-1 max-w-2xl'>
          <h2 className='font-tti-demi-bold font-semibold text-lg xl:text-2xl leading-none text-brand-primary-color-1'>
            Personal data{' '}
          </h2>
          <p className='text-sm xl:text-base leading-none font-oxanium font-medium text-white'>
            Here you can edit your username and avatar. Don&apos;t use inappropriate names or
            pictures
          </p>
        </div>
        <div className='grid lg:grid-cols-2 xl:grid-cols-[repeat(2,min(100%,theme(maxWidth.lg)))] xl:justify-between gap-8 xl:gap-4'>
          {/* profile info  */}
          <div className='grid gap-12 order-2 lg:order-none'>
            {/* avatar  */}
            <div className='flex flex-col gap-6'>
              <div className='flex flex-wrap items-center justify-center sm:justify-start gap-4 rounded-md bg-brand-primary-color-1/10 p-3.5 xl:p-5'>
                <div className='xl:col-span-3 flex flex-col gap-2 xl:gap-4'>
                  <ReactImageUploading
                    value={avatarImages}
                    onChange={handleAvatarImageUpload}
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
                          className={twMergeClsx(`group relative isolate z-0 overflow-clip flex cursor-pointer items-center justify-center rounded-lg w-full h-full filter hover:brightness-75 transition-[filter] ${
                            imageList?.length || uploadedAvatar
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
                          {uploadedAvatar ? (
                            <img
                              src={uploadedAvatar}
                              alt='new profile'
                              className='aspect-square w-12 h-12 inline-flex justify-center items-center rounded-circle'
                              width='48'
                              height='48'
                              loading='lazy'
                              decoding='async'
                            />
                          ) : (
                            <UserImageIcon
                              className='aspect-square w-12 h-12 inline-flex justify-center items-center rounded-circle'
                              width='48'
                              height='48'
                              loading='lazy'
                              decoding='async'
                            />
                          )}
                        </div>
                      </div>
                    )}
                  </ReactImageUploading>
                  {/* image uploading status */}
                  <input type='hidden' {...register('avatar')} className='sr-only' />
                  <ShowInputError errors={errors} name='avatar' />
                </div>
                <div className='flex flex-col gap-2'>
                  <h3 className='font-tti-medium font-medium text-brand-black-5 text-lg xl:text-xl leading-none first-letter:uppercase'>
                    {name?.firstName} {name?.lastName}
                  </h3>
                  <p className='font-tti-regular font-normal text-brand-black-40 leading-none first-letter:uppercase'>
                    {/* {roles?.toString} user */}
                    Role - User
                  </p>
                </div>
              </div>
              {/* buttons  */}
              <div className='grid sm:grid-cols-2 gap-5'>
                <button
                  type='submit'
                  className='flex w-full h-full gap-2 items-center justify-center text-center text-sm xl:text-base leading-none font-medium font-tti-medium bg-brand-primary-color-1 hover:bg-brand-primary-color-light hover:text-brand-primary-color-1 transition-colors px-4 xl:px-6 py-2.5 rounded-md'
                >
                  <span className=''>Upload avatar</span>
                </button>
                <button
                  type='button'
                  onClick={handleDeleteAvatar}
                  className='inline-flex gap-4 items-center justify-center text-center text-sm xl:text-base leading-none font-medium font-tti-medium bg-transparent hover:bg-brand-primary-color-1 hover:text-white transition-colors px-4 xl:px-6 py-2.5 rounded-md border border-brand-primary-color-1'
                >
                  Delete avatar
                </button>
              </div>
            </div>
            {/* inputs */}
            <div className='grid gap-6'>
              <GradientBorderedInput
                className='bg-brand-primary-color-1/[.03]'
                label='username'
                defaultValue={userName}
                readOnly
                disabled
              />
              <GradientBorderedInput
                className='bg-brand-primary-color-1/[.03]'
                label='Email address'
                defaultValue={email}
                readOnly
                disabled
              />
            </div>
          </div>
          {/* level info  */}
          <div className='grid items-start gap-10 xl:gap-20'>
            <div className='grid gap-5 justify-center text-center lg:justify-end lg:text-end'>
              {/* level */}
              <figure className=''>
                <ProfileLevelIcon level={2} />
              </figure>
              <figure className=''>
                <picture className=''>
                  <source media='(min-width: 350px)' srcSet={levelMeterImg} />
                  <img
                    src={levelMeterImg}
                    alt='current level progress'
                    className='inline-flex w-52 h-8'
                    loading='lazy'
                    width='208'
                    height='32'
                    decoding='async'
                    // fetchPriority="low"
                  />
                </picture>
              </figure>
            </div>
            {/* buttons */}
            <div className='grid gap-6 grid-cols-[12rem] justify-center'>
              {roles?.includes(ROLE.CURRENCY_SELLER) ||
              roles?.includes(ROLE.BOOSTER) ||
              roles?.includes(ROLE.CURRENCY_SUPPLIER) ? (
                <Link
                  to={ROUTER_PATH.DASHBOARD}
                  className='flex w-full h-full justify-center items-center px-3 xl:px-6 py-2 xl:py-4 text-lg xl:text-xl leading-tight rounded-md font-semibold font-oxanium text-white bg-fading-theme-gradient-light-to-deep hover:bg-[linear-gradient(theme("colors.brand.primary.color-1")_100%,theme("colors.brand.primary.color-1")_100%)] transition-all'
                >
                  Partner Panel
                </Link>
              ) : null}
              {roles?.includes(ROLE.ADMIN) ? (
                <Link
                  to={ROUTER_PATH.DASHBOARD}
                  className='flex w-full h-full justify-center items-center px-3 xl:px-6 py-2 xl:py-4 text-lg xl:text-xl leading-tight rounded-md font-semibold font-oxanium text-white bg-fading-theme-gradient-light-to-deep hover:bg-[linear-gradient(theme("colors.brand.primary.color-1")_100%,theme("colors.brand.primary.color-1")_100%)] transition-all'
                >
                  Admin Panel
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      {/* <hr className="border-none w-full grow h-px bg-gradient-bordered-light" />
      <div className="grid items-start justify-center pt-2 lg:pt-4 xl:pt-8">
        <button
          type="submit"
          className='flex w-full h-full justify-center items-center px-3 xl:px-6 py-2 xl:py-4 text-lg xl:text-xl leading-tight rounded-md font-semibold font-oxanium text-white bg-fading-theme-gradient-light-to-deep hover:bg-[linear-gradient(theme("colors.brand.primary.color-1")_100%,theme("colors.brand.primary.color-1")_100%)] transition-all'
        >
          Confirm Changes
        </button>
      </div> */}
    </form>
  );
};
