import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { WITHDRAW_STATUS_ENUM } from './withdraw.constant';

const withdrawSchema = z.object({
  amount: z.number().positive(),
  cardNumber: z.string().min(16).max(16),
  cardHolderName: z.string().min(3),
  cvv: z.string().min(3).max(4),
  status: z.nativeEnum(WITHDRAW_STATUS_ENUM).optional(),
});

export const validateWithdraw = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    withdrawSchema.parse(req.body);
    next();
  } catch (error) {
    next(error);
  }
};
