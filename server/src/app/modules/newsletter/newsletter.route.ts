import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { Role } from '../../../enums/role';
import { NewsletterController } from './newsletter.controller';
import { NewsletterValidation } from './newsletter.validation';

const router = Router();

// Subscribe to newsletter
router.post(
  '/subscribe',
  validateRequest(NewsletterValidation.createNewsletterZodSchema),
  NewsletterController.subscribeToNewsletter
);

// Unsubscribe from newsletter
router.post(
  '/unsubscribe',
  auth(Role.CUSTOMER),
  NewsletterController.unsubscribeFromNewsletter
);

export const newsletterRoutes = router;
