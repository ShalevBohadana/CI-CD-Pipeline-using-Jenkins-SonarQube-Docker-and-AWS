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
import { GUIDE_SEARCH_FIELDS } from './guide.constant';
import { GuideFilters } from './guide.interface';
import { GuideModel } from './guide.model';
import { CreateGuide } from './guide.validation';

const createGuide = async ({
  // userId,
  payload: guideData,
}: {
  // userId: string;
  payload: CreateGuide;
}) => {
  const isExist = await GuideModel.findOne({
    uid: guideData.body.uid,
  });
  if (isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'UID already exist');
  }
  const payload = {
    ...guideData,
    // user: existingUserId,
  };
  const guide = await GuideModel.create(payload);
  if (!guide) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Something went wrong while creating guide',
    );
  }
  return guide;
};

const getAllGuides = async (
  filters: GuideFilters,
  paginationOption: IPaginationOption,
): Promise<IGenericDataWithMeta<CreateGuide[]>> => {
  const { whereConditions, sortConditions, skip, limit, page } =
    await getPaginatedCondition(filters, paginationOption, GUIDE_SEARCH_FIELDS);

  const result = await GuideModel.find(whereConditions)
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

  const total = await GuideModel.countDocuments(whereConditions);

  return getPaginatedData(page, limit, total, result);
};

const getOneGuide = async (uid: string) => {
  const guide = await GuideModel.findOne({ uid });
  if (!guide) throw new ApiError(httpStatus.NOT_FOUND, 'guide not found');
  return guide;
};

const updateGuide = async ({
  uid,
  payload,
}: {
  uid: string;
  payload: Partial<CreateGuide>;
}) => {
  const guide = await GuideModel.findOne({ uid });
  if (!guide) {
    throw new ApiError(httpStatus.NOT_FOUND, 'guide not found');
  }

  const updatedGuide = await GuideModel.findOneAndUpdate({ uid }, payload, {
    new: true,
  });
  if (!updatedGuide) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'Something went wrong while approving booster',
    );
  }
  return updatedGuide;
};

const deleteGuide = async (uid: string) => {
  const booster = await GuideModel.findOne({ uid });
  if (!booster) {
    throw new ApiError(httpStatus.NOT_FOUND, 'guide not found');
  }

  const deletedBooster = await GuideModel.findOneAndDelete({ uid });
  if (!deletedBooster) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'Something went wrong while deleting guide',
    );
  }
  return deletedBooster;
};

export const GuideService = {
  createGuide,
  getAllGuides,
  getOneGuide,
  updateGuide,
  deleteGuide,
};
