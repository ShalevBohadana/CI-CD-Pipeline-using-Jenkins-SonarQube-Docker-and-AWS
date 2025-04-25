/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';

import ApiError from '../../../errors/ApiError';
import { ICategory } from './category.interface';
import CategoryModel from './category.model';
import { IPaginationOptions } from '../../../constants/pagination';

const createCategory = async (categoryData: ICategory): Promise<ICategory> => {
  const result = await CategoryModel.create(categoryData);
  return result;
};

const getAllCategories = async (
  filters: Partial<ICategory>,
  paginationOptions: IPaginationOptions
) => {
  const { page = 1, limit = 10 } = paginationOptions;
  const skip = (page - 1) * limit;

  const result = await CategoryModel.find(filters)
    .skip(skip)
    .limit(limit);

  const total = await CategoryModel.countDocuments(filters);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getCategory = async (id: string): Promise<ICategory | null> => {
  const result = await CategoryModel.findById(id);
  return result;
};

const updateCategory = async (
  id: string,
  payload: Partial<ICategory>
): Promise<ICategory | null> => {
  const result = await CategoryModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const deleteCategory = async (id: string): Promise<ICategory | null> => {
  const result = await CategoryModel.findByIdAndDelete(id);
  return result;
};

export const CategoryService = {
  createCategory,
  getAllCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
