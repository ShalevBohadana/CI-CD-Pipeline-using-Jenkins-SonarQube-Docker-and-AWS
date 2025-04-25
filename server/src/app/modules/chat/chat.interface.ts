/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';

export interface IChatMember {
  senderId: Types.ObjectId;
  receiverId: Types.ObjectId;
}

export interface IChat {
  roomId: Types.ObjectId;
  members: Types.ObjectId[];
  intercomConversationId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IChatResponse {
  data: IChat;
  message: string;
}

export interface IChatModel extends Model<IChat> {
  isExistingChat(roomId: string): Promise<IChat | null>;
  isChatExistWithBothIds(members: IChatMember): Promise<IChat>;
}

export interface IChatService {
  createChat(data: Partial<IChat>): Promise<IChat>;
  getChatOfSender(senderId: string): Promise<IChat[]>;
  getChatOfSenderAndReceiver(senderId: string, receiverId: string): Promise<IChat>;
  getAllChat(): Promise<IChat[]>;
  updateReceiverIdOfChatByAdmin(chatId: string, receiverId: string): Promise<IChat>;
  deleteChat(chatId: string): Promise<IChat | null>;
}
