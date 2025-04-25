import { Request } from 'express';
import { Role } from '../../enums/role';

export interface JwtPayloadExtended {
  userId: string;
  roles: Role[];
  iat?: number;
  exp?: number;
}

export interface RequestWithUser extends Request {
  user: JwtPayloadExtended;
}

export type ExtendedRequest<T> = RequestWithUser & {
  body: T;
};
