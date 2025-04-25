// src/modules/mailing/mailing.validation.ts
import { z } from 'zod';

const verificationZodSchema = z.object({
  body: z.object({
    email: z.string().email(),
    userId: z.string(),
  }),
});

const reportZodSchema = z.object({
  body: z.object({
    email: z.string().email(),
    reason: z.string(),
  }),
});

export const MailingValidation = {
  verificationZodSchema,
  reportZodSchema,
};
