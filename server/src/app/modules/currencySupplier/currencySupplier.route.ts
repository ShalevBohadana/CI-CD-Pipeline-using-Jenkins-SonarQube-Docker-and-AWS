import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { Role } from '../../../enums/role';
import { CurrencySupplierController } from './currencySupplier.controller';
import { CurrencySupplierValidation } from './currencySupplier.validation';

const router = Router();

router.post(
  '/',
  auth(Role.CUSTOMER, Role.ADMIN),
  validateRequest(CurrencySupplierValidation.requestForBecomingCurrencySupplierZodSchema),
  CurrencySupplierController.becomeCurrencySeller
);

router.get(
  '/',
  auth(Role.OWNER, Role.ADMIN),
  CurrencySupplierController.getAllRequest
);

router.get(
  '/:id',
  auth(Role.OWNER, Role.ADMIN),
  CurrencySupplierController.getRequestById
);

router.patch(
  '/:id',
  auth(Role.OWNER, Role.ADMIN),
  CurrencySupplierController.approveRequest
);

router.patch(
  '/reject/:id',
  auth(Role.OWNER, Role.ADMIN),
  CurrencySupplierController.rejectRequest
);

export const currencySupplierRoutes = router;
