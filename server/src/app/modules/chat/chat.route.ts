import express, { Router } from 'express';
import auth from '../../middlewares/auth';
import { Role } from '../../../enums/role';
import { ChatController } from './chat.controller';

const router: Router = express.Router();

// Create new chat
router.post(
  '/',
  auth(Role.CUSTOMER, Role.ADMIN),
  ChatController.createChat
);

// Get all chats for specific sender
router.get(
  '/sender/:senderId',
  auth(Role.CUSTOMER, Role.ADMIN),
  ChatController.getChatOfSender
);

// Get chat between specific sender and receiver
router.get(
  '/sender/:senderId/receiver/:receiverId',
  auth(Role.CUSTOMER, Role.ADMIN),
  ChatController.getChatOfSenderAndReceiver
);

// Get all chats
router.get(
  '/',
  auth(Role.ADMIN),
  ChatController.getAllChat
);

// Update receiver ID by admin
router.patch(
  '/:chatId/receiver',
  auth(Role.ADMIN),
  ChatController.updateReceiverIdOfChatByAdmin
);

// Delete chat
router.delete(
  '/:chatId',
  auth(Role.ADMIN),
  ChatController.deleteChat
);

// Get messages
router.get(
  '/:chatId/messages',
  auth(Role.CUSTOMER, Role.ADMIN),
  ChatController.getMessages
);

// Mark messages as read
router.patch(
  '/:chatId/messages/read',
  auth(Role.CUSTOMER, Role.ADMIN),
  ChatController.markMessagesAsRead
);

export const ChatRoute = router;
