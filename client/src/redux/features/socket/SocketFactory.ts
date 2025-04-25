// SocketFactory.ts
import { io, Socket } from 'socket.io-client';
import { API_CONFIG } from '../../api/apiSlice';

export interface SocketInterface {
  socket: Socket;
}

export class SocketFactory {
  private static instance: SocketInterface;

  static create(): SocketInterface {
    if (!SocketFactory.instance) {
      const socket = io(API_CONFIG.BASE, {
        withCredentials: true,
        autoConnect: false,
        transports: ['websocket', 'polling'],
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        timeout: 20000,
      });

      SocketFactory.instance = { socket };
    }

    return SocketFactory.instance;
  }

  static disconnect() {
    if (SocketFactory.instance?.socket) {
      SocketFactory.instance.socket.disconnect();
    }
  }

  static getSocket(): Socket | null {
    return SocketFactory.instance?.socket || null;
  }
}

// יצירת מופע יחיד של הסוקט
export const socket: Socket = SocketFactory.create().socket;
