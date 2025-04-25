import { z } from 'zod';

export const NOTIFICATION_STATUS = {
  READ: 'read',
  UNREAD: 'unread',
} as const;

const notificationDataSchemaZ = z.object({
  label: z.string(),
  status: z.nativeEnum(NOTIFICATION_STATUS),
  url: z.string().optional(),
});

export type NotificationData = z.infer<typeof notificationDataSchemaZ>;
const createNotificationZ = z.object({
  userId: z.optional(z.string()),
  notifications: z.array(notificationDataSchemaZ).default([]),
});

export type CreateNotification = z.infer<typeof createNotificationZ>;
const createNotificationZodSchema = z.object({
  body: createNotificationZ,
});

const updateNotificationZodSchema = createNotificationZ.partial();

export const notificationValidation = {
  createNotificationZodSchema,
  updateNotificationZodSchema,
};
