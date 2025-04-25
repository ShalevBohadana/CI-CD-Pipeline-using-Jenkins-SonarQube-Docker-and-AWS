// import { EMPLOYEE_ROLES } from './employee.validation';
/* eslint-disable no-unused-vars */
import { Model, ObjectId } from 'mongoose';

import { CommonFilters } from '../../helpers/pagination';

export type IEmployee = {
  userId: ObjectId;
  email: string;
  roles: string;
  dateHired: Date;
  department: string;
  contactNumber: string;
  role: string;
};

export type IEmployeeModel = Model<IEmployee> & {
  isUserExist(userId: string): Promise<IEmployee>;
};

export type IEmployeeFilters = CommonFilters;
