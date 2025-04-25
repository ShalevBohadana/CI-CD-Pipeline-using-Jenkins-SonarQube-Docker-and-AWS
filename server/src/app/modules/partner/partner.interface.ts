import { Model } from 'mongoose';

import { IAddress } from '../../../interfaces/sharedInterface';

export interface IPartner {
  id?: string;
  contactNumber?: string;
  address?: IAddress;
  isVerified?: boolean;
  profilePicture?: string;
  badge: string;
  level: number;
  exp: number;
}

export interface IPartnerFullData extends IPartner {
  name?: {
    firsName?: string;
    lastName?: string;
  };
  userId?: string;
  role: string;
  email: string;
  userName?: string;
}

export interface IPartnerModel extends Model<IPartner> {
  findAll(): Promise<IPartner[]>;
}
