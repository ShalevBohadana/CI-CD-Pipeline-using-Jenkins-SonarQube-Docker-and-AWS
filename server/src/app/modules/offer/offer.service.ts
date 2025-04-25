import httpStatus from 'http-status';

import ApiError from '../../../errors/ApiError';
import { IGenericDataWithMeta } from '../../../interfaces/sharedInterface';
import {
  getPaginatedCondition,
  getPaginatedData,
  PaginationOptions,
} from '../../helpers/pagination';
import { OFFER_SEARCH_FIELDS } from './offer.constant';
import { OfferFilters2 } from './offer.interface';
import {
  // OfferFilterModel,
  OfferModel,
} from './offer.model';
import { RegularOffer, UpdateRegularOffer } from './offer.validation';

// const createOfferFilter = async (
//   filtersData: DynamicFilterInputs[]
// ): Promise<Types.ObjectId[]> => {
//   const newFiltersData: DynamicFilterInputs[] = [];
//   const existingFilters: DynamicFilterInputs[] = [];
//   const filtersId: Types.ObjectId[] = [];

//   for (const filterData of filtersData) {
//     const filter = await OfferFilterModel.isExistingFilter(filterData.name);

//     if (!filter) {
//       newFiltersData.push(filterData);
//     } else {
//       existingFilters.push(filter);
//     }
//   }

//   const newFilters = await OfferFilterModel.insertMany<DynamicFilterInputs[]>(
//     newFiltersData
//   );
//   newFilters.forEach((filter) => filtersId.push(filter._id));
//   existingFilters.forEach((filter) => filtersId.push(filter._id));

//   return filtersId;
// };

const createOffer = async (offerData: RegularOffer) => {
  const isExisting = await OfferModel.isExisting(offerData.uid);
  if (isExisting)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Offer with this UID already exist',
    );

  const newOffer = await OfferModel.create(offerData);
  return newOffer;
};

// const getAllOffer = async (
//   paginationOption: IPaginationOption
// ): Promise<IGenericDataWithMeta<IOffer[]>> => {
//   const responseData = await getPaginateddData<IOffer>(
//     OfferModel,
//     paginationOption
//   );

//   responseData.data = await OfferModel.populate(
//     responseData.data,
//     'dynamicFilters'
//   );

//   return responseData;
// };
const getAllOffers = async (
  filters: OfferFilters2,
  paginationOptions: PaginationOptions,
): Promise<IGenericDataWithMeta<RegularOffer[]>> => {
  const { whereConditions, sortConditions, skip, limit, page } =
    await getPaginatedCondition(
      filters,
      paginationOptions,
      OFFER_SEARCH_FIELDS,
    );

  const result = await OfferModel.find(whereConditions)
    // .populate('dynamicFilters')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await OfferModel.countDocuments(whereConditions);

  return getPaginatedData(page, limit, total, result);
};
const getOffer = async (uid: string): Promise<RegularOffer> => {
  const result = await OfferModel.findOne({ uid }).populate([
    {
      path: 'sellerId',
      select: {
        password: 0,
      },
    },
  ]);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Offer not found');
  }
  return result;
};

const getOfferById = async (id: string): Promise<RegularOffer> => {
  const result = await OfferModel.findById(id).populate([
    {
      path: 'sellerId',
      select: {
        password: 0,
      },
    },
  ]);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Offer not found');
  }
  return result;
};

const updateOffer = async (
  uid: string,
  offerData: UpdateRegularOffer,
): Promise<UpdateRegularOffer | null> => {
  const offer = await OfferModel.findOne({ uid });
  if (!offer) throw new ApiError(httpStatus.BAD_REQUEST, 'Offer not found.');

  // const newFilterId = await createOfferFilter(offerData.dynamicFilters);

  const updatedOffer = await OfferModel.findOneAndUpdate<UpdateRegularOffer>(
    { uid },
    {
      ...offerData,
      // dynamicFilters: newFilterId,
    },
    {
      new: true,
    },
  );

  // const populatedOffers = await OfferModel.populate(
  //   updatedOffer,
  //   'dynamicFilters'
  // );
  // return populatedOffers;
  return updatedOffer;
};

const deleteOffer = async (uid: string) => {
  const offer = await OfferModel.findOneAndDelete({ uid });

  if (!offer) throw new ApiError(httpStatus.NOT_FOUND, 'Offer not found');
  const resData = {
    statusCode: httpStatus.OK,
    data: {},
    message: 'Offer deleted.',
  };

  return resData;
};
const prebuiltFilters = async () => {
  const offers = await OfferModel.find({});

  if (!offers || !offers.length) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No filters found');
  }
  const dynamicFilters = offers.map((offer) => ({
    label: offer.name,
    value: offer.dynamicFilters,
  }));

  return dynamicFilters;
};
const tagSuggestions = async () => {
  const offers = await OfferModel.find({});

  if (!offers || !offers.length) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No tags found');
  }
  // Extract the 'tags' field from each offer
  const tags = offers.map((offer) => offer.tags);

  return tags;
};

export const OfferService = {
  createOffer,
  // createOfferFilter,
  getAllOffers,
  getOffer,
  getOfferById,
  updateOffer,
  deleteOffer,
  prebuiltFilters,
  tagSuggestions,
};
