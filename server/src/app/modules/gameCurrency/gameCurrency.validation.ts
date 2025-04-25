import { z } from 'zod';

import { Pretty } from '../../../interfaces/sharedInterface';
import { createOfferCommonSchema } from '../offer/offer.validation';

export const GAME_CURRENCY_FILTER_TYPES = {
  CHECKBOX_SINGLE: 'radio',
  CHECKBOX_MULTIPLE: 'checkbox',
} as const;

export type TGameCurrencyFilterType =
  (typeof GAME_CURRENCY_FILTER_TYPES)[keyof typeof GAME_CURRENCY_FILTER_TYPES];

export const FILTER_TYPE_OPTIONS = Object.values(
  GAME_CURRENCY_FILTER_TYPES,
).map((value) => ({
  value,
  label: value,
}));

export type TDynamicFilterCurrencyCommonPropsNested = {
  name: string;
  children?: TDynamicFilterCurrencyCommonPropsNested[];
};

const dynamicFilterCommonSchema: z.ZodSchema<TDynamicFilterCurrencyCommonPropsNested> =
  z.lazy(() =>
    z.object({
      name: z.string().min(2, 'A name is required'),
      children: z.array(dynamicFilterCommonSchema).optional(), // Recursive definition for nested filters
    }),
  );

const dynamicFilterCurrencySchema = z.lazy(() =>
  z.object({
    name: z
      .string({
        required_error: 'Filter title must be a string',
      })
      .min(2, 'Filter title is required'),
    type: z.nativeEnum(GAME_CURRENCY_FILTER_TYPES),
    children: z.array(dynamicFilterCommonSchema).optional(), // Recursive definition for nested filters
  }),
);
export type DynamicFilterCurrencyInputs = z.infer<
  typeof dynamicFilterCurrencySchema
>;

// const gameCurrencyServerItemZ = z.object({
//   title: z.string().trim().min(1, { message: 'Offer title is required' }),
//   server: z.string().trim().min(1, { message: 'Server is required' }),
// });
// export type GameCurrencyServerItem = z.infer<typeof gameCurrencyServerItemZ>;
const gameCurrencyServerSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, { message: 'Minimum 2 characters is required' }),
  region: z
    .string()
    .trim()
    .min(2, { message: 'Minimum 2 characters is required' }),
  label: z
    .string()
    .trim()
    .min(2, { message: 'Minimum 2 characters is required' }),
  value: z
    .string()
    .trim()
    .min(2, { message: 'Minimum 2 characters is required' }),
});

export type GameCurrencyServer = z.infer<typeof gameCurrencyServerSchema>;

const createGameCurrencySchema = z.object({
  ...createOfferCommonSchema.shape,
  dynamicFilters: z.array(dynamicFilterCurrencySchema).min(1).default([]),
  servers: z.array(gameCurrencyServerSchema).min(1).default([]),
});

export type GameCurrency = Pretty<z.infer<typeof createGameCurrencySchema>>;

const createGameCurrencyZodSchema = z.object({
  body: createGameCurrencySchema,
});

const updateGameCurrencySchema = createGameCurrencySchema.extend({
  _id: z.string({
    required_error: 'Id is required.',
  }),
});

const updateGameCurrencyZodSchema = z.object({
  body: updateGameCurrencySchema.partial(),
});

export type UpdateGameCurrency = z.infer<typeof updateGameCurrencySchema>;

export const GameCurrencyValidation = {
  createGameCurrencyZodSchema,
  updateGameCurrencyZodSchema,
};
