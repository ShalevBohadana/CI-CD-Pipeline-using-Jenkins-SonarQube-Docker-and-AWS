import { Request, RequestHandler, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import httpStatus from 'http-status';

import { catchAsync } from '../../../shared/catchAsync';
import { sendSuccessResponse } from '../../../shared/customResponse';
import pick from '../../../shared/pick';
import { PAGINATION_FIELDS } from '../../helpers/pagination';
import { OFFER_FILTER_FIELDS } from './offer.constant';
import { OfferService } from './offer.service';
import { RegularOffer } from './offer.validation';
type OfferController = {
  createOffer: RequestHandler;
  getAllOffers: RequestHandler<ParamsDictionary, any, any, ParsedQs>;
  getOffer: RequestHandler<ParamsDictionary, any, any, ParsedQs>;
  getOfferById: RequestHandler<ParamsDictionary, any, any, ParsedQs>;
  updateOffer: RequestHandler<ParamsDictionary, any, any, ParsedQs>;
  deleteOffer: RequestHandler<ParamsDictionary, any, any, ParsedQs>;
  prebuiltFilters: RequestHandler;
  tagSuggestions: RequestHandler;
};
const createOffer: RequestHandler = catchAsync(
  async (req: any, res: Response) => {
    const { userId } = req.user;
    const payload = {
      sellerId: userId,
      ...req.body,
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
    const filters = pick(req.query, OFFER_FILTER_FIELDS);
    const paginationOptions = pick(req.query, PAGINATION_FIELDS);
    const result = await OfferService.getAllOffers(filters, paginationOptions);
    sendSuccessResponse<RegularOffer[]>(res, {
      statusCode: httpStatus.OK,
      meta: result.meta || {},
      data: result.data || [],
      message: 'All offers fetched successfully 2',
    });
  },
);

const getOffer: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { uid } = req.params;
    const result = await OfferService.getOffer(uid);
    sendSuccessResponse<RegularOffer>(res, {
      statusCode: httpStatus.OK,
      data: result,
      message: 'Offer fetched successfully!',
    });
  },
);

const getOfferById: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await OfferService.getOfferById(id);
    sendSuccessResponse<RegularOffer>(res, {
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

const prebuiltFilters: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await OfferService.prebuiltFilters();
    const resData = {
      statusCode: httpStatus.OK,
      data: result,
      message: 'Retrieved prebuilt filters.',
    };
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

const controller: OfferController = {
  createOffer,
  getAllOffers,
  getOffer,
  getOfferById,
  updateOffer,
  deleteOffer,
  prebuiltFilters,
  tagSuggestions,
};

export default controller;
