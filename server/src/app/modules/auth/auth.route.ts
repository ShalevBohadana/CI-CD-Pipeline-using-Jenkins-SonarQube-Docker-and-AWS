import express, { Router } from 'express';
import auth from '../../middlewares/auth';
import { Role } from '../../../enums/role';
import { AuthController } from './auth.controller';
import { UserValidation } from '../user/user.validation';
import validateRequest from '../../middlewares/validateRequest';

const router: Router = express.Router();

router.post(
  '/',
  validateRequest(UserValidation.createUserZodSchema),
  AuthController.signupCustomer,
);
router.post('/create-first-admin', AuthController.createAdmin);

router.post(
  '/owner',
  validateRequest(UserValidation.createUserZodSchema),
  AuthController.signupOwner,
);

router.post(
  '/admin',
  validateRequest(UserValidation.createUserZodSchema),
  auth(Role.OWNER),
  AuthController.createAdmin,
);

router.post(
  '/support',
  validateRequest(UserValidation.createUserZodSchema),
  auth(Role.OWNER, Role.ADMIN),
  AuthController.createSupport,
);

router.post(
  '/partner',
  validateRequest(UserValidation.createUserZodSchema),
  auth(Role.OWNER, Role.ADMIN),
  AuthController.createPartner,
);

router.post('/login', AuthController.userLogin);
router.post('/discord/redirect', AuthController.discordLogin);
router.post('/login/facebook', AuthController.facebookLogin);
router.post('/login/google', AuthController.googleLogin);

router.get('/me', auth(Role.OWNER, Role.ADMIN, Role.SUPPORT, Role.PARTNER, Role.CUSTOMER), AuthController.loggedInUser);
router.post('/refresh-token', AuthController.regenerateAccessToken);
router.post('/logout', AuthController.userLogout);
router.get('/verify/email', AuthController.verifyEmail);

export const AuthRoute = router;
