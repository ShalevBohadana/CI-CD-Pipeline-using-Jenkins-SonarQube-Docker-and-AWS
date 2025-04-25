import { useRef } from 'react';
import toast from 'react-hot-toast';

import { TawkAPI } from '@tawk.to/tawk-messenger-react';

import { TawkMessenger } from '../pages/shared/chat/TawkMessenger';
import { useLazyUserDataQuery } from '../redux/features/auth/authApi';
import { selectAuthToken, selectUserId } from '../redux/features/auth/authSlice';
import { useAppSelector } from '../redux/hooks';
import { tawkHmacSha256 } from '../utils';

import { TawkChatIcon } from './icons/icons';

export const LiveChatBox = () => {
  const token = useAppSelector(selectAuthToken);
  const tawkMessengerRef = useRef<TawkAPI>(null);
  const [getUserData] = useLazyUserDataQuery();
  const userId = useAppSelector(selectUserId);

  const handleLiveChat = async () => {
    if (!token || !userId) {
      toast.error('Please log in to chat');
      // return;
    }
    // setInitiateChat(true);
    // tawkMessengerRef.current?.maximize();
  };
  const handleChatMaximize = async () => {
    const { data: userFromDb } = await getUserData(undefined).unwrap();
    const { email, name, userId: dbUserId } = userFromDb;
    const hash = await tawkHmacSha256(email);
    tawkMessengerRef.current!.visitor = {
      name: `${name?.firstName} ${name?.lastName}`,
      userId: dbUserId,
      email,
    };
    tawkMessengerRef.current?.setAttributes(
      {
        name: `${name?.firstName} ${name?.lastName}`,
        email,
        hash,
        userId: dbUserId,
        dbUserId,
        dbUserEmail: email,
      },
      (error: Error) => {
        console.error('Error setting attributes:', error);
      }
    );
  };

  return (
    <div className='' data-live-chat-container>
      {!token.length ? (
        <button
          type='button'
          onClick={handleLiveChat}
          aria-label='Live Chat'
          className='fixed bottom-5 right-6 cursor-pointer inline-flex justify-center items-center text-center p-3.5 rounded-circle bg-brand-primary-color-1 transition-colors duration-500 hover:bg-brand-primary-color-light group'
        >
          <TawkChatIcon className='group-hover:fill-brand-primary-color-1 transition-all duration-500' />
        </button>
      ) : null}

      {token.length ? (
        <TawkMessenger ref={tawkMessengerRef} onChatMaximized={handleChatMaximize} />
      ) : null}
    </div>
  );
};
