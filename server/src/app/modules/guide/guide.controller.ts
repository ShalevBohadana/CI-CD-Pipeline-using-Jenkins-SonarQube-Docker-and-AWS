import { Request, Response, RequestHandler } from 'express';
import httpStatus from 'http-status';

import { paginationFields } from '../../../constant/shared.constant';
import { IPaginationOption } from '../../../interfaces/sharedInterface';
import { catchAsync } from '../../../shared/catchAsync';
import { sendSuccessResponse } from '../../../shared/customResponse';
import pick from '../../../shared/pick';
import { GUIDE_FILTER_FIELDS } from './guide.constant';
import { GuideService } from './guide.service';
import { CreateGuide } from './guide.validation';

const createGuide = catchAsync(async (req: Request, res: Response) => {
  // const { userId } = req.user;
  const guide = await GuideService.createGuide({
    // userId,
    payload: req.body,
  });
  const responseData = {
    message: 'Your guide has been created successfully',
    data: guide,
  };
  sendSuccessResponse(res, responseData);
});

const getAllGuides = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ['searchTerm', ...GUIDE_FILTER_FIELDS]);
  const paginationOption: IPaginationOption = pick(req.query, paginationFields);

  const result = await GuideService.getAllGuides(filters, paginationOption);

  const responseData = {
    statusCode: httpStatus.OK,
    meta: result.meta || {},
    data: result.data || [],
    message: 'All guides fetched successfully',
  };

  sendSuccessResponse<CreateGuide[]>(res, responseData);
});

const getOneGuide = catchAsync(async (req: Request, res: Response) => {
  const booster = await GuideService.getOneGuide(req.params.uid);
  const responseData = {
    message: 'Booster fetched successfully',
    data: booster,
  };
  sendSuccessResponse(res, responseData);
});

const updateGuide = catchAsync(async (req: Request, res: Response) => {
  const booster = await GuideService.updateGuide({
    uid: req.params.uid,
    payload: req.body,
  });
  const responseData = {
    message: 'Booster approved successfully',
    data: booster,
  };
  sendSuccessResponse(res, responseData);
});

const deleteGuide = catchAsync(async (req: Request, res: Response) => {
  const booster = await GuideService.deleteGuide(req.params.uid);
  const responseData = {
    message: 'Booster rejected successfully',
    data: booster,
  };
  sendSuccessResponse(res, responseData);
});

export const GuideController: { [key: string]: RequestHandler } = {
  createGuide,
  getAllGuides,
  updateGuide,
  getOneGuide,
  deleteGuide,
};
