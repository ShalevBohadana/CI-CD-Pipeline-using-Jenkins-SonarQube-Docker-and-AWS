import dotenv from 'dotenv';
import path from 'path';

/* This code is using the `dotenv` package to load environment variables from a `.env` file located in
the root directory of the project. process.cwd() means the root directory */
dotenv.config({
  path: path.join(process.cwd(), '.env'),
});

// Validate required environment variables
const requiredEnvVars = [
  'ACCESS_TOKEN',
  'REFRESH_TOKEN',
  'DATABASE_CONNECT_STRING',
] as const;

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

export const EXTENDED_BASE_PATH = '/api/v1';

export const NODE_ENV = {
  PROD: 'production',
  DEV: 'development',
} as const;

export const IS_MODE_PROD = process.env.NODE_ENV === NODE_ENV.PROD;
export const IS_MODE_DEV = process.env.NODE_ENV === NODE_ENV.DEV;

export const SITE_INFO = {
  API: `${
    IS_MODE_PROD ? 'https://api.fullboosts.com' : 'http://localhost:8000'
  }${EXTENDED_BASE_PATH}`,
  CLIENT: IS_MODE_PROD ? 'https://fullboosts.com' : 'https://localhost:4000',
} as const;
console.log(SITE_INFO);
type StringValue = `${number}d` | `${number}h` | `${number}m` | `${number}s`;
console.log('Current NODE_ENV:', process.env.NODE_ENV);
console.log('NODE_ENV.PROD:', NODE_ENV.PROD);
console.log('NODE_ENV.DEV:', NODE_ENV.DEV);
// Helper function to safely get environment variables
const getEnvVar = (name: string, required = false): string => {
  const value = process.env[name];
  if (required && !value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value || '';
};

// Helper to safely get boolean environment variables
const getBooleanEnvVar = (name: string, defaultValue = false): boolean => {
  const value = process.env[name];
  if (!value) return defaultValue;
  return value.toLowerCase() === 'true';
};

export default {
  env: IS_MODE_PROD ? NODE_ENV.PROD : NODE_ENV.DEV,
  port: Number(8000),
  database_string: getEnvVar('DATABASE_CONNECT_STRING', true),
  access_token: getEnvVar('ACCESS_TOKEN', true),
  refresh_token: getEnvVar('REFRESH_TOKEN', true),
  jwt_expires_in: getEnvVar('JWT_EXPIRES_IN') || ('1h' as StringValue),
  access_token_expires_in:
    getEnvVar('ACCESS_TOKEN_EXPIRES_IN') || ('1h' as StringValue),
  refresh_token_expires_in:
    getEnvVar('REFRESH_TOKEN_EXPIRES_IN') || ('7d' as StringValue),
  bcrypt_salt_round: Number(getEnvVar('BCRYPT_SALT_ROUND')) || 10,

  // Optional configurations
  email_verify_token: getEnvVar('EMAIL_VERIFY_TOKEN'),
  stripe_secret_key: getEnvVar('STRIPE_SECRET_KEY'),
  stripe: {
    secret_key: getEnvVar('STRIPE_SECRET_KEY'),
    mode: IS_MODE_DEV ? 'test' : 'live',
    api_version: '2023-10-16',
  },
  discord_server_guild_id: getEnvVar('DISCORD_SERVER_GUILD_ID'),
  discord_oauth_client_id: getEnvVar('DISCORD_OAUTH_CLIENT_ID'),
  discord_oauth_secret: getEnvVar('DISCORD_OAUTH_SECRET'),
  discord_auth_grand_type: getEnvVar('DISCORD_AUTH_GRAND_TYPE'),
  discord_redirect_uri: `${SITE_INFO.CLIENT}/auth/discord`,
  discord_exchange_base_uri: getEnvVar('DISCORD_EXCHANGE_BASE_URI'),
  discord_bot_token: getEnvVar('DISCORD_BOT_TOKEN'),
  currency_secret: getEnvVar('CURRENCY_SECRET'),
  image_url: `${SITE_INFO.API}/images`,
  checkout_success_url: `${SITE_INFO.CLIENT}/checkout/success`,
  checkout_cancel_url: `${SITE_INFO.CLIENT}/checkout/cancel`,
  checkout_recharge_success_url: `${SITE_INFO.CLIENT}/checkout/balance-recharge/success`,
  checkout_recharge_cancel_url: `${SITE_INFO.CLIENT}/checkout/balance-recharge`,

  // Optional email configuration
  mailer: {
    host: getEnvVar('SMTP_HOST'),
    port: Number(getEnvVar('SMTP_PORT')) || 587,
    secure: getBooleanEnvVar('SMTP_SECURE'),
    auth: {
      user: getEnvVar('SMTP_USER'),
      pass: getEnvVar('SMTP_PASS'),
    },
  },
  email: {
    from: getEnvVar('EMAIL_FROM') || 'noreply@fullboosts.com',
    support: getEnvVar('EMAIL_SUPPORT') || 'support@fullboosts.com',
  },

  // Optional Intercom configuration
  intercom: {
    accessToken: getEnvVar('INTERCOM_ACCESS_TOKEN'),
    appId: getEnvVar('INTERCOM_APP_ID'),
    adminId: getEnvVar('INTERCOM_ADMIN_ID'),
  },
} as const;
