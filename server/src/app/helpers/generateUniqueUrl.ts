import httpStatus from 'http-status';

import ApiError from '../../errors/ApiError';
import ServiceModel from '../modules/service/service.model';

const generateUniqueUrl = async (serviceTitle: string) => {
  const url = serviceTitle
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
    .replace(/-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
    .replace(/-+/g, '-')
    .replace(/-$/, '')
    .replace(/^-/, '')
    .replace(/-$/, '')
    .replace(/-+/g, '-')
    .replace(/-$/, '')
    .replace(/^-/, '')
    .replace(/-$/, '')
    .replace(/-+/g, '-')
    .replace(/-$/, '')
    .replace(/^-/, '')
    .replace(/-$/, '')
    .replace(/-+/g, '-')
    .replace(/-$/, '')
    .replace(/^-/, '')
    .replace(/-$/, '')
    .replace(/-+/g, '-')
    .replace(/-$/, '')
    .replace(/^-/, '')
    .replace(/-$/, '')
    .replace(/-+/g, '-')
    .replace(/-$/, '')
    .replace(/^-/, '')
    .replace(/-$/, '')
    .replace(/-+/g, '-')
    .replace(/-$/, '')
    .replace(/^-/, '')
    .replace(/-$/, '')
    .replace(/-+/g, '-')
    .replace(/-$/, '')
    .replace(/^-/, '')
    .replace(/-$/, '');

  const existingService = await ServiceModel.findOne({ url });
  if (existingService)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Service with this name is already available',
    );

  return url;
};

export default generateUniqueUrl;
