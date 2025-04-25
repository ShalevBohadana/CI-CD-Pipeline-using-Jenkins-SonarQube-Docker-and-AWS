import express, { Router } from "express";

import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { Role } from '../../../enums/role';
import reportController from './report.controller.';
import { ReportValidation } from './report.validation';

const router: Router = express.Router();

router
  .route('/')
  .post(
    auth(Role.ADMIN),
    validateRequest(ReportValidation.createReportZodBodySchema),
    reportController.createReport,
  )
  .get(auth(Role.ADMIN), reportController.getAllReports);

router
  .route('/:id')
  .get(auth(Role.ADMIN), reportController.getReportById)
  .patch(
    auth(Role.ADMIN),
    validateRequest(ReportValidation.updateReportZodBodySchema),
    reportController.updateReport,
  );

router
  .route('/userId')
  .get(auth(Role.ADMIN), reportController.getReportByUser);

export const ReportRouter = router;
