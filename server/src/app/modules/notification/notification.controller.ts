import { Request, Response } from 'express';
import { RequestHandler } from 'express';
import { RequestWithUser } from '../../interfaces/request';
import { catchAsync } from '../../../shared/catchAsync';
import { sendSuccessResponse } from '../../../shared/customResponse';
import { notificationService } from './notification.service';

interface INotificationController {
  getNotifications: RequestHandler;
  readNotifications: RequestHandler;
}

const getNotifications: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const user = (req as RequestWithUser).user;
    if (!user?.userId) {
      throw new Error('User not found');
    }

    const result = await notificationService.getNotifications({ userId: user.userId });

    sendSuccessResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Notifications retrieved successfully',
      data: result,
    });
  }
);

const readNotifications: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const user = (req as RequestWithUser).user;
    if (!user?.userId) {
      throw new Error('User not found');
    }

    const result = await notificationService.readNotifications({ userId: user.userId });

    sendSuccessResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Notifications marked as read successfully',
      data: result,
    });
  }
);

const NotificationController: INotificationController = {
  getNotifications,
  readNotifications,
};

export default NotificationController;
