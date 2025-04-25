import { ErrorInfo } from 'react';

export const logError = (error: Error, info: ErrorInfo) => {
  // Do something with the error
  console.log(error, info);
};
