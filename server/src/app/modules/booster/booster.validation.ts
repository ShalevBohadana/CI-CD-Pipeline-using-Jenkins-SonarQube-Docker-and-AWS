import { ObjectId } from 'mongoose';
import { z } from 'zod';

import { Pretty } from '../../../interfaces/sharedInterface';
import { Role } from '../../../enums/role';

const becomeBoosterZ = z.object({
  appliedFor: z.literal(Role.BOOSTER),
  isApproved: z.coerce.boolean().default(false),
  email: z.string().trim().email({
    message: 'Please enter a valid email address',
  }),
  discordTag: z
    .string({
      required_error: 'Please enter discord tag',
    })
    .trim()
    .min(2, 'Please enter a valid discord tag'),
  telegramUsername: z
    .string({
      required_error: 'Please enter your nickname',
    })
    .trim()
    .min(2, `Please enter your Telegram username`),
  hoursCommitment: z.coerce
    .string({
      required_error: 'Please select hours',
    })
    .trim()
    .min(5, 'Please select one'),
  selectedGames: z
    .array(z.custom<ObjectId>())
    .min(1, 'Please select at least one game name')
    .default([]),
  about: z
    .string({
      required_error: 'Please enter your information',
    })
    .trim()
    .min(10, { message: 'About info must be at least 10 characters' }),
});

export type BecomeBooster = Pretty<
  z.infer<typeof becomeBoosterZ> & {
    user: ObjectId;
    status: 'accepted' | 'rejected' | 'pending';
  }
>;
const requestForBecomingBoosterZodSchema = z.object({
  body: becomeBoosterZ,
});

export const BoosterValidation = {
  requestForBecomingBoosterZodSchema,
};
