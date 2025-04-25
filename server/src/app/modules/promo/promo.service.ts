import httpStatus from 'http-status';

import ApiError from '../../../errors/ApiError';
import { IGenericDataWithMeta } from '../../../interfaces/sharedInterface';
import {
  getPaginatedCondition,
  getPaginatedData,
  PaginationOptions,
} from '../../helpers/pagination';
// import { getPaginateddData } from '../../../shared/utilities';
import { PROMO_SEARCH_FIELDS } from './promo.constant';
import { PromoFilters, UpdatePromo } from './promo.interface';
import { PromoModel } from './promo.model';
import { CreatePromo } from './promo.validation';

const createPromo = async (payload: CreatePromo): Promise<CreatePromo> => {
  const isExisting = await PromoModel.isExistingPromo(payload.code);
  if (isExisting)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Promo with this title already exist',
    );

  const promo = await PromoModel.create(payload);
  return promo;
};

const getPromos = async (
  filters: PromoFilters,
  paginationOptions: PaginationOptions,
): Promise<IGenericDataWithMeta<CreatePromo[]>> => {
  const { whereConditions, sortConditions, skip, limit, page } =
    await getPaginatedCondition(
      filters,
      paginationOptions,
      PROMO_SEARCH_FIELDS,
    );

  const result = await PromoModel.find(whereConditions)
    // .populate('academicSemester')
    // .populate('academicDepartment')
    // .populate('academicFaculty')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await PromoModel.countDocuments(whereConditions);

  return getPaginatedData(page, limit, total, result);
};

const getPromo = async (code: string) => {
  const result = await PromoModel.findOne({ code });

  if (!result) throw new ApiError(httpStatus.NOT_FOUND, 'Promo not found');

  return result;
};
const deletePromo = async (code: string) => {
  const result = await PromoModel.findOneAndDelete({
    code,
  });

  if (!result) throw new ApiError(httpStatus.NOT_FOUND, 'Game not found');

  return result;
};

const updatePromo = async (payload: {
  code: string;
  data: Partial<UpdatePromo>;
}): Promise<UpdatePromo | null> => {
  const result = await PromoModel.findOne({ code: payload.code });
  if (!result) throw new ApiError(httpStatus.BAD_REQUEST, 'Promo not found.');

  const updatedResult = await PromoModel.findOneAndUpdate<UpdatePromo>(
    { code: payload.code },
    { ...payload.data },
    {
      new: true,
    },
  );
  return updatedResult;
};

export const PromoService = {
  createPromo,
  getPromo,
  getPromos,
  deletePromo,
  updatePromo,
};
