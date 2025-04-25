/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { ClientSession } from 'mongoose';

import ApiError from '../../../errors/ApiError';
import {
  IGenericDataWithMeta,
  IPaginationOption,
} from '../../../interfaces/sharedInterface';
import {
  getPaginatedCondition,
  getPaginatedData,
} from '../../helpers/pagination';
import { OfferModel } from '../offer/offer.model';
import { OfferGameCurrencyModel } from '../offerGameCurrency/offerGameCurrency.model';
import UserModel from '../user/user.model';
import { ORDER_REVIEW_SEARCH_FIELDS } from './orderReview.constant';
import { OrderReviewFilters } from './orderReview.interface';
import { OrderReviewModel, SellerReviewModel } from './orderReview.model';
import { OrderReview } from './orderReview.validation';

// Helper function to handle transactions
const withTransaction = async <T>(
  operation: (session: ClientSession) => Promise<T>,
): Promise<T> => {
  const session = await OrderReviewModel.startSession();
  session.startTransaction();

  try {
    const result = await operation(session);
    await session.commitTransaction();
    return result;
  } catch (error) {
    await session.abortTransaction();
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, (error as Error)?.message);
  } finally {
    session.endSession();
  }
};

const createOne = async (orderData: OrderReview): Promise<OrderReview> => {
  return withTransaction(async (session) => {
    const hasAlreadyReviewed = await OrderReviewModel.findOne({
      reviewer: orderData.reviewer,
      order: orderData.order,
    }).session(session);

    if (hasAlreadyReviewed) {
      throw new ApiError(httpStatus.CONFLICT, 'Can not review twice');
    }

    const review = await OrderReviewModel.create([{ ...orderData }], {
      session,
    });
    const createdReview = review[0];

    if (orderData.offerRegular) {
      await OfferModel.findOneAndUpdate(
        { _id: orderData.offerRegular },
        { $addToSet: { reviews: createdReview._id } },
        { new: true, session },
      );
    }

    if (orderData.offerCurrency) {
      await OfferGameCurrencyModel.findOneAndUpdate(
        { _id: orderData.offerCurrency },
        { $addToSet: { reviews: createdReview._id } },
        { new: true, session },
      );
    }

    await UserModel.findOneAndUpdate(
      { _id: orderData.reviewer },
      { $addToSet: { reviews: createdReview._id } },
      { new: true, session },
    );

    return createdReview;
  });
};

const createSellerReview = async (
  orderData: OrderReview,
): Promise<OrderReview> => {
  return withTransaction(async (session) => {
    const hasAlreadyReviewed = await SellerReviewModel.findOne({
      reviewer: orderData.reviewer,
      order: orderData.order,
    }).session(session);

    if (hasAlreadyReviewed) {
      throw new ApiError(httpStatus.CONFLICT, 'Can not review twice');
    }

    const review = await SellerReviewModel.create([{ ...orderData }], {
      session,
    });
    const createdReview = review[0];

    if (orderData.offerRegular) {
      await OfferModel.findOneAndUpdate(
        { _id: orderData.offerRegular },
        { $addToSet: { reviews: createdReview._id } },
        { new: true, session },
      );
    }

    if (orderData.offerCurrency) {
      await OfferGameCurrencyModel.findOneAndUpdate(
        { _id: orderData.offerCurrency },
        { $addToSet: { reviews: createdReview._id } },
        { new: true, session },
      );
    }

    await UserModel.findOneAndUpdate(
      { _id: orderData.reviewer },
      { $addToSet: { reviews: createdReview._id } },
      { new: true, session },
    );

    return createdReview;
  });
};

const getMany = async (
  filters: OrderReviewFilters,
  paginationOption: IPaginationOption,
): Promise<IGenericDataWithMeta<OrderReview[]>> => {
  const { whereConditions, sortConditions, skip, limit, page } =
    await getPaginatedCondition(
      filters,
      paginationOption,
      ORDER_REVIEW_SEARCH_FIELDS,
    );

  const result = await OrderReviewModel.find(whereConditions)
    .populate([
      { path: 'reviewer', select: { password: 0 } },
      { path: 'order' },
      { path: 'offerRegular' },
      { path: 'offerCurrency' },
    ])
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await OrderReviewModel.countDocuments(whereConditions);

  return getPaginatedData(page, limit, total, result);
};

const getSellerReviews = async (
  filters: OrderReviewFilters,
  paginationOption: IPaginationOption,
): Promise<IGenericDataWithMeta<OrderReview[]>> => {
  const { whereConditions, sortConditions, skip, limit, page } =
    await getPaginatedCondition(
      filters,
      paginationOption,
      ORDER_REVIEW_SEARCH_FIELDS,
    );

  const result = await SellerReviewModel.find(whereConditions)
    .populate([
      { path: 'reviewer', select: { password: 0 } },
      { path: 'order' },
      { path: 'offerRegular' },
      { path: 'offerCurrency' },
    ])
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await SellerReviewModel.countDocuments(whereConditions);

  return getPaginatedData(page, limit, total, result);
};

const getOne = async (orderId: string): Promise<OrderReview> => {
  return withTransaction(async (session) => {
    const isExistingOrder = await OrderReviewModel.findOne({
      _id: orderId,
    })
      .populate([
        { path: 'reviewer', select: { password: 0 } },
        { path: 'order' },
        { path: 'offerRegular' },
        { path: 'offerCurrency' },
      ])
      .session(session)
      .lean();

    if (!isExistingOrder) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
    }

    return isExistingOrder as OrderReview;
  });
};

const updateOne = async (
  orderId: string,
  orderData: Partial<OrderReview>,
): Promise<OrderReview> => {
  return withTransaction(async (session) => {
    const isExistingOrder = await OrderReviewModel.findOneAndUpdate(
      { _id: orderId },
      { $set: orderData },
      { new: true, session },
    ).lean();

    if (!isExistingOrder) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
    }

    return isExistingOrder as OrderReview;
  });
};

const deleteOne = async (id: string): Promise<OrderReview | null> => {
  return withTransaction(async (session) => {
    const review = await OrderReviewModel.findByIdAndDelete(id).session(session);
    
    if (!review) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Order review not found');
    }
    
    return review;
  });
};

export const OrderReviewService = {
  createOne,
  getMany,
  getOne,
  updateOne,
  deleteOne,
  createSellerReview,
  getSellerReviews,
};
