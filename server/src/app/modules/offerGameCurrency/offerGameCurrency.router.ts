import express from 'express';
import { Role } from '../../../enums/role';
import validateRequest from '../../middlewares/validateRequest';
import { OfferGameCurrencyController } from './offerGameCurrency.controller';
import { OfferGameCurrencyValidation } from './offerGameCurrency.validation';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/',
  auth(Role.ADMIN),
  validateRequest(OfferGameCurrencyValidation.createOfferGameCurrencyZodSchema),
  OfferGameCurrencyController.createOffer
);

router.get(
  '/tag-suggestions',
  auth(Role.ADMIN),
  OfferGameCurrencyController.tagSuggestions,
);

router.get('/', auth(Role.ADMIN, Role.CUSTOMER), OfferGameCurrencyController.getAllOffers);
router.get('/:uid', auth(Role.ADMIN), OfferGameCurrencyController.getOffer);
router.patch(
  '/:uid',
  auth(Role.ADMIN),
  validateRequest(OfferGameCurrencyValidation.updateOfferGameCurrencyZodSchema),
  OfferGameCurrencyController.updateOffer
);

router.delete(
  '/:uid',
  auth(Role.ADMIN),
  OfferGameCurrencyController.deleteOffer,
);
export const OfferGameCurrencyRouter = router;
