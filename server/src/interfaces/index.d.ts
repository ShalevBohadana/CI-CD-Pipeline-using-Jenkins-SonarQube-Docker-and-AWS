// src/types/express/index.d.ts
import { JwtPayloadExtended } from '../app/helpers/jwtHelper';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayloadExtended;
    }
  }
}

declare module 'socket.io' {
  interface Socket {
    user?: JwtPayloadExtended;
  }
}

export {};
