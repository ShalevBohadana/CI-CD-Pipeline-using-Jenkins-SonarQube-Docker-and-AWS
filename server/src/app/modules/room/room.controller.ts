import { Request, Response, RequestHandler } from 'express';

import { catchAsync } from '../../../shared/catchAsync';
import { sendSuccessResponse } from '../../../shared/customResponse';
import { RoomService } from './room.service';

const createRoom = catchAsync(async (req: Request, res: Response) => {
  const response = await RoomService.createRoom(req.body);
  const responseData = {
    data: response,
    message: 'Room created successfully',
  };
  sendSuccessResponse(res, responseData);
});

const getRoomById = catchAsync(async (req: Request, res: Response) => {
  const { roomId } = req.params;
  const response = await RoomService.getRoomById(roomId);
  const responseData = {
    data: response,
    message: 'Room fetched successfully',
  };
  sendSuccessResponse(res, responseData);
});

const getAllRooms = catchAsync(async (req: Request, res: Response) => {
  const response = await RoomService.getAllRooms();
  const responseData = {
    data: response,
    message: 'Rooms fetched successfully',
  };
  sendSuccessResponse(res, responseData);
});

const deleteRoom = catchAsync(async (req: Request, res: Response) => {
  const { roomId } = req.params;
  const response = await RoomService.deleteRoom(roomId);
  const responseData = {
    data: response,
    message: 'Room deleted successfully',
  };
  sendSuccessResponse(res, responseData);
});

export const RoomController: { [key: string]: RequestHandler } = {
  createRoom,
  getRoomById,
  getAllRooms,
  deleteRoom,
};
