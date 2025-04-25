import { z } from 'zod';

const guideZ = z.object({
  isFeatured: z.coerce.boolean().default(false),
  publishDate: z.coerce.date(),
  imageUrl: z.string().trim().url(),
  author: z
    .string({
      required_error: 'Please enter your information',
    })
    .trim()
    .min(5, {
      message: 'author is required',
    }),
  uid: z
    .string({
      required_error: 'Please enter your information',
    })
    .trim()
    .min(5, {
      message: 'uid is required',
    }),
  title: z
    .string({
      required_error: 'Please enter your information',
    })
    .trim()
    .min(5, {
      message: 'title is required',
    }),
  shortDescription: z
    .string({
      required_error: 'Please enter your information',
    })
    .trim()
    .min(5, {
      message: 'shortDescription is required',
    }),
  details: z
    .string({
      required_error: 'Please enter your information',
    })
    .trim()
    .min(10, { message: 'details info must be at least 10 characters' }),
});

export type Guide = z.infer<typeof guideZ>;

const createGuideZodSchema = z.object({
  body: guideZ,
});

const updateGuideZodSchema = z.object({
  body: guideZ.partial(),
});

export const GuideValidation = {
  createGuideZodSchema,
  updateGuideZodSchema,
};

export type CreateGuide = z.infer<typeof createGuideZodSchema>;
