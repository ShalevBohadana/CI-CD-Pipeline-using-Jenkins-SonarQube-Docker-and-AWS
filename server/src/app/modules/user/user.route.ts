import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import UserController from './user.controller';
import { UserValidation } from './user.validation';
import { Role } from '../../../enums/role';

const router = express.Router();

router.get(
  '/',
  auth(Role.OWNER, Role.ADMIN, Role.SUPPORT),
  UserController.getAllUsers
);

router.get(
  '/history',
  auth(Role.OWNER, Role.ADMIN, Role.SUPPORT),
  UserController.getUserHistory
);

router.post(
  '/history',
  auth(Role.OWNER, Role.ADMIN, Role.SUPPORT),
  UserController.addHistoryEntry
);

router.get(
  '/me',
  auth(Role.OWNER, Role.ADMIN, Role.SUPPORT, Role.PARTNER, Role.CUSTOMER),
  UserController.getCurrentUser
);

router.get(
  '/statistics',
  auth(Role.OWNER, Role.ADMIN),
  UserController.getStatistics
);

router.get(
  '/boosters/online',
  auth(Role.OWNER, Role.ADMIN, Role.SUPPORT),
  UserController.getOnlineBoosters
);

router.get(
  '/:id',
  auth(Role.OWNER, Role.ADMIN, Role.SUPPORT),
  UserController.getOne
);

router.patch(
  '/:id',
  validateRequest(UserValidation.updateUserZodSchema),
  auth(Role.OWNER, Role.ADMIN),
  UserController.updateUser
);

export default router;
