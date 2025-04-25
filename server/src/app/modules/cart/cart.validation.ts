import { ObjectId } from 'mongoose';
import { z } from 'zod';

import { Pretty } from '../../../interfaces/sharedInterface';
import { OFFER_TYPE } from '../offer/offer.validation';

const SelectedFiltersForCartSchema = z.object({
  name: z.string(),
  value: z.array(z.string()),
});

export type SelectedFiltersForCart = z.infer<
  typeof SelectedFiltersForCartSchema
>;
export const UserSelectedOfferSchemaZ = z.object({
  region: z.string(),
  filters: z.array(SelectedFiltersForCartSchema),
  price: z.number(),
  isDiscountApplied: z.boolean(),
});
export type UserSelectedOffer = z.infer<typeof UserSelectedOfferSchemaZ>;
export const UserSelectedCurrencyOfferSchemaZ = z.object({
  ...UserSelectedOfferSchemaZ.pick({ region: true, price: true }).shape,
  characterName: z.string({
    required_error: 'Character name is required',
  }),
  amount: z
    .number({
      required_error: 'Amount is required',
    })
    .min(1),
});
export type UserSelectedCurrencyOffer = z.infer<
  typeof UserSelectedCurrencyOfferSchemaZ
>;

export const CartItemSchema3 = z.union([
  UserSelectedOfferSchemaZ,
  UserSelectedCurrencyOfferSchemaZ,
]);

export const CartItemSchema = z.object({
  itemType: z.nativeEnum(OFFER_TYPE),
  itemId: z.number(),
  seller: z.custom<ObjectId>(),
  offerId: z.custom<ObjectId>(),
  offerName: z.string({
    required_error: 'offer name is required',
  }),
  offerImage: z.string().trim().url(),
  selected: z.union([
    UserSelectedOfferSchemaZ,
    UserSelectedCurrencyOfferSchemaZ,
  ]),
});
export type CartItem = z.infer<typeof CartItemSchema>;
export const addToCartPayload = z.object({
  ...CartItemSchema.shape,
});

export const CartPromoSchema = z.object({
  code: z.string(),
  // discount: offerDiscountSchema,
});

// for change
export type CartPromo = z.infer<typeof CartPromoSchema>;
export type AddToCartPayload = z.infer<typeof addToCartPayload>;
export type RemoveFromCartPayload = Pretty<Omit<AddToCartPayload, 'selected'>>;

const createCartZodSchema = z.object({
  body: addToCartPayload,
});
const promoCartZodSchema = z.object({
  body: CartPromoSchema,
});
export const cartSchema = z.object({
  totalPrice: z.number().positive(),
  // items: z.array(CartItemSchema),
  promo: CartPromoSchema.optional(),
});
const cartFullSchema = z.object({
  ...cartSchema.shape,
  items: z.array(CartItemSchema),
  sessionId: z.string(),
  userId: z.string(),
});
export type Cart = Pretty<z.infer<typeof cartFullSchema>>;
export const CartValidation = {
  createCartZodSchema,
  promoCartZodSchema,
};
