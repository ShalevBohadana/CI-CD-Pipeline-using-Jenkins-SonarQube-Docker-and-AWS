import express, { Router } from "express";

import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { Role } from '../../../enums/role';
import offerController from './offer.controller';
import { OfferValidation } from './offer.validation';

const router: Router = express.Router();

router.post(
  '/',
  validateRequest(OfferValidation.createRegularOfferZodSchema),
  auth(Role.OWNER, Role.ADMIN),
  offerController.createOffer,
);
router.get(
  '/prebuilt-filters',
  auth(Role.ADMIN),
  offerController.prebuiltFilters,
);
router.get(
  '/tag-suggestions',
  auth(Role.ADMIN),
  offerController.tagSuggestions,
);

// router.get('/', offerController.getAllOffers);
router.get('/', offerController.getAllOffers);
router.get('/:uid', offerController.getOffer);
router.get('/id/:id', offerController.getOfferById);
router.patch(
  '/:uid',
  validateRequest(OfferValidation.updateRegularOfferZodSchema),
  auth(Role.OWNER, Role.ADMIN),
  offerController.updateOffer,
);

router.delete(
  '/:uid',
  auth(Role.ADMIN),
  offerController.deleteOffer,
);


export const OfferRouter: Router = router;
