import { Model } from 'mongoose';

import { Pretty } from '../../../interfaces/sharedInterface';
import { RequestWithUser } from '../../../shared/catchAsync';
import { CommonFilters } from '../../helpers/pagination';
import { CreateWallet } from './wallet.validation';

export type UpdateWallet = Pretty<
  Partial<CreateWallet> & {
    _id: string;
  }
>;

export type WalletFilters = Pretty<
  CommonFilters & {
    status?: string;
    userId?: string;
    search?: string;
  }
>;

export interface WalletTransaction {
  type: 'deposit' | 'withdraw' | 'payment';
  amount: number;
  sessionId?: string;
  paymentId?: string;
  paymentStatus?: string;
  isPaid: boolean;
  paidAt?: Date;
  metadata?: {
    withdrawalMethod?: string;
    accountDetails?: string;
    [key: string]: any;
  };
}

export type TWalletModel = Model<CreateWallet> & {
  isExisting(userId: string): Promise<CreateWallet | null>;
};

export interface WalletTransactionRequest {
  amount: number;
  type: WalletTransaction['type'];
  metadata?: WalletTransaction['metadata'];
}

export interface WalletResponse {
  balance: number;
  transactions: WalletTransaction[];
  status: string;
}

export interface WalletTransactionResponse {
  transaction: WalletTransaction;
  newBalance: number;
}
export interface WithdrawRequest extends RequestWithUser {
  body: {
    amount: number;
    withdrawalMethod: string;
    accountDetails: string;
  };
}
