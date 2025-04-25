import { z } from 'zod';
import { ObjectId } from 'mongodb';
import Stripe from 'stripe';
import { stripePaymentSchemaZ } from '../order/order.validation';

// Base schemas
const cartItemSchema = z.object({
  itemId: z.number(),
  itemType: z.string(),
  offerId: z
    .object({
      _id: z.string(),
    })
    .or(z.string()),
  offerName: z.string(),
  offerImage: z.string(),
  selected: z
    .object({
      price: z.number().min(0),
    })
    .catchall(z.any()),
  seller: z.string().or(z.object({ _id: z.string() })),
});

// Create session validation
const createSession = z.object({
  body: z.object({
    items: z.array(cartItemSchema).optional(),
  }),
  query: z.object({}).optional(),
  params: z.object({}).optional(),
  cookies: z.object({}).optional(),
});

// Verify payment validation
const verifyPayment = z.object({
  body: z.object({}).optional(),
  query: z.object({}).optional(),
  params: z.object({
    id: z.string({
      required_error: 'Session ID is required',
    }),
  }),
  cookies: z.object({}).optional(),
});

// Full payment schema (for database)
const paymentSchema = z.object({
  ...stripePaymentSchemaZ.shape,
  sessionStatus: z.custom<Stripe.Checkout.Session.Status>().or(z.null()),
  isPaid: z.boolean().default(false),
  paidAt: z.date().optional(),
  orders: z.array(z.custom<ObjectId>()),
});

// Response schemas
const paymentResponseSchema = z.object({
  sessionId: z.string(),
  clientSecret: z.string().nullable(),
  amount: z.number(),
});

const verifyPaymentResponseSchema = z.object({
  sessionId: z.string(),
  paymentId: z.string(),
  paymentStatus: z.custom<Stripe.Checkout.Session.PaymentStatus>(),
  ordersCreated: z.boolean().optional(),
});

export const paymentValidation = {
  createSession,
  verifyPayment,
  schemas: {
    payment: paymentSchema,
    response: {
      payment: paymentResponseSchema,
      verify: verifyPaymentResponseSchema,
    },
  },
};

// Types
export type Payment = z.infer<typeof paymentSchema>;
export type PaymentResponse = z.infer<typeof paymentResponseSchema>;
export type VerifyPaymentResponse = z.infer<typeof verifyPaymentResponseSchema>;
