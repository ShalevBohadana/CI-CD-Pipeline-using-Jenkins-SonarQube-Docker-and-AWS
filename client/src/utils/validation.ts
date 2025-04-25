// validation.ts
import * as yup from 'yup';
import { CARD_VALIDATION, TRANSACTION_LIMITS } from './constants';

// Luhn algorithm for card number validation
const validateLuhn = (value: string) => {
  let sum = 0;
  for (let i = 0; i < value.length; i++) {
    let intVal = parseInt(value.substr(i, 1));
    if (i % 2 === 0) {
      intVal *= 2;
      if (intVal > 9) {
        intVal = 1 + (intVal % 10);
      }
    }
    sum += intVal;
  }
  return sum % 10 === 0;
};

// Create validation schema based on mode
export const createValidationSchema = (isDemoMode: boolean) => {
  // Base schema is same for both modes
  const baseSchema = {
    method: yup.string().required('Please select a payment method'),
    amount: yup
      .number()
      .required('Please enter amount')
      .min(
        TRANSACTION_LIMITS.MIN_WITHDRAWAL,
        `Minimum withdrawal is ${TRANSACTION_LIMITS.MIN_WITHDRAWAL}`
      )
      .max(
        TRANSACTION_LIMITS.MAX_WITHDRAWAL,
        `Maximum withdrawal is ${TRANSACTION_LIMITS.MAX_WITHDRAWAL}`
      ),
  };

  // Only add card validation for real mode
  if (!isDemoMode) {
    return yup.object().shape({
      ...baseSchema,
      card: yup.object().shape({
        holder: yup
          .string()
          .required('Cardholder name is required')
          .matches(CARD_VALIDATION.HOLDER_PATTERN, 'Invalid name format'),

        number: yup
          .string()
          .required('Card number is required')
          .matches(CARD_VALIDATION.NUMBER_PATTERN, 'Invalid card number')
          .test('luhn', 'Invalid card number', validateLuhn),

        expireDate: yup
          .date()
          .required('Expiration date is required')
          .min(new Date(), 'Card has expired'),

        cvv: yup
          .string()
          .required('CVV is required')
          .matches(CARD_VALIDATION.CVV_PATTERN, 'Invalid CVV'),
      }),
    });
  }

  // Demo mode - only basic validation
  return yup.object().shape(baseSchema);
};
