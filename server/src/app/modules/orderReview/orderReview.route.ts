import express from 'express';
import { Role } from '../../../enums/role';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { OrderReviewController } from './orderReview.controller';
import { OrderReviewValidation } from './orderReview.validation';

const router = express.Router();

router.post(
  '/',
  auth(Role.CUSTOMER),
  validateRequest(OrderReviewValidation.createOrderReviewZodSchema),
  OrderReviewController.createOne,
);

router.post(
  '/seller-review',
  auth(Role.CUSTOMER, Role.ADMIN),
  validateRequest(OrderReviewValidation.createOrderReviewZodSchema),
  OrderReviewController.createSellerReview,
);

router.get(
  '/seller-review',
  auth(Role.ADMIN, Role.OWNER, Role.SUPPORT),
  OrderReviewController.getSellerReviewMany,
);

router.get(
  '/',
  auth(Role.ADMIN, Role.CUSTOMER),
  OrderReviewController.getMany,
);
router.get(
  '/:id',
  auth(Role.ADMIN, Role.CUSTOMER),
  OrderReviewController.getOne,
);
router.patch(
  '/:id',
  auth(Role.ADMIN),
  validateRequest(OrderReviewValidation.updateOrderReviewZodSchema),
  OrderReviewController.updateOne,
);

router.delete('/:id', auth(Role.ADMIN), OrderReviewController.deleteOne);

export const OrderReviewRouter = router;
