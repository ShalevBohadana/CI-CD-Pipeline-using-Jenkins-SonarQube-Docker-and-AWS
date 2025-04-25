import { NextFunction, Response } from 'express';
import { paginationFields } from '../../../constant/shared.constant';
import { sendSuccessResponse } from '../../../shared/customResponse';
import pick from '../../../shared/pick';
import { BOOSTER_FILTER_FIELDS } from './booster.constant';
import { BoosterService } from './booster.service';

interface BoosterControllerType {
  requestForBecomingBooster: (req: any, res: Response, next: NextFunction) => Promise<void>;
  getAllBoostersRequest: (req: any, res: Response, next: NextFunction) => Promise<void>;
  getBoosterRequestById: (req: any, res: Response, next: NextFunction) => Promise<void>;
  getBoosterRequestUser: (req: any, res: Response, next: NextFunction) => Promise<void>;
  approveBoosterRequest: (req: any, res: Response, next: NextFunction) => Promise<void>;
  rejectBoosterRequest: (req: any, res: Response, next: NextFunction) => Promise<void>;
}

const requestForBecomingBooster: BoosterControllerType['requestForBecomingBooster'] = async (req, res, next) => {
  try {
    const { userId } = req.user || {};
    if (!userId) {
      throw new Error('User not found');
    }
    const booster = await BoosterService.requestForBecomingBooster({
      userId,
      data: req.body,
    });

    const responseData = {
      data: booster,
      message: 'Booster request created successfully',
    };
    sendSuccessResponse(res, responseData);
  } catch (error) {
    next(error);
  }
};

const getAllBoostersRequest: BoosterControllerType['getAllBoostersRequest'] = async (req, res, next) => {
  try {
    const filters = pick(req.query, ['searchTerm', ...BOOSTER_FILTER_FIELDS]);
    const paginationOption = pick(
      req.query,
      paginationFields,
    );

    const result = await BoosterService.getAllBoostersRequest(
      filters,
      paginationOption,
    );

    const responseData = {
      meta: result.meta,
      data: result.data,
      message: 'Booster requests retrieved successfully',
    };
    sendSuccessResponse(res, responseData);
  } catch (error) {
    next(error);
  }
};

const getBoosterRequestById: BoosterControllerType['getBoosterRequestById'] = async (req, res, next) => {
  try {
    const booster = await BoosterService.getBoosterRequestById(req.params.id);

    const responseData = {
      data: booster,
      message: 'Booster request retrieved successfully',
    };
    sendSuccessResponse(res, responseData);
  } catch (error) {
    next(error);
  }
};

const getBoosterRequestUser: BoosterControllerType['getBoosterRequestUser'] = async (req, res, next) => {
  try {
    const booster = await BoosterService.getBoosterRequestByUser(req.params.id);

    const responseData = {
      data: booster,
      message: 'Booster request retrieved successfully',
    };
    sendSuccessResponse(res, responseData);
  } catch (error) {
    next(error);
  }
};

const approveBoosterRequest: BoosterControllerType['approveBoosterRequest'] = async (req, res, next) => {
  try {
    const booster = await BoosterService.approveBoosterRequest(req.params.id);

    const responseData = {
      data: booster,
      message: 'Booster request approved successfully',
    };
    sendSuccessResponse(res, responseData);
  } catch (error) {
    next(error);
  }
};

const rejectBoosterRequest: BoosterControllerType['rejectBoosterRequest'] = async (req, res, next) => {
  try {
    const booster = await BoosterService.rejectBoosterRequest(req.params.id);

    const responseData = {
      data: booster,
      message: 'Booster request rejected successfully',
    };
    sendSuccessResponse(res, responseData);
  } catch (error) {
    next(error);
  }
};

export const BoosterController: BoosterControllerType = {
  requestForBecomingBooster,
  getAllBoostersRequest,
  getBoosterRequestById,
  getBoosterRequestUser,
  approveBoosterRequest,
  rejectBoosterRequest,
};
