import { Request, Response, NextFunction } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

declare global {
  namespace Express {
    interface Request {
      user?: Record<string, any>;
      file?: Express.Multer.File;
      files?: Express.Multer.File[];
    }
  }
}

type Role = 'admin' | 'user' | 'booster' | 'employee';

export interface RequestWithUser extends Request {
  user?: {
    userId: string;
    roles: Role[];
    [key: string]: any;
    iat?: number;
    exp?: number;
    jti?: string;
    iss?: string;
    sub?: string;
    aud?: string;
    nbf?: number;
  };
  body: any;
  query: ParsedQs;
  params: ParamsDictionary;
}

export interface ExtendedRequest<T> extends RequestWithUser {
  body: T;
}

export type AsyncRequestHandler<T = any> = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => Promise<T>;

export type SyncRequestHandler<T = any> = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => T;
