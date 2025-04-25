import { model, Schema } from 'mongoose';

import { IChat, IChatModel } from './chat.interface';

const chatSchema = new Schema<IChat>(
  {
    roomId: {
      type: Schema.Types.ObjectId,
      ref: 'Room',
      required: true,
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    ],
    intercomConversationId: {
      type: String,
      required: false,
    },
  },
  { timestamps: true },
);
chatSchema.statics.isExistingChat = async function (
  roomId: string,
): Promise<IChat | null> {
  const chat = await this.findOne({ roomId });
  return chat;
};

chatSchema.statics.isChatExistWithBothIds = async function (members: {
  senderId: string;
  receiverId: string;
}): Promise<IChat | null> {
  const chat = await this.findOne({
    members: {
      $all: [members.senderId, members.receiverId],
    },
  });
  return chat;
};

const ChatModel = model<IChat, IChatModel>('Chat', chatSchema);
export default ChatModel;
