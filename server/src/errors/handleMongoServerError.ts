import httpStatus from 'http-status';
import { MongoServerError } from 'mongodb';

import {
  IGenericErrorMessage,
  IGenericErrorResponse,
} from '../interfaces/errorInterface';

const handleMongoServerError = (
  error: MongoServerError,
): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = [];

  try {
    if (error.keyPattern && typeof error.keyPattern === 'object') {
      const keys = Object.keys(error.keyPattern);
      if (keys.length > 0) {
        const firstKey = keys[0];
        errors.push({
          path: firstKey,
          message: error.message,
        });
      }
    } else {
      errors.push({
        path: '',
        message: error.message || 'Database error occurred',
      });
    }

    if (error.code === 20) {
      errors.push({
        path: 'database',
        message: 'Database configuration error - transactions not supported',
      });
    }
  } catch (err) {
    // אם יש שגיאה בטיפול בשגיאה, נחזיר שגיאה כללית
    errors.push({
      path: '',
      message: 'An unexpected error occurred',
    });
  }

  return {
    status: 'false',
    statusCode: httpStatus.INTERNAL_SERVER_ERROR,
    message: error.message || 'MongoDB Error',
    errorMessages: errors,
  };
};

export default handleMongoServerError;
