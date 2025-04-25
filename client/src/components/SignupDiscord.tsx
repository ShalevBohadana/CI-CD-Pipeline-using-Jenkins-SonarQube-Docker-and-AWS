import { DISCORD_CODE_PREFIX } from '../utils/constants';
import { LoadingCircle } from './LoadingCircle';

export const SignupDiscord = () => {
  const searchParams = new URLSearchParams(window?.location?.search);
  const code = searchParams.get('code');
  if (code && code?.length >= 3) {
    window.opener.postMessage(`${DISCORD_CODE_PREFIX}${code}`);
    window.close();
  }

  return (
    <div className='text-center grid place-items-center min-h-[theme(height.40)]'>
      <LoadingCircle />
    </div>
  );
};
