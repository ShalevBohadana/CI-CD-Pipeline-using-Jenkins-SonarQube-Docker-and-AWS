import { Model } from 'mongoose';

import { Pretty } from '../../../interfaces/sharedInterface';
import { CommonFilters } from '../../helpers/pagination';
import { CreateNotification } from './notification.validation';

export type UpdateNotification = Pretty<
  Partial<CreateNotification> & {
    _id: string;
  }
>;
export type NotificationFilters = Pretty<
  CommonFilters & {
    status?: string;
    code?: string;
  }
>;

export type TNotificationModel = Model<CreateNotification> & {
  // eslint-disable-next-line no-unused-vars
  isExisting(userId: string): Promise<CreateNotification>;
};
