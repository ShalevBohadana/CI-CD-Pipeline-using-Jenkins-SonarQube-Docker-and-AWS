import httpStatus from 'http-status';

import ApiError from '../../../errors/ApiError';
import { IGenericDataWithMeta } from '../../../interfaces/sharedInterface';
import {
  getPaginatedCondition,
  getPaginatedData,
  PaginationOptions,
} from '../../helpers/pagination';
import UserModel from '../user/user.model';
import { WalletModel } from '../wallet/wallet.model';
import { WITHDRAW_SEARCH_FIELDS } from './withdraw.const';
import { IWithdraw, IWithdrawFilters } from './withdraw.interface';
import WithdrawModel from './withdraw.model';
import { UserService } from '../user/user.service';

const createWithdrawDB = async (withdrawData: IWithdraw) => {
  const user = await UserModel.findOne({ userId: withdrawData.userId });

  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User not found');
  }
  const wallet = await WalletModel.findOne({ userId: user.userId });
  if (!wallet) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Balance not found');
  }
  const newBalance = wallet.balance - withdrawData.amount;
  await WalletModel.updateOne({ userId: user.userId }, { balance: newBalance });

  const newWithdraw = await WithdrawModel.create(withdrawData);
  await UserService.addHistoryEntry(user.userId, {
    action: 'WITHDRAW_CREATED',
    details: {
      withdrawId: newWithdraw.id,
      amount: newWithdraw.amount,
    },
  });
  return newWithdraw;
};

const getAllWithdrawDB = async (
  filters: IWithdrawFilters,
  paginationOptions: PaginationOptions,
): Promise<IGenericDataWithMeta<IWithdraw[]>> => {
  const { whereConditions, sortConditions, skip, limit, page } =
    await getPaginatedCondition(
      filters,
      paginationOptions,
      WITHDRAW_SEARCH_FIELDS,
    );

  const result = await WithdrawModel.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await WithdrawModel.countDocuments(whereConditions);

  return getPaginatedData(page, limit, total, result);
};

const getSingleWithdrawByUserDB = async (
  userId: string,
): Promise<IWithdraw | null> => {
  const result = await WithdrawModel.findOne({ userId });
  return result;
};

const getSingleWithdrawByIdDB = async (id: string): Promise<IWithdraw | null> => {
  const result = await WithdrawModel.findById(id);
  return result;
};

const updateWithdrawDB = async (
  id: string,
  withdrawData: Partial<IWithdraw>,
): Promise<IWithdraw | null> => {
  const withdraw = await WithdrawModel.findById(id);

  if (!withdraw) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Withdraw not found');
  }

  const result = await WithdrawModel.findByIdAndUpdate(id, withdrawData, {
    new: true,
  });

  if (result) {
    await UserService.addHistoryEntry(withdraw.userId, {
      action: 'WITHDRAW_UPDATED',
      details: {
        withdrawId: id,
        amount: result.amount,
        status: result.status,
        changes: withdrawData,
      },
    });
  }

  return result;
};

const deleteWithdrawDB = async (id: string): Promise<IWithdraw | null> => {
  const withdraw = await WithdrawModel.findById(id);

  if (!withdraw) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Withdraw not found');
  }

  const result = await WithdrawModel.findByIdAndDelete(id);

  if (result) {
    await UserService.addHistoryEntry(withdraw.userId, {
      action: 'WITHDRAW_DELETED',
      details: {
        withdrawId: id,
        amount: result.amount,
        status: result.status,
      },
    });
  }

  return result;
};

export const WithdrawService = {
  createWithdrawDB,
  getAllWithdrawDB,
  getSingleWithdrawByUserDB,
  getSingleWithdrawByIdDB,
  updateWithdrawDB,
  deleteWithdrawDB,
};
