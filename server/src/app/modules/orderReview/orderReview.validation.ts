import { ObjectId } from 'mongoose';
import { z } from 'zod';

import { Pretty } from '../../../interfaces/sharedInterface';
import { OFFER_TYPE } from '../offer/offer.validation';

const createOrderReviewSchema = z.object({
  // Required foreign key references
  order: z.custom<ObjectId>(), // Reference to the order
  reviewer: z.custom<ObjectId>(), // Reference to the reviewer

  // Optional foreign key references
  offerRegular: z.custom<ObjectId>().optional(), // Regular offer reference
  offerCurrency: z.custom<ObjectId>().optional(), // Currency offer reference

  // Required fields
  itemType: z.nativeEnum(OFFER_TYPE), // Type of offer (from enum)
  rating: z.number().min(1).max(5), // Rating between 1-5

  // Optional field with default
  review: z.coerce.string().optional().or(z.literal('')).default(''), // Text review
});

const updateOrderReviewSchema = z.object({
  // Optional foreign key references
  offerRegular: z.custom<ObjectId>().optional(), // Regular offer reference
  offerCurrency: z.custom<ObjectId>().optional(), // Currency offer reference

  // Optional fields
  itemType: z.nativeEnum(OFFER_TYPE).optional(), // Type of offer (from enum)
  rating: z.number().min(1).max(5).optional(), // Rating between 1-5

  // Optional field with default
  review: z.coerce.string().optional().or(z.literal('')).default(''), // Text review
});

export type OrderReview = Pretty<z.infer<typeof createOrderReviewSchema>>;

const createOrderReviewZodSchema = z.object({
  body: createOrderReviewSchema,
});

const updateOrderReviewZodSchema = z.object({
  body: updateOrderReviewSchema,
});

export const OrderReviewValidation = {
  createOrderReviewZodSchema,
  updateOrderReviewZodSchema,
};
