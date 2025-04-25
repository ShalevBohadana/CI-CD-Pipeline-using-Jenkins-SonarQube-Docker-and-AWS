import httpStatus from 'http-status';

import ApiError from '../../../errors/ApiError';
import { IRoom } from './room.interface';
import RoomModel from './room.model';

const createRoom = async (roomData: IRoom): Promise<IRoom> => {
  const isExistingRoom = await RoomModel.isExistingRoom(roomData.customRoomId);
  if (isExistingRoom)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Room already exists');

  const room = (await RoomModel.create(roomData)).populate('creatorId');
  return room;
};

const getRoomById = async (roomId: string): Promise<IRoom> => {
  const room = await RoomModel.findById(roomId).populate('creatorId');
  if (!room) throw new ApiError(httpStatus.NOT_FOUND, 'Room not found');

  return room;
};

const getAllRooms = async (): Promise<IRoom[]> => {
  const rooms = await RoomModel.find().populate('creatorId');
  return rooms;
};

const deleteRoom = async (roomId: string): Promise<IRoom> => {
  const room = await RoomModel.findByIdAndDelete(roomId);
  if (!room) throw new ApiError(httpStatus.NOT_FOUND, 'Room not found');

  return room;
};

export const RoomService = {
  createRoom,
  getRoomById,
  getAllRooms,
  deleteRoom,
};
