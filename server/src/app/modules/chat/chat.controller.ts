import httpStatus from 'http-status';
import { Types } from 'mongoose';

import ApiError from '../../../errors/ApiError';
import { RequestHandler } from 'express';
import { catchAsync } from '../../../shared/catchAsync';
import { sendSuccessResponse } from '../../../shared/customResponse';
import { IMessage } from '../message/message.interface';
import messageModel from '../message/message.model';
import ChatModel from './chat.model';
import { ChatService } from './chat.service';
import { IChatResponse } from './chat.interface';

const createChat: RequestHandler = catchAsync(async (req, res, _next) => {
  const userId = req.user?.userId;
  if (!userId) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'User not authenticated');
  }

  const chat = await ChatService.createChat({
    ...req.body,
    members: [...(req.body.members || []), new Types.ObjectId(userId)],
  });

  const responseData: IChatResponse = {
    data: chat,
    message: 'Chat created successfully',
  };
  sendSuccessResponse(res, responseData);
});

const getChatOfSender: RequestHandler = catchAsync(async (req, res, _next) => {
  const { senderId } = req.params;
  if (!senderId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Sender ID is required');
  }

  const chats = await ChatService.getChatOfSender(senderId);

  const responseData = {
    data: chats,
    message: 'Chats retrieved successfully',
  };
  sendSuccessResponse(res, responseData);
});

const getChatOfSenderAndReceiver: RequestHandler = catchAsync(async (req, res, _next) => {
  const { senderId, receiverId } = req.params;

  if (!senderId || !receiverId) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Both sender and receiver IDs are required',
    );
  }

  const chat = await ChatService.getChatOfSenderAndReceiver(
    senderId,
    receiverId,
  );

  const responseData = {
    data: chat,
    message: 'Chat retrieved successfully',
  };
  sendSuccessResponse(res, responseData);
});

const getAllChat: RequestHandler = catchAsync(async (req, res, _next) => {
  const chats = await ChatService.getAllChat();

  const responseData = {
    data: chats,
    message: 'All chats retrieved successfully',
  };
  sendSuccessResponse(res, responseData);
});

const updateReceiverIdOfChatByAdmin: RequestHandler = catchAsync(async (req, res, _next) => {
  const { chatId } = req.params;
  const { receiverId } = req.body;

  if (!chatId || !receiverId) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Both chat ID and receiver ID are required',
    );
  }

  const updatedChat = await ChatService.updateReceiverIdOfChatByAdmin(
    chatId,
    receiverId,
  );

  const responseData = {
    data: updatedChat,
    message: 'Chat updated successfully',
  };
  sendSuccessResponse(res, responseData);
});

const deleteChat: RequestHandler = catchAsync(async (req, res, _next) => {
  const { chatId } = req.params;

  if (!chatId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Chat ID is required');
  }

  const deletedChat = await ChatService.deleteChat(chatId);

  const responseData = {
    data: deletedChat,
    message: 'Chat deleted successfully',
  };
  sendSuccessResponse(res, responseData);
});

const sendMessage = async (
  chatId: string,
  message: string,
  userId: string,
): Promise<IMessage> => {
  const chat = await ChatModel.findById(chatId);
  if (!chat) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Chat not found');
  }

  const newMessage = await messageModel.create({
    chatId: new Types.ObjectId(chatId),
    senderId: new Types.ObjectId(userId),
    text: message,
  });

  return newMessage;
};

const getMessages: RequestHandler = catchAsync(async (req, res, _next) => {
  const { chatId } = req.params;
  const userId = req.user?.userId;

  if (!chatId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Chat ID is required');
  }

  if (!userId) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'User not authenticated');
  }

  const messages = await messageModel.find({ chatId });

  const responseData = {
    data: messages,
    message: 'Messages retrieved successfully',
  };
  sendSuccessResponse(res, responseData);
});

const markMessagesAsRead: RequestHandler = catchAsync(async (req, res, _next) => {
  const { chatId } = req.params;
  const userId = req.user?.userId;

  if (!chatId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Chat ID is required');
  }

  if (!userId) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'User not authenticated');
  }

  await messageModel.updateMany(
    { chatId, readBy: { $ne: userId } },
    { $addToSet: { readBy: userId } },
  );

  const responseData = {
    message: 'Messages marked as read successfully',
  };
  sendSuccessResponse(res, responseData);
});

interface ChatControllerType {
  createChat: RequestHandler;
  getChatOfSender: RequestHandler;
  getChatOfSenderAndReceiver: RequestHandler;
  getAllChat: RequestHandler;
  updateReceiverIdOfChatByAdmin: RequestHandler;
  deleteChat: RequestHandler;
  sendMessage: (chatId: string, message: string, userId: string) => Promise<IMessage>;
  getMessages: RequestHandler;
  markMessagesAsRead: RequestHandler;
}

export const ChatController: ChatControllerType = {
  createChat,
  getChatOfSender,
  getChatOfSenderAndReceiver,
  getAllChat,
  updateReceiverIdOfChatByAdmin,
  deleteChat,
  sendMessage,
  getMessages,
  markMessagesAsRead,
};
