import { Schema, model } from 'mongoose';
import { IAdmin, IAdminModel } from './admin.interface';
import { IAddress } from '../../../interfaces/sharedInterface';

export const addressSchema = new Schema<IAddress>(
  {
    addressLine: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    country: {
      type: String,
    },
    zipCode: {
      type: String,
    },
  },
  {
    _id: false,
  },
);

const adminSchema = new Schema<IAdmin>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    contactNumber: {
      type: String,
    },
    address: {
      type: addressSchema,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    profilePicture: {
      type: String,
    },
    online: {
      type: Boolean,
      default: false,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

const Admin = model<IAdmin, IAdminModel>('Admin', adminSchema);
export default Admin;
