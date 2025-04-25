import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { Role } from '../../../enums/role';
import { walletController } from './wallet.controller';
import { walletValidation } from './wallet.validation';

const router = Router();

router
  .route('/')
  .get(
    auth(
      Role.CUSTOMER,
      Role.ADMIN,
      Role.OWNER,
    ),
    walletController.getWallet,
  );

router
  .route('/save-balance-intent')
  .post(
    auth(Role.CUSTOMER, Role.ADMIN),
    validateRequest(walletValidation.updateWalletZodSchema),
    walletController.saveBalanceIntent,
  );

// Real Stripe routes
router
  .route('/stripe/balance-recharge-session')
  .post(
    auth(Role.CUSTOMER, Role.ADMIN),
    walletController.stripeBalanceRechargeSession,
  );

router
  .route('/stripe/balance-recharge-session/:id')
  .patch(
    auth(Role.CUSTOMER, Role.ADMIN),
    walletController.stripeVerifyBalanceRecharge,
  );

// Demo routes
router
  .route('/demo/balance-recharge-session')
  .post(
    auth(Role.CUSTOMER, Role.ADMIN),
    walletController.demoBalanceRechargeSession,
  );

router
  .route('/demo/balance-recharge-session/:id')
  .patch(
    auth(Role.CUSTOMER, Role.ADMIN),
    walletController.demoVerifyBalanceRecharge,
  );

// Withdrawal routes
router
  .route('/withdraw-request')
  .post(
    auth(Role.CUSTOMER),
    validateRequest(walletValidation.createWithdrawalRequestSchema),
    walletController.requestWithdrawal,
  );

// Demo withdrawal route
router
  .route('/demo/withdraw')
  .post(
    auth(Role.CUSTOMER),
    validateRequest(walletValidation.createWithdrawalRequestSchema),
    walletController.demoWithdraw,
  );

export const walletRouter = router;
