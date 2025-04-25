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
import { BoosterStatus } from '../booster/booster.constant';
import UserModel from '../user/user.model';
import { CURRENCY_SELLER_SEARCH_FIELDS } from './currencySeller.constant';
import { CurrencySellerFilters } from './currencySeller.interface';
import { CurrencySellerModel } from './currencySeller.model';
import { BecomeCurrencySeller } from './currencySeller.validation';

const BecomeCurrencySellerReq = async ({
  userId,
  data: boosterData,
}: {
  userId: string;
  data: BecomeCurrencySeller;
}) => {
  const isExistingUser = await UserModel.findOne({
    userId,
  });
  const existingUserId = isExistingUser?._id;
  if (!existingUserId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User not found');
  }
  const isExist = await CurrencySellerModel.findOne({
    user: existingUserId,
  });
  if (isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'You are already a Seller');
  }
  const boosterPayload = {
    ...boosterData,
    user: existingUserId,
  };
  const booster = await CurrencySellerModel.create(boosterPayload);
  if (!booster)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Something went wrong while submitting your request',
    );
  return booster;
};

const getAllRequests = async (
  filters: CurrencySellerFilters,
  paginationOption: IPaginationOption,
): Promise<IGenericDataWithMeta<BecomeCurrencySeller[]>> => {
  const { whereConditions, sortConditions, skip, limit, page } =
    await getPaginatedCondition(
      filters,
      paginationOption,
      CURRENCY_SELLER_SEARCH_FIELDS,
    );

  const result = await CurrencySellerModel.find(whereConditions)
    .populate({
      path: 'selectedGames',
      model: 'Game',
    })
    .populate({
      path: 'user',
      model: 'User',
      select: {
        password: 0,
      },
    })
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
    .select({
      __v: 0,
    });

  const total = await CurrencySellerModel.countDocuments(whereConditions);

  return getPaginatedData(page, limit, total, result);
};

const getRequestById = async (id: string) => {
  const booster = await CurrencySellerModel.findById(id);
  if (!booster) throw new ApiError(httpStatus.NOT_FOUND, 'Seller not found');
  return booster;
};

const approveRequest = async (id: string) => {
  const booster = await CurrencySellerModel.findById(id);
  if (!booster) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Seller not found');
  }
  if (booster.isApproved) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Seller is already approved');
  }

  const updatedBooster = await CurrencySellerModel.findByIdAndUpdate(
    id,
    { isApproved: true, status: BoosterStatus.ACCEPTED },
    { new: true },
  );
  if (!updatedBooster)
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'Something went wrong while approving seller',
    );
  return updatedBooster;
};

const rejectRequest = async (id: string) => {
  const booster = await CurrencySellerModel.findById(id);
  if (!booster) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Booster not found');
  }

  const updatedBooster = await CurrencySellerModel.findByIdAndDelete(id);
  if (!updatedBooster)
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'Something went wrong while rejecting booster',
    );
  return updatedBooster;
};

export const CurrencySellerService = {
  BecomeCurrencySellerReq,
  getAllRequests,
  getRequestById,
  approveRequest,
  rejectRequest,
};
