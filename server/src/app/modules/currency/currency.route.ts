import express, { Router } from "express";

import auth from '../../middlewares/auth';
// import { USER_ROLE_ENUM } from '../user/user.constant'
import { CurrencyController } from './currency.controller';
// import validateRequest from '../../middlewares/validateRequest'
// import { CurrencyValidation } from './currency.validation'
const router: Router = express.Router();

// router.post(
//   '/',
//   auth(USER_ROLE_ENUM.OWNER, USER_ROLE_ENUM.ADMIN),
//   validateRequest(CurrencyValidation.addCurrencyZodSchema),
//   CurrencyController.addCurrency
// )

// router.get('/:currencyId', CurrencyController.getCurrencyById)
router.get('/', CurrencyController.getAllCurrency);
// router.patch(
//   '/:currencyId',
//   auth(USER_ROLE_ENUM.OWNER, USER_ROLE_ENUM.ADMIN),
//   CurrencyController.updateCurrency
// )
// router.delete(
//   '/:currencyId',
//   auth(USER_ROLE_ENUM.OWNER, USER_ROLE_ENUM.ADMIN),
//   CurrencyController.deleteCurrency
// )

export const CurrencyRoute = router;
