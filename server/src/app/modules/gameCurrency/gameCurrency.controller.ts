import { Request, Response, RequestHandler } from 'express';
import httpStatus from 'http-status';

import { catchAsync } from '../../../shared/catchAsync';
import { sendSuccessResponse } from '../../../shared/customResponse';
import pick from '../../../shared/pick';
import { PAGINATION_FIELDS } from '../../helpers/pagination';
import { OFFER_FILTER_FIELDS } from './gameCurrency.constant';
import { GameCurrencyService } from './gameCurrency.service';
import { GameCurrency } from './gameCurrency.validation';

const createGameCurrency = catchAsync(async (req: Request, res: Response) => {
  const newOffer = await GameCurrencyService.createGameCurrency(req.body);

  const responseData = {
    statusCode: httpStatus.OK,
    data: newOffer,
    message: 'Offer currency created.',
  };
  sendSuccessResponse(res, responseData);
});

const getAllGameCurrencies = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, OFFER_FILTER_FIELDS);
  const paginationOptions = pick(req.query, PAGINATION_FIELDS);

  const result = await GameCurrencyService.getAllGameCurrencies(
    filters,
    paginationOptions,
  );

  sendSuccessResponse<GameCurrency[]>(res, {
    statusCode: httpStatus.OK,
    meta: result.meta || {},
    data: result.data || [],
    message: 'All offers currency fetched successfully',
  });
});

const getGameCurrency = catchAsync(async (req: Request, res: Response) => {
  const { uid } = req.params;

  const result = await GameCurrencyService.getGameCurrency(uid);

  sendSuccessResponse<GameCurrency>(res, {
    statusCode: httpStatus.OK,
    data: result,
    message: 'Offer currency fetched successfully!',
  });
});

const updateGameCurrency = catchAsync(async (req: Request, res: Response) => {
  const { uid } = req.params;
  const updatedOffer = await GameCurrencyService.updateGameCurrency(
    uid,
    req.body,
  );

  const responseData = {
    statusCode: httpStatus.CREATED,
    data: updatedOffer,
    message: 'Offer currency updated.',
  };
  sendSuccessResponse(res, responseData);
});

const deleteGameCurrency = catchAsync(async (req: Request, res: Response) => {
  const resData = await GameCurrencyService.deleteGameCurrency(req.params.uid);
  sendSuccessResponse(res, resData);
});

const tagSuggestions = catchAsync(async (req: Request, res: Response) => {
  const result = await GameCurrencyService.tagSuggestions();
  const resData = {
    statusCode: httpStatus.OK,
    data: result,
    message: 'Retrieved offer currency tag suggestions.',
  };

  sendSuccessResponse(res, resData);
});

export const GameCurrencyController: { [key: string]: RequestHandler } = {
  createGameCurrency,
  getAllGameCurrencies,
  getGameCurrency,
  updateGameCurrency,
  deleteGameCurrency,
  tagSuggestions,
};
