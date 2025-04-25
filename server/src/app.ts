import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import type { Application, NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import path from 'path';

import globalErrorHandler from './app/middlewares/globalErrorHandler';
import uploadMiddleware from './app/middlewares/fileUploader';
import { stripeWebhook } from './app/modules/payment/stripe.webhook';
import routes from './app/routes/index';
import config, { EXTENDED_BASE_PATH, IS_MODE_PROD } from './config';
import { sendSuccessResponse } from './shared/customResponse';

const app: Application = express();
const router = express.Router();

interface AllowedOrigins {
  DEV: string[];
  PROD: string;
}

export const ALLOWED_ORIGIN: AllowedOrigins = {
  DEV: ['http://localhost:5173', 'http://localhost:8000', 'https://localhost:4000'],
  PROD: 'https://fullboosts.com',
};

const corsOptions = {
  origin: IS_MODE_PROD ? [ALLOWED_ORIGIN.PROD] : ALLOWED_ORIGIN.DEV, // Always an array
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'Accept',
    'Origin',
    'X-Requested-With',
  ],
  credentials: true,
  maxAge: 86400,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Middleware setup
app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// File upload endpoint
const handleFileUpload = (req: Request, res: Response) => {
  sendSuccessResponse((res as unknown) as Response, {
    message: 'Files uploaded successfully',
    data: (req as any).files
  });
};

router.post('/api/upload', (uploadMiddleware as unknown) as express.RequestHandler, handleFileUpload);

// Security headers
const securityHeaders = (req: Request, res: Response, next: NextFunction) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
};

router.use(securityHeaders);

// Stripe webhook route (before JSON middleware)
router.post(
  '/api/v1/stripe/webhook',
  express.raw({ type: 'application/json' }),
  stripeWebhook,
);

// Health check route
router.get('/', async (req: Request, res: Response) => {
  sendSuccessResponse(res, {
    message: 'Welcome to FullBoosts!',
    data: {
      mode: config.env,
      is_mode_prod: IS_MODE_PROD,
      status: 'healthy',
      timestamp: new Date().toISOString(),
    },
  });
});

// API routes
router.use(EXTENDED_BASE_PATH, routes);

// Static files serving
const imagesPath = path.join(__dirname, '..', 'images');
router.use(
  '/images',
  express.static(imagesPath, {
    maxAge: '1d',
    etag: true,
  }),
);

// Image route handler
router.get(`${EXTENDED_BASE_PATH}/images/:filepath/:filename`, (req: Request, res: Response) => {
  const { filepath, filename } = req.params;
  const imagePath = path.join(imagesPath, filepath, filename);

  res.sendFile(
    imagePath,
    {
      dotfiles: 'deny',
      headers: {
        'Cache-Control': 'public, max-age=86400',
        'Content-Type': 'image/jpeg',
      },
    },
    (err) => {
      if (err) {
        res.status(httpStatus.NOT_FOUND).json({
          status: false,
          message: 'Image not found',
          error: {
            message: 'The requested image could not be found',
            path: req.originalUrl,
          },
        });
      }
    },
  );
});

// Mount all routes
app.use('/', router);

// Error handling
app.use(globalErrorHandler);

// 404 handler
app.all('*', (req: Request, res: Response) => {
  res.status(httpStatus.NOT_FOUND).json({
    status: false,
    message: 'Not Found',
    error: {
      message: `Can't find ${req.originalUrl} on this server!`,
      path: req.originalUrl,
    },
  });
});

export default app;
