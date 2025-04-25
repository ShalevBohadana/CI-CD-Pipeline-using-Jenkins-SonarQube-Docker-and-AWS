import httpStatus from 'http-status';

import ApiError from '../../../errors/ApiError';
import { IExp } from './exp.interface';
import ExpModel from './exp.model';

const createExpAgainstRating = async (expData: IExp): Promise<IExp> => {
  const isExist = await ExpModel.findByRating(expData.rating);
  if (isExist) throw new ApiError(httpStatus.BAD_REQUEST, 'Exp already exist');

  const exp = await ExpModel.create(expData);
  if (!exp)
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Something went wrong while creating exp',
    );
  return exp;
};

const updateExpAgainstRating = async (
  rating: number,
  expData: IExp,
): Promise<IExp> => {
  const exp = await ExpModel.findByRating(rating);
  if (!exp) throw new ApiError(httpStatus.NOT_FOUND, 'Exp not found');

  const updatedExp = await ExpModel.findOneAndUpdate({ rating }, expData, {
    new: true,
  });
  if (!updatedExp)
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Something went wrong while updating exp',
    );
  return updatedExp;
};

const getExpAgainstRating = async (rating: number): Promise<IExp> => {
  const exp = await ExpModel.findByRating(rating);
  if (!exp) throw new ApiError(httpStatus.NOT_FOUND, 'Exp not found');
  return exp;
};

const getAllExp = async (): Promise<IExp[]> => {
  const exps = await ExpModel.find({});
  if (!exps) throw new ApiError(httpStatus.NOT_FOUND, 'No exp found');
  return exps;
};

export const ExpService = {
  createExpAgainstRating,
  updateExpAgainstRating,
  getExpAgainstRating,
  getAllExp,
};
