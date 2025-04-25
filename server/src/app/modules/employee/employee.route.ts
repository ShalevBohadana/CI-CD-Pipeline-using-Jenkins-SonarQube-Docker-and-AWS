import express, { Router } from "express";

import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { Role } from '../../../enums/role';
import { EmployeeController } from './employee.controller';
import { EmployeeValidation } from './employee.validation';
// import { USER_ROLE_ENUM } from './Employee.constant';
const router: Router = express.Router();

router.get(
  '/',
  auth(Role.OWNER, Role.ADMIN),

  EmployeeController.getAllEmployees,
);
router.post(
  '/',
  auth(Role.OWNER, Role.ADMIN),
  validateRequest(EmployeeValidation.createEmployeeZodSchema),
  EmployeeController.createEmployee,
);

router.get(
  '/:id',
  auth(
    Role.OWNER,
    Role.ADMIN,
    Role.CUSTOMER,
  ),
  EmployeeController.getOne,
);
router.get(
  '/statistics/:id',
  auth(
    Role.OWNER,
    Role.ADMIN,
    Role.CUSTOMER,
  ),
  EmployeeController.getStatistics,
);
router.patch(
  '/',
  auth(
    Role.OWNER,
    Role.ADMIN,
    Role.CUSTOMER,
  ),
  EmployeeController.updateEmployee,
);

export const EmployeeRoute = router;
