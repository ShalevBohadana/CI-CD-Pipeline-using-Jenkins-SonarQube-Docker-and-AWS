import express, { Router } from "express";

import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { Role } from '../../../enums/role';
import { PromoController } from './promo.controller';
import { PromoValidation } from './promo.validation';

const router: Router = express.Router();

router.post(
  '/',
  validateRequest(PromoValidation.createPromoZodSchema),
  auth(Role.OWNER, Role.ADMIN),
  PromoController.createPromo,
);
// router.get('/', GameController.getAllGame);
router.get('/:code', PromoController.getPromo);
router.get('/', PromoController.getPromos);
router.patch(
  '/:code',
  validateRequest(PromoValidation.updatePromoZodSchema),
  auth(Role.OWNER, Role.ADMIN),
  PromoController.updatePromo,
);
router.delete(
  '/:code',
  auth(Role.OWNER, Role.ADMIN),
  PromoController.deletePromo,
);

export const PromoRoute = router;
