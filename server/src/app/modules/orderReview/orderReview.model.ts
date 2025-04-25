import { model, Schema } from 'mongoose';

import { OFFER_TYPE } from '../offer/offer.validation';
import { OrderReviewModelExtended } from './orderReview.interface';
import { OrderReview } from './orderReview.validation';

const orderReviewSchema = new Schema<OrderReview>(
  {
    order: {
      type: Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
    },
    reviewer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    offerRegular: {
      type: Schema.Types.ObjectId,
      ref: 'Offer',
    },
    offerCurrency: {
      type: Schema.Types.ObjectId,
      ref: 'OfferGameCurrency',
    },
    itemType: {
      type: String,
      enum: Object.values(OFFER_TYPE),
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    review: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  },
);

export const OrderReviewModel = model<OrderReview, OrderReviewModelExtended>(
  'OrderReview',
  orderReviewSchema,
);

export const SellerReviewModel = model<OrderReview, OrderReviewModelExtended>(
  'ClientReview',
  orderReviewSchema,
);
