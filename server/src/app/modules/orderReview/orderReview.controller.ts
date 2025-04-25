import { Request, Response, RequestHandler } from 'express';
import httpStatus from 'http-status';

import { paginationFields } from '../../../constant/shared.constant';
import { IPaginationOption } from '../../../interfaces/sharedInterface';
import { catchAsync } from '../../../shared/catchAsync';
import { sendSuccessResponse } from '../../../shared/customResponse';
import pick from '../../../shared/pick';
import { OrderReviewService } from './orderReview.service';
import { OrderReview } from './orderReview.validation';

const createOne = catchAsync(
  async (req: Request<object, object, OrderReview>, res: Response) => {
    const orderData = req.body;
    const data = await OrderReviewService.createOne(orderData);
    const responseData = {
      data,
      message: 'Order review added successfully',
    };
    sendSuccessResponse(res, responseData);
  },
);

const createSellerReview = catchAsync(
  async (req: Request<object, object, OrderReview>, res: Response) => {
    const orderData = req.body;
    const data = await OrderReviewService.createSellerReview(orderData);
    const responseData = {
      data,
      message: 'seller  review added successfully',
    };
    sendSuccessResponse(res, responseData);
  },
);

const getSellerReviewMany = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ['searchTerm']);
  const paginationOption: IPaginationOption = pick(req.query, paginationFields);

  const result = await OrderReviewService.getSellerReviews(
    filters,
    paginationOption,
  );

  const responseData = {
    statusCode: httpStatus.OK,
    meta: result.meta || {},
    data: result.data || [],
    message: 'All Seller review fetched successfully',
  };

  sendSuccessResponse(res, responseData);
});

const getMany = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ['searchTerm']);
  const paginationOption: IPaginationOption = pick(req.query, paginationFields);

  const result = await OrderReviewService.getMany(filters, paginationOption);

  const responseData = {
    statusCode: httpStatus.OK,
    meta: result.meta || {},
    data: result.data || [],
    message: 'All Order fetched successfully',
  };

  sendSuccessResponse(res, responseData);
});

const getOne = catchAsync(async (req: Request, res: Response) => {
  const orderId = req.params.id;
  const data = await OrderReviewService.getOne(orderId);
  const responseData = {
    data,
    message: 'Order review fetched successfully',
  };
  sendSuccessResponse(res, responseData);
});

const updateOne = catchAsync(async (req: Request, res: Response) => {
  const orderId = req.params.id;
  const orderData = req.body;
  const data = await OrderReviewService.updateOne(orderId, orderData);
  const responseData = {
    data,
    message: 'Order updated successfully',
  };
  sendSuccessResponse(res, responseData);
});

const deleteOne = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await OrderReviewService.deleteOne(id);
  
  const responseData = {
    statusCode: httpStatus.OK,
    data: result,
    message: 'Order review deleted successfully',
  };
  
  sendSuccessResponse(res, responseData);
});

export const OrderReviewController: { [key: string]: RequestHandler } = {
  createOne,
  getMany,
  getOne,
  updateOne,
  deleteOne,
  createSellerReview,
  getSellerReviewMany,
};
