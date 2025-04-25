import { model, Schema } from 'mongoose';

import { OFFER_DISCOUNT_TYPE, OfferDiscount } from '../offer/offer.validation';
import { TPromoModel } from './promo.interface';
import { CreatePromo, PROMO_STATUS } from './promo.validation';

const promoSchema = new Schema<CreatePromo>(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    // usageCount: {
    //   type: Number,
    //   required: false,
    // },

    status: {
      type: String,
      enum: Object.values(PROMO_STATUS),
      required: true,
    },
    discount: {
      type: new Schema<OfferDiscount>({
        amount: {
          type: Number,
          required: true,
        },
        type: {
          type: String,
          enum: Object.values(OFFER_DISCOUNT_TYPE),
          require: true,
        },
      }),
    },
  },
  { timestamps: true },
);

promoSchema.statics.isExistingPromo = async function (
  code: string,
): Promise<CreatePromo | null> {
  const promo = PromoModel.findOne({ title: code });
  return promo;
};

export const PromoModel = model<CreatePromo, TPromoModel>('Promo', promoSchema);
