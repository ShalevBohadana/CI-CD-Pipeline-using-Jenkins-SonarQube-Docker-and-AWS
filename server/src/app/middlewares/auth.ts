import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import JwtHelper, { JwtPayloadExtended } from '../helpers/jwtHelper';
import ApiError from '../../errors/ApiError';
import { Role } from '../../enums/role';
import { AuthService } from '../modules/auth/auth.service';
import UserModel, { DEFAULT_AVATAR_IMG } from '../modules/user/user.model';
import { hashPassword } from '../helpers/hashPassword';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayloadExtended;
    }
  }
}

const extractToken = (req: Request): string | null => {
  // Try Authorization header
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const parts = authHeader.split(' ');
    if (parts.length === 2 && parts[0].toLowerCase() === 'bearer') {
      return parts[1];
    }
  }

  // Try cookie
  const tokenFromCookie = req.cookies?.token;
  if (tokenFromCookie) {
    return tokenFromCookie;
  }

  return null;
};

const createDevUser = async () => {
  const devUserId = 'dev-user';
  let devUser = await UserModel.findOne({ userId: devUserId });
  
  if (!devUser) {
    const hashedPassword = await hashPassword('dev-password');
    devUser = await UserModel.create({
      userId: devUserId,
      email: 'dev@example.com',
      userName: 'DevUser',
      password: hashedPassword,
      roles: [Role.CUSTOMER],
      online: true,
      isEmailVerified: true,
      avatar: DEFAULT_AVATAR_IMG,
      reviews: [],
      ban: false,
      history: [
        {
          action: 'account_created',
          timestamp: new Date(),
        },
      ],
    });
  }
  return devUser;
};

const auth = (...requiredRoles: Role[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Extract tokens
      const accessToken = extractToken(req);
      const refreshToken = req.cookies?.refreshToken;

      // In development, allow requests without token for testing
      if (process.env.NODE_ENV === 'development') {
        if (!accessToken) {
          const devUser = await createDevUser();
          req.user = {
            userId: devUser.userId,
            roles: devUser.roles,
            version: 1,
            type: 'access'
          };
          return next();
        }
        // In development, be more lenient with token validation
        try {
          const verifiedUser = await JwtHelper.verifyToken(accessToken, 'access');
          req.user = verifiedUser;
          return next();
        } catch (err) {
          // In development, if token validation fails, use dev user
          const devUser = await createDevUser();
          req.user = {
            userId: devUser.userId,
            roles: devUser.roles,
            version: 1,
            type: 'access'
          };
          return next();
        }
      }

      if (!accessToken) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Access token is required');
      }

      try {
        // First try to verify the access token
        const verifiedUser = await JwtHelper.verifyToken(accessToken, 'access');

        // Check role permissions
        if (requiredRoles.length && !requiredRoles.some(role => verifiedUser.roles.includes(role))) {
          throw new ApiError(
            httpStatus.FORBIDDEN,
            `Access denied. Required roles: ${requiredRoles.join(', ')}`
          );
        }

        // Attach user to request
        req.user = verifiedUser;
        
        // Set the access token in cookie
        res.cookie('token', accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax'
        });
        
        return next();

      } catch (err: any) {
        // If access token is expired and we have a refresh token, try to get a new access token
        if ((err.message === 'Token has expired' || err.message === 'Invalid token format or signature') && refreshToken) {
          try {
            const newAccessToken = await AuthService.regenerateAccessTokenWithRefresh(refreshToken);
            
            // Set the new access token in cookie and header
            res.cookie('token', newAccessToken, {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'lax'
            });
            res.setHeader('Authorization', `Bearer ${newAccessToken}`);
            
            // Verify the new token and continue
            const verifiedUser = await JwtHelper.verifyToken(newAccessToken, 'access');
            
            if (requiredRoles.length && !requiredRoles.some(role => verifiedUser.roles.includes(role))) {
              throw new ApiError(
                httpStatus.FORBIDDEN,
                `Access denied. Required roles: ${requiredRoles.join(', ')}`
              );
            }

            req.user = verifiedUser;
            return next();

          } catch (refreshError: any) {
            // Clear invalid tokens
            res.clearCookie('token');
            res.clearCookie('refreshToken');
            
            // Pass through specific error messages from token verification
            if (refreshError instanceof ApiError) {
              throw refreshError;
            }
            throw new ApiError(httpStatus.UNAUTHORIZED, 'Session expired. Please login again.');
          }
        }

        // Handle specific token errors
        if (err.message === 'Token has been revoked') {
          res.clearCookie('token');
          res.clearCookie('refreshToken');
          throw new ApiError(httpStatus.UNAUTHORIZED, 'Token has been revoked. Please login again.');
        }
        if (err.message === 'Invalid token format or signature') {
          res.clearCookie('token');
          throw new ApiError(httpStatus.FORBIDDEN, 'Invalid access token format or signature');
        }
        if (err.message === 'Invalid token type. Expected access token.') {
          res.clearCookie('token');
          throw new ApiError(httpStatus.FORBIDDEN, 'Invalid token type. Please provide an access token.');
        }

        // For any other error, clear tokens and require re-authentication
        res.clearCookie('token');
        res.clearCookie('refreshToken');
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Authentication failed. Please login again.');
      }
    } catch (error) {
      next(error);
    }
  };

export default auth;
