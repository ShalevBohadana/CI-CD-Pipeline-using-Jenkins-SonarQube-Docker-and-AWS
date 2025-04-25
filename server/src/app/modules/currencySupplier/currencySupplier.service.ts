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
import { CURRENCY_SUPPLIER_SEARCH_FIELDS } from './currencySupplier.constant';
import { CurrencySupplierFilters } from './currencySupplier.interface';
import { CurrencySupplierModel } from './currencySupplier.model';
import { BecomeCurrencySupplier } from './currencySupplier.validation';

const becomeCurrencySellerReq = async ({
  // userId,
  data: boosterData,
}: {
  // userId: string;
  data: BecomeCurrencySupplier;
}) => {
  // const isExistingUser = await UserModel.findOne({
  //   userId,
  // });
  // const existingUserId = isExistingUser?._id;
  // if (!existingUserId) {
  //   throw new ApiError(httpStatus.BAD_REQUEST, 'User not found');
  // }
  const isExist = await CurrencySupplierModel.findOne({
    discordTag: boosterData.discordTag,
  });
  if (isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'You are already a Supplier');
  }
  const boosterPayload = {
    ...boosterData,
    // user: existingUserId,
  };
  const booster = await CurrencySupplierModel.create(boosterPayload);
  if (!booster)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Something went wrong while submitting your request',
    );
  return booster;
};

const getAllRequests = async (
  filters: CurrencySupplierFilters,
  paginationOption: IPaginationOption,
): Promise<IGenericDataWithMeta<BecomeCurrencySupplier[]>> => {
  const { whereConditions, sortConditions, skip, limit, page } =
    await getPaginatedCondition(
      filters,
      paginationOption,
      CURRENCY_SUPPLIER_SEARCH_FIELDS,
    );

  const result = await CurrencySupplierModel.find(whereConditions)
    .populate({
      path: 'selectedGames',
      model: 'Game',
    })
    // .populate({
    //   path: 'user',
    //   model: 'User',
    //   select: {
    //     password: 0,
    //   },
    // })
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
    .select({
      __v: 0,
    });

  const total = await CurrencySupplierModel.countDocuments(whereConditions);

  return getPaginatedData(page, limit, total, result);
};

const getRequestById = async (id: string) => {
  const booster = await CurrencySupplierModel.findById(id);
  if (!booster) throw new ApiError(httpStatus.NOT_FOUND, 'Booster not found');
  return booster;
};

const approveRequest = async (id: string) => {
  const booster = await CurrencySupplierModel.findById(id);
  if (!booster) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Supplier not found');
  }
  if (booster.isApproved) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Supplier is already approved');
  }

  const updatedBooster = await CurrencySupplierModel.findByIdAndUpdate(
    id,
    { isApproved: true, status: BoosterStatus.ACCEPTED },
    { new: true },
  );
  if (!updatedBooster)
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'Something went wrong while approving booster',
    );
  return updatedBooster;
};

const rejectRequest = async (id: string) => {
  const booster = await CurrencySupplierModel.findById(id);
  if (!booster) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Booster not found');
  }

  const updatedBooster = await CurrencySupplierModel.findByIdAndDelete(id);
  if (!updatedBooster)
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'Something went wrong while rejecting Supplier',
    );
  return updatedBooster;
};

export const CurrencySupplierService = {
  becomeCurrencySellerReq,
  getAllRequests,
  getRequestById,
  approveRequest,
  rejectRequest,
};
