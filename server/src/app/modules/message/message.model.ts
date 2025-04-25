import { model, Schema } from 'mongoose';

import { IMessage, IMessageModel } from './message.interface';

const messageSchema = new Schema<IMessage>(
  {
    chatId: {
      type: Schema.Types.ObjectId,
    },
    senderId: {
      type: Schema.Types.ObjectId,
    },
    text: {
      type: String,
    },
  },
  { timestamps: true },
);

messageSchema.statics.getMessageByChatId = async function (
  chatId: string,
): Promise<IMessage | null> {
  const message = await this.findOne({ chatId }).exec();
  return message;
};

const messageModel = model<IMessage, IMessageModel>('Message', messageSchema);

export default messageModel;
