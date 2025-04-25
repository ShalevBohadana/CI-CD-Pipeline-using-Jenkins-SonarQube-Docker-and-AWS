import { useEffect, useMemo } from 'react';
import { v4 } from 'uuid';

import {
  useGetNotificationsQuery,
  useReadNotificationsMutation,
} from '../../redux/features/notification/notificationApi';

import { NotificationItem } from './NotificationItem';

export const NotificationInfo = () => {
  const { data: notificationRes } = useGetNotificationsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
  const notifications = useMemo(
    () => notificationRes?.data?.notifications || [],
    [notificationRes]
  );
  const [readNotifications] = useReadNotificationsMutation();

  useEffect(() => {
    if (notifications.length > 0) {
      readNotifications(undefined);
    }
  }, [notifications, readNotifications]);

  return (
    <div className='grid grid-cols-1 gap-4'>
      <h2 className='sticky top-0 backdrop-blur-lg py-1'>Notifications</h2>
      <div className='flex flex-col gap-2.5'>
        {[...notifications]
          ?.reverse()
          .map((notification) => <NotificationItem key={v4()} payload={notification} />)}
      </div>
    </div>
  );
};
