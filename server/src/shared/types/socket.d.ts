import { JwtPayloadExtended } from '../../app/helpers/jwtHelper';

declare module 'socket.io' {
  interface Socket {
    user?: JwtPayloadExtended;
  }
}

export {};
