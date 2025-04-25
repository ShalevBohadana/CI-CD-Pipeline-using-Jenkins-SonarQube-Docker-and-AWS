import express from 'express';
import { Role } from '../../../enums/role';
import { stripeWebhook } from './stripe.webhook';
import { PaymentController } from './payment.controller';
import { paymentValidation } from './payment.validation';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

// Webhook route - needs raw body
router.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  stripeWebhook,
);

// Create payment session
router.post(
  '/stripe/session',
  express.json(),
  auth(Role.CUSTOMER, Role.ADMIN),
  validateRequest(paymentValidation.createSession),
  PaymentController.stripeSession,
);

// Verify payment
router.patch(
  '/stripe/session/:id',
  express.json(),
  auth(Role.CUSTOMER, Role.ADMIN),
  validateRequest(paymentValidation.verifyPayment),
  PaymentController.stripeVerifyPayment,
);

// Get payment status
router.get(
  '/stripe/session/:id/status',
  auth(Role.CUSTOMER, Role.ADMIN),
  PaymentController.getPaymentStatus,
);

export const PaymentRoute = router;
