import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { CategoryController } from './category.controller';
import { Role } from '../../../enums/role';
import { CategoryValidation } from './category.validation';

const router = express.Router();

router.post(
  '/create-category',
  auth(Role.ADMIN),
  validateRequest(CategoryValidation.createCategoryZodSchema),
  CategoryController.createCategory
);

router.get(
  '/',
  auth(Role.ADMIN, Role.OWNER),
  CategoryController.getAllCategories
);

router.get(
  '/get-category/:id',
  auth(Role.ADMIN, Role.CUSTOMER),
  CategoryController.getCategory
);

router.patch(
  '/update-category/:id',
  auth(Role.ADMIN),
  CategoryController.updateCategory
);

router.delete(
  '/delete-category/:id',
  auth(Role.ADMIN),
  CategoryController.deleteCategory
);

export const CategoryRoutes = router;
