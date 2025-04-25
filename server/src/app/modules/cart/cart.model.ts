import { model, Schema } from 'mongoose';

import { OFFER_TYPE } from '../offer/offer.validation';
import { ICartModel } from './cart.interface';
import { Cart, CartItem, CartPromo } from './cart.validation';

const cartPromoSchema = new Schema<CartPromo>(
  {
    code: { type: String, required: true },
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
  },
  { _id: false },
);
export const cartItemSchema = new Schema<CartItem>(
  {
    seller: {
      type: Schema.Types.ObjectId,
      model: 'User',
      required: true,
      select: { password: 0 },
    },
    offerId: { type: Schema.Types.ObjectId, model: 'Offer', required: true },
    itemType: { type: String, required: true, enum: Object.values(OFFER_TYPE) },
    offerName: { type: String, required: true },
    offerImage: { type: String, required: true },
    itemId: { type: Number, required: true },
    selected: {
      // type: UserSelectedOfferSchema || UserSelectedCurrencyOfferSchema,
      type: Schema.Types.Mixed,
      required: true,
    },
    // selected: { type: SchemaTypes.Mixed, required: true }, // Using Mixed type for dynamic schema
  },
  { _id: false },
);

export const cartSchemaDef = {
  userId: { type: String, required: true },
  items: { type: [cartItemSchema], required: true },
  totalPrice: { type: Number, required: true, default: 0 },
  promo: { type: cartPromoSchema },
};
export const cartSchema = new Schema<Cart>(
  {
    ...cartSchemaDef,
    sessionId: { type: String },
  },
  {
    timestamps: true,
  },
);

// Define pre-save middleware for the Cart model
cartSchema.pre('save', function (next) {
  // Calculate the total price
  this.totalPrice = this.items.reduce(
    (total, item) => total + item.selected.price,
    0,
  );
  next();
});
export const CartModel = model<Cart, ICartModel>('Cart', cartSchema);
