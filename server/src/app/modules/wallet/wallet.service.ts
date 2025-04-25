import httpStatus from 'http-status';
import mongoose, { startSession } from 'mongoose';
import Stripe from 'stripe';

import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { useDbTransaction } from '../../helpers/useDbTransaction';
import { NotificationModel } from '../notification/notification.model';
import { WalletModel } from './wallet.model';
import {
  CreateWallet,
  WALLET_STATUS,
  WalletTransaction,
} from './wallet.validation';

const stripe = new Stripe(config.stripe_secret_key as string, {
  apiVersion: '2025-01-27.acacia',
});

// Types
export type WalletStatusType = 'activate' | 'suspend';

// Service Methods
const getWallet = async (payload: {
  userId: string;
  isDemoMode?: boolean;
}): Promise<Partial<CreateWallet>> => {
  const isExisting = await WalletModel.findOne({
    userId: payload.userId,
    isDemoMode: payload.isDemoMode || false,
  });

  if (isExisting) return isExisting;

  const newWallet = await WalletModel.create({
    userId: payload.userId,
    status: WALLET_STATUS.ACTIVATE,
    balance: 0,
    transactions: [],
    isDemoMode: payload.isDemoMode || false,
  });

  return newWallet;
};

const getWalletStatus = async (userId: string, isDemoMode?: boolean) => {
  const wallet = await WalletModel.findOne({
    userId,
    isDemoMode: isDemoMode || false,
  });

  if (!wallet) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Wallet not found');
  }

  return {
    status: wallet.status,
    balance: wallet.balance,
    transactions: wallet.transactions,
  };
};

const updateWalletStatus = async (payload: {
  userId: string;
  status: WalletStatusType;
  isDemoMode?: boolean;
}): Promise<void> => {
  const wallet = await WalletModel.findOne({
    userId: payload.userId,
    isDemoMode: payload.isDemoMode || false,
  });

  if (!wallet) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Wallet not found');
  }

  wallet.status = payload.status;
  await wallet.save();
};

const saveBalanceIntent = async (payload: {
  depositIntentAmount: number;
  userId: string;
  isDemoMode?: boolean;
}): Promise<Partial<CreateWallet>> => {
  const wallet = await WalletModel.findOne({
    userId: payload.userId,
    isDemoMode: payload.isDemoMode || false,
  });

  if (!wallet) {
    const newWallet = await WalletModel.create({
      userId: payload.userId,
      depositIntentAmount: payload.depositIntentAmount,
      status: WALLET_STATUS.ACTIVATE,
      isDemoMode: payload.isDemoMode || false,
    });
    return newWallet;
  }

  if (wallet.status !== WALLET_STATUS.ACTIVATE) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Wallet is not active');
  }

  wallet.depositIntentAmount = payload.depositIntentAmount;
  await wallet.save();
  return wallet;
};

// Demo transaction methods
const createDemoSession = async (payload: {
  userId: string;
  depositIntentAmount: number;
}): Promise<{ clientSecret: string; orderId: string }> => {
  const wallet = await WalletModel.findOne({
    userId: payload.userId,
    isDemoMode: true,
  });

  if (!wallet) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Demo wallet not found');
  }

  if (wallet.status !== WALLET_STATUS.ACTIVATE) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Demo wallet is not active');
  }

  const sessionId = new mongoose.Types.ObjectId().toString();

  const transaction: WalletTransaction = {
    type: 'deposit',
    amount: payload.depositIntentAmount,
    sessionId,
    paymentStatus: 'pending',
    isPaid: false,
    metadata: { isDemo: true },
  };

  wallet.transactions.push(transaction);
  await wallet.save();

  return {
    clientSecret: sessionId,
    orderId: wallet._id.toString(),
  };
};

const verifyDemoPayment = async (payload: {
  sessionId: string;
  userId: string;
}) => {
  const transactionCallback = async () => {
    // Get the session from useDbTransaction
    const session = await startSession();

    const wallet = await WalletModel.findOne({
      userId: payload.userId,
      isDemoMode: true,
      status: WALLET_STATUS.ACTIVATE,
    }).session(session);

    if (!wallet) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Active demo wallet not found');
    }

    const transaction = wallet.transactions.find(
      (item) => item.sessionId === payload.sessionId,
    );

    if (!transaction) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Transaction not found');
    }

    const updatedDocument = await WalletModel.findOneAndUpdate(
      { userId: payload.userId, isDemoMode: true },
      {
        $set: {
          'transactions.$[elem].isPaid': true,
          'transactions.$[elem].paidAt': new Date(),
        },
        $inc: { balance: transaction.amount },
      },
      {
        arrayFilters: [{ 'elem.sessionId': payload.sessionId }],
        new: true,
        session,
      },
    );

    return updatedDocument;
  };

  const errorCallback = async () => {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to verify demo payment',
    );
  };

  return useDbTransaction(transactionCallback, errorCallback);
};

// Real Stripe transaction methods
const stripeBalanceRechargeSession = async (payload: {
  userId: string;
  depositIntentAmount: number;
}): Promise<{ clientSecret: string; orderId: string }> => {
  if (payload.depositIntentAmount < 1) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Minimum deposit amount is $1');
  }

  const wallet = await WalletModel.findOne({
    userId: payload.userId,
    isDemoMode: false,
  });

  if (!wallet) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Wallet not found');
  }

  if (wallet.status !== WALLET_STATUS.ACTIVATE) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Wallet is not active');
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Balance recharge',
            description: 'Add funds to your wallet',
          },
          unit_amount: Math.ceil(payload.depositIntentAmount * 100),
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    submit_type: 'pay',
    metadata: {
      userId: payload.userId,
      type: 'wallet_recharge',
    },
    success_url: `${config.checkout_recharge_success_url}?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: config.checkout_recharge_cancel_url,
  });

  const transaction: WalletTransaction = {
    type: 'deposit',
    amount: payload.depositIntentAmount,
    sessionId: session.id,
    paymentStatus: session.payment_status,
    isPaid: false,
    metadata: {
      type: 'wallet_recharge',
    },
  };

  wallet.transactions.push(transaction);
  await wallet.save();

  return {
    clientSecret: session.url || '',
    orderId: session.id,
  };
};

const stripeVerifyBalanceRecharge = async (payload: {
  sessionId: string;
  userId: string;
}) => {
  const transactionCallback = async () => {
    const session = await startSession();

    const stripeSession = await stripe.checkout.sessions.retrieve(
      payload.sessionId,
    );

    if (!stripeSession || stripeSession.payment_status !== 'paid') {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Payment not completed');
    }

    const wallet = await WalletModel.findOne({
      userId: payload.userId,
      isDemoMode: false,
      status: WALLET_STATUS.ACTIVATE,
    }).session(session);

    if (!wallet) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Active wallet not found');
    }

    const transaction = wallet.transactions.find(
      (item) => item.sessionId === payload.sessionId,
    );

    if (!transaction) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Transaction not found');
    }

    if (transaction.isPaid) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Transaction already processed',
      );
    }

    const updatedDocument = await WalletModel.findOneAndUpdate(
      {
        userId: payload.userId,
        isDemoMode: false,
        'transactions.sessionId': payload.sessionId,
      },
      {
        $set: {
          'transactions.$.paidAt': new Date(),
          'transactions.$.paymentId': stripeSession.payment_intent,
          'transactions.$.paymentStatus': stripeSession.payment_status,
          'transactions.$.isPaid': true,
          depositIntentAmount: 0,
        },
        $inc: { balance: transaction.amount },
      },
      {
        new: true,
        session,
      },
    );

    await NotificationModel.findOneAndUpdate(
      { userId: payload.userId },
      {
        $push: {
          notifications: {
            status: 'unread',
            label: `$${transaction.amount} added to your wallet`,
            url: undefined,
          },
        },
      },
      { upsert: true, new: true, session },
    );

    return updatedDocument;
  };

  const errorCallback = async () => {
    console.error('Failed to verify Stripe payment');
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to process payment verification',
    );
  };

  return useDbTransaction(transactionCallback, errorCallback);
};

// Withdrawal methods
const createWithdrawRequest = async (payload: {
  userId: string;
  amount: number;
  withdrawalMethod: string;
  accountDetails: string;
  isDemoMode?: boolean;
}): Promise<Partial<CreateWallet>> => {
  const wallet = await WalletModel.findOne({
    userId: payload.userId,
    isDemoMode: payload.isDemoMode || false,
    status: WALLET_STATUS.ACTIVATE,
  });

  if (!wallet) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Active wallet not found');
  }

  if (wallet.balance < payload.amount) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Insufficient balance');
  }

  const transaction: WalletTransaction = {
    type: 'withdraw',
    amount: payload.amount,
    sessionId: new mongoose.Types.ObjectId().toString(),
    paymentStatus: payload.isDemoMode ? 'completed' : 'pending',
    isPaid: Boolean(payload.isDemoMode),
    metadata: {
      withdrawalMethod: payload.withdrawalMethod,
      accountDetails: payload.accountDetails,
      isDemo: payload.isDemoMode || false,
    },
  };

  wallet.transactions.push(transaction);
  wallet.balance -= payload.amount;
  await wallet.save();

  await NotificationModel.findOneAndUpdate(
    { userId: payload.userId },
    {
      $push: {
        notifications: {
          status: 'unread',
          label: payload.isDemoMode
            ? `Demo withdrawal of $${payload.amount} processed`
            : `Withdrawal request of $${payload.amount} is being processed`,
          url: undefined,
        },
      },
    },
    { upsert: true, new: true },
  );

  return wallet;
};

const createDemoWithdrawal = async (payload: {
  userId: string;
  amount: number;
  withdrawalMethod: string;
  accountDetails: string;
}): Promise<Partial<CreateWallet>> => {
  const wallet = await WalletModel.findOne({
    userId: payload.userId,
    isDemoMode: true,
    status: WALLET_STATUS.ACTIVATE,
  });

  if (!wallet) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Active demo wallet not found');
  }

  if (wallet.balance < payload.amount) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Insufficient balance');
  }

  const transaction: WalletTransaction = {
    type: 'withdraw',
    amount: payload.amount,
    sessionId: new mongoose.Types.ObjectId().toString(),
    paymentStatus: 'completed',
    isPaid: true,
    metadata: {
      withdrawalMethod: payload.withdrawalMethod,
      accountDetails: payload.accountDetails,
      isDemo: true,
    },
  };

  wallet.transactions.push(transaction);
  wallet.balance -= payload.amount;
  await wallet.save();

  await NotificationModel.findOneAndUpdate(
    { userId: payload.userId },
    {
      $push: {
        notifications: {
          status: 'unread',
          label: `Demo withdrawal of $${payload.amount} processed`,
          url: undefined,
        },
      },
    },
    { upsert: true, new: true },
  );

  return wallet;
};

// Export wallet service
export const walletService = {
  getWallet,
  getWalletStatus,
  updateWalletStatus,
  saveBalanceIntent,
  stripeBalanceRechargeSession,
  stripeVerifyPayment: stripeVerifyBalanceRecharge,
  createWithdrawRequest,
  createDemoWithdrawal,
  // Demo methods
  createDemoSession,
  verifyDemoPayment,
};
