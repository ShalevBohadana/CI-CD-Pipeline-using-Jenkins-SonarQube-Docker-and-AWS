import express, { Router } from "express";

import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { Role } from '../../../enums/role';
import { CartController } from './cart.controller';
import { CartValidation } from './cart.validation';

const router: Router = express.Router();

router.post(
  '/',
  auth(
    Role.CUSTOMER,
    Role.ADMIN,
    Role.PARTNER,
    Role.OWNER,
  ),
  validateRequest(CartValidation.createCartZodSchema),
  CartController.addToCart,
);
// router.patch(
//   '/:id',
//   auth(Role.CUSTOMER),
//   CartController.updateCart
// );
router.get(
  '/',
  auth(
    Role.CUSTOMER,
    Role.ADMIN,
    Role.OWNER,
  ),
  CartController.getCartByUserId,
);
router.patch(
  '/',
  auth(
    Role.CUSTOMER,
    Role.ADMIN,
    Role.OWNER,
  ),
  CartController.removeFromCart,
);
router.patch(
  '/apply-promo',
  auth(
    Role.CUSTOMER,
    Role.ADMIN,
    Role.OWNER,
  ),
  validateRequest(CartValidation.promoCartZodSchema),
  CartController.applyPromo,
);
// router.get(
//   '/:id',
//   auth(Role.CUSTOMER),
//   CartController.getCartByCartId
// );
// router.delete(
//   '/:id',
//   auth(Role.CUSTOMER),
//   CartController.deleteCart
// );
// router.delete(
//   '/:id/:serviceId',
//   auth(Role.CUSTOMER),
//   CartController.deleteAServiceFromCart
// );

export const CartRoute = router;
