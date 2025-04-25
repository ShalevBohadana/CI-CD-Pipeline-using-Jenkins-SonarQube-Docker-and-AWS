import { SortOrder } from 'mongoose';

import { IGenericDataWithMeta } from '../../interfaces/sharedInterface';

export type CommonFilters = {
  search?: string;
};
export type PaginationOptions = {
  limit?: number;
  page?: number;
  sortBy?: string;
  sortOrder?: SortOrder;
};

export type PaginationResult = {
  page: number;
  limit: number;
  skip: number;
  sortBy?: string;
  sortOrder?: SortOrder;
};

export const PAGINATION_FIELDS: string[] = [
  'limit',
  'page',
  'sortBy',
  'sortOrder',
];

const calculatePagination = (options: PaginationOptions): PaginationResult => {
  const page = Number(options?.page || 1);
  const limit = Number(options?.limit || 10);
  const skip = (page - 1) * limit;
  const sortBy = options?.sortBy || 'createdAt';

  const sortOrder = options?.sortOrder || 'desc';

  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  };
};

export const getPaginatedCondition = async <T extends CommonFilters>(
  filters: T,
  paginationOptions: PaginationOptions,
  searchables: string[],
) => {
  const { search, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);

  const andConditions = [];
  // console.log(filters)
  if (search) {
    andConditions.push({
      $or: searchables.map((field) => ({
        [field]: {
          $regex: search,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  return { whereConditions, sortConditions, skip, limit, page };
};

export type PaginatedCondition = Awaited<
  ReturnType<typeof getPaginatedCondition>
>;

export const getPaginatedData = async <T>(
  page: number,
  limit: number,
  total: number,
  result: T,
): Promise<IGenericDataWithMeta<T>> => ({
  meta: {
    limit,
    page,
    total,
  },
  data: result,
});
