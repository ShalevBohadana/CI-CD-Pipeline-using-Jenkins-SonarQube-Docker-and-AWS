import { Request, Response, RequestHandler } from 'express';

import { catchAsync } from '../../../shared/catchAsync';
import { sendSuccessResponse } from '../../../shared/customResponse';
import { CurrencyService } from './currency.service';

const addCurrency = catchAsync(async (req: Request, res: Response) => {
  const response = await CurrencyService.addCurrency(req.body);

  const responseData = {
    data: response,
    message: 'Currency added successfully',
  };
  sendSuccessResponse(res, responseData);
});

const getAllCurrency = catchAsync(async (req: Request, res: Response) => {
  const response = await CurrencyService.getAllCurrency();

  const responseData = {
    data: response,
    message: 'Currency fetched successfully',
  };
  sendSuccessResponse(res, responseData);
});

const getCurrencyById = catchAsync(async (req: Request, res: Response) => {
  const { currencyId } = req.params;
  const response = await CurrencyService.getCurrencyById(currencyId);

  const responseData = {
    data: response,
    message: 'Currency fetched successfully',
  };
  sendSuccessResponse(res, responseData);
});

const updateCurrency = catchAsync(async (req: Request, res: Response) => {
  const { currencyId } = req.params;
  const response = await CurrencyService.updateCurrency(currencyId, req.body);

  const responseData = {
    data: response,
    message: 'Currency updated successfully',
  };
  sendSuccessResponse(res, responseData);
});

const deleteCurrency = catchAsync(async (req: Request, res: Response) => {
  const { currencyId } = req.params;
  const response = await CurrencyService.deleteCurrency(currencyId);

  const responseData = {
    data: response,
    message: 'Currency deleted successfully',
  };
  sendSuccessResponse(res, responseData);
});

export const CurrencyController: { [key: string]: RequestHandler } = {
  addCurrency,
  getAllCurrency,
  getCurrencyById,
  updateCurrency,
  deleteCurrency,
};
