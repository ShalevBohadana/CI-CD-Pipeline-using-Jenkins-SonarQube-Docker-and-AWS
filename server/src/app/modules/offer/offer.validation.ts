import { ObjectId } from 'mongoose';
import { z } from 'zod';

export const OFFER_STATUS = {
  ACTIVATE: 'activate',
  SUSPEND: 'suspend',
} as const;

export const OFFER_TYPE = {
  REGULAR: 'regular',
  CURRENCY: 'currency',
} as const;

export const OFFER_FILTER_TYPES = {
  CHECKBOX_MULTIPLE: 'checkbox',
  CHECKBOX_TOPOGRAPHIC: 'radio',
  BAR: 'bar',
  STANDALONE: 'standalone',
} as const;
export const OFFER_DISCOUNT_TYPE = {
  FIXED: 'fixed',
  PERCENT: 'percent',
} as const;
export type TOfferFilterType =
  (typeof OFFER_FILTER_TYPES)[keyof typeof OFFER_FILTER_TYPES];

export const FILTER_TYPE_OPTIONS = Object.values(OFFER_FILTER_TYPES).map(
  (value) => ({
    value,
    label: value,
  }),
);
export const DISCOUNT_TYPE_OPTIONS = [
  {
    value: OFFER_DISCOUNT_TYPE.FIXED,
    label: OFFER_DISCOUNT_TYPE.FIXED,
  },
  {
    value: OFFER_DISCOUNT_TYPE.PERCENT,
    label: OFFER_DISCOUNT_TYPE.PERCENT,
  },
];
export type TDynamicFilterCommonPropsNested = {
  name: string;
  fee: number;
  children?: TDynamicFilterCommonPropsNested[];
};

// export type TDynamicFilter = {
//   type: TOfferFilterType;
//   children?: TDynamicFilterCommonProps[];
// } & TDynamicFilterCommonProps;

const dynamicFilterCommonSchema: z.ZodSchema<TDynamicFilterCommonPropsNested> =
  z.lazy(() =>
    z.object({
      name: z.string().min(2, 'A name is required'),
      fee: z
        .number()
        .min(0, 'Fee can not be less than 0')
        .multipleOf(0.01, 'Must be within 2 decimal points'),
      children: z.array(dynamicFilterCommonSchema).optional(), // Recursive definition for nested filters
    }),
  );

const dynamicFilterSchema = z.lazy(() =>
  z.object({
    name: z
      .string({
        required_error: 'Filter title must be a string',
      })
      .min(2, 'Filter title is required'),
    fee: z
      .number()
      .min(0, 'Fee can not be less than 0')
      .multipleOf(0.01, 'Must be within 2 decimal points'),
    type: z.nativeEnum(OFFER_FILTER_TYPES),
    children: z.array(dynamicFilterCommonSchema).optional(), // Recursive definition for nested filters
  }),
);
export type DynamicFilterInputs = z.infer<typeof dynamicFilterSchema>;
export const tagObjectSchema = z.object({
  value: z.union([z.string(), z.number(), z.symbol(), z.null()]),
  label: z.string({
    required_error: 'label is required',
  }),
});
export type OfferTag = z.infer<typeof tagObjectSchema>;

export const offerDiscountSchema = z.object({
  amount: z
    .number({
      invalid_type_error: 'amount must be a positive number',
      required_error: 'amount is required',
    })
    .min(0)
    // .positive('amount must be greater than 0')
    .multipleOf(0.01, 'Must be within 2 decimal points'),
  type: z.nativeEnum(OFFER_DISCOUNT_TYPE),
});
export type OfferDiscount = z.infer<typeof offerDiscountSchema>;

export const createOfferCommonSchema = z.object({
  offerType: z.nativeEnum(OFFER_TYPE),
  status: z.nativeEnum(OFFER_STATUS),
  name: z.string().trim().min(1, { message: 'Offer name is required' }),
  uid: z.string().trim().min(1),
  sellerId: z.custom<ObjectId>(),
  gameUid: z
    .string({
      required_error: 'Game name is required',
    })
    .min(1, 'Game name is required'),
  categoryUid: z
    .string({
      required_error: 'Game category is required',
    })
    .min(1, 'Game category is required'),
  featuredList: z.array(z.string()).min(1).max(3).default([]),
  description: z
    .string({
      required_error: 'Offer Description is required',
    })
    .min(10, { message: 'Offer Description must be at least 10 characters' }),
  tags: z
    .array(tagObjectSchema)
    .min(1, 'Please provide at least one tag name')
    .default([]),
  image: z
    .string({
      required_error: 'Image is required',
    })
    .min(4, 'Image is required'),
  basePrice: z
    .number({
      invalid_type_error: 'Price must be a positive number',
      required_error: 'Price is required',
    })
    .positive('Price must be greater than 0')
    .min(1)
    .multipleOf(0.01, 'Must be within 2 decimal points'),
  offerPromo: z.string().optional(),
  discount: offerDiscountSchema.optional(),
});

export type CreateOfferCommonSchema = z.infer<typeof createOfferCommonSchema>;

export const createRegularOfferSchema = z.object({
  ...createOfferCommonSchema.shape,
  dynamicFilters: z.array(dynamicFilterSchema).min(1).default([]),
  approximateOrderCompletionInMinutes: z
    .number({
      invalid_type_error: 'Please provide number in minutes',
      required_error:
        'Approximate order completion time in minutes is required',
    })
    .min(0),
});

export type RegularOffer = z.infer<typeof createRegularOfferSchema>;

const createRegularOfferZodSchema = z.object({
  body: createRegularOfferSchema,
});

const updateRegularOfferSchema = createRegularOfferSchema.extend({
  _id: z.string({
    required_error: 'Id is required.',
  }),
});

const updateRegularOfferZodSchema = z.object({
  body: updateRegularOfferSchema.partial(),
});

export type UpdateRegularOffer = z.infer<typeof updateRegularOfferSchema>;

export const OfferValidation = {
  createRegularOfferZodSchema,
  updateRegularOfferZodSchema,
};
