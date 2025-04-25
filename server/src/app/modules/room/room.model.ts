import { model, Schema } from 'mongoose';

import { IRoom, IRoomModel } from './room.interface';

const roomSchema = new Schema<IRoom>(
  {
    title: {
      type: String,
      required: true,
    },
    customRoomId: {
      type: String,
      required: true,
      unique: true,
    },
    creatorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
);

roomSchema.statics.isExistingRoom = async function (
  customRoomId: string,
): Promise<IRoom | null> {
  const room = await this.findOne({ customRoomId });
  return room;
};

const RoomModel = model<IRoom, IRoomModel>('Room', roomSchema);
export default RoomModel;
