// stripe.config.ts
import Stripe from 'stripe';

import config from './index';

const stripe = new Stripe(config.stripe.secret_key, {
  apiVersion: '2025-01-27.acacia',
  typescript: true,
  telemetry: false,
  appInfo: {
    name: 'FullBoosts',
    version: '1.0.0',
  },
});

export const STRIPE_CONFIG = {
  CURRENCY: 'usd',
  PAYMENT_METHODS: ['card'] as const,
  MIN_AMOUNT: 0.5,
  MAX_AMOUNT: 999999.99,
};

export default stripe;
