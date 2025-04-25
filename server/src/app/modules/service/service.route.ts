import express, { Router } from "express";

import auth from '../../middlewares/auth';
// import validateRequest from '../../middlewares/validateRequest'
// import { ServiceValidation } from './service.validation'
import uploadMiddleware from '../../middlewares/fileUploader';
import formatArrayFields from '../../middlewares/formatArrayField';
import { Role } from '../../../enums/role';
import { ServiceController } from './service.controller';

const router: Router = express.Router();

router.post(
  '/',
  auth(Role.ADMIN, Role.OWNER, Role.PARTNER),
  // validateRequest(ServiceValidation.createServiceZodSchema),
  uploadMiddleware,
  formatArrayFields,
  ServiceController.createService,
);

router.patch(
  '/:serviceId',
  auth(Role.ADMIN, Role.OWNER, Role.PARTNER),
  uploadMiddleware,
  formatArrayFields,
  ServiceController.updateService,
);

router.get('/', ServiceController.getAllService);
router.delete(
  '/:serviceId',
  auth(Role.ADMIN, Role.OWNER, Role.PARTNER),
  ServiceController.deleteService,
);
// router.get('/:categoryId', ServiceController.getServicesByCategoryId);
router.get('/single/:serviceId', ServiceController.getServiceById);

export const ServiceRoute = router;
