import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { Role } from '../../../enums/role';
import { CurrencySellerController } from './currencySeller.controller';
import { CurrencySellerValidation } from './currencySeller.validation';

const router = Router();

router.post(
  '/',
  auth(Role.CUSTOMER, Role.ADMIN),
  validateRequest(
    CurrencySellerValidation.requestForBecomingCurrencySellerZodSchema,
  ),
  CurrencySellerController.becomeCurrencySeller,
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
  CurrencySellerController.getAllRequest,
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
  CurrencySellerController.getRequestById,
);
router.patch(
  '/:id',
  auth(Role.OWNER, Role.ADMIN),
  CurrencySellerController.approveRequest,
);
router.delete(
  '/:id',
  auth(Role.OWNER, Role.ADMIN),
  CurrencySellerController.rejectRequest,
);

export const CurrencySellerRouter = router;
