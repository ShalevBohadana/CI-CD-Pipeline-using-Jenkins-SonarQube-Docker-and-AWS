import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';

import { paginationFields } from '../../../constant/shared.constant';
import { IPaginationOption } from '../../../interfaces/sharedInterface';
import { catchAsync } from '../../../shared/catchAsync';
import { sendSuccessResponse } from '../../../shared/customResponse';
import pick from '../../../shared/pick';
import { CURRENCY_SELLER_FILTER_FIELDS } from './currencySeller.constant';
import { CurrencySellerService } from './currencySeller.service';
import { BecomeCurrencySeller } from './currencySeller.validation';

const becomeCurrencySeller: RequestHandler = catchAsync(
  async (req: any, res: Response) => {
    const { userId } = req.user;
    const booster = await CurrencySellerService.BecomeCurrencySellerReq({
      userId,
      data: req.body,
    });
    const responseData = {
      message: 'Your request has been submitted successfully',
      data: booster,
    };
    sendSuccessResponse(res, responseData);
  },
);

const getAllRequest: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, [
      'searchTerm',
      ...CURRENCY_SELLER_FILTER_FIELDS,
    ]);
    const paginationOption: IPaginationOption = pick(
      req.query,
      paginationFields,
    );
    const result = await CurrencySellerService.getAllRequests(
      filters,
      paginationOption,
    );
    const responseData = {
      statusCode: httpStatus.OK,
      meta: result.meta || {},
      data: result.data || [],
      message: 'All boosters fetched successfully',
    };
    sendSuccessResponse<BecomeCurrencySeller[]>(res, responseData);
  },
);

const getRequestById: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const booster = await CurrencySellerService.getRequestById(req.params.id);
    const responseData = {
      message: 'Booster fetched successfully',
      data: booster,
    };
    sendSuccessResponse(res, responseData);
  },
);

const approveRequest: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const booster = await CurrencySellerService.approveRequest(req.params.id);
    const responseData = {
      message: 'Booster approved successfully',
      data: booster,
    };
    sendSuccessResponse(res, responseData);
  },
);

const rejectRequest: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const booster = await CurrencySellerService.rejectRequest(req.params.id);
    const responseData = {
      message: 'Booster rejected successfully',
      data: booster,
    };
    sendSuccessResponse(res, responseData);
  },
);

export const CurrencySellerController: { [key: string]: RequestHandler } = {
  becomeCurrencySeller,
  getAllRequest,
  approveRequest,
  getRequestById,
  rejectRequest,
};
