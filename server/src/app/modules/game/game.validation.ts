import { z } from 'zod';

export const GAME_STATUS = {
  ACTIVATE: 'activate',
  SUSPEND: 'suspend',
} as const;

const gameSliderSchema = z.object({
  heading: z.string().trim().min(1, { message: 'Slider title is required' }),
  imageUrl: z.string().trim().url(),
  videoUrl: z.union([z.string().url(), z.literal('')]).optional(),
  createdAt: z.coerce.date({
    invalid_type_error: 'Please provide a valid date',
    required_error: 'Date is required',
  }),
});
export type GameSlider = z.infer<typeof gameSliderSchema>;

const categorySuggestionSchema = z.object({
  value: z.union([z.string(), z.number(), z.symbol(), z.null()]),
  label: z.string({
    required_error: 'label is required',
  }),
});
export type CategorySuggestion = z.infer<typeof categorySuggestionSchema>;

const gameUpsellSchema = z.object({
  // title: z.string().trim().min(1, { message: 'Upsell title is required' }),
  // description: z
  //   .string()
  //   .trim()
  //   .min(1, { message: 'Upsell description is required' }),
  // imageUrl: z.string().trim().url(),
  title: z.union([
    z.string().trim().min(2, { message: 'Upsell title is required' }),
    z.literal(''),
  ]),
  description: z.union([
    z.string().trim().min(2, { message: 'Upsell description is required' }),
    z.literal(''),
  ]),
  imageUrl: z.union([z.string().trim().url(), z.literal('')]),
});
export type GameUpsell = z.infer<typeof gameUpsellSchema>;

const createGameFormInputsSchema = z.object({
  status: z.nativeEnum(GAME_STATUS),
  name: z.string().trim().min(1, { message: 'Game name is required' }),
  uid: z.string().trim().min(1),
  title: z.string().trim().min(1, { message: 'Game title is required' }),
  showInMenu: z.boolean(),
  isFeatured: z.boolean(),

  bannerUrl: z.string().trim().url(),
  imageUrl: z.string().trim().url(),

  sliders: z.array(gameSliderSchema).min(1).default([]),
  categories: z
    .array(categorySuggestionSchema)
    .min(1, 'Please provide at least one category name')
    .default([]),

  upsell: gameUpsellSchema.optional(),
});
export type CreateGame = z.infer<typeof createGameFormInputsSchema>;

const createGameZodSchema = z.object({
  body: createGameFormInputsSchema,
});

const updateGameZodSchema = createGameZodSchema.extend({
  body: createGameZodSchema.shape.body.extend({
    _id: z.string({
      required_error: 'Id is required.',
    }),
  }),
});

export const GameValidation = {
  createGameZodSchema,
  updateGameZodSchema,
};
