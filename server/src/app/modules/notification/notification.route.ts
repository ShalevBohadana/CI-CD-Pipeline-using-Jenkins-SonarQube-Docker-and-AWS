import express from 'express';
import { Role } from '../../../enums/role';
import auth from '../../middlewares/auth';
import NotificationController from './notification.controller';

const router = express.Router();

router.get(
  '/',
  auth(Role.ADMIN, Role.CUSTOMER),
  NotificationController.getNotifications,
);

router.patch(
  '/read',
  auth(Role.ADMIN, Role.CUSTOMER),
  NotificationController.readNotifications,
);

export const notificationRoutes = router;
