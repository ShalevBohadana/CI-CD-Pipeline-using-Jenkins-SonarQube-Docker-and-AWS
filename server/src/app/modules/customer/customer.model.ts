import { model, Schema } from 'mongoose';

import { addressSchema } from '../admin/admin.model';
import { ICustomer, ICustomerModel } from './customer.interface';

const customerSchema = new Schema<ICustomer>(
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
    shippingAddress: {
      type: addressSchema,
    },
    isSocialLogin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const CustomerModel = model<ICustomer, ICustomerModel>(
  'Customer',
  customerSchema,
);
export default CustomerModel;
