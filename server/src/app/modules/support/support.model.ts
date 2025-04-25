import { model, Schema } from 'mongoose';

import { addressSchema } from '../admin/admin.model';
import { ISupport, ISupportModel } from './support.interface';

const supportSchema = new Schema<ISupport>(
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

const SupportModel = model<ISupport, ISupportModel>('Support', supportSchema);
export default SupportModel;
