import 'module-alias/register';
import http from 'http';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { Server, Socket } from 'socket.io'; // Added Socket type
import { JwtPayloadExtended } from './app/helpers/jwtHelper';

import app, { ALLOWED_ORIGIN } from './app';
import { scheduleCornJobs } from './app/helpers/cornJobs';
import config, { IS_MODE_PROD } from './config';
import ApiError from './errors/ApiError';
import { errorLogger, successLogger } from './shared/logger';
import { cookieToObject } from './shared/utilities';

interface SocketData {
  user: JwtPayloadExtended;
}

const server = http.createServer(app);

export const IO = new Server<any, any, any, SocketData>(server, {
  cors: {
    origin: IS_MODE_PROD ? ALLOWED_ORIGIN.PROD : ALLOWED_ORIGIN.DEV,
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

IO.use(async (socket: Socket<any, any, any, SocketData>, next) => {
  try {
    const secureCookie = socket.request.headers.cookie;
    if (!secureCookie) {
      return next(new ApiError(httpStatus.UNAUTHORIZED, 'No cookie found'));
    }

    const { refreshToken } = cookieToObject(secureCookie);
    if (!refreshToken) {
      return next(new ApiError(httpStatus.UNAUTHORIZED, 'No refresh token found'));
    }

    const verifiedUser = jwt.decode(refreshToken) as JwtPayloadExtended;
    if (!verifiedUser) {
      return next(new ApiError(httpStatus.UNAUTHORIZED, 'Invalid token'));
    }

    socket.data.user = verifiedUser;

    if (socket.data.user && socket.handshake) {
      next();
    } else {
      next(new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized'));
    }
  } catch (error) {
    errorLogger.error('Socket middleware error:', error);
    next(new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Internal server error'));
  }
});

// Improved database connection with better error handling
async function databaseConnection() {
  try {
    await mongoose.connect(config.database_string, {
      // Optional mongoose connection options if needed
    });

    successLogger.info(
      config.env === 'development'
        ? 'Dev DB Connected'
        : 'Database connected successfully',
    );

    server.listen(config.port, () => {
      successLogger.info(
        config.env === 'development'
          ? `Dev server running on port ${config.port}`
          : `Server is listening on port ${config.port}`,
      );
      scheduleCornJobs();
    });
  } catch (error) {
    errorLogger.error('Database connection error:', error);
    process.exit(1); // Exit on database connection failure
  }
}

// Process event handlers with improved logging
process.on('uncaughtException', (error) => {
  errorLogger.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (error) => {
  errorLogger.error('Unhandled Rejection:', error);
  if (server) {
    server.close(() => process.exit(1));
  }
});

process.on('SIGTERM', () => {
  if (server) {
    server.close(() => {
      successLogger.info('Server gracefully terminated');
      process.exit(0);
    });
  }
});
console.log('Port:', config.port);
console.log('DB String:', config.database_string);
databaseConnection();
