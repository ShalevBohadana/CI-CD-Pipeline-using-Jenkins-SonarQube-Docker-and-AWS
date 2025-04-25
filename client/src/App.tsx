// App.tsx
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';

import { LiveChatBox } from './components/LiveChatBox';
import { usePersistentLogin } from './hooks/usePersistentLogin';
import { useUserLogoutMutation } from './redux/features/auth/authApi';
import { selectAuthToken } from './redux/features/auth/authSlice';
import { socket } from './redux/features/socket/SocketFactory';
import {
  connectionEstablished,
  connectionLost,
  updateOnlineUsers,
} from './redux/features/socket/socketSlice';
import { useCurrentUserQuery } from './redux/features/user/userApi';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { router } from './routes/router';
import { User } from './types/user';

interface ApiResponse {
  data: User;
  message: string;
  statusCode: number;
  success: boolean;
}

export const App = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectAuthToken);
  const isConnected = useAppSelector((state) => state.socket?.isConnected);
  const [userLogout] = useUserLogoutMutation();

  const { isPending } = usePersistentLogin();

  const {
    data: response,
    isError,
    error,
  } = useCurrentUserQuery(undefined, {
    skip: !token || isPending,
    refetchOnMountOrArgChange: true,
  }) as { data?: ApiResponse; isError: boolean; error: unknown };

  useEffect(() => {
    if (response?.data?.ban === true) {
      userLogout({});
    }
  }, [response, userLogout]);

  useEffect(() => {
    let reconnectTimeout: NodeJS.Timeout;
    let isComponentMounted = true;

    const connectSocket = () => {
      if (token && !isConnected && !isPending && isComponentMounted) {
        socket.auth = { token };
        socket.connect();
      }
    };

    connectSocket();

    const handlers = {
      connect: () => {
        if (isComponentMounted) {
          dispatch(connectionEstablished(undefined)); // This will now work with the updated action creator
          if (reconnectTimeout) {
            clearTimeout(reconnectTimeout);
          }
        }
      },

      disconnect: () => {
        if (isComponentMounted) {
          dispatch(connectionLost(undefined));
          if (token && !isPending) {
            reconnectTimeout = setTimeout(connectSocket, 5000);
          }
        }
      },

      message: (data: unknown) => {
        if (isComponentMounted) {
          console.log('Received message:', data);
        }
      },

      banuser: (userId: string) => {
        if (isComponentMounted && userId === response?.data?._id) {
          userLogout({});
        }
      },

      onlineUsers: (data: { users: string[] }) => {
        if (isComponentMounted) {
          const activeUsers = data.users.map((userId) => ({
            userId,
            lastSeen: new Date().toISOString(),
            isOnline: true,
          }));
          dispatch(updateOnlineUsers(activeUsers));
        }
      },

      connect_error: (error: Error) => {
        if (isComponentMounted) {
          console.error('שגיאת התחברות לסוקט:', error);
          if (token && !isPending) {
            reconnectTimeout = setTimeout(connectSocket, 5000);
          }
        }
      },
    };

    Object.entries(handlers).forEach(([event, handler]) => {
      socket.on(event, handler);
    });

    return () => {
      isComponentMounted = false;

      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout);
      }

      Object.entries(handlers).forEach(([event, handler]) => {
        socket.off(event, handler);
      });

      if (isConnected) {
        socket.disconnect();
      }
    };
  }, [token, isConnected, dispatch, response?.data?._id, userLogout, isPending]);

  useEffect(() => {
    if (isError) {
      console.error('שגיאת אימות:', error);
    }
  }, [isError, error]);

  if (isPending) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <div className='animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full' />
      </div>
    );
  }

  if (isError) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-xl text-red-600 mb-4'>
            {(error as any)?.data?.message || 'אירעה שגיאה'}
          </h1>
          <button
            onClick={() => window.location.reload()}
            className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
          >
            נסה שנית
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-brand-black-100'>
      <RouterProvider router={router} />
      {/* <LiveChatBox /> */}
      <Toaster
        position='top-right'
        toastOptions={{
          duration: 4000,
          className: 'rtl',
        }}
      />
    </div>
  );
};
