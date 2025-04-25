/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';

import ApiError from '../../../errors/ApiError';
import {
  IGenericDataWithMeta,
  IPaginationOption,
} from '../../../interfaces/sharedInterface';
import {
  getPaginatedCondition,
  getPaginatedData,
} from '../../helpers/pagination';
import { OrderModel } from '../order/order.model';
import { USER_SEARCH_FIELDS } from './user.constant';
import { Role } from '../../../enums/role';
import { IUser, IUserFilters } from './user.interface';
import UserModel from './user.model';

const getAllUsers = async (
  filters: IUserFilters,
  paginationOption: IPaginationOption,
): Promise<IGenericDataWithMeta<IUser[]>> => {
  const { whereConditions, sortConditions, skip, limit, page } =
    await getPaginatedCondition(filters, paginationOption, USER_SEARCH_FIELDS);

  const result = await UserModel.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
    .select({
      password: 0,
      __v: 0,
    });

  const total = await UserModel.countDocuments(whereConditions);

  return getPaginatedData(page, limit, total, result);
};

const getOne = async (userId: string): Promise<IUser> => {
  const user = await UserModel.findOne({
    $or: [{ userId }, { email: userId }],
  }).select({ password: 0 });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  return user;
};

const getUserHistory = async (userId: string): Promise<IUser['history']> => {
  const user = await UserModel.findOne({ userId }).select('history');
  
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  return user.history || [];
};

const getCurrentUser = async (userId: string): Promise<IUser> => {
  const user = await UserModel.findOne({ userId }).select({ password: 0 });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  return user;
};

const getStatistics = async (): Promise<any> => {
  const totalUsers = await UserModel.countDocuments();
  const totalBoosters = await UserModel.countDocuments({ roles: Role.BOOSTER });
  const onlineBoosters = await UserModel.countDocuments({ roles: Role.BOOSTER, isOnline: true });
  const totalOrders = await OrderModel.countDocuments();

  return {
    totalUsers,
    totalBoosters,
    onlineBoosters,
    totalOrders
  };
};

const addHistoryEntry = async (userId: string, historyEntry: { action: string; details?: any }) => {
  const user = await UserModel.findOne({ userId });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  user.history = user.history || [];
  user.history.push({
    ...historyEntry,
    timestamp: new Date()
  });

  await user.save();
  return user.history;
};

const updateUser = async (userId: string, userData: Partial<IUser>): Promise<IUser> => {
  const user = await UserModel.findOne({ userId });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  // Remove sensitive fields that shouldn't be updated directly
  const { password, roles, ...updateData } = userData;

  Object.assign(user, updateData);
  await user.save();

  return user;
};

const getOnlineBoosters = async (): Promise<IUser[]> => {
  return UserModel.find({
    roles: Role.BOOSTER,
    isOnline: true
  }).select({ password: 0 });
};

export const UserService = {
  getAllUsers,
  getOne,
  updateUser,
  getStatistics,
  getCurrentUser,
  getUserHistory,
  addHistoryEntry,
  getOnlineBoosters,
};

export default UserService;
