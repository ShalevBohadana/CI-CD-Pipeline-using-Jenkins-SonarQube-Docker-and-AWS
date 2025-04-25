export interface WithdrawBody {
  amount: number;
  currency: string;
  paymentMethod?: string;
}

export interface WalletIntentBody {
  amount: number;
  currency: string;
  type: 'deposit' | 'withdraw' | 'payment';
}

export interface CreateWallet {
  status: 'activate' | 'suspend';
  balance: number;
  transactions: {
    type: 'ordered' | 'deposit' | 'withdraw' | 'payment';
    amount: number;
    sessionId: string;
    paymentStatus: string;
    isPaid: boolean;
    paymentId?: string;
    paidAt?: Date;
    metadata?: Record<string, any>;
  }[];
  isDemoMode: boolean;
}
