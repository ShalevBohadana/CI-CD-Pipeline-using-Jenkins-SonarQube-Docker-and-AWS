import { NextFunction, Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { Role } from '../enums/role';

export type RequestWithUser<
  P = ParamsDictionary,
  ResBody = any,
  ReqBody = any,
  ReqQuery = ParsedQs,
  Locals extends Record<string, any> = Record<string, any>
> = Request<P, ResBody, ReqBody, ReqQuery, Locals> & {
  user: {
    userId: string;
    roles: Role[];
    iat?: number;
    exp?: number;
  };
};

export type AsyncRequestHandler<
  P = ParamsDictionary,
  ResBody = any,
  ReqBody = any,
  ReqQuery = ParsedQs,
  Locals extends Record<string, any> = Record<string, any>
> = (
  req: Request<P, ResBody, ReqBody, ReqQuery, Locals> | RequestWithUser<P, ResBody, ReqBody, ReqQuery, Locals>,
  res: Response<ResBody, Locals>,
  next: NextFunction
) => Promise<void>;

export const catchAsync =
  <P = ParamsDictionary, ResBody = any, ReqBody = any, ReqQuery = ParsedQs>(
    fn: AsyncRequestHandler<P, ResBody, ReqBody, ReqQuery>
  ) =>
  async (
    req: Request<P, ResBody, ReqBody, ReqQuery> | RequestWithUser<P, ResBody, ReqBody, ReqQuery>,
    res: Response<ResBody>,
    next: NextFunction
  ): Promise<void> => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
