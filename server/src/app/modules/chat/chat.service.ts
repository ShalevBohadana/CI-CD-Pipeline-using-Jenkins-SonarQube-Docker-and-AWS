import axios from 'axios';
import httpStatus from 'http-status';
import { Types } from 'mongoose';

import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { IMessage } from '../message/message.interface';
import messageModel from '../message/message.model';
import UserModel from '../user/user.model';
import { IChat } from './chat.interface';
import ChatModel from './chat.model';

// Initialize Intercom HTTP client
const intercomClient = axios.create({
  baseURL: 'https://api.intercom.io',
  headers: {
    Authorization: `Bearer ${config.intercom.accessToken}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

interface IntercomUser {
  email: string;
  name: string;
  userId: string;
  customAttributes?: Record<string, any>;
}

const initializeIntercomChat = async (userData: IntercomUser) => {
  try {
    await intercomClient.post('/contacts', {
      role: 'user',
      external_id: userData.userId,
      email: userData.email,
      name: userData.name,
      custom_attributes: userData.customAttributes,
    });
    return true;
  } catch (error) {
    console.error('Intercom initialization error:', error);
    return false;
  }
};

const createChat = async (chatData: IChat): Promise<IChat> => {
  const existingChat = await ChatModel.isExistingChat(
    chatData.roomId.toString(),
  );

  if (existingChat) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Chat already exists');
  }

  const chat = await ChatModel.create(chatData);

  try {
    const users = await UserModel.find({
      _id: { $in: chatData.members },
    });

    for (const user of users) {
      const userName =
        typeof user.name === 'object'
          ? `${user.name.firstName || ''} ${user.name.lastName || ''}`.trim()
          : user.name || 'User';
      await initializeIntercomChat({
        userId: user._id.toString(),
        email: user.email,
        name: userName,
        customAttributes: {
          role: user.roles[0],
          roomId: chatData.roomId.toString(),
        },
      });
    }
  } catch (error) {
    console.error('Failed to initialize Intercom chat:', error);
  }

  return chat;
};

const getChatOfSender = async (senderId: string): Promise<IChat[]> => {
  const chats = await ChatModel.find({ members: senderId }).populate([
    {
      path: 'members',
      model: 'User',
      select: 'name email roles',
    },
  ]);

  if (!chats || chats.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No chats found');
  }

  return chats;
};

const getChatOfSenderAndReceiver = async (
  senderId: string,
  receiverId: string,
): Promise<IChat> => {
  const chat = await ChatModel.findOne({
    members: { $all: [senderId, receiverId] },
  }).populate([
    {
      path: 'members',
      model: 'User',
      select: 'name email roles',
    },
  ]);

  if (!chat) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Chat not found');
  }

  return chat;
};

const getAllChat = async (): Promise<IChat[]> => {
  const chats = await ChatModel.find({})
    .populate([
      {
        path: 'members',
        model: 'User',
        select: 'name email roles',
      },
    ])
    .sort({ createdAt: -1 });

  if (!chats || chats.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No chats found');
  }

  return chats;
};

const updateReceiverIdOfChatByAdmin = async (
  chatId: string,
  receiverId: string,
): Promise<IChat> => {
  const session = await ChatModel.startSession();
  session.startTransaction();

  try {
    const existingChat = await ChatModel.findById(chatId);
    if (!existingChat) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Chat not found');
    }

    const nonCustomerMember = await UserModel.findOne({
      _id: { $in: existingChat.members },
      roles: { $ne: 'customer' },
    });

    if (!nonCustomerMember) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        'No admin/staff member found in chat',
      );
    }

    const updatedChat = await ChatModel.findByIdAndUpdate(
      chatId,
      {
        $set: { 'members.$[elem]': new Types.ObjectId(receiverId) },
      },
      {
        arrayFilters: [{ elem: nonCustomerMember._id }],
        new: true,
        session,
      },
    ).populate([
      {
        path: 'members',
        model: 'User',
        select: 'name email roles',
      },
    ]);

    if (!updatedChat) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        'Failed to update chat',
      );
    }

    try {
      const newReceiver = await UserModel.findById(receiverId);
      if (newReceiver) {
        await intercomClient.put(`/conversations/${chatId}/assignee`, {
          admin_id: receiverId,
          assignee_id: receiverId,
        });
      }
    } catch (error) {
      console.error('Failed to update Intercom assignment:', error);
    }

    await session.commitTransaction();
    return updatedChat;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

const deleteChat = async (chatId: string): Promise<IChat> => {
  const session = await ChatModel.startSession();
  session.startTransaction();

  try {
    const chat = await ChatModel.findById(chatId);
    if (!chat) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Chat not found');
    }

    const deletedChat = await ChatModel.findByIdAndDelete(chatId, { session });
    if (!deletedChat) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        'Failed to delete chat',
      );
    }

    try {
      await intercomClient.post(`/conversations/${chatId}/archive`);
    } catch (error) {
      console.error('Failed to archive Intercom conversation:', error);
    }

    await session.commitTransaction();
    return deletedChat;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

const sendSystemMessage = async (
  userId: string,
  message: string,
): Promise<void> => {
  try {
    await intercomClient.post('/messages', {
      message_type: 'comment',
      body: message,
      from: {
        type: 'admin',
        id: config.intercom.adminId,
      },
      to: {
        type: 'user',
        id: userId,
      },
    });
  } catch (error) {
    console.error('Failed to send system message:', error);
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to send system message',
    );
  }
};
const getMessages = async (
  chatId: string,
  userId: string,
): Promise<IMessage[]> => {
  const chat = await ChatModel.findById(chatId);
  if (!chat) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Chat not found');
  }

  if (!chat.members.map((m) => m.toString()).includes(userId)) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'User not authorized for this chat',
    );
  }

  return messageModel.find({ chatId }).populate('senderId', 'name email');
};

const markMessagesAsRead = async (
  chatId: string,
  userId: string,
): Promise<void> => {
  const chat = await ChatModel.findById(chatId);
  if (!chat) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Chat not found');
  }

  if (!chat.members.map((m) => m.toString()).includes(userId)) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'User not authorized for this chat',
    );
  }

  await messageModel.updateMany(
    { chatId, readBy: { $ne: userId } },
    { $addToSet: { readBy: userId } },
  );
};
export const ChatService = {
  createChat,
  getChatOfSender,
  getChatOfSenderAndReceiver,
  getAllChat,
  updateReceiverIdOfChatByAdmin,
  deleteChat,
  sendSystemMessage,
  initializeIntercomChat,
  getMessages,
  markMessagesAsRead,
};
