import { model, Schema } from 'mongoose';

import { Role } from '../../../enums/role';
import { BoosterStatus } from './booster.constant';
import { TBoosterModel } from './booster.interface';
import { BecomeBooster } from './booster.validation';

const BoosterSchema = new Schema<BecomeBooster>(
  {
    email: {
      type: String,
    },
    discordTag: {
      type: String,
      required: true,
      unique: true,
    },
    telegramUsername: {
      type: String,
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
      default: Role.BOOSTER,
    },
    hoursCommitment: {
      type: String,
      required: true,
    },
    selectedGames: {
      type: [Schema.Types.ObjectId],
      ref: 'Game',
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(BoosterStatus),
      default: BoosterStatus.PENDING,
    },
  },
  { timestamps: true },
);

export const BoosterModel = model<BecomeBooster, TBoosterModel>(
  'Booster',
  BoosterSchema,
);
