import { z } from 'zod';

import { offerDiscountSchema } from '../offer/offer.validation';

export const PROMO_STATUS = {
  ACTIVATE: 'activate',
  SUSPEND: 'suspend',
} as const;

const createPromoZ = z.object({
  status: z.nativeEnum(PROMO_STATUS),
  code: z.string().trim().min(1, { message: 'Promo code is required' }),
  description: z
    .string()
    .trim()
    .min(1, { message: 'Promo short description is required' }),
  startDate: z.coerce.date({
    invalid_type_error: 'Please provide a valid start date',
    required_error: 'Start date is required',
  }),
  startTime: z.coerce.date({
    invalid_type_error: 'Please provide a valid start time',
    required_error: 'Start time is required',
  }),
  endDate: z.coerce.date({
    invalid_type_error: 'Please provide a valid end date',
    required_error: 'End date is required',
  }),
  endTime: z.coerce.date({
    invalid_type_error: 'Please provide a valid end time',
    required_error: 'End time is required',
  }),
  // usageCount: z.number().min(0).default(0).optional(),
  discount: offerDiscountSchema,
  // conditions: conditionsSchema.optional(),
});

// export type CreatePromo = Pretty<z.infer<typeof createPromoZ>>;
export type CreatePromo = z.infer<typeof createPromoZ>;
const createPromoZodSchema = z.object({
  body: createPromoZ,
});

const updatePromoZodSchema = createPromoZ.partial();

export const PromoValidation = {
  createPromoZodSchema,
  updatePromoZodSchema,
};
