import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { BsExclamationCircle, BsEye, BsEyeSlash } from 'react-icons/bs';
import PasswordStrengthBar from 'react-password-strength-bar';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import { ROUTER_PATH } from '../../enums/router-path';
import { GradientBorderedInput } from '../../pages/Profile/components/GradientBorderedInput';
import { ResError } from '../../redux/api/apiSlice';
import { useCreateNewUserWithEmailAndPasswordMutation } from '../../redux/features/auth/authApi';
import { setUserAuth } from '../../redux/features/auth/authSlice';
import { useAppDispatch } from '../../redux/hooks';
import { LoadingCircle } from '../LoadingCircle';
import { ShowInputError } from './ShowInputError';
import { SocialSignIn } from './SocialSignIn';

type SignUpFormInputs = {
  email: string;
  password: string;
  agreed: boolean;
};

type SignUpFormProps = {
  modal?: {
    onCloseSignUpModal?: () => void;
    onOpenSignInModal?: () => void;
    onCloseSignInModal?: () => void;
  };
};

export const SignUpForm = ({ modal = undefined }: SignUpFormProps) => {
  const [inputPassword, setInputPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const [isConnectionError, setIsConnectionError] = useState(false);
  const dispatch = useAppDispatch();
  const [createNewUserWithEmailAndPassword, { isLoading }] =
    useCreateNewUserWithEmailAndPasswordMutation();
  const [errorMessage, setErrorMessage] = useState<string>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignUpFormInputs>();

  const onSubmit: SubmitHandler<SignUpFormInputs> = async ({ email, password, agreed }) => {
    if (!agreed) return;
    setErrorMessage(undefined);
    setIsConnectionError(false);

    try {
      const { data: accessToken } = await createNewUserWithEmailAndPassword({
        email,
        password,
      }).unwrap();

      dispatch(setUserAuth(accessToken));
      toast.success('Welcome to our community!', {
        duration: 4000,
        position: 'bottom-center',
      });
      reset();
      modal?.onCloseSignUpModal?.();
    } catch (error) {
      console.error(error);
      const typedError = error as ResError;

      // Check if it's a connection error
      if (typedError.status === 'FETCH_ERROR') {
        setIsConnectionError(true);
        setErrorMessage(
          'Unable to connect to the server. Please check your internet connection and try again.'
        );
      } else {
        setErrorMessage(
          typedError?.data?.errorMessages[0]?.message ||
            typedError?.data?.message ||
            'Something went wrong'
        );
      }
    }
  };
  const retryConnection = () => {
    setIsConnectionError(false);
    setErrorMessage(undefined);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className='flex flex-col gap-6 bg-gradient-to-b from-brand-black-100/95 to-brand-black-100/80 rounded-2xl p-8'
    >
      {/* Header */}
      <div className='text-center space-y-2'>
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className='text-3xl font-bold bg-gradient-to-r from-brand-primary-color-1 to-brand-primary-color-light bg-clip-text text-transparent'
        >
          Create Account
        </motion.h2>
        <p className='text-brand-gray-400 text-sm'>Join our gaming community</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
        <div className='space-y-4'>
          <GradientBorderedInput
            label='Email'
            placeholder='Enter your email'
            type='email'
            errors={errors}
            register={register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
          />

          <div className='relative space-y-2'>
            <GradientBorderedInput
              errors={errors}
              label='Password'
              type={showPassword ? 'text' : 'password'}
              placeholder='Create a strong password'
              onInput={(e) => setInputPassword((e.target as HTMLInputElement).value)}
              register={register('password', {
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters',
                },
              })}
              icon={
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-4 top-1/2 transform -translate-y-1/2 text-brand-gray-400 hover:text-white transition-colors'
                >
                  {showPassword ? <BsEyeSlash size={20} /> : <BsEye size={20} />}
                </button>
              }
              iconPosition='end'
            />

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='w-full'>
              <PasswordStrengthBar
                password={inputPassword}
                className='opacity-75'
                scoreWords={['Weak', 'Fair', 'Good', 'Strong', 'Perfect']}
                shortScoreWord='Too Short'
              />
            </motion.div>
          </div>

          {/* Terms and Conditions */}
          <div className='space-y-2'>
            <label htmlFor='terms-and-conditions' className='flex gap-3 items-start'>
              <input
                type='checkbox'
                id='terms-and-conditions'
                className='mt-1 w-4 h-4 rounded border-brand-gray-600 text-brand-primary-color-1 focus:ring-brand-primary-color-1 bg-transparent'
                {...register('agreed', {
                  required: 'You must accept the Terms and Conditions',
                })}
              />
              <span className='text-sm text-brand-gray-400'>
                I agree to the{' '}
                <Link
                  to={ROUTER_PATH.TERMS_AND_CONDITIONS}
                  onClick={() => modal?.onCloseSignUpModal?.()}
                  className='text-brand-primary-color-1 hover:text-brand-primary-color-light underline transition-colors'
                >
                  Terms and Conditions
                </Link>{' '}
                and{' '}
                <Link
                  to={ROUTER_PATH.PRIVACY_POLICY}
                  onClick={() => modal?.onCloseSignUpModal?.()}
                  className='text-brand-primary-color-1 hover:text-brand-primary-color-light underline transition-colors'
                >
                  Privacy Policy
                </Link>
              </span>
            </label>
            <ShowInputError errors={errors} name='agreed' />
          </div>
        </div>

        <AnimatePresence>
          {isConnectionError && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className='bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4'
            >
              <div className='flex items-center gap-3'>
                <BsExclamationCircle className='text-yellow-500 w-5 h-5 flex-shrink-0' />
                <div className='flex-1'>
                  <p className='text-yellow-500 text-sm'>{errorMessage}</p>
                </div>
              </div>
              <button
                onClick={retryConnection}
                className='mt-3 w-full py-2 px-4 bg-yellow-500/20 hover:bg-yellow-500/30 
                       rounded text-yellow-500 text-sm font-medium transition-colors'
              >
                Retry Connection
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type='submit'
          disabled={isLoading}
          className='w-full py-4 px-6 bg-gradient-to-r from-brand-primary-color-1 to-brand-primary-color-light 
                   hover:from-brand-primary-color-light hover:to-brand-primary-color-1
                   rounded-lg text-white font-medium transition-all duration-300
                   disabled:opacity-50 disabled:cursor-not-allowed
                   transform hover:scale-[1.02] active:scale-[0.98]'
        >
          {isLoading ? <LoadingCircle className='w-6 h-6 mx-auto' /> : 'Create Account'}
        </button>
      </form>

      {/* Divider */}
      <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <div className='w-full border-t border-brand-gray-800'></div>
        </div>
        <div className='relative flex justify-center text-sm'>
          <span className='px-4 bg-gradient-to-b from-brand-black-100/95 to-brand-black-100/80 text-brand-gray-400'>
            Or continue with
          </span>
        </div>
      </div>

      {/* Social Sign In */}
      <SocialSignIn modal={modal} />

      {/* Footer */}
      <div className='text-center'>
        <p className='text-brand-gray-400'>
          Already have an account?{' '}
          {modal?.onCloseSignUpModal ? (
            <button
              type='button'
              onClick={() => {
                modal?.onCloseSignUpModal?.();
                modal?.onOpenSignInModal?.();
              }}
              className='text-brand-primary-color-1 hover:text-brand-primary-color-light 
                       font-medium transition-colors underline-offset-4 hover:underline'
            >
              Sign in now
            </button>
          ) : (
            <Link
              to={ROUTER_PATH.SIGNIN}
              className='text-brand-primary-color-1 hover:text-brand-primary-color-light 
                       font-medium transition-colors underline-offset-4 hover:underline'
            >
              Sign in now
            </Link>
          )}
        </p>
      </div>
    </motion.div>
  );
};
