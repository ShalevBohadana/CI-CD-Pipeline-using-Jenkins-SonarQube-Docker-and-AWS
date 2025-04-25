import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { Role } from '../../../enums/role';
import { TicketController } from './ticket.controller';
import { TicketValidation } from './ticket.validation';

const router = Router();

router.post(
  '/',
  auth(Role.OWNER, Role.ADMIN),
  validateRequest(TicketValidation.createTicketZodSchema),
  TicketController.createOne,
);

router.patch(
  '/discord-channel/:id',
  auth(
    Role.OWNER,
    Role.ADMIN,
    Role.SUPPORT,
    Role.CUSTOMER,
  ),
  TicketController.discordChannel,
);

router.get(
  '/',
  auth(Role.OWNER, Role.ADMIN),
  TicketController.getMany,
);

router.get(
  '/:id',
  auth(Role.OWNER, Role.ADMIN),
  TicketController.getOne,
);

router.patch(
  '/:id',
  auth(Role.OWNER, Role.ADMIN),
  TicketController.updateOne,
);

router.delete(
  '/:id',
  auth(Role.OWNER, Role.ADMIN),
  TicketController.deleteOne,
);

export const TicketRouter = router;
