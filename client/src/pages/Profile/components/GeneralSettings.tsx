import { SubmitHandler, useForm } from 'react-hook-form';

import { GradientBorderedInput } from './GradientBorderedInput';

type GeneralSettingsFormInputs = {
  password: string;
  email: string;
};

export const GeneralSettings = () => {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<GeneralSettingsFormInputs>();

  const onSubmit: SubmitHandler<GeneralSettingsFormInputs> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className=''>
      <div className='grid items-start gap-6 xl:gap-8 p-3 lg:p-6 xl:p-12 font-oxanium'>
        <div className='flex flex-col gap-1 max-w-2xl'>
          <h2 className='font-tti-demi-bold font-semibold text-lg xl:text-2xl leading-none text-brand-primary-color-1'>
            Account settings{' '}
          </h2>
          <p className='text-sm xl:text-base leading-none font-oxanium font-medium text-white'>
            Here you can edit your Password, Email and contact info.
          </p>
        </div>
        <div className='grid lg:grid-cols-2 xl:grid-cols-[repeat(2,min(100%,theme(maxWidth.lg)))] xl:justify-between gap-8 xl:gap-4'>
          {/* profile info  */}
          <div className='grid gap-12 order-2 lg:order-none'>
            {/* inputs */}
            <div className='grid gap-6'>
              <GradientBorderedInput
                className='bg-brand-primary-color-1/[.03]'
                label='New Password'
                placeholder='Your new password'
                type='password'
                errors={errors}
                register={register('password', {
                  // required: 'password is required',
                })}
              />
              <GradientBorderedInput
                className='bg-brand-primary-color-1/[.03]'
                label='Email address'
                placeholder='Your Email'
                type='email'
                errors={errors}
                register={register('email', {
                  // required: 'Please enter a valid email address',
                })}
              />
            </div>
          </div>
          {/* level info  */}
          {/* <div className="grid items-start gap-10 xl:gap-20"></div> */}
        </div>
      </div>
      <hr className='border-none w-full grow h-px bg-gradient-bordered-light' />
      <div className='grid items-start justify-center pt-2 lg:pt-4 xl:pt-8'>
        <button
          type='submit'
          className='flex w-full h-full justify-center items-center px-3 xl:px-6 py-2 xl:py-4 text-lg xl:text-xl leading-tight rounded-md font-semibold font-oxanium text-white bg-fading-theme-gradient-light-to-deep hover:bg-[linear-gradient(theme("colors.brand.primary.color-1")_100%,theme("colors.brand.primary.color-1")_100%)] transition-all'
        >
          Confirm Changes
        </button>
      </div>
    </form>
  );
};
