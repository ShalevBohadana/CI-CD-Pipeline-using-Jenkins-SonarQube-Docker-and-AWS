import { z } from 'zod';

export const WALLET_STATUS = {
  ACTIVATE: 'activate',
  SUSPEND: 'suspend',
} as const;

// Base transaction schema
const transactionSchemaZ = z.object({
  type: z.enum(['deposit', 'withdraw', 'ordered', 'payment']),
  amount: z.number().min(1, 'Minimum amount is $1'),
  sessionId: z.string(),
  paymentId: z.string().optional(),
  paymentStatus: z.string(),
  isPaid: z.boolean().default(false),
  paidAt: z.date().optional(),
  metadata: z.record(z.any()).optional(), // Changed to z.any() to allow more flexible metadata
});

export type WalletTransaction = z.infer<typeof transactionSchemaZ>;

// Base wallet schema
const createWalletZ = z.object({
  userId: z.optional(z.string()),
  status: z.nativeEnum(WALLET_STATUS),
  balance: z.number().min(0).default(0),
  depositIntentAmount: z.number().min(1).optional(),
  transactions: z.array(transactionSchemaZ).default([]),
  isDemoMode: z.boolean().optional().default(false), // Add isDemoMode field
});

export type CreateWallet = z.infer<typeof createWalletZ>;

// Request validation schemas
const createWalletZodSchema = z.object({
  body: createWalletZ,
});

const withdrawalRequestSchema = z.object({
  body: z.object({
    amount: z.number().min(1, 'Minimum withdrawal amount is $1'),
    withdrawalMethod: z.string(),
    accountDetails: z.string(),
    isDemoMode: z.boolean().optional().default(false), // Add isDemoMode to withdrawal request
  }),
});

// Recharge request schema
const rechargeRequestSchema = z.object({
  body: z.object({
    depositIntentAmount: z.number().min(1, 'Minimum deposit amount is $1'),
    isDemoMode: z.boolean().optional().default(false), // Add isDemoMode to recharge request
  }),
});

// Partial update schema
const updateWalletZodSchema = createWalletZ.partial();

// Session verification schema
const verifySessionSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
  query: z.object({
    isDemoMode: z.boolean().optional().default(false),
  }),
});

export const walletValidation = {
  createWalletZodSchema,
  updateWalletZodSchema,
  createWithdrawalRequestSchema: withdrawalRequestSchema,
  createRechargeRequestSchema: rechargeRequestSchema,
  verifySessionSchema,
};
