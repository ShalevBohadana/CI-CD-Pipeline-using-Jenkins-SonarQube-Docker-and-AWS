import { Request, Response, RequestHandler } from 'express';
import httpStatus from 'http-status';
import { catchAsync } from '../../../shared/catchAsync';
import { sendSuccessResponse } from '../../../shared/customResponse';
import { PaymentService } from './payment.service';
import ApiError from '../../../errors/ApiError';

const stripeSession = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  if (!userId) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'User ID is required');
  }

  const session = await PaymentService.stripeSession({
    userId,
  });

  const responseData = {
    data: session,
    message: 'Payment session created successfully',
  };

  sendSuccessResponse(res, responseData);
});

const stripeVerifyPayment = catchAsync(async (req: Request, res: Response) => {
  const { id: sessionId } = req.params;

  if (!sessionId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Session ID is required');
  }

  const result = await PaymentService.stripeVerifyPayment({
    sessionId,
  });

  const responseData = {
    data: result,
    message: result ? 'Payment verified successfully' : 'Payment not completed',
  };

  sendSuccessResponse(res, responseData);
});

const getPaymentStatus = catchAsync(async (req: Request, res: Response) => {
  const { id: sessionId } = req.params;

  if (!sessionId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Session ID is required');
  }

  const session = await PaymentService.stripeVerifyPayment({
    sessionId,
  });

  const responseData = {
    data: {
      status: session?.paymentStatus || 'unknown',
      paid: session?.paymentStatus === 'paid',
    },
    message: 'Payment status retrieved successfully',
  };

  sendSuccessResponse(res, responseData);
});

export const PaymentController: { [key: string]: RequestHandler } = {
  stripeSession,
  stripeVerifyPayment,
  getPaymentStatus,
};
