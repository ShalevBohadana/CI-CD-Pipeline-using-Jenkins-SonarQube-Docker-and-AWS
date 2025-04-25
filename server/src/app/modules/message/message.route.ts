import express, { Router } from "express";

import { MessageController } from './message.controller';

const router: Router = express.Router();

router.post('/', MessageController.createMessage);
router.get('/:chatId', MessageController.getMessageByChatId);

export const MessageRoute = router;
