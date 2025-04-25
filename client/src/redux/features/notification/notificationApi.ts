import { NotificationDataDb } from '../../../components/ui/NotificationItem';
import { HTTP_VERB } from '../../../enums';
import { api, ResSuccess } from '../../api/apiSlice';

export const notificationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query<ResSuccess<NotificationDataDb>, undefined>({
      query: () => ({
        url: `/notification`,
        method: HTTP_VERB.GET,
      }),
      providesTags: ['notification'],
    }),
    readNotifications: builder.mutation<ResSuccess<NotificationDataDb>, undefined>({
      query: () => ({
        url: `/notification`,
        method: HTTP_VERB.PATCH,
      }),
      invalidatesTags: ['notification'],
    }),
  }),
});

export const { useGetNotificationsQuery, useReadNotificationsMutation } = notificationApi;
