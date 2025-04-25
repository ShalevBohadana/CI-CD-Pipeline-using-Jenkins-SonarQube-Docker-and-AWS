import { Schema, model } from 'mongoose';
import { IWithdraw } from './withdraw.interface';
import { WITHDRAW_STATUS_ENUM } from './withdraw.constant';

const withdrawSchema = new Schema<IWithdraw>(
  {
    userId: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    cardNumber: {
      type: String,
      required: true,
    },
    cardHolderName: {
      type: String,
      required: true,
    },
    cvv: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(WITHDRAW_STATUS_ENUM),
      default: WITHDRAW_STATUS_ENUM.PENDING,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

const WithdrawModel = model<IWithdraw>('Withdraw', withdrawSchema);
export default WithdrawModel;
