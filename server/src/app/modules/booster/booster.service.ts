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
import { Role } from '../../../enums/role';
import UserModel from '../user/user.model';
import { BOOSTER_SEARCH_FIELDS, BoosterStatus } from './booster.constant';
import { BoosterFilters } from './booster.interface';
import { BoosterModel } from './booster.model';
import { BecomeBooster } from './booster.validation';

const requestForBecomingBooster = async ({
  userId,
  data: boosterData,
}: {
  userId: string;
  data: BecomeBooster;
}) => {
  const isExistingUser = await UserModel.findOne({
    userId,
  });
  const existingUserId = isExistingUser?._id;
  if (!existingUserId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User not found');
  }
  const isExist = await BoosterModel.findOne({
    user: existingUserId,
  });
  if (isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'You are already a booster');
  }
  const boosterPayload = {
    ...boosterData,
    user: existingUserId,
  };
  const booster = await BoosterModel.create(boosterPayload);
  if (!booster)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Something went wrong while submitting your request',
    );
  return booster;
};

const getAllBoostersRequest = async (
  filters: BoosterFilters,
  paginationOption: IPaginationOption,
): Promise<IGenericDataWithMeta<BecomeBooster[]>> => {
  const { whereConditions, sortConditions, skip, limit, page } =
    await getPaginatedCondition(
      filters,
      paginationOption,
      BOOSTER_SEARCH_FIELDS,
    );

  const result = await BoosterModel.find(whereConditions)
    .populate({
      path: 'selectedGames',
      model: 'Game',
    })
    .populate([
      {
        path: 'user',
        model: 'User',
        select: {
          password: 0,
        },
        populate: {
          path: 'reviews',
          model: 'OrderReview',
        },
      },
    ])
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
    .select({
      __v: 0,
    });

  const total = await BoosterModel.countDocuments(whereConditions);

  return getPaginatedData(page, limit, total, result);
};

const getBoosterRequestById = async (id: string) => {
  const booster = await BoosterModel.findById(id)
    .populate({
      path: 'selectedGames',
      model: 'Game',
    })
    .populate([
      {
        path: 'user',
        model: 'User',
        select: {
          password: 0,
        },
        populate: {
          path: 'reviews',
          model: 'OrderReview',
        },
      },
    ]);
  if (!booster) throw new ApiError(httpStatus.NOT_FOUND, 'Booster not found');
  return booster;
};
const getBoosterRequestByUser = async (id: string) => {
  const booster = await BoosterModel.findOne({ user: id });
  if (!booster)
    throw new ApiError(httpStatus.NOT_FOUND, 'Booster not found by user');
  return booster;
};

const approveBoosterRequest = async (id: string) => {
  const booster = await BoosterModel.findById(id);
  if (!booster) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Booster not found');
  }
  if (booster.isApproved) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Booster is already approved');
  }

  const updatedBooster = await BoosterModel.findByIdAndUpdate(
    id,
    { isApproved: true, status: BoosterStatus.ACCEPTED },
    { new: true },
  );
  await UserModel.findByIdAndUpdate(booster.user, {
    $addToSet: {
      roles: Role.BOOSTER,
    },
  });
  if (!updatedBooster)
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'Something went wrong while approving booster',
    );
  return updatedBooster;
};

const rejectBoosterRequest = async (id: string) => {
  const booster = await BoosterModel.findById(id);
  if (!booster) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Booster not found');
  }

  const updatedBooster = await BoosterModel.findByIdAndDelete(id);
  if (!updatedBooster)
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'Something went wrong while rejecting booster',
    );
  return updatedBooster;
};

export const BoosterService = {
  requestForBecomingBooster,
  getAllBoostersRequest,
  getBoosterRequestById,
  approveBoosterRequest,
  rejectBoosterRequest,
  getBoosterRequestByUser,
};
