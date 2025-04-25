// wallet.constant.ts
export const WALLET_STATUS = {
  ACTIVATE: 'activate',
  SUSPEND: 'suspend',
} as const;

export const TRANSACTION_TYPES = {
  DEPOSIT: 'deposit',
  WITHDRAW: 'withdraw',
  PAYMENT: 'payment',
} as const;

export const TRANSACTION_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
  CANCELLED: 'cancelled',
} as const;

export const WALLET_LIMITS = {
  MIN_DEPOSIT: 1,
  MAX_DEPOSIT: 10000,
  MIN_WITHDRAW: 10,
  MAX_WITHDRAW: 5000,
} as const;

export const WALLET_SEARCH_FIELDS = ['userId', 'balance'] as const;

export const WALLET_FILTER_FIELDS = ['search', 'status'] as const;
