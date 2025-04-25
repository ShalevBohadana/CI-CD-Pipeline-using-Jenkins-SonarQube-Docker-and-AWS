import { Request, Response } from 'express';
import { catchAsync } from '../../../shared/catchAsync';
import { WithdrawService } from './withdraw.service';
import httpStatus from 'http-status';
import { sendResponse } from '../../../shared/sendResponse';
import { IWithdraw } from './withdraw.interface';
import pick from '../../../shared/pick';
import { WITHDRAW_FILTER_FIELDS } from './withdraw.constant';
import { paginationFields } from '../../../constants/pagination';

const createWithdraw = catchAsync(async (req: Request, res: Response) => {
  const result = await WithdrawService.createWithdrawDB(req.body);

  sendResponse<IWithdraw>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Withdraw created successfully',
    data: result,
  });
});

const getAllWithdraws = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, WITHDRAW_FILTER_FIELDS);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await WithdrawService.getAllWithdrawDB(filters, paginationOptions);

  sendResponse<IWithdraw[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Withdraws retrieved successfully',
    meta: {
      page: result.meta?.page || 1,
      limit: result.meta?.limit || 10,
      total: result.meta?.total || 0
    },
    data: result.data,
  });
});

const getWithdraw = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await WithdrawService.getSingleWithdrawByIdDB(id);

  sendResponse<IWithdraw>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Withdraw retrieved successfully',
    data: result,
  });
});

const updateWithdraw = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;
  const result = await WithdrawService.updateWithdrawDB(id, updatedData);

  sendResponse<IWithdraw>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Withdraw updated successfully',
    data: result,
  });
});

const deleteWithdraw = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await WithdrawService.deleteWithdrawDB(id);

  sendResponse<IWithdraw>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Withdraw deleted successfully',
    data: result,
  });
});

export const WithdrawController = {
  createWithdraw,
  getAllWithdraws,
  getWithdraw,
  updateWithdraw,
  deleteWithdraw,
};
