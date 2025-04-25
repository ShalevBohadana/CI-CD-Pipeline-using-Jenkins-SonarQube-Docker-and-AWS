import jwt, { SignOptions, TokenExpiredError, JsonWebTokenError, NotBeforeError } from 'jsonwebtoken';
import config from '../../config';
import { Role } from '../../enums/role';

// Define the StringValue type to match jwt package requirements
type StringValue = `${number}d` | `${number}h` | `${number}m` | `${number}s`;

export interface JwtPayloadExtended {
  userId: string;
  roles: Role[];
  version?: number;
  type?: 'access' | 'refresh';  // Add token type
  iat?: number;
  exp?: number;
}

// Token blacklist storage
const tokenBlacklist = new Set<string>();

class JwtHelper {
  static generateToken(
    payload: JwtPayloadExtended,
    secret: string = config.access_token,
    expiresIn: number | StringValue = config.access_token_expires_in as StringValue
  ): string {
    const options: SignOptions = {
      expiresIn,
      algorithm: 'HS256'  // Explicitly set the algorithm
    };
    
    // Add version control and token type to payload
    const versionedPayload = {
      ...payload,
      version: payload.version || 1,
      type: payload.type || 'access'
    };
    
    try {
      return jwt.sign(versionedPayload, secret, options);
    } catch (error) {
      console.error('Error generating token:', error);
      throw new Error('Failed to generate token');
    }
  }

  static verifyToken(token: string, tokenType: 'access' | 'refresh' = 'access'): JwtPayloadExtended {
    try {
      // In development, allow test tokens
      if (process.env.NODE_ENV === 'development' && token === 'dev-token') {
        return {
          userId: 'dev-user',
          roles: [Role.CUSTOMER],
          version: 1,
          type: tokenType
        };
      }

      // Check if token is blacklisted
      if (tokenBlacklist.has(token)) {
        throw new Error('Token has been revoked');
      }

      // Use appropriate secret based on token type
      const secret = tokenType === 'access' ? config.access_token : config.refresh_token;
      
      const decoded = jwt.verify(token, secret, {
        algorithms: ['HS256']  // Explicitly specify allowed algorithms
      }) as JwtPayloadExtended;
      
      // Validate token version
      if (typeof decoded.version !== 'number') {
        throw new Error('Invalid token version');
      }

      // In development, be more lenient with token type validation
      if (process.env.NODE_ENV !== 'development') {
        // Validate token type
        if (decoded.type !== tokenType) {
          throw new Error(`Invalid token type. Expected ${tokenType} token.`);
        }
      }

      // Validate payload structure
      if (!decoded.userId || !Array.isArray(decoded.roles)) {
        throw new Error('Invalid token payload structure');
      }

      return decoded;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new Error('Token has expired');
      }
      if (error instanceof JsonWebTokenError) {
        throw new Error('Invalid token format or signature');
      }
      if (error instanceof NotBeforeError) {
        throw new Error('Token not yet active');
      }
      throw error;
    }
  }

  static getTokenFromRequest(req: any): string | null {
    const authHeader = req.headers.authorization;
    if (!authHeader) return null;
    
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0].toLowerCase() !== 'bearer') {
      return null;
    }
    
    return parts[1];
  }

  static blacklistToken(token: string): void {
    tokenBlacklist.add(token);
  }

  static isTokenBlacklisted(token: string): boolean {
    return tokenBlacklist.has(token);
  }

  // Clean up expired tokens from blacklist periodically
  static cleanupBlacklist(): void {
    tokenBlacklist.forEach(token => {
      try {
        // Try to verify with both secrets since we don't know the token type
        try {
          jwt.verify(token, config.access_token);
        } catch (err) {
          if (!(err instanceof TokenExpiredError)) {
            jwt.verify(token, config.refresh_token);
          }
        }
      } catch (err) {
        // If token is expired or invalid, remove it from blacklist
        if (err instanceof TokenExpiredError || err instanceof JsonWebTokenError) {
          tokenBlacklist.delete(token);
        }
      }
    });
  }
}

// Run cleanup every hour
setInterval(JwtHelper.cleanupBlacklist, 60 * 60 * 1000);

export default JwtHelper;
