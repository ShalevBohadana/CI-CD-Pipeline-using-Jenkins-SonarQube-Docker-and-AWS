/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';

export interface IRoom {
  title: string;
  customRoomId: string;
  creatorId: Types.ObjectId;
}

export interface IRoomModel extends Model<IRoom> {
  isExistingRoom(roomId: string): Promise<IRoom>;
}
