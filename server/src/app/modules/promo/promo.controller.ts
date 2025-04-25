import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';

import { catchAsync } from '../../../shared/catchAsync';
import { sendSuccessResponse } from '../../../shared/customResponse';
import pick from '../../../shared/pick';
import { PAGINATION_FIELDS } from '../../helpers/pagination';
import { PROMO_FILTER_FIELDS } from './promo.constant';
import { PromoService } from './promo.service';
import { CreatePromo } from './promo.validation';

const createPromo = catchAsync(async (req: Request, res: Response) => {
  const result = await PromoService.createPromo(req.body);
  const responseData = {
    statusCode: httpStatus.CREATED,
    data: result,
    message: 'Promo created successfully',
  };
  sendSuccessResponse(res, responseData);
});

const getPromos = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, PROMO_FILTER_FIELDS);
  const paginationOptions = pick(req.query, PAGINATION_FIELDS);

  const result = await PromoService.getPromos(filters, paginationOptions);

  sendSuccessResponse<CreatePromo[]>(res, {
    statusCode: httpStatus.OK,
    meta: result.meta || {},
    data: result.data || [],
    message: 'All promos fetched successfully 2',
  });
});

const getPromo = catchAsync(async (req: Request, res: Response) => {
  const result = await PromoService.getPromo(req.params.code);

  const responseData = {
    statusCode: httpStatus.OK,
    data: result || {},
    message: 'Promo fetched successfully',
  };

  sendSuccessResponse<CreatePromo>(res, responseData);
});

const deletePromo = catchAsync(async (req: Request, res: Response) => {
  const resData = {
    data: {},
    message: 'Promo deleted.',
  };
  sendSuccessResponse(res, resData);
});

const updatePromo = catchAsync(async (req: Request, res: Response) => {
  const { code } = req.params;
  const result = await PromoService.updatePromo({ code, data: req.body });
  const responseData = {
    statusCode: httpStatus.CREATED,
    data: result,
    message: 'Promo updated.',
  };
  sendSuccessResponse(res, responseData);
});

interface PromoControllerType {
  createPromo: RequestHandler;
  getPromo: RequestHandler;
  getPromos: RequestHandler;
  deletePromo: RequestHandler;
  updatePromo: RequestHandler;
}

export const PromoController: PromoControllerType = {
  createPromo,
  getPromo,
  getPromos,
  deletePromo,
  updatePromo,
};
