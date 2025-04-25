import httpStatus from 'http-status';
import { Types } from 'mongoose';

import ApiError from '../../../errors/ApiError';
import {
  IGenericDataWithMeta,
  IPaginationOption,
} from '../../../interfaces/sharedInterface';
import generateUniqueSKU from '../../helpers/generateUniqueSKU';
import generateUniqueUrl from '../../helpers/generateUniqueUrl';
// import paginationHelper from '../../helpers/pagination';
import {
  getPaginatedCondition,
  getPaginatedData,
} from '../../helpers/pagination';
import UserModel from '../user/user.model';
import { SERVICE_SEARCH_FIELDS } from './service.constant';
import { IService, IServiceFilters } from './service.interface';
import ServiceModel from './service.model';

const createService = async (
  serviceData: IService,
  userId: string,
): Promise<IService> => {
  const user = await UserModel.findOne({ userId }).exec();
  if (!user) throw new ApiError(httpStatus.BAD_REQUEST, 'User not found');
  
  // Convert string categoryId to ObjectId if it's a string
  if (typeof serviceData.categoryId === 'string') {
    serviceData.categoryId = new Types.ObjectId(serviceData.categoryId);
  }
  
  // Set creator as ObjectId
  serviceData.creator = new Types.ObjectId(user._id);

  const isExistingService = await ServiceModel.isExistingServiceTitle(
    serviceData.title,
  );
  if (isExistingService)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Service with this name is already available',
    );

  let sku = generateUniqueSKU(6);
  while (await ServiceModel.isExistingService(sku)) {
    sku = generateUniqueSKU(6); // Check if the generated SKU already exists in the database. If it does, generate a new one.
  }

  const url = await generateUniqueUrl(serviceData.title);
  if (!url)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Something went wrong while generating the url',
    );

  const service = await ServiceModel.create({
    ...serviceData,
    sku,
    url,
  });
  if (!service)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Something went wrong while creating the service',
    );

  return service;
};

const updateService = async (
  serviceId: string,
  serviceData: Partial<IService>,
  userId: string,
): Promise<IService> => {
  const isExist = await ServiceModel.findOne({ _id: serviceId });
  if (!isExist) throw new ApiError(httpStatus.BAD_REQUEST, 'Service not found');

  const user = await UserModel.findOne({ userId }).exec();
  if (!user) throw new ApiError(httpStatus.BAD_REQUEST, 'User not found');

  if (!isExist.creator.equals(user._id))
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'You are not authorized to update this service',
    );

  const service = await ServiceModel.findOneAndUpdate(
    { _id: serviceId },
    serviceData,
    { new: true },
  );

  if (!service)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Service update failed');

  return service.toObject();
};
const getAllService = async (
  filters: IServiceFilters,
  paginationOption: IPaginationOption,
): Promise<IGenericDataWithMeta<IService[]>> => {
  const { whereConditions, sortConditions, skip, limit, page } =
    await getPaginatedCondition(
      filters,
      paginationOption,
      SERVICE_SEARCH_FIELDS,
    );

  const result = await ServiceModel.find(whereConditions)
    .populate([
      {
        path: 'categoryId',
        model: 'Category',
      },
      {
        path: 'creator',
        model: 'User',
      },
    ])
    .sort(sortConditions)
    .skip(skip)
    .limit(limit as number)
    .select({
      __v: 0,
    });

  const total = await ServiceModel.countDocuments(whereConditions);

  return getPaginatedData(page, limit, total, result);
};

const deleteService = async (
  serviceId: string,
  userId: string,
): Promise<IService> => {
  const isExist = await ServiceModel.findOne({ _id: serviceId });
  if (!isExist) throw new ApiError(httpStatus.BAD_REQUEST, 'Service not found');

  const user = await UserModel.findOne({ userId }).exec();
  if (!user) throw new ApiError(httpStatus.BAD_REQUEST, 'User not found');

  if (!isExist.creator.equals(user._id)) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'You are not authorized to delete this service',
    );
  }

  const service = await ServiceModel.findOneAndDelete({
    _id: serviceId,
  }).lean(); // הוספת lean()

  if (!service)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Something went wrong while deleting the service',
    );

  return service;
};

// const getServicesByCategoryId = async (
//   categoryId: string,
//   paginationOption: IPaginationOption
// ): Promise<IGenericDataWithMeta<IService[]>> => {
//   const { page, limit, skip, sortBy, sortOrder } =
//     paginationHelper(paginationOption);

//   const sortCondition: { [key: string]: SortOrder } = {};

//   if (sortBy && sortOrder) {
//     sortCondition[sortBy] = sortOrder;
//   }

//   const result = await ServiceModel.find({ categoryId })
//     .populate([
//       {
//         path: 'categoryId',
//         model: 'Category',
//       },
//       {
//         path: 'creator',
//         model: 'User',
//       },
//     ])
//     .sort(sortCondition)
//     .skip(skip)
//     .limit(limit as number)
//     .select({
//       __v: 0,
//     });
//   const total = await ServiceModel.countDocuments();

//   const responseData = {
//     meta: {
//       page,
//       limit,
//       total,
//     },
//     data: result,
//   };

//   return responseData;
// };

const getServiceById = async (serviceId: string): Promise<IService> => {
  const service = await ServiceModel.findOne({ _id: serviceId })
    .populate([
      {
        path: 'categoryId',
        model: 'Category',
      },
      {
        path: 'creator',
        model: 'User',
      },
    ])
    .select({
      __v: 0,
    });

  if (!service) throw new ApiError(httpStatus.BAD_REQUEST, 'Service not found');

  return service;
};

export const ServiceService = {
  createService,
  updateService,
  getAllService,
  deleteService,
  // getServicesByCategoryId,
  getServiceById,
};
