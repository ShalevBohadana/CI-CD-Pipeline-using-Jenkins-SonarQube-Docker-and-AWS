/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';

export interface ICategory {
  title: string;
  gameId: Types.ObjectId;
}

export interface ICategoryModel extends Model<ICategory> {
  isExistingCategory(title: string): Promise<ICategory>;
}
export interface ICategoryFilters {
  search?: string;
  gameId?: string;
}
