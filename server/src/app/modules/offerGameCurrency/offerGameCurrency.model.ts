import { model, Schema } from 'mongoose';

import { offerTagSchema } from '../offer/offer.model';
import type { TOfferGameCurrencyModel } from './offerGameCurrency.interface';
import {
  DynamicCurrencyOfferItem,
  GAME_CURRENCY_OFFER_STATUS,
  OfferGameCurrency,
} from './offerGameCurrency.validation';

export const DynamicCurrencyOfferItemSchema =
  new Schema<DynamicCurrencyOfferItem>({
    label: { type: String, required: true },
    value: {
      type: String,
      required: true,
    },
  });

const offerGameCurrencySchema = new Schema<OfferGameCurrency>(
  {
    uid: {
      type: String,
      required: true,
    },
    currencyUid: {
      type: String,
      required: true,
    },
    serverUid: {
      type: String,
      required: true,
    },
    sellerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    dynamicItems: [DynamicCurrencyOfferItemSchema],
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    minPurchase: {
      type: Number,
      required: true,
    },
    inStock: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    // discount: {
    //   type: new Schema<OfferDiscount>({
    //     amount: {
    //       type: Number,
    //       required: true,
    //     },
    //     type: {
    //       type: String,
    //       enum: Object.values(OFFER_DISCOUNT_TYPE),
    //       require: true,
    //     },
    //   }),
    // },
    status: {
      type: String,
      enum: Object.values(GAME_CURRENCY_OFFER_STATUS),
      required: true,
    },
    tags: [offerTagSchema],
    approximateOrderCompletionInMinutes: {
      type: Number,
      required: true,
    },
    reviews: {
      type: [Schema.Types.ObjectId],
      ref: 'OrderReview',
      default: [],
    },
  },
  { timestamps: true },
);
offerGameCurrencySchema.statics.isExisting = async function (
  uid: string,
): Promise<OfferGameCurrency | null> {
  const promo = await OfferGameCurrencyModel.findOne({ uid });
  return promo;
};
export const OfferGameCurrencyModel = model<
  OfferGameCurrency,
  TOfferGameCurrencyModel
>('OfferGameCurrency', offerGameCurrencySchema);
