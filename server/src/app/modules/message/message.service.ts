import httpStatus from 'http-status';

import ApiError from '../../../errors/ApiError';
import chatModel from '../chat/chat.model';
import { IMessage } from './message.interface';
import messageModel from './message.model';

const createMessage = async (messageData: IMessage): Promise<IMessage> => {
  const { chatId, senderId } = messageData;
  const chatData = await chatModel
    .findById(chatId)
    .populate('members')
    .where('members')
    .in([senderId]);
  if (!chatData) throw new ApiError(httpStatus.NOT_FOUND, 'Chat not found');

  const message = (await messageModel.create(messageData)).populate([
    {
      path: 'chatId',
    },
    {
      path: 'senderId',
    },
  ]);

  if (!message)
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Message not sent');

  return message;
};

const getMessageByChatId = async (chatId: string): Promise<IMessage[]> => {
  const messages = await messageModel
    .find({ chatId })
    .populate([
      {
        path: 'chatId',
      },
      {
        path: 'senderId',
      },
    ])
    .sort({ createdAt: 1 });

  if (!messages) throw new ApiError(httpStatus.NOT_FOUND, 'Messages not found');
  return messages;
};

export const MessageService = {
  createMessage,
  getMessageByChatId,
};
