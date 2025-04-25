// src/modules/mailing/mailing.route.ts
import express from 'express';
import { mailingController } from './mailing.controller';
import validateRequest from '../../app/middlewares/validateRequest';
import { MailingValidation } from './mailing.validation';
import { Role } from '../../enums/role';
import AuthGuard from '../../app/middlewares/auth';


const router = express.Router();

// Send verification email
router.post(
  '/verification',
  validateRequest(MailingValidation.verificationZodSchema),
  AuthGuard(Role.OWNER, Role.ADMIN),
  mailingController.sendVerification,
);

// Send order confirmation email
router.post(
  '/order-confirmation',
  AuthGuard(Role.OWNER, Role.ADMIN),
  mailingController.sendOrderConfirmation,
);

// Send report email
router.post(
  '/report',
  validateRequest(MailingValidation.reportZodSchema),
  AuthGuard(Role.OWNER, Role.ADMIN),
  mailingController.sendReport,
);

// Send password reset email
router.post(
  '/password-reset',
  AuthGuard(Role.OWNER, Role.ADMIN),
  mailingController.sendPasswordReset,
);

// Send welcome email
router.post(
  '/welcome',
  AuthGuard(Role.OWNER, Role.ADMIN),
  mailingController.sendWelcome,
);

// Get email logs
router.get(
  '/logs',
  AuthGuard(Role.OWNER, Role.ADMIN),
  mailingController.getEmailLogs,
);

export const mailingRoutes = router;
