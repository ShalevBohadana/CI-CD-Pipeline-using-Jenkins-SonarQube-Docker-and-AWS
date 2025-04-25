import { Model } from 'mongoose';

import { IAddress } from '../../../interfaces/sharedInterface';

export interface IOwner {
  id?: string;
  contactNumber?: string;
  address?: IAddress;
  isVerified?: boolean;
  profilePicture?: string;
  shippingAddress?: IAddress;
}

export interface IOwnerFullData extends IOwner {
  name?: {
    firsName?: string;
    lastName?: string;
  };
  userId?: string;
  role: string;
  email: string;
  userName?: string;
  password: string;
}

export interface IOwnerModel extends Model<IOwner> {
  findAll(): Promise<IOwner[]>;
}
