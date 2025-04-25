import { Model } from 'mongoose';

import { IAddress } from '../../../interfaces/sharedInterface';

// ממשק בסיסי ללקוח
export interface ICustomer {
  id?: string;
  contactNumber?: string;
  address?: IAddress;
  isVerified?: boolean;
  profilePicture?: string;
  shippingAddress?: IAddress;
  isSocialLogin?: boolean;
}

// ממשק מורחב עם כל הנתונים
export interface ICustomerFullData extends ICustomer {
  name?: {
    firstName?: string; // תיקון שם השדה מ-firsName ל-firstName
    lastName?: string;
  };
  userId?: string;
  roles?: string[];
  email: string; // שדה חובה
  userName?: string;
  password: string; // שדה חובה
  role?: string; // שים לב שיש גם role וגם roles
}

// ממשק למודל של mongoose
export interface ICustomerModel extends Model<ICustomer> {
  findAll(): Promise<ICustomer[]>;
}
