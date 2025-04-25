import { z } from 'zod';

const addCurrencyZodSchema = z.object({
  body: z.object({
    base: z.string({
      required_error: 'Currency base name is required',
    }),
    rates: z.object({
      EUR: z.number({
        required_error: 'Currency rate is required',
      }),
      timestamp: z.number({
        required_error: 'Currrent timestamp is required',
      }),
    }),
  }),
});

export const CurrencyValidation = {
  addCurrencyZodSchema,
};
