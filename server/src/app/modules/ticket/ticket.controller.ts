import { Request, Response, RequestHandler } from 'express';
import httpStatus from 'http-status';

import { paginationFields } from '../../../constant/shared.constant';
import { IPaginationOption } from '../../../interfaces/sharedInterface';
import { catchAsync } from '../../../shared/catchAsync';
import { sendSuccessResponse } from '../../../shared/customResponse';
import pick from '../../../shared/pick';
import { JwtPayloadExtended } from '../../helpers/jwtHelper';
import { TICKET_FILTER_FIELDS } from './ticket.constant';
import { Ticket } from './ticket.interface';
import { TicketService } from './ticket.service';

// Define interface for request with user
interface IUserRequest extends Request {
  user: JwtPayloadExtended;
}

const createOne = catchAsync(async (req: Request, res: Response) => {
  // Type assertion here
  const { user } = req as IUserRequest;
  const result = await TicketService.createOne({
    userId: user.userId,
    payload: req.body,
  });

  const responseData = {
    message: 'Your Ticket has been created successfully',
    data: result,
  };

  sendSuccessResponse(res, responseData);
});

const getMany = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ['searchTerm', ...TICKET_FILTER_FIELDS]);
  const paginationOption: IPaginationOption = pick(req.query, paginationFields);

  const result = await TicketService.getMany(filters, paginationOption);

  const responseData = {
    statusCode: httpStatus.OK,
    meta: result.meta || {},
    data: result.data || [],
    message: 'All Tickets fetched successfully',
  };

  sendSuccessResponse<Ticket[]>(res, responseData);
});

const getOne = catchAsync(async (req: Request, res: Response) => {
  const result = await TicketService.getOne(req.params.id);

  const responseData = {
    message: 'Ticket fetched successfully',
    data: result,
  };

  sendSuccessResponse(res, responseData);
});

const updateOne = catchAsync(async (req: Request, res: Response) => {
  const result = await TicketService.updateOne({
    id: req.params.id,
    payload: req.body,
  });

  const responseData = {
    message: 'Ticket updated successfully',
    data: result,
  };

  sendSuccessResponse(res, responseData);
});

const deleteOne = catchAsync(async (req: Request, res: Response) => {
  const result = await TicketService.deleteOne(req.params.id);

  const responseData = {
    message: 'Ticket deleted successfully',
    data: result,
  };

  sendSuccessResponse(res, responseData);
});

const discordChannel = catchAsync(async (req: Request, res: Response) => {
  // Type assertion here
  const { user } = req as IUserRequest;
  const { id } = req.params;

  const result = await TicketService.discordChannel({
    userId: user.userId,
    id,
  });

  const responseData = {
    message: 'Your channel has been created successfully',
    data: result,
  };

  sendSuccessResponse(res, responseData);
});

export const TicketController: { [key: string]: RequestHandler } = {
  createOne,
  getMany,
  getOne,
  updateOne,
  deleteOne,
  discordChannel,
};
