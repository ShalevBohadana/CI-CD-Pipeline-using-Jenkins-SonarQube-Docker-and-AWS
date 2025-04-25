import { Request, Response, RequestHandler } from 'express';
import httpStatus from 'http-status';

import { paginationFields } from '../../../constant/shared.constant';
import { IPaginationOption } from '../../../interfaces/sharedInterface';
import { catchAsync } from '../../../shared/catchAsync';
import { sendSuccessResponse } from '../../../shared/customResponse';
import pick from '../../../shared/pick';
import { EMPLOYEE_FILTER_FIELDS } from './employee.constant';
import { IEmployee } from './employee.interface';
import { EmployeeService } from './employee.service';

const getAllEmployees = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ['search', ...EMPLOYEE_FILTER_FIELDS]);
  // console.log(filters)
  const paginationOption: IPaginationOption = pick(req.query, paginationFields);
  const result = await EmployeeService.getAllEmployees(
    filters,
    paginationOption,
  );

  const responseData = {
    statusCode: httpStatus.OK,
    meta: result.meta || {},
    data: result.data || [],
    message: 'All Employees fetched successfully',
  };

  sendSuccessResponse<IEmployee[]>(res, responseData);
});

const createEmployee = catchAsync(async (req: Request, res: Response) => {
  const employeeData = req.body;

  const result = await EmployeeService.createEmployee(employeeData);

  const responseData = {
    statusCode: httpStatus.OK,
    data: result,
    message: 'Employee created successfully',
  };
  sendSuccessResponse<IEmployee>(res, responseData);
});

const getOne = catchAsync(async (req: Request, res: Response) => {
  const EmployeeDbId = req.params.id;
  // console.log(EmployeeDbId, 'EmployeeDbIdEmployeeDbIdEmployeeDbIdEmployeeDbIdEmployeeDbId');
  const result = await EmployeeService.getOne(EmployeeDbId);

  const responseData = {
    statusCode: httpStatus.OK,
    data: result,
    message: 'Employee data fetched successfully',
  };

  sendSuccessResponse<IEmployee>(res, responseData);
});
const getStatistics = catchAsync(async (req: Request, res: Response) => {
  const EmployeeDbId = req.params.id;
  const result = await EmployeeService.getStatistics(EmployeeDbId);

  const responseData = {
    statusCode: httpStatus.OK,
    data: result,
    message: 'Statistics data fetched successfully',
  };

  sendSuccessResponse<{ [key: string]: string | number }>(res, responseData);
});

const updateEmployee = catchAsync(async (req: Request, res: Response) => {
  const EmployeeId = req.params?.id;
  const updateBody = req.body;

  const result = await EmployeeService.updateEmployee(EmployeeId, updateBody);

  const responseData = {
    statusCode: httpStatus.OK,
    data: result,
    message: 'Employee updated successfully',
  };

  sendSuccessResponse<IEmployee>(res, responseData);
});

export const EmployeeController: { [key: string]: RequestHandler } = {
  getAllEmployees,
  getOne,
  updateEmployee,
  getStatistics,
  createEmployee,
};
