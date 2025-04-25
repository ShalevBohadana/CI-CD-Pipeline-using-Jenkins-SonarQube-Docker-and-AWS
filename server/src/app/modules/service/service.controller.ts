import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';

import config from '../../../config';
import { paginationFields } from '../../../constant/shared.constant';
import { IPaginationOption } from '../../../interfaces/sharedInterface';
import { catchAsync } from '../../../shared/catchAsync';
import { sendSuccessResponse } from '../../../shared/customResponse';
import pick from '../../../shared/pick';
import convertToWebP from '../../middlewares/convertToWebP';
import { SERVICE_FILTER_FIELDS } from './service.constant';
import { IService } from './service.interface';
import { ServiceService } from './service.service';

const createService: RequestHandler = catchAsync(
  async (req: any, res: Response) => {
    const serviceData = req.body;
    const uploadedFiles = req.files as any;
    const { user } = req;

    if (Object.keys(uploadedFiles).length !== 0) {
      const imageWebP = uploadedFiles.image.map(
        (file: any) => `${convertToWebP(file.filename)}`,
      );
      serviceData.image = `${config.image_url}/${imageWebP[0]}`;
    }

    const service = await ServiceService.createService(
      serviceData,
      user.userId,
    );
    const responseData = {
      message: 'Service created successfully',
      data: service,
    };

    sendSuccessResponse(res, responseData);
  },
);

const updateService: RequestHandler = catchAsync(
  async (req: any, res: Response) => {
    const { serviceId } = req.params;
    const serviceData = req.body;
    const { user } = req;
    const uploadedFiles = req.files as any;

    if (Object.keys(uploadedFiles).length !== 0) {
      const imageWebP = uploadedFiles.image.map(
        (file: any) => `${convertToWebP(file.filename)}`,
      );
      serviceData.image = `${config.image_url}/${imageWebP[0]}`;
    }

    const service = await ServiceService.updateService(
      serviceId,
      serviceData,
      user.userId,
    );
    const responseData = {
      message: 'Service updated successfully',
      data: service,
    };

    sendSuccessResponse(res, responseData);
  },
);

const getAllService: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, ['searchTerm', ...SERVICE_FILTER_FIELDS]);
    const paginationOption: IPaginationOption = pick(
      req.query,
      paginationFields,
    );

    const result = await ServiceService.getAllService(
      filters,
      paginationOption,
    );

    const responseData = {
      statusCode: httpStatus.OK,
      meta: result.meta || {},
      data: result.data || [],
      message: 'All service fetched successfully',
    };

    sendSuccessResponse<IService[]>(res, responseData);
  },
);

const deleteService: RequestHandler = catchAsync(
  async (req: any, res: Response) => {
    const { serviceId } = req.params;
    const { user } = req;

    await ServiceService.deleteService(serviceId, user.userId);
    const responseData = {
      message: 'Service deleted successfully',
    };

    sendSuccessResponse(res, responseData);
  },
);

const getServiceById: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { serviceId } = req.params;

    const service = await ServiceService.getServiceById(serviceId);
    const responseData = {
      message: 'Service fetched successfully',
      data: service,
    };

    sendSuccessResponse(res, responseData);
  },
);

export const ServiceController: { [key: string]: RequestHandler } = {
  createService,
  updateService,
  getAllService,
  deleteService,
  getServiceById,
};
