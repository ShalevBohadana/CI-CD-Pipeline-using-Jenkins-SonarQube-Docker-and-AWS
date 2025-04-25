import { Middleware } from '@/redux-fix';
import type { SocketInterface } from './SocketFactory';
import { SocketFactory } from './SocketFactory';
import { connectionEstablished, connectionLost, initSocket } from './socketSlice';
import { RootState } from '@/redux/store';

export const SOCKET_EVENT = {
  // Connection events
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  CONNECT_ERROR: 'connect_error',

  // User events
  USER_ONLINE: 'userOnline',
  USER_OFFLINE: 'userOffline',
  BAN_USER: 'banuser',

  // Error events
  ERROR: 'error',

  // Room events
  JOIN_ROOM: 'join-room',
  LEAVE_ROOM: 'leave-room',
} as const;

export const socketMiddleware: Middleware = (store) => {
  let socket: SocketInterface | undefined;

  // const setupSocketEvents = (socket: SocketInterface) => {
  //   // Connection Events
  //   socket.socket.on(SOCKET_EVENT.CONNECT, () => {
  //     store.dispatch(connectionEstablished());
  //   });

  //   socket.socket.on(SOCKET_EVENT.DISCONNECT, (reason) => {
  //     store.dispatch(connectionLost(reason));
  //   });

  //   socket.socket.on(SOCKET_EVENT.CONNECT_ERROR, (error) => {
  //     console.error('Connection error:', error);
  //     store.dispatch(connectionLost(error.message));
  //   });

  //   // User Events
  //   socket.socket.on(SOCKET_EVENT.USER_ONLINE, (userId: string) => {
  //     store.dispatch(addActiveUser({ userId }));
  //   });

  //   socket.socket.on(SOCKET_EVENT.USER_OFFLINE, (userId: string) => {
  //     store.dispatch(removeActiveUser(userId));
  //   });

  //   // Error Handling
  //   socket.socket.on(SOCKET_EVENT.ERROR, (error) => {
  //     console.error('Socket error:', error);
  //     const errorMessage = typeof error === 'string' ? error : error?.message || 'Unknown error';
  //     store.dispatch(connectionLost(errorMessage));
  //   });
  // };

  const cleanupSocketEvents = (socket: SocketInterface) => {
    const events = Object.values(SOCKET_EVENT);
    events.forEach((event) => {
      socket.socket.off(event);
    });
  };

  return (next) => (action: any) => {
    if (initSocket.match(action)) {
      if (!socket && typeof window !== 'undefined') {
        const { token } = (store.getState() as RootState).auth;

        socket = SocketFactory.create();

        // הוספת הטוקן לחיבור
        socket.socket.auth = { token };

        socket.socket.on('connect', () => {
          store.dispatch(connectionEstablished(undefined));
        });

        socket.socket.on('connect_error', (error) => {
          console.error('Socket connection error:', error);
          store.dispatch(connectionLost(error.message));
        });

        socket.socket.on('disconnect', () => {
          store.dispatch(connectionLost(undefined));
        });
      }
    }

    // Handle room actions if needed
    if (action.type === 'socket/joinRoom' && socket) {
      const { room } = action.payload;
      socket.socket.emit(SOCKET_EVENT.JOIN_ROOM, room);
    }

    if (action.type === 'socket/leaveRoom' && socket) {
      const { room } = action.payload;
      socket.socket.emit(SOCKET_EVENT.LEAVE_ROOM, room);
    }

    // Handle cleanup
    if (action.type === 'socket/cleanup' && socket) {
      cleanupSocketEvents(socket);
      socket.socket.disconnect();
      socket = undefined;
    }

    return next(action);
  };
};
