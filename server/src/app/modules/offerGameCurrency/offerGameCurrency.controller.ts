import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';

import { catchAsync } from '../../../shared/catchAsync';
import { sendSuccessResponse } from '../../../shared/customResponse';
import pick from '../../../shared/pick';
import { PAGINATION_FIELDS } from '../../helpers/pagination';
import { OFFER_GAME_CURRENCY_FILTER_FIELDS } from './offerGameCurrency.constant';
import { OfferService } from './offerGameCurrency.service';
import type { OfferGameCurrency } from './offerGameCurrency.validation';

const createOffer: RequestHandler = catchAsync(
  async (req: any, res: Response) => {
    const { userId } = req.user;
    const payload = {
      userId,
      data: req.body,
    };
    const newOffer = await OfferService.createOffer(payload);
    const responseData = {
      statusCode: httpStatus.OK,
      data: newOffer,
      message: 'Offer created.',
    };
    sendSuccessResponse(res, responseData);
  },
);

const getAllOffers: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, OFFER_GAME_CURRENCY_FILTER_FIELDS);
    const paginationOptions = pick(req.query, PAGINATION_FIELDS);
    const result = await OfferService.getAllOffers(filters, paginationOptions);
    sendSuccessResponse<OfferGameCurrency[]>(res, {
      statusCode: httpStatus.OK,
      meta: result.meta || {},
      data: result.data || [],
      message: 'All offers fetched successfully',
    });
  },
);

const getOffer: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { uid } = req.params;
    const result = await OfferService.getOffer(uid);
    sendSuccessResponse<OfferGameCurrency>(res, {
      statusCode: httpStatus.OK,
      data: result,
      message: 'Offer fetched successfully!',
    });
  },
);

const updateOffer: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { uid } = req.params;
    const updatedOffer = await OfferService.updateOffer(uid, req.body);
    const responseData = {
      statusCode: httpStatus.CREATED,
      data: updatedOffer,
      message: 'Game updated.',
    };
    sendSuccessResponse(res, responseData);
  },
);

const deleteOffer: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const resData = await OfferService.deleteOffer(req.params.uid);
    sendSuccessResponse(res, resData);
  },
);

const tagSuggestions: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await OfferService.tagSuggestions();
    const resData = {
      statusCode: httpStatus.OK,
      data: result,
      message: 'Retrieved tag suggestions.',
    };
    sendSuccessResponse(res, resData);
  },
);

export const OfferGameCurrencyController: {
  createOffer: RequestHandler;
  getAllOffers: RequestHandler;
  getOffer: RequestHandler;
  updateOffer: RequestHandler;
  deleteOffer: RequestHandler;
  tagSuggestions: RequestHandler;
} = {
  createOffer,
  getAllOffers,
  getOffer,
  updateOffer,
  deleteOffer,
  tagSuggestions,
};
