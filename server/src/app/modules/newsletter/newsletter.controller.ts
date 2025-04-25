import { Request, RequestHandler, Response } from 'express';

import { catchAsync } from '../../../shared/catchAsync';
import { sendSuccessResponse } from '../../../shared/customResponse';
import { NewsletterService } from './newsletter.service';
import { Newsletter } from './newsletter.validation';

const subscribeToNewsletter = catchAsync(
  async (req: Request<object, object, Newsletter>, res: Response) => {
    const payload = req.body;
    const cart = await NewsletterService.subscribeToNewsletter(payload);
    const responseData = {
      data: cart,
      message: 'Added to Newsletter successfully',
    };
    sendSuccessResponse(res, responseData);
  },
);

const unsubscribeFromNewsletter: RequestHandler = catchAsync(
  async (req: any, res: Response) => {
    const payload = req.body;
    const userId = req.user?.userId;

    let responseData;
    if (!userId) {
      responseData = {
        data: {},
        message: 'Please login to unsubscribe',
      };
    }

    const cart = await NewsletterService.unsubscribeFromNewsletter(payload);
    responseData = {
      data: cart,
      message: 'Removed from Newsletter successfully',
    };

    sendSuccessResponse(res, responseData);
  },
);

export const NewsletterController: { [key: string]: RequestHandler } = {
  subscribeToNewsletter,
  unsubscribeFromNewsletter,
};
