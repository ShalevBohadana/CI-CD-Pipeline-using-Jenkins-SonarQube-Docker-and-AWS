import { OrderReviewDataDb } from '@/pages/RateOrder/Main';

export enum USER_ROLE_ENUM {
  OWNER = 'owner',
  ADMIN = 'admin',
  SUPPORT = 'support',
  PARTNER = 'partner',
  CUSTOMER = 'customer',
  BOOSTER = 'booster',
}

export interface User {
  // Remove the index signature that's causing conflicts
  // [x: string]: string;
  
  name?: {
    firstName: string;
    lastName: string;
  };
  _id: string;
  userId: string;
  email: string;
  isEmailVerified: boolean;
  online: boolean;
  roles: USER_ROLE_ENUM[];
  avatar: string;
  userName: string;
  reviews: any[];
  ban: boolean;
  isSocialLogin?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserDataDb {
  _id: string;
  createdAt: string;
  updatedAt: string;
  name: {
    firstName: string;
    lastName: string;
  };
  isEmailVerified: boolean;
  userId: string;
  email: string;
  roles: USER_ROLE_ENUM[];
  userName: string;
  avatar: string;
  online: boolean;
  reviews: OrderReviewDataDb[];
}

export interface UpdateAvatarPayload {
  avatar: string;
}