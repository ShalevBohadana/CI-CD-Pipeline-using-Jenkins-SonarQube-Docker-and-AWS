/* eslint-disable no-unused-vars */
import { Model, Document } from 'mongoose';
import { IAddress } from '../../../interfaces/sharedInterface';
import { Role } from '../../../enums/role';

export interface IAdminAttributes {
  name: string;
  email: string;
  password: string;
  userName: string;
  contactNumber?: string;
  address?: IAddress;
  isVerified: boolean;
  profilePicture?: string;
  online: boolean;
  isEmailVerified: boolean;
  role: Role;
}

export interface IAdmin extends Document {
  name: string;
  email: string;
  password: string;
  userName: string;
  contactNumber?: string;
  address?: IAddress;
  isVerified: boolean;
  profilePicture?: string;
  online: boolean;
  isEmailVerified: boolean;
  role: Role;
}

export interface IAdminWithToken extends Omit<IAdminAttributes, 'password'> {
  _id: string;
  accessToken: string;
}

export type IAdminModel = Model<IAdmin>;
