import express from 'express';
import auth from '../../middlewares/auth';
import { WithdrawController } from './withdraw.controller';
import { Role } from '../../../enums/role';
import { catchAsync } from '../../../shared/catchAsync';

const router = express.Router();

// Withdraw routes
router.post(
  '/create-withdraw',
  auth(Role.BOOSTER),
  catchAsync(WithdrawController.createWithdraw)
);

router.get(
  '/',
  auth(Role.ADMIN),
  catchAsync(WithdrawController.getAllWithdraws)
);

router.get(
  '/:id',
  auth(Role.ADMIN),
  catchAsync(WithdrawController.getWithdraw)
);

router.patch(
  '/:id',
  auth(Role.ADMIN),
  catchAsync(WithdrawController.updateWithdraw)
);

router.delete(
  '/:id',
  auth(Role.ADMIN),
  catchAsync(WithdrawController.deleteWithdraw)
);

export const WithdrawRoute = router;
export { WithdrawRoute as WithdrawRoutes };
