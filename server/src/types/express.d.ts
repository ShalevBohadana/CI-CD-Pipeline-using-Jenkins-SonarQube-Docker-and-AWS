import { Request, Response, NextFunction, Router } from 'express';
import { ParsedQs } from 'qs';
import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }

  type RequestHandler = (req: Request, res: Response, next: NextFunction) => void | Promise<void>;
  type BaseRouter = Router;
}

export interface RequestWithUser extends Request {
  user: JwtPayload;
  headers: Request['headers'];
  body: any;
  query: ParsedQs;
  params: any;
}

export interface ExtendedRequest<T> extends Request {
  user: JwtPayload;
  headers: Request['headers'];
  body: T;
  query: ParsedQs;
  params: any;
}

export {};
