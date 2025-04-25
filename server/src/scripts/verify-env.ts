import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(process.cwd(), '.env'),
});

const requiredEnvVars = [
  'ACCESS_TOKEN',
  'ACCESS_TOKEN_EXPIRES_IN',
  'REFRESH_TOKEN',
  'REFRESH_TOKEN_EXPIRES_IN',
  'DATABASE_CONNECT_STRING',
  'EMAIL_VERIFY_TOKEN',
  'BCRYPT_SALT_ROUND',
];

const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.error('❌ Missing required environment variables:');
  missingVars.forEach(varName => console.error(`   - ${varName}`));
  process.exit(1);
} else {
  console.log('✅ All required environment variables are set');
  
  // Validate token expiration format
  const timeRegex = /^\d+[dhms]$/;
  const tokenExpiryVars = ['ACCESS_TOKEN_EXPIRES_IN', 'REFRESH_TOKEN_EXPIRES_IN'];
  
  const invalidExpiryVars = tokenExpiryVars.filter(
    varName => !timeRegex.test(process.env[varName] || '')
  );
  
  if (invalidExpiryVars.length > 0) {
    console.error('❌ Invalid token expiration format:');
    invalidExpiryVars.forEach(varName => 
      console.error(`   - ${varName}: ${process.env[varName]} (should be like "1h", "30m", "7d")`));
    process.exit(1);
  } else {
    console.log('✅ Token expiration formats are valid');
  }
}
