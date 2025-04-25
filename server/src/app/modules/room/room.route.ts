import express from 'express';
import { Role } from '../../../enums/role';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { RoomController } from './room.controller';
import { RoomValidation } from './room.validation';

const router = express.Router();

router.post(
  '/',
  auth(Role.ADMIN, Role.CUSTOMER),
  validateRequest(RoomValidation.createRoomZodSchema),
  RoomController.createRoom
);

router.get('/:roomId', RoomController.getRoomById);
router.get('/', RoomController.getAllRooms);
router.delete(
  '/:roomId',
  auth(Role.ADMIN),
  RoomController.deleteRoom,
);

export const RoomRoute = router;
