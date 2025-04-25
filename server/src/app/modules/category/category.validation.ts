import { z } from 'zod';

const createCategoryZodSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Title is required',
      })
      .min(3),
    gameId: z.string({
      required_error: 'GameId is required',
    }),
    region: z.array(
      z.string({
        required_error: 'Region is required',
      }),
    ),
    faction: z.array(
      z.string({
        required_error: 'Faction is required',
      }),
    ),
    boostMethod: z.array(
      z.string({
        required_error: 'Boost method is required',
      }),
    ),
    // currentLevel: z.number({
    //   required_error: 'Current level is required',
    // }),
    // desiredLevel: z.number({
    //   required_error: 'Desired level is required',
    // }),
    executionOption: z.array(
      z.object({
        title: z.string({
          required_error: 'Execution option title is required',
        }),
        price: z.number({
          required_error: 'Execution option price is required',
        }),
      }),
    ),
    additionalOption: z.array(
      z.object({
        title: z.string({
          required_error: 'Additional option title is required',
        }),
        price: z.number({
          required_error: 'Additional option price is required',
        }),
      }),
    ),
  }),
});

export const CategoryValidation = {
  createCategoryZodSchema,
};
