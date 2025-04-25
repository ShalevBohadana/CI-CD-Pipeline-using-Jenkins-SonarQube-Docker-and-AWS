import httpStatus from 'http-status';

import ApiError from '../../../errors/ApiError';
import { IGenericDataWithMeta } from '../../../interfaces/sharedInterface';
import {
  getPaginatedCondition,
  getPaginatedData,
  PaginationOptions,
} from '../../helpers/pagination';
import UserModel from '../user/user.model';
import { OFFER_GAME_CURRENCY_SEARCH_FIELDS } from './offerGameCurrency.constant';
import { OfferGameCurrencyFilters } from './offerGameCurrency.interface';
import { OfferGameCurrencyModel } from './offerGameCurrency.model';
import {
  OfferGameCurrency,
  UpdateOfferGameCurrency,
} from './offerGameCurrency.validation';

const createOffer = async ({
  userId,
  data,
}: {
  userId: string;
  data: OfferGameCurrency;
}) => {
  const sellerId = (await UserModel.findOne({ userId }))?._id;
  if (!sellerId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User not found');
  }
  const isExisting = await OfferGameCurrencyModel.findOne({
    sellerId,
    serverUid: data.serverUid,
  });

  if (isExisting)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'You can not create another offer in this server',
    );

  const newOffer = (
    await OfferGameCurrencyModel.create({ ...data, sellerId })
  ).populate('sellerId', {
    password: 0,
    role: 0,
    email: 0,
  });
  return newOffer;
};

const getAllOffers = async (
  filters: OfferGameCurrencyFilters,
  paginationOptions: PaginationOptions,
): Promise<IGenericDataWithMeta<OfferGameCurrency[]>> => {
  const { whereConditions, sortConditions, skip, limit, page } =
    await getPaginatedCondition(
      filters,
      paginationOptions,
      OFFER_GAME_CURRENCY_SEARCH_FIELDS,
    );

  const result = await OfferGameCurrencyModel.find(whereConditions)
    .populate([
      {
        path: 'sellerId',
        select: {
          password: 0,
        },
      },
      {
        path: 'reviews',
        populate: {
          path: 'reviewer',
          select: {
            password: 0,
          },
        },
      },
    ])
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await OfferGameCurrencyModel.countDocuments(whereConditions);

  return getPaginatedData(page, limit, total, result);
};
const getOffer = async (id: string): Promise<OfferGameCurrency> => {
  const result = await OfferGameCurrencyModel.findById(id).populate([
    {
      path: 'sellerId',
      select: {
        password: 0,
      },
    },
    {
      path: 'reviews',
    },
  ]);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Offer not found');
  }
  return result;
};

const updateOffer = async (
  uid: string,
  offerData: UpdateOfferGameCurrency,
): Promise<UpdateOfferGameCurrency | null> => {
  const offer = await OfferGameCurrencyModel.findOne({ uid });
  if (!offer) throw new ApiError(httpStatus.BAD_REQUEST, 'Offer not found.');

  // const newFilterId = await createOfferFilter(offerData.dynamicFilters);

  const updatedOffer =
    await OfferGameCurrencyModel.findOneAndUpdate<UpdateOfferGameCurrency>(
      { uid },
      {
        ...offerData,
        // dynamicFilters: newFilterId,
      },
      {
        new: true,
      },
    );

  // const populatedOffers = await OfferGameCurrencyModel.populate(
  //   updatedOffer,
  //   'dynamicFilters'
  // );
  // return populatedOffers;
  return updatedOffer;
};

const deleteOffer = async (uid: string) => {
  const offer = await OfferGameCurrencyModel.findOneAndDelete({ _id: uid });

  if (!offer) throw new ApiError(httpStatus.NOT_FOUND, 'Offer not found');
  const resData = {
    statusCode: httpStatus.OK,
    data: {},
    message: 'Offer deleted.',
  };

  return resData;
};

const tagSuggestions = async () => {
  const offers = await OfferGameCurrencyModel.find({});

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
  updateOffer,
  deleteOffer,
  tagSuggestions,
};
