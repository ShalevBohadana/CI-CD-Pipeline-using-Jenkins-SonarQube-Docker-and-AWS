import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

import ApiError from '../../../errors/ApiError';
import { catchAsync } from '../../../shared/catchAsync';
import { sendSuccessResponse } from '../../../shared/customResponse';
import { sendEmailVerification } from '../../../shared/sendEmailVerification';
import { omit } from '../../../shared/utilities';
import { AuthService } from './auth.service';
import { AuthSocialLoginService } from './auth.socialLogin.service';
interface IAuthController {
  signupCustomer: RequestHandler<ParamsDictionary, any, any, ParsedQs>;
  signupOwner: RequestHandler<ParamsDictionary, any, any, ParsedQs>;
  createAdmin: RequestHandler<ParamsDictionary, any, any, ParsedQs>;
  createSupport: RequestHandler<ParamsDictionary, any, any, ParsedQs>;
  createPartner: RequestHandler<ParamsDictionary, any, any, ParsedQs>;
  userLogin: RequestHandler<ParamsDictionary, any, any, ParsedQs>;
  discordLogin: RequestHandler<ParamsDictionary, any, any, ParsedQs>;
  googleLogin: RequestHandler<ParamsDictionary, any, any, ParsedQs>;
  facebookLogin: RequestHandler<ParamsDictionary, any, any, ParsedQs>;
  loggedInUser: RequestHandler<ParamsDictionary, any, any, ParsedQs>;
  regenerateAccessToken: RequestHandler<ParamsDictionary, any, any, ParsedQs>;
  userLogout: RequestHandler<ParamsDictionary, any, any, ParsedQs>;
  verifyEmail: RequestHandler<
    ParamsDictionary,
    any,
    any,
    ParsedQs & { token?: string }
  >;
}

// Constants for token management
export const TOKEN_NAME = {
  ACCESS: 'accessToken',
  REFRESH: 'refreshToken',
} as const;

export const REFRESH_TOKEN_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true,
  sameSite: 'none' as const,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
} as const;

// Customer signup
const signupCustomer = catchAsync(async (req: Request, res: Response) => {
  const userData = req.body;

  const { refreshToken, accessToken } =
    await AuthService.signupCustomer(userData);

  // Set refresh token in HTTP-only cookie
  res.cookie(TOKEN_NAME.REFRESH, refreshToken, REFRESH_TOKEN_COOKIE_OPTIONS);

  const responseData = {
    data: accessToken,
    message: 'Customer created successfully',
  };
  console.log('responseData', userData);
  // Send verification email
  if (process.env.NODE_ENV !== 'development') {
    await sendEmailVerification({ email: userData.email }, userData.email);
  } else {
    console.log('Skipping email verification in development mode');
  }

  sendSuccessResponse(res, responseData);
});

// Owner signup
const signupOwner = catchAsync(async (req: Request, res: Response) => {
  const userData = req.body;

  const { refreshToken, accessToken } = await AuthService.signupOwner(userData);

  res.cookie(TOKEN_NAME.REFRESH, refreshToken, REFRESH_TOKEN_COOKIE_OPTIONS);

  const responseData = {
    data: accessToken,
    message: 'Owner created successfully',
  };

  sendSuccessResponse(res, responseData);
});

// Admin creation
const createAdmin = catchAsync(async (req: Request, res: Response) => {
  // בדיקה האם המערכת במצב פיתוח
  if (process.env.NODE_ENV === 'development') {
    const userData = req.body;

    // בדיקת תקינות השדות הנדרשים
    if (!userData.email || !userData.password) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Email and password are required',
      );
    }

    const detailedAdmin = await AuthService.createAdmin(userData);

    const responseData = {
      data: detailedAdmin,
      message: 'Admin created successfully',
    };

    sendSuccessResponse(res, responseData);
  } else {
    // במצב פרודקשן נדרוש אוטנטיקציה
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      'This route is only available in development mode',
    );
  }
});

// Support creation
const createSupport = catchAsync(async (req: Request, res: Response) => {
  const userData = req.body;

  const detailedSupport = await AuthService.createSupport(userData);

  const responseData = {
    data: detailedSupport,
    message: 'Support created successfully',
  };

  sendSuccessResponse(res, responseData);
});

// Partner creation
const createPartner = catchAsync(async (req: Request, res: Response) => {
  const userData = req.body;

  const detailedPartner = await AuthService.createPartner(userData);

  const responseData = {
    data: detailedPartner,
    message: 'Partner created successfully',
  };

  sendSuccessResponse(res, responseData);
});

// User login
const userLogin = catchAsync(async (req: Request, res: Response) => {
  const userData = req.body;

  const { refreshToken, accessToken } = await AuthService.userLogin(userData);

  res.cookie(TOKEN_NAME.REFRESH, refreshToken, REFRESH_TOKEN_COOKIE_OPTIONS);

  const responseData = {
    data: accessToken,
    message: 'Logged in successfully',
  };

  sendSuccessResponse(res, responseData);
});

// Social login handlers
const discordLogin = catchAsync(async (req: Request, res: Response) => {
  const discordData = req.body;

  const { refreshToken, accessToken } =
    await AuthSocialLoginService.discordLogin(discordData);

  res.cookie(TOKEN_NAME.REFRESH, refreshToken, REFRESH_TOKEN_COOKIE_OPTIONS);

  const responseData = {
    data: accessToken,
    message: 'Logged in successfully',
  };

  sendSuccessResponse(res, responseData);
});

const googleLogin = catchAsync(async (req: Request, res: Response) => {
  const email = req.body;

  const { refreshToken, accessToken } =
    await AuthSocialLoginService.googleLogin(email);

  res.cookie(TOKEN_NAME.REFRESH, refreshToken, REFRESH_TOKEN_COOKIE_OPTIONS);

  const responseData = {
    data: accessToken,
    message: 'Logged in successfully',
  };

  sendSuccessResponse(res, responseData);
});

const facebookLogin = catchAsync(async (req: Request, res: Response) => {
  const email = req.body;

  const { refreshToken, accessToken } =
    await AuthSocialLoginService.facebookLogin(email);

  res.cookie(TOKEN_NAME.REFRESH, refreshToken, REFRESH_TOKEN_COOKIE_OPTIONS);

  const responseData = {
    data: accessToken,
    message: 'Logged in successfully',
  };

  sendSuccessResponse(res, responseData);
});

// Get logged in user data
const loggedInUser = catchAsync(async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      'Authentication required. Please provide a valid Bearer token',
    );
  }

  const token = authHeader.split(' ')[1];
  const user = await AuthService.loggedInUser(token);

  const responseData = {
    data: user,
    message: 'User retrieved successfully',
  };

  sendSuccessResponse(res, responseData);
});

// Refresh access token
const regenerateAccessToken = catchAsync(
  async (req: Request, res: Response) => {
    const refreshToken = req.cookies?.refreshToken;
    const headerToken = req.headers['x-refresh-token'] as string;
    const token = refreshToken || headerToken;

    if (!token) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        'No refresh token found. Please login again.',
      );
    }

    try {
      const result =
        await AuthService.regenerateAccessTokenWithRefresh(token);
      const { accessToken, refreshToken: newRefreshToken } = JSON.parse(result as string);

      // Set new refresh token cookie
      res.cookie(
        TOKEN_NAME.REFRESH,
        newRefreshToken,
        REFRESH_TOKEN_COOKIE_OPTIONS,
      );

      const responseData = {
        data: { accessToken },
        message: 'Access token refreshed successfully',
      };

      sendSuccessResponse(res, responseData);
    } catch (error) {
      // Clear cookie on error
      res.clearCookie(TOKEN_NAME.REFRESH, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      });

      throw error;
    }
  },
);

// User logout
const userLogout = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return sendSuccessResponse(res, {
      data: {},
      message: 'No active session found',
    });
  }

  // Clear refresh token cookie
  res.clearCookie(
    TOKEN_NAME.REFRESH,
    omit(REFRESH_TOKEN_COOKIE_OPTIONS, ['maxAge']),
  );

  sendSuccessResponse(res, {
    data: undefined,
    message: 'Logged out successfully',
  });
});

// Email verification
const verifyEmail = catchAsync(async (req: Request, res: Response) => {
  const { token } = req.query;

  if (!token || typeof token !== 'string') {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid verification token');
  }

  const verifiedStatus = await AuthService.verifyEmail(token);

  sendSuccessResponse(res, {
    data: verifiedStatus,
    message: 'Email verification successful',
  });
});

export const AuthController: IAuthController = {
  signupCustomer,
  signupOwner,
  createAdmin,
  createSupport,
  createPartner,
  userLogin,
  discordLogin,
  googleLogin,
  facebookLogin,
  loggedInUser,
  regenerateAccessToken,
  userLogout,
  verifyEmail,
};
