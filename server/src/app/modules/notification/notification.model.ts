import { model, Schema } from 'mongoose';

import { TNotificationModel } from './notification.interface';
import {
  CreateNotification,
  NotificationData,
} from './notification.validation';

const notificationSchema = new Schema<CreateNotification>(
  {
    userId: {
      type: String,
      // required: true,
      unique: true,
    },
    notifications: {
      type: Array<NotificationData>(),
      default: [],
    },
  },
  { timestamps: true },
);

notificationSchema.statics.isExisting = async function (
  userId: string,
): Promise<CreateNotification | null> {
  const result = await NotificationModel.findOne({ userId });
  return result;
};

export const NotificationModel = model<CreateNotification, TNotificationModel>(
  'notification',
  notificationSchema,
);
