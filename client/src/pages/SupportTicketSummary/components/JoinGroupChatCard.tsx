import { useParams } from 'react-router-dom';

import { BoxedArrowTopRight } from '../../../components/icons/icons';
import { GradientBordered } from '../../../components/ui/GradientBordered';
import { ROLE } from '../../../enums/role';
import { useCreateDiscordChannelMutation } from '../../../redux/features/ticket/ticketApi';
import { useAppSelector } from '../../../redux/hooks';
import { CommonParams } from '../../../types/globalTypes';

export const JoinGroupChatCard = () => {
  // Using the correct property path based on your auth state structure
  // Fixing the type issue by avoiding the direct cast
  const auth = useAppSelector((state) => state.auth);

  // Instead of casting, we'll check if the role exists in the array
  const roles = auth?.user?.roles || [ROLE.VISITOR];

  // Functions to check role inclusion safely
  const hasRole = (roleToCheck: ROLE) => {
    return roles.some((role) => role === roleToCheck);
  };

  const { uid } = useParams<CommonParams>();
  const [createDiscordChannel] = useCreateDiscordChannelMutation();

  const handleJoinGroupChat = async () => {
    const { data } = await createDiscordChannel({
      _id: uid,
    }).unwrap();
    window.open(data.inviteUrl!, '_blank');
  };

  return (
    <GradientBordered
      className={`rounded-[1.25rem] before:rounded-[1.25rem] before:bg-gradient-bordered-light p-9 bg-multi-gradient-1 grid gap-8 py-8 px-6 ${
        hasRole(ROLE.SUPPORT) ? 'text-center' : ''
      }`}
    >
      <div className='grid gap-4 text-center'>
        <h2 className='capitalize font-tti-demi-bold font-semibold text-[clamp(1.5rem,4vw,2rem)] leading-none text-white'>
          <span className='text-brand-primary-color-1'>Connect with</span>{' '}
          {hasRole(ROLE.CUSTOMER) ? 'Your' : null}
          {hasRole(ROLE.SUPPORT) ? 'Our' : null}
          <br className='hidden xl:block' />
          Client <span className='text-brand-primary-color-1'>on Discord!</span>
        </h2>
        {hasRole(ROLE.CUSTOMER) ? (
          <p className='text-base leading-relaxed font-tti-regular font-regular text-brand-black-10'>
            Please join our completely private Discord group chat for faster communication, to
            receive updates on your order.
          </p>
        ) : null}
      </div>
      <div className='self-end text-center'>
        <button
          type='button'
          onClick={handleJoinGroupChat}
          className='inline-flex gap-2 items-center justify-center text-center text-sm xl:text-base leading-none font-medium font-tti-medium bg-brand-primary-color-1 hover:bg-brand-primary-color-light hover:text-brand-primary-color-1 transition-colors px-4 xl:px-6 py-2.5 rounded-md'
        >
          <span className='capitalize'>Join group chat</span>
          <BoxedArrowTopRight />
        </button>
      </div>
    </GradientBordered>
  );
};
