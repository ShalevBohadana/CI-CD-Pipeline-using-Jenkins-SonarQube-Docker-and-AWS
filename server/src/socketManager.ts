import httpStatus from 'http-status';
import { Server, Socket } from 'socket.io';
import JwtHelper, { JwtPayloadExtended } from './app/helpers/jwtHelper';
import UserModel from './app/modules/user/user.model';
import ApiError from './errors/ApiError';
import config from './config';

interface CustomSocket extends Socket {
  user?: JwtPayloadExtended;
  messageCount?: number;
  lastMessageTime?: number;
}

export const ACTIVE_USER_IDS = new Map<string, string>();

// Rate limiting configuration
const RATE_LIMIT = {
  messages: 10,  // messages
  timeWindow: 10000  // milliseconds (10 seconds)
};

// Extract token from various sources
function extractToken(socket: CustomSocket): string | null {
  // Try auth object
  const authToken = socket.handshake.auth.token;
  if (authToken) return authToken;

  // Try authorization header
  const authHeader = socket.handshake.headers.authorization;
  if (authHeader) {
    const parts = authHeader.split(' ');
    if (parts.length === 2 && parts[0].toLowerCase() === 'bearer') {
      return parts[1];
    }
  }

  // Try cookie
  const cookies = socket.handshake.headers.cookie;
  if (cookies) {
    const tokenMatch = cookies.match(/token=([^;]+)/);
    if (tokenMatch) return tokenMatch[1];
  }

  // In development, allow connection without token
  if (process.env.NODE_ENV === 'development') {
    return null;
  }

  return null;
}

// Rate limiting middleware
function checkRateLimit(socket: CustomSocket): boolean {
  const now = Date.now();
  
  if (!socket.messageCount || !socket.lastMessageTime || 
      (now - socket.lastMessageTime) > RATE_LIMIT.timeWindow) {
    socket.messageCount = 1;
    socket.lastMessageTime = now;
    return true;
  }

  if (socket.messageCount >= RATE_LIMIT.messages) {
    return false;
  }

  socket.messageCount++;
  return true;
}

function setupSocketManager(io: Server) {
  // Add authentication middleware
  io.use(async (socket: CustomSocket, next) => {
    try {
      const token = extractToken(socket);

      // In development, allow connection without token
      if (process.env.NODE_ENV === 'development' && !token) {
        socket.data.user = {
          userId: 'dev-user',
          roles: ['CUSTOMER'],
          version: 1
        };
        return next();
      }

      if (!token) {
        return next(new Error('No cookie found'));
      }

      try {
        const decoded = await JwtHelper.verifyToken(token);
        
        // Validate token version and payload
        if (!decoded.version || !decoded.userId || !Array.isArray(decoded.roles)) {
          return next(new Error('Invalid token structure'));
        }

        socket.data.user = decoded;
        next();
      } catch (err) {
        if ((err as { message: string }).message === 'Token has been revoked') {
          return next(new Error('Token has been revoked'));
        }
        return next(new Error('Invalid authentication token'));
      }
    } catch (error) {
      return next(new Error('Authentication failed'));
    }
  });

  io.on('connection', async (socket: CustomSocket) => {
    try {
      const userDbId = socket.data.user?.userId;

      if (!userDbId) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'No ID found for this user');
      }

      // Initialize rate limiting counters
      socket.messageCount = 0;
      socket.lastMessageTime = Date.now();

      // Update active users map
      ACTIVE_USER_IDS.set(userDbId, socket.id);

      // Update user status in DB
      await UserModel.findOneAndUpdate(
        { userId: userDbId },
        { online: true },
        { new: true },
      );

      // Emit online status
      socket.broadcast.emit('userOnline', userDbId);
      socket.emit('authenticated', { userId: userDbId });

      // Handle disconnect
      socket.on('disconnect', async () => {
        try {
          const user = await UserModel.findOneAndUpdate(
            { userId: userDbId },
            { online: false },
            { new: true },
          );

          if (user) {
            socket.broadcast.emit('userOffline', user.userId);
          }

          ACTIVE_USER_IDS.delete(userDbId);
        } catch (error) {
          console.error('Error handling disconnect:', error);
        }
      });

      // Apply rate limiting to all incoming events
      socket.use(([event, ...args], next) => {
        if (!checkRateLimit(socket)) {
          return next(new Error('Rate limit exceeded'));
        }
        next();
      });

      // Handle custom events here
      socket.on('error', (error) => {
        console.error('Socket error:', error);
      });

      // Handle ban user
      socket.on('banuser', (data: string) => {
        // Verify admin role before allowing ban
        if (!socket.data.user?.roles.includes('ADMIN')) {
          socket.emit('error', { message: 'Unauthorized to ban users' });
          return;
        }
        socket.broadcast.emit('banuser', data);
      });
    } catch (error) {
      socket.emit('error', { message: 'Authentication failed' });
      socket.disconnect(true);
    }
  });

  return io;
}

export default setupSocketManager;
