/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { Schema } from 'mongoose';

import { getRandomHexString } from '../../../shared/utilities';
import { IEmployee } from './employee.interface';
// import { EMPLOYEE_ROLES } from './employee.validation';

export const DEFAULT_AVATAR_IMG =
  `https://www.gravatar.com/avatar/${getRandomHexString()}?s=48&d=identicon&r=G` as const;

const employeeSchema = new mongoose.Schema<IEmployee>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      model: 'User',
      required: true,
    },
    email: {
      type: String,
      required: true,
    },

    contactNumber: {
      type: String,
      required: true,
    },
    roles: {
      type: String, // Assuming EMPLOYEE_ROLES is a string type
      // Replace with actual role values
      required: true,
    },
    dateHired: {
      type: Date,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const EmployeeModel = mongoose.model<IEmployee>('Employee', employeeSchema);

export default EmployeeModel;
