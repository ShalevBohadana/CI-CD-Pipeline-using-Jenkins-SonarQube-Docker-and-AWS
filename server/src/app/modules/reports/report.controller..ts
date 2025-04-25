import { Request, Response } from 'express';
import httpStatus from 'http-status';

import { catchAsync } from '../../../shared/catchAsync';
import { sendSuccessResponse } from '../../../shared/customResponse';
import pick from '../../../shared/pick';
import { PAGINATION_FIELDS } from '../../helpers/pagination';
import { REPORT_FILTER_FIELDS } from './report.const';
import { ReportService } from './report.service';
import { IReport } from './report.validation';

const createReport = catchAsync(async (req: Request, res: Response) => {
  const newReport = await ReportService.createReportDB(req.body);

  const responseData = {
    statusCode: httpStatus.OK,
    data: newReport,
    message: 'Report created.',
  };
  sendSuccessResponse(res, responseData);
});

const getAllReports = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, REPORT_FILTER_FIELDS);
  const paginationOptions = pick(req.query, PAGINATION_FIELDS);

  const result = await ReportService.getAllReportDB(filters, paginationOptions);

  sendSuccessResponse<IReport[]>(res, {
    statusCode: httpStatus.OK,
    meta: result.meta || {},
    data: result.data || [],
    message: 'All Reports fetched successfully 2',
  });
});

const getReportByUser = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;

  const result = await ReportService.getSingleReportByUserDB(userId);

  sendSuccessResponse<IReport>(res, {
    statusCode: httpStatus.OK,
    data: result,
    message: 'Report fetched successfully!',
  });
});

const getReportById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await ReportService.getSingleReportByIdDB(id);

  sendSuccessResponse<IReport>(res, {
    statusCode: httpStatus.OK,
    data: result,
    message: 'Report fetched successfully!',
  });
});

const updateReport = catchAsync(async (req: Request, res: Response) => {
  const { uid } = req.params;
  const updatedReport = await ReportService.updateReportDB(uid, req.body);

  const responseData = {
    statusCode: httpStatus.CREATED,
    data: updatedReport,
    message: 'Report updated.',
  };
  sendSuccessResponse(res, responseData);
});

const deleteReport = catchAsync(async (req: Request, res: Response) => {
  const resData = await ReportService.deleteReportDB(req.params.uid);
  sendSuccessResponse(res, resData);
});

export default {
  createReport,
  getAllReports,
  getReportByUser,
  getReportById,
  updateReport,
  deleteReport,
};
