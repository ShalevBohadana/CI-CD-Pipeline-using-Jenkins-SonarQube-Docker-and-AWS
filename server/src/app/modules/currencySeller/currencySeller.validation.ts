import { ObjectId } from 'mongoose';
import { z } from 'zod';

import { Pretty } from '../../../interfaces/sharedInterface';
import { Role } from '../../../enums/role';

const becomeCurrencySellerZ = z.object({
  appliedFor: z.literal(Role.CURRENCY_SELLER),
  isApproved: z.coerce.boolean().default(false),
  fullboostsNickname: z
    .string({
      required_error: 'Please enter your nickname',
    })
    .trim()
    .min(2, `Please enter your nickname`),
  email: z.string().trim().email({
    message: 'Please enter a valid email address',
  }),
  discordTag: z
    .string({
      required_error: 'Please enter discord tag',
    })
    .trim()
    .min(2, 'Please enter a valid discord tag'),
  phoneAreaCode: z
    .string({
      required_error: 'Please enter area code',
    })
    .trim()
    .min(1, 'Please enter valid area code'),
  phoneNumber: z
    .string({
      required_error: 'Please enter phone number',
    })
    .trim()
    .min(2, 'Please enter valid phone number'),
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

export type BecomeCurrencySeller = Pretty<
  z.infer<typeof becomeCurrencySellerZ> & {
    user: ObjectId;
    status: 'accepted' | 'rejected' | 'pending';
  }
>;
const requestForBecomingCurrencySellerZodSchema = z.object({
  body: becomeCurrencySellerZ,
});

export const CurrencySellerValidation = {
  requestForBecomingCurrencySellerZodSchema,
};
