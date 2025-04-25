import { ObjectId } from 'mongoose';
import { z } from 'zod';

import { Pretty } from '../../../interfaces/sharedInterface';
import { tagObjectSchema } from '../offer/offer.validation';

export const GAME_CURRENCY_OFFER_STATUS = {
  ACTIVATE: 'activate',
  SUSPEND: 'suspend',
} as const;

export type GameCurrencyOfferStatus =
  (typeof GAME_CURRENCY_OFFER_STATUS)[keyof typeof GAME_CURRENCY_OFFER_STATUS];

const dynamicCurrencyOfferItemSchema = z.object({
  label: z
    .string({
      required_error: 'Label must be a string',
    })
    .min(2, 'Label is required'),
  value: z
    .string({
      required_error: 'Value must be a string',
    })
    .min(2, 'Value is required'),
});
export type DynamicCurrencyOfferItem = z.infer<
  typeof dynamicCurrencyOfferItemSchema
>;
const createGameCurrencyOfferSchema = z.object({
  sellerId: z.custom<ObjectId>(),
  status: z.nativeEnum(GAME_CURRENCY_OFFER_STATUS),
  // name: z.string().trim().min(1, { message: 'Game Currency name is required' }),
  uid: z.string().trim().min(1),
  currencyUid: z
    .string({
      required_error: 'Game name is required',
    })
    .min(1, 'Game name is required'),
  serverUid: z
    .string({
      required_error: 'Game name is required',
    })
    .min(1, 'Game name is required'),
  price: z
    .number({
      invalid_type_error: 'Price must be a positive number',
      required_error: 'Price is required',
    })
    .positive('Price must be greater than 0')
    .min(0.01)
    .multipleOf(0.01, 'Must be within 2 decimal points'),
  quantity: z
    .number({
      invalid_type_error: 'Quantity must be a positive number',
      required_error: 'Quantity is required',
    })
    .positive('Quantity must be greater than 0')
    .min(1),
  minPurchase: z
    .number({
      invalid_type_error: 'Minimum purchase must be a positive number',
      required_error: 'Minimum purchase is required',
    })
    .positive('Minimum purchase must be greater than 0')
    .min(1),
  description: z
    .string({
      required_error: 'Description is required',
    })
    .min(10, { message: 'Description must be at least 10 characters' }),
  dynamicItems: z.array(dynamicCurrencyOfferItemSchema).min(1).default([]),
  approximateOrderCompletionInMinutes: z
    .number({
      invalid_type_error: 'Please provide number in minutes',
      required_error:
        'Approximate order completion time in minutes is required',
    })
    .min(0),
  inStock: z
    .number({
      invalid_type_error: 'Please provide number in minutes',
      required_error:
        'Approximate order completion time in minutes is required',
    })
    .min(0),
  tags: z
    .array(tagObjectSchema)
    .min(1, 'Please provide at least one tag name')
    .default([]),
});
export type CreateGameCurrencyOfferFormInputs = z.infer<
  typeof createGameCurrencyOfferSchema
>;
export type OfferGameCurrency = Pretty<
  z.infer<typeof createGameCurrencyOfferSchema> & {
    reviews: Array<ObjectId>;
  }
>;

const createOfferGameCurrencyZodSchema = z.object({
  body: createGameCurrencyOfferSchema,
});

const updateOfferGameCurrencySchema = createGameCurrencyOfferSchema.extend({
  _id: z.string({
    required_error: 'Id is required.',
  }),
});

const updateOfferGameCurrencyZodSchema = z.object({
  body: updateOfferGameCurrencySchema.partial(),
});

export type UpdateOfferGameCurrency = z.infer<
  typeof updateOfferGameCurrencySchema
>;

export const OfferGameCurrencyValidation = {
  createOfferGameCurrencyZodSchema,
  updateOfferGameCurrencyZodSchema,
};
