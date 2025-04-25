/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';

import ApiError from '../../../errors/ApiError';
import {
  IGenericDataWithMeta,
  IPaginationOption,
} from '../../../interfaces/sharedInterface';
// import paginationHelper from '../../helpers/pagination';
import {
  getPaginatedCondition,
  getPaginatedData,
} from '../../helpers/pagination';

import { OrderModel } from '../order/order.model';
import UserModel from '../user/user.model';
import { EMPLOYEE_SEARCH_FIELDS } from './employee.constant';
import { IEmployee, IEmployeeFilters } from './employee.interface';
import EmployeeModel, { DEFAULT_AVATAR_IMG } from './employee.model';
import { IEmployeeZod } from './employee.validation';
import { generateUserId } from '@/app/helpers/generateUserId';
import generateUserName from '@/app/helpers/generateUserName';

const createEmployee = async (
  employeeData: IEmployeeZod,
): Promise<IEmployee> => {
  try {
    console.log('Starting employee creation process');

    // 1. Check if user already exists
    const existingUser = await UserModel.findOne({ email: employeeData.email });
    if (existingUser) {
      throw new ApiError(
        httpStatus.CONFLICT,
        'User with this email already exists',
      );
    }

    // 2. Generate user ID
    const id = await generateUserId(employeeData.roles);
    let userName = generateUserName(employeeData.email);
    while (await UserModel.findOne({ userName })) {
      userName = generateUserName(employeeData.email);
    }

    // 3. Prepare full user data
    const completeUserData = {
      userId: id,
      name: {
        firstName: employeeData.name.firstName,
        lastName: employeeData.name.lastName,
      },
      email: employeeData.email,
      password: employeeData.password,
      roles: [employeeData.roles],
      userName,
      online: false,
      isEmailVerified: false,
      avatar: DEFAULT_AVATAR_IMG,
      reviews: [],
      ban: false,
      history: [
        {
          action: 'account_created',
          timestamp: new Date(),
        },
      ],
    };

    // 4. Create user
    const user = await UserModel.create(completeUserData);
    if (!user) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    // 5. Check if employee record exists
    const existingEmployee = await EmployeeModel.findOne({
      email: employeeData.email,
    });
    if (existingEmployee) {
      // Clean up created user if employee exists
      await UserModel.findByIdAndDelete(user._id);
      throw new ApiError(
        httpStatus.CONFLICT,
        'Employee with this email already exists',
      );
    }

    // 6. Create employee record
    const employeeCreateData = {
      userId: user._id,
      email: employeeData.email,
      contactNumber: employeeData.contactNumber,
      roles: employeeData.roles,
      dateHired: employeeData.dateHired
        ? new Date(employeeData.dateHired)
        : new Date(),
      department: employeeData.department,
    };

    const employee = await EmployeeModel.create(employeeCreateData);
    if (!employee) {
      // Clean up created user if employee creation fails
      await UserModel.findByIdAndDelete(user._id);
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Failed to create employee record',
      );
    }

    return employee;
  } catch (error) {
    console.error('Error in createEmployee:', error);

    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      `Error occurred while creating employee: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`,
    );
  }
};
// Helper function to validate date format

// Pre-validation of employee data

const getAllEmployees = async (
  filters: IEmployeeFilters,
  paginationOption: IPaginationOption,
): Promise<IGenericDataWithMeta<IEmployee[]>> => {
  const { whereConditions, sortConditions, skip, limit, page } =
    await getPaginatedCondition(
      filters,
      paginationOption,
      EMPLOYEE_SEARCH_FIELDS,
    );
  // console.log(whereConditions)

  const result = await EmployeeModel.find({ ...whereConditions })
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
    .select({
      password: 0,
      __v: 0,
    })
    .populate({
      path: 'userId',
      model: 'User',
    });

  const total = await EmployeeModel.countDocuments(whereConditions);

  return getPaginatedData(page, limit, total, result);
};

const getOne = async (employeeId: string): Promise<IEmployee> => {
  // Execute the query
  const isExist = await EmployeeModel.findOne({
    $or: [{ employeeId }, { email: employeeId }, { _id: employeeId }],
  }).select('employeeId email _id'); // Include the fields you want to retrieve in the select method

  // Handle the case where the Employee is not found
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Employee not found');
  }

  return isExist;
};

const getStatistics = async (
  employeeId: string,
): Promise<{ earning: number }> => {
  const isExist = await EmployeeModel.findOne({
    $or: [{ employeeId }, { email: employeeId }],
  }).select({
    password: 0,
  });
  if (!isExist) throw new ApiError(httpStatus.NOT_FOUND, 'Employee not found');
  const orders = await OrderModel.find()
    .select({
      totalPrice: 1,
    })
    .exec();
  let earning = 0;
  const lavel = 1;
  const rating = 0;

  await orders.map((order: { totalPrice: number }) => {
    earning += order.totalPrice;
  });
  const statistics = { earning, lavel, rating, employeeId: isExist._id };

  return statistics;
};

const updateEmployee = async (
  employeeId: string,
  EmployeeData: Partial<IEmployee>,
): Promise<IEmployee> => {
  const { ...restData } = EmployeeData;
  const dataToUpdate: Partial<IEmployee> = { ...restData };

  const isExist = await EmployeeModel.findOne({ employeeId });
  if (!isExist) throw new ApiError(httpStatus.NOT_FOUND, 'Employee not found');

  // Dynamically handle name update
  const updatedEmployee = await EmployeeModel.findOneAndUpdate(
    { employeeId },
    { ...dataToUpdate },
    { new: true },
  ).select({
    password: 0,
  });

  if (!updatedEmployee)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'USomething went wrong to update Employee',
    );
  return updatedEmployee;
};

export const EmployeeService = {
  getAllEmployees,
  getOne,
  updateEmployee,
  getStatistics,
  createEmployee,
};
