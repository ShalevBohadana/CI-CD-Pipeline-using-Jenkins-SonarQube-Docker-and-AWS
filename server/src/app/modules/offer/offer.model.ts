import { model, Schema } from 'mongoose';
import type { OfferModel } from './offer.interface';
import {
  DynamicFilterInputs,
  OFFER_DISCOUNT_TYPE,
  OFFER_FILTER_TYPES,
  OFFER_STATUS,
  OFFER_TYPE,
  OfferDiscount,
  OfferTag,
  RegularOffer,
  TDynamicFilterCommonPropsNested,
} from './offer.validation';

export const offerTagSchema = new Schema<OfferTag>({
  value: {
    type: Schema.Types.Mixed,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
});

export const DynamicFilterInputsSchema = new Schema<DynamicFilterInputs>({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: Object.values(OFFER_FILTER_TYPES),
    required: true,
  },
  fee: {
    type: Number,
    required: true,
  },
  children: {
    type: [
      new Schema<TDynamicFilterCommonPropsNested>({
        name: {
          type: String,
          required: true,
        },
        fee: {
          type: Number,
          required: true,
        },
        children: [
          new Schema<TDynamicFilterCommonPropsNested>({
            name: { type: String, required: true },
            fee: { type: Number, required: true },
          }),
        ],
      }),
    ],
    required: false,
  },
});

const offerSchema = new Schema<RegularOffer>(
  {
    name: {
      type: String,
      required: true,
    },
    uid: {
      type: String,
      required: true,
      unique: true,
    },
    dynamicFilters: [DynamicFilterInputsSchema],
    sellerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    gameUid: {
      type: String,
      required: true,
    },
    categoryUid: {
      type: String,
      required: true,
    },
    basePrice: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    offerPromo: {
      type: String,
      required: false,
    },
    image: {
      type: String,
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
          required: true,
        },
      }),
      required: false,
    },
    offerType: {
      type: String,
      enum: Object.values(OFFER_TYPE),
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(OFFER_STATUS),
      required: true,
    },
    featuredList: {
      type: [String],
      required: true,
    },
    tags: [offerTagSchema],
    approximateOrderCompletionInMinutes: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

// Define static methods before creating the model
offerSchema.statics.isExisting = async function (
  uid: string,
): Promise<RegularOffer> {
  return this.findOne({ uid });
};

// Create and export the model as a constant
const OfferModelInstance = model<RegularOffer, OfferModel>(
  'Offer',
  offerSchema,
);

// Export without re-declaration
export { OfferModelInstance as OfferModel };
