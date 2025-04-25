import express from 'express';
import { Role } from '../../../enums/role';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { GuideController } from './guide.controller';
import { GuideValidation } from './guide.validation';

const router = express.Router();

router.post(
  '/',
  auth(Role.ADMIN),
  validateRequest(GuideValidation.createGuideZodSchema),
  GuideController.createGuide
);

router.get('/', GuideController.getGuides);
router.get('/:id', GuideController.getGuide);

router.patch(
  '/:id',
  auth(Role.ADMIN),
  validateRequest(GuideValidation.updateGuideZodSchema),
  GuideController.updateGuide
);

router.delete('/:id', auth(Role.ADMIN), GuideController.deleteGuide);

export const GuideRouter = router;
