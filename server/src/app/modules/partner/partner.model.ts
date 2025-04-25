import { model, Schema } from 'mongoose';

import { addressSchema } from '../admin/admin.model';
import { IPartner, IPartnerModel } from './partner.interface';

const partnerSchema = new Schema<IPartner>(
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
    badge: {
      type: String,
      default: 'badge image url',
    },
    level: {
      type: Number,
      default: 1,
    },
    exp: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

const PartnerModel = model<IPartner, IPartnerModel>('Partner', partnerSchema);
export default PartnerModel;
