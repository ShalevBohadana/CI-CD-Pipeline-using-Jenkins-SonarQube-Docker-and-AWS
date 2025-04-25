import httpStatus from 'http-status';

import ApiError from '../../../errors/ApiError';
import { IGenericDataWithMeta } from '../../../interfaces/sharedInterface';
import { sendEmailForReport } from '../../../shared/sendEmailVerification';
import {
  getPaginatedCondition,
  getPaginatedData,
  PaginationOptions,
} from '../../helpers/pagination';
import { NotificationModel } from '../notification/notification.model';
import UserModel from '../user/user.model';
import { WalletModel } from '../wallet/wallet.model';
import { REPORT_SEARCH_FIELDS } from './report.const';
import { ReportFilters } from './report.interface';
import { ReportModel } from './report.model';
import { IReport, IUpdateReport } from './report.validation';

const createReportDB = async (reportData: IReport) => {
  const isExisting = await ReportModel.findOne({
    $or: [{ userId: reportData?.userId }],
  });
  const user = await UserModel.findById(reportData?.userId);
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  if (reportData.reportType === 'fine') {
    await WalletModel.updateOne(
      { userId: user?.userId },
      { $inc: { balance: reportData.fine?.amount } },
      {
        new: true,
      },
    );
  }
  if (reportData.reportType === 'ban') {
    await UserModel.updateOne(
      { userId: user?.userId },
      { ban: true },
      {
        new: true,
      },
    );
    await sendEmailForReport(
      user?.email,
      reportData.reason || 'Your account has banned',
    );
  }
  const notification = await NotificationModel.findOneAndUpdate(
    { userId: user?.userId },
    {
      $push: {
        notifications: {
          status: 'unread',
          label:
            (reportData.reportType === 'fine' &&
              `Fine ${reportData.fine?.amount} for ${reportData.reason}`) ||
            (reportData.reportType === 'warning' &&
              `You have got ${reportData.reportType} for ${reportData.reason}`) ||
            (reportData.reportType === 'ban' &&
              `Your Account has been banned for ${reportData.reason}`),

          url: undefined,
        },
      },
    },
    {
      upsert: true,
      new: true,
    },
  );
  await notification?.save();
  if (isExisting) {
    return await ReportModel.findOneAndUpdate(
      { userId: reportData?.userId },
      {
        ...reportData,
      },
      {
        new: true,
      },
    );
  }
  const newReport = await ReportModel.create(reportData);
  return newReport;
};

const getAllReportDB = async (
  filters: ReportFilters,
  paginationOptions: PaginationOptions,
): Promise<IGenericDataWithMeta<IReport[]>> => {
  const { whereConditions, sortConditions, skip, limit, page } =
    await getPaginatedCondition(
      filters,
      paginationOptions,
      REPORT_SEARCH_FIELDS,
    );

  const result = await ReportModel.find(whereConditions)
    // .populate('dynamicFilters')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await ReportModel.countDocuments(whereConditions);

  return getPaginatedData(page, limit, total, result);
};
const getSingleReportByUserDB = async (userId: string): Promise<IReport> => {
  const result = await ReportModel.findOne({ userId }).populate([
    {
      path: 'userId',
      select: {
        password: 0,
      },
    },
  ]);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Report not found');
  }
  return result;
};

const getSingleReportByIdDB = async (id: string): Promise<IReport> => {
  const result = await ReportModel.findById(id).populate([
    {
      path: 'userId',
      select: {
        password: 0,
      },
    },
  ]);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Report not found');
  }
  return result;
};

const updateReportDB = async (
  userId: string,
  reportData: IUpdateReport,
): Promise<IReport | null> => {
  const report = await ReportModel.findOne({ userId });
  if (!report) throw new ApiError(httpStatus.BAD_REQUEST, 'report not found.');

  // const newFilterId = await createReportDBFilter(reportData.dynamicFilters);

  const updatedReport = await ReportModel.findOneAndUpdate(
    { userId },
    {
      ...reportData,
      // dynamicFilters: newFilterId,
    },
    {
      new: true,
    },
  );

  // const populatedReports = await ReportModel.populate(
  //   updatedReport,
  //   'dynamicFilters'
  // );
  // return populatedReports;
  return updatedReport;
};

const deleteReportDB = async (id: string) => {
  const report = await ReportModel.findOneAndDelete({ id });

  if (!report) throw new ApiError(httpStatus.NOT_FOUND, 'report not found');
  const resData = {
    statusCode: httpStatus.OK,
    data: {},
    message: 'report deleted.',
  };

  return resData;
};

export const ReportService = {
  createReportDB,
  // createReportDBFilter,
  getAllReportDB,
  getSingleReportByUserDB,
  getSingleReportByIdDB,
  updateReportDB,
  deleteReportDB,
};
