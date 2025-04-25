import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';

import { GradientBordered } from '../../components/ui/GradientBordered';
import { ShowInputError } from '../../components/ui/ShowInputError';
import { SITE_INFO } from '../../enums';
import { ROLE } from '../../enums/role';
import { useBecomeCurrencySellerMutation } from '../../redux/features/becomeCurrencySeller/becomeCurrencySellerApi';
import { useGetGamesQuery } from '../../redux/features/game/gameApi';
import { InputToggleBox } from '../OffersSingle/components/OfferFilterInputBox';
import { GradientBorderedInput } from '../Profile/components/GradientBorderedInput';

const becomeCurrencySellerFormSchema = z.object({
  appliedFor: z.literal(ROLE.CURRENCY_SELLER),
  isApproved: z.coerce.boolean().default(false),
  fullboostsNickname: z
    .string({
      required_error: 'Please enter your nickname',
    })
    .trim()
    .min(2, `Please enter your nickname from ${SITE_INFO.name.capitalized}`),
  email: z.string().trim().email({
    message: 'Please enter a valid email address',
  }),
  discordTag: z
    .string({
      required_error: 'Please enter discord tag',
    })
    .trim()
    .min(2, 'Please enter a valid discord tag'),
  phoneAreaCode: z
    .string({
      required_error: 'Please enter area code',
    })
    .trim()
    .min(1, 'Please enter valid area code'),
  phoneNumber: z
    .string({
      required_error: 'Please enter phone number',
    })
    .trim()
    .min(2, 'Please enter valid phone number'),
  selectedGames: z.array(z.string()).min(1, 'Please select at least one game name').default([]),
  about: z
    .string({
      required_error: 'Please enter your information',
    })
    .trim()
    .min(10, { message: 'About info must be at least 10 characters' }),
});

export type BecomeCurrencySellerFormInputs = z.infer<typeof becomeCurrencySellerFormSchema>;

export const BecomeCurrencySellerForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BecomeCurrencySellerFormInputs>({
    resolver: zodResolver(becomeCurrencySellerFormSchema),
  });

  const gamesParams = new URLSearchParams({
    limit: '100',
  });
  const { data: gamesData } = useGetGamesQuery(gamesParams.toString(), {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
  const gameNameOptions = gamesData?.data || [];
  const [becomeCurrencySeller] = useBecomeCurrencySellerMutation();
  const onSubmit: SubmitHandler<BecomeCurrencySellerFormInputs> = async (data) => {
    if (data) {
      await becomeCurrencySeller(data);
      toast.success('Your application has been successfully submitted.');
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='pb-28'>
      <input type='hidden' value={ROLE.CURRENCY_SELLER} {...register('appliedFor')} />
      <input type='checkbox' className='sr-only' {...register('isApproved')} />
      <div className='grid gap-y-8 px-4'>
        <GradientBordered className='rounded-[.625rem] before:rounded-[.625rem] before:bg-gradient-bordered-light p-9 bg-multi-gradient-1 max-w-6xl mx-auto px-4 xl:px-16 py-10'>
          <div className='grid xl:grid-cols-2 items-start gap-x-8 gap-y-10 font-oxanium text-sm xl:text-base leading-none font-normal'>
            {/* fullboosts username */}
            <div className='xl:col-span-2 flex flex-col gap-2 xl:gap-4 relative'>
              <GradientBorderedInput
                showRequiredStar
                label={`Your nickname on ${SITE_INFO.url.hostname} - Note nickname is
              case sensitive`}
                placeholder={`Enter your ${SITE_INFO.name.capitalized} username`}
                errors={errors}
                register={register('fullboostsNickname')}
              />
            </div>

            {/* email  */}
            <GradientBorderedInput
              showRequiredStar
              label='Email'
              placeholder='Enter your email'
              type='email'
              errors={errors}
              register={register('email')}
            />

            {/* discordTag */}
            <GradientBorderedInput
              showRequiredStar
              label='Discord Tag'
              placeholder='Enter your discord tag'
              errors={errors}
              register={register('discordTag')}
            />
            {/* phoneAreaCode */}
            <GradientBorderedInput
              showRequiredStar
              label='Phone area code'
              placeholder='Enter your area code'
              type='tel'
              errors={errors}
              register={register('phoneAreaCode')}
            />

            {/* phone number  */}
            <GradientBorderedInput
              showRequiredStar
              label='Phone Number'
              placeholder='Enter your phone number'
              type='tel'
              errors={errors}
              register={register('phoneNumber')}
            />
          </div>
        </GradientBordered>

        <GradientBordered className='rounded-[.625rem] before:rounded-[.625rem] before:bg-gradient-bordered-light bg-multi-gradient-1 max-w-6xl mx-auto py-10'>
          <div className='grid gap-y-11 '>
            <div className='px-5 flex flex-col gap-4'>
              <h2 className='font-bold font-tti-bold text-[clamp(1.125rem,4vw,1.5rem)] leading-none pb-4'>
                In which game(s) would you{' '}
                <span className='text-brand-primary-color-1/70 bg-clip-text bg-[linear-gradient(300deg,var(--tw-gradient-stops))] from-brand-primary-color-1 to-brand-primary-color-light'>
                  like to provide services *
                </span>
              </h2>

              <div className='grid xl:grid-cols-3 gap-4 px-4'>
                {gameNameOptions?.map((item) => (
                  <InputToggleBox
                    label={item.name}
                    key={item.uid}
                    value={item._id}
                    type='checkbox'
                    checkMark='white'
                    register={register('selectedGames')}
                  />
                ))}
              </div>
              <ShowInputError errors={errors} name='selectedGames' />
            </div>

            <div className='px-5'>
              <h2 className='font-bold font-tti-bold text-[clamp(1.125rem,4vw,1.5rem)] leading-none'>
                Tell us about{' '}
                <span className='text-brand-primary-color-1/70 bg-clip-text bg-[linear-gradient(300deg,var(--tw-gradient-stops))] from-brand-primary-color-1 to-brand-primary-color-light'>
                  yourself
                </span>
              </h2>

              <div className='max-w-md font-oxanium text-sm xl:text-base leading-none font-normal'>
                <div className='flex flex-col gap-2 xl:gap-4 relative'>
                  <label
                    htmlFor='about'
                    className='text-brand-black-10 invisible pointer-events-none opacity-0 select-none h-0 xl:h-auto'
                  >
                    about you
                  </label>
                  <GradientBordered className='px-4 py-3 rounded-[.625rem] before:rounded-[.625rem] before:bg-gradient-bordered-deep bg-brand-primary-color-1/[.03]'>
                    <textarea
                      id='about'
                      className='flex min-h-[7rem] max-h-52 w-full h-full bg-transparent outline-none text-brand-black-5'
                      placeholder='Type here'
                      // cols={30}
                      rows={10}
                      {...register('about')}
                    />
                  </GradientBordered>
                  <ShowInputError errors={errors} name='about' />

                  {/* <p className="text-brand-black-20 text-sm xl:text-base leading-none font-normal">
                    We will add them for sure!
                  </p> */}
                </div>
              </div>
            </div>
            <hr className='border-0 border-t border-brand-primary-color-light/30' />

            <div className='text-center'>
              <button
                type='submit'
                className='inline-flex w-44 justify-center items-center px-3 xl:px-6 py-3 xl:py-4 text-lg xl:text-xl leading-tight rounded-md font-semibold font-oxanium text-white bg-fading-theme-gradient-light-to-deep hover:bg-[linear-gradient(theme("colors.brand.primary.color-1")_100%,theme("colors.brand.primary.color-1")_100%)] transition-all'
              >
                Next
              </button>
            </div>
          </div>
        </GradientBordered>
      </div>
    </form>
  );
};
