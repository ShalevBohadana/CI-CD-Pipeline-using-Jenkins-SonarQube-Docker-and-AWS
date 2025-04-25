import { model, Schema } from 'mongoose';

import {
  StripePaymentStatusArray,
  StripeSessionStatusArray,
} from '../order/order.model';
import { PaymentModelExtended } from './payment.interface';
import { Payment } from './payment.validation';

const PaymentSchema = new Schema<Payment>(
  {
    sessionStatus: {
      type: String,
      enum: StripeSessionStatusArray,
      default: 'open',
    },
    sessionId: {
      type: String,
      required: true,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
      default: undefined,
    },
    paymentId: {
      type: String || null,
      default: null,
    },
    paymentStatus: {
      type: String,
      enum: StripePaymentStatusArray,
      default: 'unpaid',
      required: true,
    },
    orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
  },
  {
    timestamps: true,
  },
);

// PaymentSchema.pre('save', function (next) {
//   next();
// });
export const PaymentModel = model<Payment, PaymentModelExtended>(
  'Payment',
  PaymentSchema,
);
