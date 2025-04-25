/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

import { IAddress } from '../../../interfaces/sharedInterface';

export interface ISupport {
  id?: string;
  contactNumber?: string;
  address?: IAddress;
  isVerified?: boolean;
  profilePicture?: string;
}

export interface ISupportFullData extends ISupport {
  name?: {
    firsName?: string;
    lastName?: string;
  };
  userId?: string;
  role: string;
  email: string;
  userName?: string;
}

export interface ISupportModel extends Model<ISupport> {
  findAll(): Promise<ISupport[]>;
}
