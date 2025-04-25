import { Model } from 'mongoose';
import { CommonFilters } from '../../helpers/pagination';
import { WITHDRAW_STATUS_ENUM } from './withdraw.constant';

export interface IWithdraw {
  userId: string;
  amount: number;
  cardNumber: string;
  cardHolderName: string;
  cvv: string;
  status: WITHDRAW_STATUS_ENUM;
}

export interface IWithdrawFilters extends CommonFilters {
  searchTerm?: string;
  userId?: string;
  status?: WITHDRAW_STATUS_ENUM;
}

export type WithdrawModel = Model<IWithdraw>;
