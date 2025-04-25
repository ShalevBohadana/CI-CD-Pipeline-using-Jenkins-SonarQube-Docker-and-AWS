import jwt from 'jsonwebtoken';
import { URL, URLSearchParams } from 'url';

import { IUser } from '../app/modules/user/user.interface';
import config, { SITE_INFO } from '../config';
import { sendEmail } from './mailer';

export const sendEmailVerification = async (
  payload: Partial<IUser>,
  to: string,
) => {
  if (!config.email_verify_token) {
    throw new Error('EMAIL_VERIFY_TOKEN is not configured');
  }

  const token = jwt.sign(payload, config.email_verify_token, {
    expiresIn: '1h',
  });

  // Create a verification link
  const verifyLink = new URL(`${SITE_INFO.API}/auth/verify/email`);
  const searchQuery = new URLSearchParams();
  searchQuery.append('token', token);
  verifyLink.search = searchQuery.toString();

  await sendEmail({
    to,
    from: config.email.from,
    subject: 'Email verification',
    text: 'Email verification',
    html: `
      <div>
        <h1>Email verification</h1>
        <p>Click the link below to verify your email</p>
        <a href="${verifyLink.href}">Verify Email</a>
      </div>
    `,
  });
};

export const sendEmailForReport = async (to: string, reason: string) => {
  await sendEmail({
    to,
    from: config.email.from,
    subject: 'Report Form FullBoosts.com',
    text: 'Report Form FullBoosts.com',
    html: `
      <div>
        <h1>You have received a report</h1>
        <p>${reason}</p>
      </div>
    `,
  });
};
