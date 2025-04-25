import { Response, RequestHandler, Request } from 'express';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { catchAsync } from '../../../shared/catchAsync';
import { sendSuccessResponse } from '../../../shared/customResponse';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constant/shared.constant';
import { IPaginationOption } from '../../../interfaces/sharedInterface';
import { USER_FILTER_FIELDS } from './user.constant';
import { IUser } from './user.interface';
import { UserService } from './user.service';

interface IUserController {
  getAllUsers: RequestHandler;
  getOne: RequestHandler;
  updateUser: RequestHandler;
  getStatistics: RequestHandler;
  getCurrentUser: RequestHandler;
  getUserHistory: RequestHandler;
  addHistoryEntry: RequestHandler;
  getOnlineBoosters: RequestHandler;
}

const getAllUsers: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
  const filters = pick(req.query, ['search', ...USER_FILTER_FIELDS]);
  const paginationOption: IPaginationOption = pick(req.query, paginationFields);

  const result = await UserService.getAllUsers(filters, paginationOption);

  sendSuccessResponse<IUser[]>(res, {
    statusCode: httpStatus.OK,
    meta: result.meta || {},
    data: result.data || [],
    message: 'All users fetched successfully',
  });
});

const getUserHistory: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const userDbId = req.params.id;
  const result = await UserService.getUserHistory(userDbId);

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    data: result,
    message: 'User history fetched successfully',
  });
});

const addHistoryEntry: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const userDbId = req.params.id;
  const result = await UserService.addHistoryEntry(userDbId, req.body);

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    data: result,
    message: 'History entry added successfully',
  });
});

const getOne: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const userDbId = req.params.id;
  const result = await UserService.getOne(userDbId);

  sendSuccessResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    data: result,
    message: 'User fetched successfully',
  });
});

const updateUser: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const userDbId = req.params.id;
  const result = await UserService.updateUser(userDbId, req.body);

  sendSuccessResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    data: result,
    message: 'User updated successfully',
  });
});

const getStatistics: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getStatistics();

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    data: result,
    message: 'Statistics fetched successfully',
  });
});

const getCurrentUser: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  if (!userId) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'User not found');
  }
  
  const result = await UserService.getCurrentUser(userId);

  sendSuccessResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    data: result,
    message: 'Current user fetched successfully',
  });
});

const getOnlineBoosters: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getOnlineBoosters();

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    data: result,
    message: 'Online boosters fetched successfully',
  });
});

const controller: IUserController = {
  getAllUsers,
  getOne,
  updateUser,
  getStatistics,
  getCurrentUser,
  getUserHistory,
  addHistoryEntry,
  getOnlineBoosters,
};

export default controller;
