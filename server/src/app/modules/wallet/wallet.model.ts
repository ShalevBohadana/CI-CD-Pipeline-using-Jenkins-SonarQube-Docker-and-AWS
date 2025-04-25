import { model, Schema } from 'mongoose';

import { TWalletModel } from './wallet.interface';
import { CreateWallet, WALLET_STATUS } from './wallet.validation';

const walletSchema = new Schema<CreateWallet>(
  {
    userId: {
      type: String,
      required: true,
    },
    isDemoMode: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: Object.values(WALLET_STATUS),
      default: WALLET_STATUS.ACTIVATE,
      required: true,
    },
    balance: {
      type: Number,
      required: true,
      default: 0,
    },
    depositIntentAmount: {
      type: Number,
      default: 0,
    },
    transactions: [
      {
        type: {
          type: String,
          enum: ['deposit', 'withdraw', 'ordered', 'payment'],
          required: true,
        },
        amount: {
          type: Number,
          required: true,
        },
        sessionId: String,
        paymentId: String,
        paymentStatus: String,
        isPaid: {
          type: Boolean,
          default: false,
        },
        paidAt: Date,
        metadata: Schema.Types.Mixed,
      },
    ],
  },
  { timestamps: true },
);

// Compound unique index
walletSchema.index({ userId: 1, isDemoMode: 1 }, { unique: true });

walletSchema.statics.isExisting = async function (
  userId: string,
  isDemoMode = false,
): Promise<CreateWallet | null> {
  return await this.findOne({ userId, isDemoMode });
};

export const WalletModel = model<CreateWallet, TWalletModel>(
  'Wallet',
  walletSchema,
);
