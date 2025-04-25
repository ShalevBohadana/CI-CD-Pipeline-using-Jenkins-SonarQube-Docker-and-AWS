import { z } from 'zod';

const newsletterZ = z.object({
  email: z.string().email(),
  subscribedAt: z.coerce.date().optional(),
  isSubscribed: z.boolean().default(true),
  unsubscribedAt: z.coerce.date().optional(),
});

export type Newsletter = z.infer<typeof newsletterZ>;

const createNewsletterZodSchema = z.object({
  body: newsletterZ.pick({ email: true }),
});

export const NewsletterValidation = {
  createNewsletterZodSchema,
};
