/* eslint-disable @typescript-eslint/no-explicit-any */
import { model, Schema } from 'mongoose';
import { cartItemSchema, cartSchemaDef } from '../cart/cart.model';
import { IOrder, OrderModelExtended } from './order.interface';

export const StripePaymentStatusArray = [
 'no_payment_required',
 'paid', 
 'unpaid',
] as const;

export type StripePaymentStatus = (typeof StripePaymentStatusArray)[number];

export const StripeSessionStatusArray = [
 'complete',
 'expired',
 'open',
] as const;

export type StripeSessionStatus = (typeof StripeSessionStatusArray)[number];

export const ORDER_STATUS = {
 PENDING: 'pending',
 APPROVED: 'approved', 
 IN_PROGRESS: 'in_progress',
 COMPLETED: 'completed',
 CANCELLED: 'cancelled'
} as const;

const { items, ...cartSchemaForOrder } = cartSchemaDef;

const orderSchema = new Schema<IOrder>(
 {
   ...cartSchemaForOrder,
   item: {
     type: cartItemSchema as any,
     required: true,
   },
   isApproved: {
     type: Boolean,
     required: true,
     default: false,
   },
   payment: {
     type: Schema.Types.Mixed,
     ref: 'Payment',
   },
   inviteLink: {
     type: String,
     validate: {
       validator(value: string) {
         const discordInviteRegex = /^https:\/\/discord\.gg\/[a-zA-Z0-9]+$/;
         return discordInviteRegex.test(value);
       },
       message: (props: any) =>
         `${props.value} is not a valid Discord invite URL!`,
     },
   },
   status: {
     type: String,
     enum: Object.values(ORDER_STATUS),
     default: ORDER_STATUS.PENDING,
   },
   buyer: {
     type: Schema.Types.ObjectId,
     ref: 'User',
     required: true,
   },
   partner: {
     type: Schema.Types.ObjectId,
     ref: 'User',
   },
   assignedBooster: {
     type: String,
     required: false,
   },
   isPaymentConfirmed: {
     type: Boolean,
     default: false,
   },
   isConfirmedByClient: {
     type: Boolean,
     default: false,
   },
   isConfirmedByPartner: {
     type: Boolean,
     default: false,
   },
   isChannelCreated: {
     type: Boolean,
     default: false,
   },
   inviteUrl: {
     type: String,
     default: undefined,
   },
   userId: {
     type: Schema.Types.ObjectId,
     ref: 'User',
     required: true
   },
   totalPrice: {
     type: Number,
     required: true
   },
   paymentId: {
     type: String,
     required: false
   },
   paymeId: {
     type: String,
     required: false  
   },
   sessionId: {
     type: String,
     required: false
   },
   channelId: {
     type: String,
     required: false
   },
   channelInviteUrl: {
     type: String,
     required: false
   }
 },
 {
   timestamps: true,
 },
);

// Add static methods
orderSchema.statics.findByBuyerId = function(buyerId: string) {
 return this.find({ buyer: buyerId });
};

orderSchema.statics.findByStatus = function(status: string) {
 return this.find({ status });
};

orderSchema.statics.findByPartner = function(partnerId: string) {
 return this.find({ partner: partnerId });
};

console.log('items', items);

export const OrderModel = model<IOrder, OrderModelExtended>(
 'Order',
 orderSchema,
);