import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ROUTER_PATH } from '../../enums/router-path';
import { useAuthenticatedNavigation } from '../../hooks/useAuthenticatedNavigation';
import { GradientBorderedInput } from '../../pages/Profile/components/GradientBorderedInput';
import { ResError } from '../../redux/api/apiSlice';
import { useSignInUserWithEmailAndPasswordMutation } from '../../redux/features/auth/authApi';
import { setUserAuth } from '../../redux/features/auth/authSlice';
import { useAppDispatch } from '../../redux/hooks';
import { LoadingCircle } from '../LoadingCircle';
import { SocialSignIn } from './SocialSignIn';

type SignInFormInputs = {
  emailOrUsername: string;
  password: string;
};

type SignInFormProps = {
  modal?: {
    onCloseSignInModal?: () => void;
    onOpenSignUpModal?: () => void;
    onCloseSignUpModal?: () => void;
  };
};

export const SignInForm = ({ modal = undefined }: SignInFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const [signInUserWithEmailAndPassword, { isLoading }] =
    useSignInUserWithEmailAndPasswordMutation();
  const [errorMessage, setErrorMessage] = useState<string>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignInFormInputs>();

  useAuthenticatedNavigation();

  const onSubmit: SubmitHandler<SignInFormInputs> = async ({
    emailOrUsername: email,
    password,
  }) => {
    if (!email || !password) return;
    setErrorMessage(undefined);
    try {
      const { data: accessToken } = await signInUserWithEmailAndPassword({
        email,
        password,
      }).unwrap();
      dispatch(setUserAuth(accessToken));
      toast.success('Welcome back!', {
        duration: 4000,
        position: 'bottom-center',
      });
      reset();
      modal?.onCloseSignInModal?.();
    } catch (error) {
      console.error(error);
      const typedError = error as ResError;
      setErrorMessage(
        typedError?.data?.errorMessages[0]?.message ||
          typedError?.data?.message ||
          'Something went wrong'
      );
    }
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
          Welcome Back
        </motion.h2>
        <p className='text-brand-gray-400 text-sm'>Sign in to continue your journey</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
        <div className='space-y-4'>
          <GradientBorderedInput
            label='Email or Username'
            placeholder='Enter your email or username'
            type='text'
            autoComplete='username'
            errors={errors}
            register={register('emailOrUsername', {
              required: 'Email or username is required',
            })}
          />

          <div className='relative'>
            <GradientBorderedInput
              errors={errors}
              label='Password'
              type={showPassword ? 'text' : 'password'}
              placeholder='Enter your password'
              register={register('password', {
                required: 'Password is required',
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
          </div>
        </div>

        <AnimatePresence>
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className='bg-red-500/10 border border-red-500/20 rounded-lg p-3'
            >
              <p className='text-red-500 text-sm text-center'>{errorMessage}</p>
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
          {isLoading ? <LoadingCircle className='w-6 h-6 mx-auto' /> : 'Sign In'}
        </button>
      </form>

      {/* Social Sign In */}
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

      <SocialSignIn modal={modal} />

      {/* Footer */}
      <div className='text-center'>
        <p className='text-brand-gray-400'>
          Don't have an account?{' '}
          {modal?.onCloseSignUpModal ? (
            <button
              type='button'
              onClick={() => {
                modal?.onCloseSignInModal?.();
                modal?.onOpenSignUpModal?.();
              }}
              className='text-brand-primary-color-1 hover:text-brand-primary-color-light 
                       font-medium transition-colors underline-offset-4 hover:underline'
            >
              Sign up now
            </button>
          ) : (
            <Link
              to={ROUTER_PATH.SIGNUP}
              className='text-brand-primary-color-1 hover:text-brand-primary-color-light 
                       font-medium transition-colors underline-offset-4 hover:underline'
            >
              Sign up now
            </Link>
          )}
        </p>
      </div>
    </motion.div>
  );
};
