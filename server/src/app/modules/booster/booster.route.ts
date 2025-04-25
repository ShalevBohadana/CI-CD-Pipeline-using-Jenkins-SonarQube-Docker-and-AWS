import express, { Router } from "express";
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { Role } from '../../../enums/role';
import { BoosterController } from './booster.controller';
import { BoosterValidation } from './booster.validation';

const router: Router = express.Router();

router.post(
  '/',
  auth(Role.CUSTOMER, Role.ADMIN),
  validateRequest(BoosterValidation.requestForBecomingBoosterZodSchema),
  BoosterController.requestForBecomingBooster,
);

router.get(
  '/',
  auth(
    Role.OWNER,
    Role.ADMIN,
    Role.SUPPORT,
    Role.CUSTOMER,
    Role.PARTNER,
  ),
  BoosterController.getAllBoostersRequest,
);

router.get(
  '/:id',
  auth(
    Role.OWNER,
    Role.ADMIN,
    Role.SUPPORT,
    Role.CUSTOMER,
    Role.PARTNER,
  ),
  BoosterController.getBoosterRequestById,
);

router.get(
  '/user/:id',
  auth(
    Role.OWNER,
    Role.ADMIN,
    Role.SUPPORT,
    Role.CUSTOMER,
    Role.PARTNER,
  ),
  BoosterController.getBoosterRequestUser,
);

router.patch(
  '/:id',
  auth(Role.OWNER, Role.ADMIN),
  BoosterController.approveBoosterRequest,
);

router.delete(
  '/:id',
  auth(Role.OWNER, Role.ADMIN),
  BoosterController.rejectBoosterRequest,
);

export const BoosterRoute: Router = router;
