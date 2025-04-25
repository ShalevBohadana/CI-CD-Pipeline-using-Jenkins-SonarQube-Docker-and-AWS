/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';

export interface IMessage {
  chatId: Types.ObjectId;
  senderId: Types.ObjectId;
  content: string;
  text?: string; // Add 'text' property
  readBy: string[];
  createdAt: Date;
}
export interface IMessageModel extends Model<IMessage> {
  getMessageByChatId(chatId: Types.ObjectId): Promise<IMessage[]>;
  createMessage(message: IMessage): Promise<IMessage>;
}
