import { NotificationModel } from './notification.model';
import {
  CreateNotification,
  NOTIFICATION_STATUS,
} from './notification.validation';

const getNotifications = async (payload: {
  userId: string;
}): Promise<Partial<CreateNotification>> => {
  const isExisting = await NotificationModel.findOne({
    userId: payload.userId,
  });

  if (isExisting) return isExisting;
  // throw new ApiError(
  //   httpStatus.BAD_REQUEST,
  //   'No balance intent found for this user'
  // );
  const newItem = await NotificationModel.create({
    userId: payload.userId,
  });
  await newItem.save();
  return newItem;
};

const readNotifications = async (payload: { userId: string }) => {
  const updatedDocument = await NotificationModel.findOneAndUpdate(
    {
      userId: payload.userId,
    },
    {
      $set: {
        'notifications.$[elem].status': NOTIFICATION_STATUS.READ,
      },
    },
    {
      arrayFilters: [{ 'elem.status': { $eq: NOTIFICATION_STATUS.UNREAD } }],
      new: true,
    },
  );
  await updatedDocument?.save();
  return updatedDocument;
};

export const notificationService = {
  getNotifications,
  readNotifications,
};
