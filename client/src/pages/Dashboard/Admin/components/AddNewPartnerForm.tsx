import { SubmitHandler, useForm } from 'react-hook-form';
import { GradientBordered } from '@/components/ui/GradientBordered';
import { GradientBorderedInput } from '../../../Profile/components/GradientBorderedInput';
import { useDashboardPageStatus } from '../../components/DashboardProvider';
import toast from 'react-hot-toast';
import { useCreateNewUserWithEmailAndPasswordMutation } from '@/redux/features/auth/authApi';
import { PartnerRegistrationData } from '@/redux/features/auth/partnerAuth';

type PartnerFormInputs = {
  email: string;
  password: string;
  fullName: string;
  contactNumber: string;
};

export const AddNewPartnerForm = () => {
  const { setIsModalOpen } = useDashboardPageStatus();
  const [createPartner, { isLoading }] = useCreateNewUserWithEmailAndPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<PartnerFormInputs>();

  const handlePartnerRegistration: SubmitHandler<PartnerFormInputs> = async (data) => {
    try {
      const [firstName, ...lastNameParts] = data.fullName.trim().split(' ');
      const lastName = lastNameParts.join(' ');

      const requestData: PartnerRegistrationData = {
        email: data.email,
        password: data.password,
        role: 'partner',
        contactNumber: data.contactNumber,
        isVerified: true,
      };

      const response = await createPartner(requestData).unwrap();

      if (response.success) {
        toast.success('Partner registered successfully');
        setIsModalOpen(false);
      }
    } catch (error: any) {
      console.error('Registration failed:', error);

      if (error.data?.errorMessages) {
        error.data.errorMessages.forEach((err: { path: string; message: string }) => {
          const fieldPath = err.path.replace('body.', '');
          setError(fieldPath as keyof PartnerFormInputs, {
            message: err.message,
          });
        });
      }

      toast.error(error.data?.message || 'Failed to register partner');
    }
  };

  return (
    <div
      className="bg-[linear-gradient(180deg,theme('colors.brand.primary.color-light'/.40)_0%,theme('colors.brand.primary.color-1'/0.40)_100%)] w-full max-w-4xl mx-auto rounded-[1.25rem] font-oxanium text-base leading-none font-normal"
      onClick={(ev) => ev.stopPropagation()}
      role='menu'
      tabIndex={-1}
    >
      <form onSubmit={handleSubmit(handlePartnerRegistration)}>
        <GradientBordered className='rounded-[1.25rem] before:rounded-[1.25rem] before:bg-gradient-bordered-deep p-5 xl:p-10 overflow-clip grid gap-8 xl:gap-12 items-start'>
          <h2 className='font-tti-bold font-bold text-[clamp(1.35rem,4vw,2rem)] leading-none text-white capitalize text-center'>
            Partner Registration
          </h2>

          <div className='grid md:grid-cols-2 gap-8 items-start overflow-visible'>
            <GradientBorderedInput
              label='Full Name'
              placeholder='John Doe'
              type='text'
              autoComplete='name'
              errors={errors}
              register={register('fullName', {
                required: 'Name is required',
                minLength: {
                  value: 3,
                  message: 'Name must be at least 3 characters',
                },
                pattern: {
                  value: /^[a-zA-Z\s]*$/,
                  message: 'Name can only contain letters and spaces',
                },
              })}
            />

            <GradientBorderedInput
              label='Email'
              placeholder='partner@example.com'
              type='email'
              autoComplete='email'
              errors={errors}
              register={register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
            />

            <GradientBorderedInput
              label='Password'
              placeholder='Enter password'
              type='password'
              autoComplete='new-password'
              errors={errors}
              register={register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
            />

            <GradientBorderedInput
              label='Contact Number'
              placeholder='+1234567890'
              type='tel'
              autoComplete='tel'
              errors={errors}
              register={register('contactNumber', {
                required: 'Phone number is required',
                pattern: {
                  value: /^\+?[1-9]\d{1,14}$/,
                  message: 'Invalid phone number',
                },
              })}
            />
          </div>

          <div className='pt-5 xl:pt-10'>
            <button
              type='submit'
              disabled={isLoading}
              className='flex w-full h-full justify-center items-center px-3 xl:px-6 py-2 xl:py-4 text-lg xl:text-xl leading-tight rounded-md font-semibold font-oxanium text-white bg-gradient-to-r from-brand-primary-color-1 to-brand-primary-color-light hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200'
            >
              {isLoading ? (
                <span className='flex items-center gap-2'>
                  <svg className='animate-spin h-5 w-5' viewBox='0 0 24 24'>
                    <circle
                      className='opacity-25'
                      cx='12'
                      cy='12'
                      r='10'
                      stroke='currentColor'
                      strokeWidth='4'
                      fill='none'
                    />
                    <path
                      className='opacity-75'
                      fill='currentColor'
                      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z'
                    />
                  </svg>
                  Registering...
                </span>
              ) : (
                'Register Partner'
              )}
            </button>
          </div>
        </GradientBordered>
      </form>
    </div>
  );
};
