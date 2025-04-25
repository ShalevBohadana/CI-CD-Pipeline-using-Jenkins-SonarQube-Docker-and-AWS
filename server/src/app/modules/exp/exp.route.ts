import express, { Router } from "express";

import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { Role } from '../../../enums/role';
import { ExpController } from './exp.controller';
import { ExpValidation } from './exp.validation';

const router: Router = express.Router();

router.post(
  '/',
  validateRequest(ExpValidation.createExpZodSchema),
  auth(Role.ADMIN, Role.OWNER),
  ExpController.createExpAgainstRating,
);
router.patch(
  '/:rating',
  validateRequest(ExpValidation.updateExpZodSchema),
  auth(Role.ADMIN, Role.OWNER),
  ExpController.updateExpAgainstRating,
);
router.get('/', ExpController.getAllExp);
router.get('/:rating', ExpController.getExpAgainstRating);

export const ExpRoute = router;
