import express, { Router } from 'express';
import { AdminController } from './admin.controller';
import auth from '../../middlewares/auth';
import { Role } from '../../../enums/role';

const router: Router = express.Router();

// Admin routes
router.get('/', auth(Role.ADMIN), AdminController.getAdmins);
router.get('/:id', auth(Role.ADMIN), AdminController.getAdmin);
router.post('/create-admin', auth(Role.ADMIN), AdminController.createAdmin);
router.patch('/:id', auth(Role.ADMIN), AdminController.updateAdmin);
router.delete('/:id', auth(Role.ADMIN), AdminController.deleteAdmin);

export const AdminRoute = router;
export { AdminRoute as AdminRoutes };
