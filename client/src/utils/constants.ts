export const ACCEPTED_IMAGE_FILE_TYPES = ['jpg', 'jpeg', 'png', 'webp'] as const;
export const getAcceptedImageTypes = (): string[] => {
  return [...ACCEPTED_IMAGE_FILE_TYPES];
};
// utils/constants.ts
export const TRANSACTION_LIMITS = {
  MIN_WITHDRAWAL: 10, // מינימום למשיכה בדולרים
  MAX_WITHDRAWAL: 10000, // מקסימום למשיכה בדולרים
  MIN_DEPOSIT: 10, // מינימום לפיקדון בדולרים
  MAX_DEPOSIT: 10000, // מקסימום לפיקדון בדולרים
} as const;

export const CARD_VALIDATION = {
  // תבנית לשם בעל הכרטיס (אותיות ורווחים בלבד)
  HOLDER_PATTERN: /^[A-Za-z\s]+$/,

  // תבנית למספר כרטיס (16 ספרות, אופציונלי עם רווחים)
  NUMBER_PATTERN: /^(\d{4}\s?){4}$/,

  // תבנית ל-CVV (3-4 ספרות)
  CVV_PATTERN: /^[0-9]{3,4}$/,

  // אורך מקסימלי למספר כרטיס
  MAX_LENGTH: 19, // 16 ספרות + 3 רווחים

  // אורך מקסימלי ל-CVV
  MAX_CVV_LENGTH: 4,
} as const;
// utils/constants.ts
export const DISCORD_CODE_PREFIX = 'discord';
// אופציונלי: הוספת קבועים נוספים לפי הצורך
export const WITHDRAWAL_METHODS = {
  CARD: 'card',
  BANK_TRANSFER: 'bank_transfer',
  PAYPAL: 'paypal',
} as const;

// אופציונלי: הוספת סטטוסים
export const WITHDRAWAL_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
  CANCELLED: 'cancelled',
} as const;

// אופציונלי: הוספת הודעות שגיאה
export const ERROR_MESSAGES = {
  INVALID_AMOUNT: 'Invalid withdrawal amount',
  INSUFFICIENT_FUNDS: 'Insufficient funds',
  INVALID_CARD: 'Invalid card details',
  GENERAL_ERROR: 'An error occurred. Please try again later',
} as const;
