import { Request, Response, RequestHandler } from 'express';

import { catchAsync } from '../../../shared/catchAsync';
import { sendSuccessResponse } from '../../../shared/customResponse';
import { ExpService } from './exp.service';

const createExpAgainstRating = catchAsync(
  async (req: Request, res: Response) => {
    const expData = req.body;
    const exp = await ExpService.createExpAgainstRating(expData);
    const responseData = {
      message: 'Exp created successfully',
      data: exp,
    };
    sendSuccessResponse(res, responseData);
  },
);

const updateExpAgainstRating = catchAsync(
  async (req: Request, res: Response) => {
    const rating = Number(req.params.rating);
    const expData = req.body;
    const exp = await ExpService.updateExpAgainstRating(rating, expData);
    const responseData = {
      message: 'Exp updated successfully',
      data: exp,
    };
    sendSuccessResponse(res, responseData);
  },
);

const getExpAgainstRating = catchAsync(async (req: Request, res: Response) => {
  const rating = Number(req.params.rating);
  const exp = await ExpService.getExpAgainstRating(rating);
  const responseData = {
    message: 'Exp fetched successfully',
    data: exp,
  };
  sendSuccessResponse(res, responseData);
});

const getAllExp = catchAsync(async (req: Request, res: Response) => {
  const exps = await ExpService.getAllExp();
  const responseData = {
    message: 'All exps fetched successfully',
    data: exps,
  };
  sendSuccessResponse(res, responseData);
});

export const ExpController: { [key: string]: RequestHandler } = {
  createExpAgainstRating,
  updateExpAgainstRating,
  getExpAgainstRating,
  getAllExp,
};
