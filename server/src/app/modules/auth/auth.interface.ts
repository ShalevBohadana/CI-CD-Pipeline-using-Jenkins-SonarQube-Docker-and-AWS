import { Role } from '../../../enums/role';
import { IUser } from '../user/user.interface';

// Safe user response type without sensitive fields
export type SafeUser = Omit<IUser, 'password'> & {
  _id: string; // Ensure _id is always present in responses
};

// For login
export interface ILoginUser {
  userId?: string;
  email?: string;
  password: string;
}

// For sending response
export interface IUserResponse {
  accessToken: string;
  refreshToken: string;
  data: SafeUser; // Use the safe type and make it required
}

// For jwt payload
export interface IJwtPayload {
  userId: string;
  email?: string;
  roles: Role[]; // Include roles in JWT payload
}

// For auth service
export interface IAuthServiceResponse {
  user: SafeUser;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}
