import { z } from 'zod';

export const GAME_STATUS = {
  ACTIVATE: 'activate',
  SUSPEND: 'suspend',
} as const;

export const gameSliderSchema = z.object({
  heading: z.string().trim().min(1, { message: 'Slider title is required' }),
  imageUrl: z.string().trim().url(),
  videoUrl: z.union([z.string().url(), z.literal('')]).optional(),
  createdAt: z.coerce.date({
    invalid_type_error: 'Please provide a valid date',
    required_error: 'Date is required',
  }),
});

export const categorySuggestionSchema = z.object({
  value: z.union([z.string(), z.number(), z.symbol(), z.null()]),
  label: z.string({
    required_error: 'label is required',
  }),
});

export const gameUpsellSchema = z.object({
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

export const createGameFormInputsSchema = z.object({
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

// Type Exports
export type GameSlider = z.infer<typeof gameSliderSchema>;
export type CategorySuggestion = z.infer<typeof categorySuggestionSchema>;
export type GameUpsell = z.infer<typeof gameUpsellSchema>;
export type CreateGameFormInputs = z.infer<typeof createGameFormInputsSchema>;

// Default Values
export const defaultValues: Partial<CreateGameFormInputs> = {
  showInMenu: true,
  isFeatured: false,
  sliders: [
    {
      heading: '',
      imageUrl: '',
      createdAt: new Date(Date.now()),
    },
  ],
};
