import { ObjectId } from 'mongoose';
import Stripe from 'stripe';
import { z } from 'zod';

import { Pretty } from '../../../interfaces/sharedInterface';
import { CartItem, CartItemSchema } from '../cart/cart.validation';

export const ORDER_STATUS = {
  PLACED: 'placed',
  PROCESSING: 'processing',
  CONFIRMED: 'confirmed',
  COMPLETED: 'completed',
  PENDING: 'pending',
  CENCELLED: 'cencelled',
} as const;

export type OrderStatus = (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];

export const stripePaymentSchemaZ = z.object({
  paymentId: z.custom<Stripe.PaymentIntent | string | null>(),
  sessionId: z.string(),
  paymentStatus: z.custom<Stripe.Checkout.Session.PaymentStatus>(),
});
const createOrderSchema = z.object({
  item: z.array(CartItemSchema),
  // ...stripePaymentSchemaZ.shape,
  userId: z.string(),
  buyer: z.custom<ObjectId>(),
  // isPaid: z.boolean().default(false),
  // sessionStatus: z.custom<Stripe.Checkout.Session.Status>().or(z.null()),
  // paidAt: z.date().optional(),
  totalPrice: z.number(),
  payment: z.custom<ObjectId>(),
  // isApproved: z.boolean().default(false),
  isPaymentConfirmed: z.boolean().default(false),
  inviteLink: z.string().url().optional().or(z.literal('')),
});

export type Order = Pretty<
  z.infer<typeof createOrderSchema> & {
    buyer: ObjectId;
    status: OrderStatus;
    item: CartItem;
    isChannelCreated: boolean;
    isConfirmedByClient: boolean;
    isApproved: boolean;
    isConfirmedByPartner: boolean;
    inviteUrl: string;
    isPaid: boolean;
    sessionId: string;
    paymentId: string;
    paymentStatus: Stripe.Checkout.Session.PaymentStatus;
    paidAt: Date;
    sessionStatus: Stripe.Checkout.Session.Status;
    userId: ObjectId;
    partner: ObjectId;
  }
>;

const createOrderZodSchema = z.object({
  body: createOrderSchema,
});

const assignBoosterZodSchema = z.object({
  params: z.object({
    orderId: z.string({
      required_error: 'Order ID is required',
    }),
  }),
  body: z.object({
    boosterId: z.string({
      required_error: 'Booster ID is required',
    }),
  }),
});

export const OrderValidation = {
  createOrderZodSchema,
  assignBoosterZodSchema,
};
