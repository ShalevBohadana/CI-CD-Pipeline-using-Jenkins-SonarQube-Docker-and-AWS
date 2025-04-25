import { z } from 'zod';

const createServiceZodSchema = z.object({
  body: z.object({
    categoryId: z.string({
      required_error: 'Category is required',
    }),
    title: z.string({
      required_error: 'Title is required',
    }),
    sku: z.string().optional(),
    details: z.string({
      required_error: 'Details is required',
    }),
    benefitPoint: z.string({
      required_error: 'Benefit point is required',
    }),
    additionalPoint: z.string({
      required_error: 'Additional point is required',
    }),
    requirementPoint: z.string({
      required_error: 'Requirement point is required',
    }),
    howItWorks: z.string({
      required_error: 'How it works is required',
    }),
    sellingPrice: z.number({
      required_error: 'Selling price is required',
    }),
    serviceFee: z.number({
      required_error: 'Service fee is required',
    }),
    image: z.string().optional(),
    tag: z.array(
      z.string({
        required_error: 'Tag is required',
      }),
    ),
  }),
});

export const ServiceValidation = {
  createServiceZodSchema,
};
