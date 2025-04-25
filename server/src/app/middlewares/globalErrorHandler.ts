/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';

import config from '../../config';
import ApiError from '../../errors/ApiError';
import handleCastValidationError from '../../errors/handleCastValidationError';
import handleMongooseValidationError from '../../errors/handleMongooseValidationError';
import handleMongoServerError from '../../errors/handleMongoServerError';
import handleZodValidationError from '../../errors/handleZodValidationError';
import { IGenericErrorMessage } from '../../interfaces/errorInterface';
import { errorLogger } from '../../shared/logger';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  if (config.env === 'development') {
    console.log(error);
  } else {
    errorLogger.error(error);
  }

  const status = 'false';
  let statusCode = 500;
  let message = 'Something went wrong';
  let errorMessages: IGenericErrorMessage[] = [];

  if (error instanceof ZodError) {
    const simplifiedError = handleZodValidationError(error);

    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error.name === 'ValidationError') {
    const simplifiedError = handleMongooseValidationError(error);

    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error.name === 'MongoServerError') {
    const simplifiedError = handleMongoServerError(error);

    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error.name === 'CastError') {
    const simplifiedError = handleCastValidationError(error);

    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof ApiError) {
    statusCode = error.statusCode;
    message = error.message;
    errorMessages = [{ message: error.message, path: '' }];
  } else if (error instanceof Error) {
    message = error.message;
    errorMessages = [{ message: error.message, path: '' }];
  }

  res.status(statusCode).json({
    status,
    message,
    errorMessages,
    stack: config.env === 'development' ? error.stack : '',
  });
};

export default globalErrorHandler;
