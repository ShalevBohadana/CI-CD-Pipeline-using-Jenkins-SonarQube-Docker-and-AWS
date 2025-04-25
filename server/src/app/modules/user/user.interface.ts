// user.interface.ts
import { Model, ObjectId } from 'mongoose';
import { Role } from '../../../enums/role';
import { CommonFilters } from '../../helpers/pagination';

// Base user type for consistent user data structure
export type IUser = {
  _id?: string; // MongoDB document ID
  userId: string;
  name?: {
    firstName?: string;
    lastName?: string;
  };
  email: string;
  online: boolean;
  discordId?: string; // Make it optional since not all users will have Discord
  isEmailVerified: boolean;
  roles: Role[];
  userName?: string;
  password: string;
  avatar: string;
  reviews: ObjectId[];
  ban: boolean;
  refreshToken?: string;
  history: {
    action: string;
    timestamp: Date;
    details?: any;
  }[];
};

// Type for user model with additional Mongoose functionality
export type IUserModel = Model<IUser> & {
  isUserExist(userId: string): Promise<IUser>;
};

// Common filters type
export type IUserFilters = CommonFilters;

// Auth related interfaces
export interface ILoginUser {
  userId?: string;
  email?: string;
  password: string;
}

// Response type for user data without sensitive fields
export type IUserResponseData = Omit<IUser, 'password'> & {
  _id: string; // Ensure _id is required in responses
};

// Complete auth response interface
export interface IUserResponse {
  accessToken: string;
  refreshToken: string;
  data: IUserResponseData; // Use the safe response type
}

// JWT payload interface
export interface IJwtPayload {
  userId: string;
  email?: string;
  roles: Role[];
}

// Type for creating new users
export type ICreateUserDto = Omit<
  IUser,
  '_id' | 'reviews' | 'history' | 'ban' | 'online' | 'isEmailVerified'
> & {
  password: string;
};

// Type for updating users
export type IUpdateUserDto = Partial<Omit<IUser, '_id' | 'password' | 'email'>>;

// Employee-specific user data
export interface IEmployeeUserData {
  name: {
    firstName: string;
    lastName: string;
  };
  email: string;
  password: string;
  roles: Role[];
  contactNumber: string;
}
