import express, { Router } from 'express';

const router: Router = express.Router();

// Add mailing routes here
// Example:
// router.post(
//   '/send',
//   auth(USER_ROLE_ENUM.ADMIN),
//   MailingController.sendMail
// );

export const MailingRoute = router;
