import express, { Router } from 'express';

import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { Role } from '../../../enums/role';
import { OrderController } from './order.controller';
import { OrderValidation } from './order.validation';

const router: Router = express.Router();

router
  .route('/')
  .post(
    auth(Role.CUSTOMER),
    validateRequest(OrderValidation.createOrderZodSchema),
    OrderController.createOrder,
  )
  .get(auth(Role.ADMIN, Role.CUSTOMER), OrderController.getAllOrder);
router
  .route('/accepted')
  .get(auth(Role.ADMIN, Role.CUSTOMER), OrderController.getAcceptedOrder);
router
  .route('/claim')
  .get(
    auth(Role.ADMIN, Role.OWNER, Role.SUPPORT, Role.PARTNER),
    OrderController.getAcceptedOrder,
  );
router.route('/partner/:id').get(OrderController.getOrderByPartnerId);

router
  .route('/balance-order')
  .post(
    auth(Role.ADMIN, Role.OWNER, Role.SUPPORT, Role.PARTNER, Role.CUSTOMER),
    validateRequest(OrderValidation.createOrderZodSchema),
    OrderController.createBalanceOrder,
  );

router
  .route('/:id')
  .get(auth(Role.ADMIN, Role.CUSTOMER), OrderController.getOrderByOrderId)
  .patch(auth(Role.ADMIN), OrderController.updateOrder);
router.get(
  '/user/:id',
  auth(Role.ADMIN, Role.CUSTOMER),
  OrderController.getOrderByUserId,
);
router.patch(
  '/join-group-chat/:id',
  auth(Role.OWNER, Role.ADMIN, Role.SUPPORT, Role.CUSTOMER, Role.PARTNER),
  OrderController.joinGroupChat,
);
router.post(
  '/:orderId/assign-booster',
  auth(Role.ADMIN, Role.OWNER),
  validateRequest(OrderValidation.assignBoosterZodSchema),
  OrderController.assignBoosterToOrder,
);
export const OrderRoute = router;
