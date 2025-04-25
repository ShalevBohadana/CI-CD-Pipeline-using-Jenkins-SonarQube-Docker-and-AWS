import { FacebookAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { toast } from 'react-hot-toast';
import { BsDiscord } from 'react-icons/bs';
import { FaFacebook } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

import { auth } from '../../lib/firebase';
import { ResError } from '../../redux/api/apiSlice';
import {
  useSignInUserWithDiscordMutation,
  useSignInUserWithFacebookMutation,
  useSignInUserWithGoogleMutation,
} from '../../redux/features/auth/authApi';
import { getDiscordCodeFromMessage, setUserAuth } from '../../redux/features/auth/authSlice';
import { useAppDispatch } from '../../redux/hooks';

const redirectUrl = import.meta.env.PROD
  ? 'https%3A%2F%2Ffullboosts.com%2Fauth%2Fdiscord'
  : 'https%3A%2F%2Flocalhost%3A3000%2Fauth%2Fdiscord';
const clientId = `${import.meta.env.VITE_DISCORD_OAUTH_CLIENT_ID}`;
const scope = 'identify%20guilds%20email';

export const discordRedirectUrl = new URL(
  `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUrl}&response_type=code&scope=${scope}`
);

type SocialSignInProps = {
  modal?: {
    onCloseSignInModal?: () => void;
    onOpenSignUpModal?: () => void;
    onCloseSignUpModal?: () => void;
  };
};
export const SocialSignIn = ({ modal = undefined }: SocialSignInProps) => {
  const [signInUserWithGoogle, { isLoading: isGoogleLoading }] = useSignInUserWithGoogleMutation();
  const [signInUserWithDiscord, { isLoading: isDiscordLoading }] =
    useSignInUserWithDiscordMutation();
  const [signInUserWithFacebook, { isLoading: isFacebookLoading }] =
    useSignInUserWithFacebookMutation();
  const dispatch = useAppDispatch();

  const fbAuthProvider = new FacebookAuthProvider();
  const googleAuthProvider = new GoogleAuthProvider();

  /**
   * The function closeModal is used to close a modal form in a TypeScript React application.
   * @param modalForm - The `modalForm` parameter is of type `SocialSignInProps['modal']`. It is an
   * object that contains properties related to a modal form.
   */
  const closeModal = (modalForm: SocialSignInProps['modal']) => {
    if (modalForm) {
      if (modalForm?.onCloseSignInModal) {
        modalForm?.onCloseSignInModal();
      }
      if (modalForm?.onCloseSignUpModal) {
        modalForm?.onCloseSignUpModal();
      }
    }
  };

  /**
   * The function `handleErrorResponse` logs the error and displays an error message using the `toast`
   * function, based on the error object's properties.
   * @param {unknown} error - The `error` parameter is of type `unknown`, which means it can be any type
   * of value. It is used to handle the error response from an API.
   */
  const handleErrorResponse = (error: unknown) => {
    console.log(error);
    const typedError = error as ResError;
    toast(
      typedError?.data?.errorMessages[0]?.message ||
        typedError?.data?.message ||
        'Something went wrong'
    );
  };

  /**
   * The function `handleGoogleLogin` closes a modal, dispatches a sign-in action with a Google
   * authentication provider, and then provides generic login feedback.
   */
  const handleGoogleLogin = async () => {
    try {
      const { user } = await signInWithPopup(auth, googleAuthProvider);

      if (!user?.email) {
        toast('Something went wrong');
        return;
      }

      const { data: accessToken } = await signInUserWithGoogle({
        email: user.email,
      }).unwrap();

      dispatch(setUserAuth(accessToken));
      if (auth?.currentUser) {
        await signOut(auth);
      }
      toast('Signed in successfully!');
      closeModal(modal);
    } catch (error) {
      handleErrorResponse(error);
    }
  };

  /**
   * The function `handleFacebookLogin` closes a modal, signs in a user with their Facebook credentials,
   * and provides generic login feedback.
   */
  const handleFacebookLogin = async () => {
    try {
      const { user } = await signInWithPopup(auth, fbAuthProvider);

      if (!user?.email) {
        toast('Something went wrong');
        return;
      }

      const { data: accessToken } = await signInUserWithFacebook({
        email: user.email,
      }).unwrap();

      dispatch(setUserAuth(accessToken));
      if (auth?.currentUser) {
        await signOut(auth);
      }
      toast('Signed in successfully!');
      closeModal(modal);
    } catch (error) {
      handleErrorResponse(error);
    }
  };

  /**
   * The function `handleDiscordLogin` closes a modal, opens a new window with a Discord redirect URL,
   * and then signs in the user with their Discord credentials.
   */
  const handleDiscordLogin = async () => {
    // closeModal(modal);
    window.open(discordRedirectUrl.href, '_blank');

    try {
      const { value } = await getDiscordCodeFromMessage();
      // console.log(count, value);
      const { data: accessToken } = await signInUserWithDiscord({
        code: value,
      }).unwrap();
      dispatch(setUserAuth(accessToken));
      toast('Signed in successfully!');
      closeModal(modal);
    } catch (error) {
      handleErrorResponse(error);
    }
  };

  return (
    <div className='flex flex-wrap gap-4 justify-center'>
      <button
        aria-label='Cancel'
        type='button'
        onClick={handleGoogleLogin}
        disabled={isGoogleLoading || isDiscordLoading || isFacebookLoading}
        className='w-11 h-11 inline-flex justify-center items-center bg-brand-primary-color-1/20 rounded-full hover:bg-brand-primary-color-1 transition-colors disabled:cursor-not-allowed disabled:grayscale'
      >
        <FcGoogle />
      </button>
      <button
        aria-label='Cancel'
        type='button'
        onClick={handleDiscordLogin}
        disabled={isGoogleLoading || isDiscordLoading || isFacebookLoading}
        className='w-11 h-11 inline-flex justify-center items-center bg-brand-primary-color-1/20 rounded-full hover:bg-brand-primary-color-1 transition-colors disabled:cursor-not-allowed disabled:grayscale'
      >
        <BsDiscord className='text-[#5865F2]' />
      </button>
      <button
        aria-label='Cancel'
        type='button'
        onClick={handleFacebookLogin}
        disabled={isGoogleLoading || isDiscordLoading || isFacebookLoading}
        className='w-11 h-11 inline-flex justify-center items-center bg-brand-primary-color-1/20 rounded-full hover:bg-brand-primary-color-1 transition-colors disabled:cursor-not-allowed disabled:grayscale'
      >
        <FaFacebook className='text-[#18ACFE]' />
      </button>

      {/* <RememberThisDevice /> */}
    </div>
  );
};
