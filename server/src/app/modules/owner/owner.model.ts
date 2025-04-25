import { model, Schema } from 'mongoose';

import { addressSchema } from '../admin/admin.model';
import { IOwner, IOwnerModel } from './owner.interface';

const ownerSchema = new Schema<IOwner>(
  {
    id: {
      type: String,
      required: true,
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
  },
  { timestamps: true },
);

const OwnerModel = model<IOwner, IOwnerModel>('Owner', ownerSchema);
export default OwnerModel;
