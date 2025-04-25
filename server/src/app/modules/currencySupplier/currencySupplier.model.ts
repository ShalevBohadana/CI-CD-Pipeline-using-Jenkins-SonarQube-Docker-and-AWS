import { model, Schema } from 'mongoose';

import { Role } from '../../../enums/role';
import { BoosterStatus } from '../booster/booster.constant';
import { TCurrencySupplierModel } from './currencySupplier.interface';
import { BecomeCurrencySupplier } from './currencySupplier.validation';

const CurrencySupplierSchema = new Schema<BecomeCurrencySupplier>(
  {
    email: {
      type: String,
    },
    discordTag: {
      type: String,
      required: true,
      unique: true,
    },
    isApproved: {
      type: Boolean,
      default: false,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    appliedFor: {
      type: String,
      required: true,
      default: Role.CURRENCY_SUPPLIER,
    },
    selectedGames: {
      type: [Schema.Types.ObjectId],
      ref: 'Game',
      required: true,
    },
    // user: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'User',
    //   required: true,
    // },
    status: {
      type: String,
      enum: Object.values(BoosterStatus),
      default: BoosterStatus.PENDING,
    },
    phoneAreaCode: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const CurrencySupplierModel = model<
  BecomeCurrencySupplier,
  TCurrencySupplierModel
>('CurrencySupplier', CurrencySupplierSchema);
