import { Request, Response } from 'express';
import { RequestWithUser, ExtendedRequest } from '../../interfaces/request';
import httpStatus from 'http-status';
import { RequestHandler } from 'express';

import ApiError from '../../../errors/ApiError';
import { IO } from '../../../server';
import { catchAsync } from '../../../shared/catchAsync';
import { sendSuccessResponse } from '../../../shared/customResponse';
import { ACTIVE_USER_IDS } from '../../../socketManager';
import { walletService } from './wallet.service';
import { CreateWallet } from './wallet.validation';

// Request Types

interface WalletIntentBody extends Pick<CreateWallet, 'depositIntentAmount'> {
  isDemoMode?: boolean;
}

interface WithdrawBody {
  amount: number;
  withdrawalMethod: string;
  accountDetails: string;
  isDemoMode?: boolean;
}

interface IWalletController {
  getWallet: RequestHandler;
  saveBalanceIntent: RequestHandler;
  stripeBalanceRechargeSession: RequestHandler;
  stripeVerifyBalanceRecharge: RequestHandler;
  requestWithdrawal: RequestHandler;
  demoBalanceRechargeSession: RequestHandler;
  demoVerifyBalanceRecharge: RequestHandler;
  demoWithdraw: RequestHandler;
}

// Controller Methods
const getWallet: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const user = (req as RequestWithUser).user;
  if (!user?.userId) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const isDemoMode = req.query.isDemoMode === 'true';

  const result = await walletService.getWallet({ userId: user.userId, isDemoMode });
  
  sendSuccessResponse(res, {
    data: result,
    message: 'Wallet fetched successfully',
  });
});

const demoBalanceRechargeSession: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const user = (req as RequestWithUser).user;
    if (!user?.userId) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }

    const { depositIntentAmount } = (req as ExtendedRequest<CreateWallet>).body;

    if (!depositIntentAmount || depositIntentAmount < 1) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid amount');
    }

    const session = await walletService.createDemoSession({
      userId: user.userId,
      depositIntentAmount,
    });

    sendSuccessResponse(res, {
      data: session,
      message: 'Demo payment session created',
    });
  },
);

const demoVerifyBalanceRecharge: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const user = (req as RequestWithUser).user;
    if (!user?.userId) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }

    const { id: sessionId } = req.params;

    const result = await walletService.verifyDemoPayment({
      sessionId,
      userId: user.userId,
    });

    const activeUser = ACTIVE_USER_IDS.get(user.userId);
    if (activeUser) {
      IO.to(activeUser).emit('balanceRecharge', {
        session: result,
        note: 'Demo recharge processed successfully',
      });
    }

    sendSuccessResponse(res, {
      data: result,
      message: 'Demo payment processed successfully',
    });
  },
);

const demoWithdraw: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const user = (req as RequestWithUser).user;
    if (!user?.userId) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'User not found');
    }

    const { amount, withdrawalMethod, accountDetails } = (req as ExtendedRequest<WithdrawBody>).body;

    const result = await walletService.createDemoWithdrawal({
      userId: user.userId,
      amount,
      withdrawalMethod,
      accountDetails,
    });

    sendSuccessResponse(res, {
      data: result,
      message: 'Demo withdrawal processed successfully',
    });
  },
);

const saveBalanceIntent: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const user = (req as RequestWithUser).user;
    if (!user?.userId) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }

    const { depositIntentAmount, isDemoMode } = (req as ExtendedRequest<WalletIntentBody>).body;
    
    const result = await walletService.saveBalanceIntent({
      userId: user.userId,
      depositIntentAmount,
      isDemoMode,
    });

    sendSuccessResponse(res, {
      data: result,
      message: 'Balance intent saved successfully',
    });
  }
);

const stripeBalanceRechargeSession: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const user = (req as RequestWithUser).user;
    if (!user?.userId) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }

    const { depositIntentAmount } = (req as ExtendedRequest<CreateWallet>).body;

    if (!depositIntentAmount || depositIntentAmount < 1) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid amount');
    }

    const session = await walletService.stripeBalanceRechargeSession({
      userId: user.userId,
      depositIntentAmount,
    });

    sendSuccessResponse(res, {
      data: session,
      message: 'Payment session created',
    });
  },
);

const stripeVerifyBalanceRecharge: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const user = (req as RequestWithUser).user;
    if (!user?.userId) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }

    const { id: sessionId } = req.params;

    const session = await walletService.stripeVerifyPayment({
      sessionId,
      userId: user.userId,
    });

    const activeUser = ACTIVE_USER_IDS.get(user.userId);
    if (activeUser) {
      IO.to(activeUser).emit('balanceRecharge', {
        session,
        note: 'Recharge processed successfully',
      });
    }

    sendSuccessResponse(res, {
      data: session,
      message: 'Payment processed successfully',
    });
  },
);

const requestWithdrawal: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const user = (req as RequestWithUser).user;
    if (!user?.userId) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'User not found');
    }

    const { amount, withdrawalMethod, accountDetails, isDemoMode } = (req as ExtendedRequest<WithdrawBody>).body;

    const result = isDemoMode
      ? await walletService.createDemoWithdrawal({
          userId: user.userId,
          amount,
          withdrawalMethod,
          accountDetails,
        })
      : await walletService.createWithdrawRequest({
          userId: user.userId,
          amount,
          withdrawalMethod,
          accountDetails,
        });

    sendSuccessResponse(res, {
      data: result,
      message: `${
        isDemoMode ? 'Demo w' : 'W'
      }ithdrawal request submitted successfully`,
    });
  },
);

export const walletController: IWalletController = {
  getWallet,
  saveBalanceIntent,
  stripeBalanceRechargeSession,
  stripeVerifyBalanceRecharge,
  requestWithdrawal,
  demoBalanceRechargeSession,
  demoVerifyBalanceRecharge,
  demoWithdraw,
};
