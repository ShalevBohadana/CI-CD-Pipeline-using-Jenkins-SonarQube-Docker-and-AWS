import httpStatus from 'http-status';

import ApiError from '../../../errors/ApiError';
import { IGenericDataWithMeta } from '../../../interfaces/sharedInterface';
import {
  getPaginatedCondition,
  getPaginatedData,
  PaginationOptions,
} from '../../helpers/pagination';
import { OFFER_SEARCH_FIELDS } from './gameCurrency.constant';
import { GameCurrencyFilters } from './gameCurrency.interface';
import { GameCurrencyModel } from './gameCurrency.model';
import { GameCurrency, UpdateGameCurrency } from './gameCurrency.validation';

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

const createGameCurrency = async (offerData: GameCurrency) => {
  const isExisting = await GameCurrencyModel.isExisting(offerData.uid);
  if (isExisting)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Offer currency with this UID already exist',
    );

  const newOffer = await GameCurrencyModel.create(offerData);
  return newOffer;
};

const getAllGameCurrencies = async (
  filters: GameCurrencyFilters,
  paginationOptions: PaginationOptions,
): Promise<IGenericDataWithMeta<GameCurrency[]>> => {
  const { whereConditions, sortConditions, skip, limit, page } =
    await getPaginatedCondition(
      filters,
      paginationOptions,
      OFFER_SEARCH_FIELDS,
    );

  const result = await GameCurrencyModel.find(whereConditions)
    // .populate('dynamicFilters')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await GameCurrencyModel.countDocuments(whereConditions);

  return getPaginatedData(page, limit, total, result);
};
const getGameCurrency = async (uid: string): Promise<GameCurrency> => {
  const result = await GameCurrencyModel.findOne({ uid }).populate([
    { path: 'sellerId', select: { password: 0 } },
  ]);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Offer not found');
  }
  return result;
};

const updateGameCurrency = async (
  uid: string,
  offerData: UpdateGameCurrency,
): Promise<UpdateGameCurrency | null> => {
  const offer = await GameCurrencyModel.findOne({ uid });
  if (!offer) throw new ApiError(httpStatus.BAD_REQUEST, 'Offer not found.');

  // const newFilterId = await createOfferFilter(offerData.dynamicFilters);

  const updatedOffer =
    await GameCurrencyModel.findOneAndUpdate<UpdateGameCurrency>(
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

const deleteGameCurrency = async (uid: string) => {
  const offer = await GameCurrencyModel.findOneAndDelete({ uid });

  if (!offer) throw new ApiError(httpStatus.NOT_FOUND, 'Offer not found');
  const resData = {
    statusCode: httpStatus.OK,
    data: {},
    message: 'Offer deleted.',
  };

  return resData;
};

const tagSuggestions = async () => {
  const offers = await GameCurrencyModel.find({});

  if (!offers || !offers.length) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No tags found');
  }
  // Extract the 'tags' field from each offer
  const tags = offers.map((offer) => offer.tags);

  return tags;
};

export const GameCurrencyService = {
  createGameCurrency,
  getAllGameCurrencies,
  getGameCurrency,
  updateGameCurrency,
  deleteGameCurrency,
  tagSuggestions,
};
