import moment from 'moment';
import { z } from 'zod';

import { NormalizedDbData, Pretty } from '../../types/globalTypes';
import { BellIcon } from '../icons/icons';

export const NOTIFICATION_STATUS = {
  READ: 'read',
  UNREAD: 'unread',
} as const;

const notificationDataSchemaZ = z.object({
  label: z.string(),
  status: z.nativeEnum(NOTIFICATION_STATUS),
  url: z.string().optional(),
  date: z.coerce.date(),
});

export type NotificationData = z.infer<typeof notificationDataSchemaZ>;
const createNotificationZ = z.object({
  userId: z.optional(z.string()),
  notifications: z.array(notificationDataSchemaZ).default([]),
});

export type CreateNotification = z.infer<typeof createNotificationZ>;
export type NotificationDataDb = Pretty<NormalizedDbData & CreateNotification>;
type Props = {
  payload: NotificationData;
};

export const NotificationItem = ({ payload: { label, status, date } }: Props) => {
  return (
    <div className='flex flex-col justify-start items-start gap-1'>
      <h2 className='flex flex-nowrap gap-1.5'>
        <BellIcon
          className={`w-3.5 h-3.5 
        ${status === NOTIFICATION_STATUS.UNREAD ? 'stroke-brand-primary-color-1' : 'stroke-brand-black-20'}`}
        />
        {label}
      </h2>
      <p className='text-xs pl-5'>{moment(date).format('MMMM Do YYYY, h:mm a')}</p>
    </div>
  );
};
