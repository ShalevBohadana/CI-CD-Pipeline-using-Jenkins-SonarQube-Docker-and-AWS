import { model, Schema } from 'mongoose';

import { offerTagSchema } from '../offer/offer.model';
import {
  OFFER_DISCOUNT_TYPE,
  OFFER_STATUS,
  OFFER_TYPE,
  OfferDiscount,
} from '../offer/offer.validation';
import { TGameCurrencyModel } from './gameCurrency.interface';
import {
  DynamicFilterCurrencyInputs,
  GAME_CURRENCY_FILTER_TYPES,
  GameCurrency,
  GameCurrencyServer,
  // GameCurrencyServerItem,
  TDynamicFilterCurrencyCommonPropsNested,
} from './gameCurrency.validation';

export const DynamicFilterCurrencyInputsSchema =
  new Schema<DynamicFilterCurrencyInputs>({
    name: { type: String, required: true },
    type: {
      type: String,
      enum: Object.values(GAME_CURRENCY_FILTER_TYPES),
      required: true,
    },
    children: {
      type: [
        new Schema<TDynamicFilterCurrencyCommonPropsNested>({
          name: {
            type: String,
            required: true,
          },
          children: [
            new Schema<TDynamicFilterCurrencyCommonPropsNested>({
              name: { type: String, required: true },
            }),
          ],
        }),
      ],
    },
  });
// export const gameCurrencyServerItemSchema = new Schema<GameCurrencyServerItem>({
//   title: {
//     type: String,
//     required: true,
//   },
//   server: {
//     type: String,
//     required: true,
//   },
// });
export const gameCurrencyServerSchema = new Schema<GameCurrencyServer>({
  title: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});
const gameCurrencySchema = new Schema<GameCurrency>(
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
    // dynamicFilters: [{ type: Schema.Types.ObjectId, ref: 'OfferFilter' }],
    dynamicFilters: [DynamicFilterCurrencyInputsSchema],
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
      required: true,
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
          require: true,
        },
      }),
    },
    offerType: {
      type: String,
      enum: [OFFER_TYPE.CURRENCY],
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
    servers: {
      type: [gameCurrencyServerSchema],
      required: true,
    },
    tags: [offerTagSchema],
  },
  { timestamps: true },
);
gameCurrencySchema.statics.isExisting = async function (
  uid: string,
): Promise<GameCurrency | null> {
  const result = await GameCurrencyModel.findOne({ uid });
  return result;
};
export const GameCurrencyModel = model<GameCurrency, TGameCurrencyModel>(
  'GameCurrency',
  gameCurrencySchema,
);
