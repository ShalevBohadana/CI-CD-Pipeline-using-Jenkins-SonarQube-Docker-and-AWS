import { z } from 'zod';

const createUserZodSchema = z.object({
  body: z.object({
    name: z
      .object({
        firstName: z.string().min(2).max(50).optional(),
        lastName: z.string().min(2).max(50).optional(),
      })
      .optional(),
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email(),
    userName: z.string().optional(),
    address: z
      .object({
        addressLine: z.string(),
        city: z.string(),
        state: z.string(),
        country: z.string(),
        zipCode: z.string(),
      })
      .optional(),
    password: z.string().optional(),
    contactNumber: z.string().optional(),
    isVerified: z.boolean().optional(),
    profilePicture: z.string().optional(),
    shippingAddress: z
      .object({
        addressLine: z.string(),
        city: z.string(),
        state: z.string(),
        country: z.string(),
        zipCode: z.string(),
      })
      .optional(),
  }),
});

const updateUserZodSchema = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string().optional(),
      lastName: z.string().optional(),
    }).optional(),
    email: z.string().email().optional(),
    password: z.string().optional(),
    role: z.string().optional(),
    contactNumber: z.string().optional(),
    address: z.object({
      street: z.string().optional(),
      city: z.string().optional(),
      country: z.string().optional(),
    }).optional(),
    shippingAddress: z.object({
      street: z.string().optional(),
      city: z.string().optional(),
      country: z.string().optional(),
    }).optional(),
  }),
});

export const UserValidation = {
  createUserZodSchema,
  updateUserZodSchema,
};
