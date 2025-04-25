import { z } from 'zod';

const createExpZodSchema = z.object({
  body: z.object({
    rating: z
      .number({
        required_error: 'Rating is required',
      })
      .min(1)
      .max(5),
    exp: z
      .number({
        required_error: 'Exp is required',
      })
      .min(0)
      .max(100),
  }),
});

const updateExpZodSchema = z.object({
  params: z.object({
    rating: z
      .string({
        required_error: 'Rating is required',
      })
      .min(1)
      .max(5),
  }),
  body: z.object({
    exp: z
      .number({
        required_error: 'Exp is required',
      })
      .min(0)
      .max(100),
  }),
});

export const ExpValidation = {
  createExpZodSchema,
  updateExpZodSchema,
};
