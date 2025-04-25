import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import { createTransport, SendMailOptions } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { URL, URLSearchParams } from 'url'; // Add this import

import { IUser } from '../app/modules/user/user.interface';
import config from '../config';
import ApiError from '../errors/ApiError';

const SITE_INFO = { API: process.env.API_URL || 'http://localhost:4000' };

const transportConfig: SMTPTransport.Options = {
  host: config.mailer.host,
  port: config.mailer.port,
  secure: config.mailer.secure,
  auth: {
    user: config.mailer.auth.user,
    pass: config.mailer.auth.pass,
  },
};

const transporter = createTransport(transportConfig);
const sendWithRetry = async (
  options: SendMailOptions,
  retries = 3,
): Promise<void> => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await transporter.sendMail({
        from: config.email.from,
        ...options,
      });
      return;
    } catch (error) {
      if (attempt === retries) {
        throw new ApiError(
          httpStatus.INTERNAL_SERVER_ERROR,
          'Failed to send email after multiple attempts',
        );
      }
      // Wait before retrying (exponential backoff)
      await new Promise((resolve) =>
        setTimeout(resolve, Math.pow(2, attempt) * 1000),
      );
    }
  }
};
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
export const sendEmail = async (options: SendMailOptions): Promise<void> => {
  const startTime = Date.now();

  try {
    // In development mode, just log the email
    if (process.env.NODE_ENV === 'development') {
      console.log('Development mode: Email would have been sent with options:', {
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: options.html
      });
      return;
    }

    // בדיקת קונפיגורציה
    if (
      !config.email.from ||
      !config.mailer.auth.user ||
      !config.mailer.auth.pass
    ) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        'Mail server credentials are not configured',
      );
    }

    // ולידציה של כתובת המייל
    if (
      !options.to ||
      !validateEmail(
        typeof options.to === 'string'
          ? options.to
          : Array.isArray(options.to) && typeof options.to[0] === 'string'
            ? options.to[0]
            : '',
      )
    ) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        'Invalid recipient email address',
      );
    }

    // בדיקה שיש נושא ותוכן
    if (!options.subject || (!options.text && !options.html)) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        'Email subject and content are required',
      );
    }

    console.log(`Attempting to send email to ${options.to}...`);

    // ניסיון שליחה עם retry
    await sendWithRetry(options);

    // לוג הצלחה
    console.log(
      `Email sent successfully to ${options.to} in ${Date.now() - startTime}ms`,
    );
  } catch (error) {
    // לוג כישלון
    console.error(
      `Failed to send email to ${options.to} after ${
        Date.now() - startTime
      }ms:`,
      error instanceof Error ? error.message : 'Unknown error',
    );

    // טיפול בשגיאות ספציפיות
    if (error instanceof Error) {
      if (error.message.includes('ECONNREFUSED')) {
        throw new ApiError(
          httpStatus.INTERNAL_SERVER_ERROR,
          'Unable to connect to mail server',
        );
      }
      if (error.message.includes('AUTH')) {
        throw new ApiError(
          httpStatus.INTERNAL_SERVER_ERROR,
          'Mail server authentication failed',
        );
      }
    }

    // זריקת שגיאה כללית אם לא זוהתה שגיאה ספציפית
    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to send email: ' +
        (error instanceof Error ? error.message : 'Unknown error'),
    );
  }
};
export const sendEmailVerification = async (
  payload: Partial<IUser>,
  to: string,
) => {
  const token = jwt.sign(
    payload,
    config.email_verify_token || 'default_secret',
    { expiresIn: '1h' },
  );

  const verifyLink = new URL(`${SITE_INFO.API}/auth/verify/email`);
  const searchQuery = new URLSearchParams();
  searchQuery.append('token', token);
  verifyLink.search = searchQuery.toString();

  await sendEmail({
    to,
    from: config.email.from,
    subject: 'Email verification - FullBoosts',
    text: 'Please verify your email address',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #333; text-align: center;">Verify Your Email</h1>
        <p>Hello,</p>
        <p>Welcome to FullBoosts! Please verify your email address by clicking the button below:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verifyLink.href}" 
             style="background-color: #4CAF50; color: white; padding: 12px 24px; 
                    text-decoration: none; border-radius: 4px; font-weight: bold;">
            Verify Email
          </a>
        </div>
        <p>If the button doesn't work, you can also click this link:</p>
        <p><a href="${verifyLink.href}">${verifyLink.href}</a></p>
        <p>This link will expire in 1 hour.</p>
        <p style="color: #666; font-size: 14px; margin-top: 30px;">
          If you didn't create an account with FullBoosts, you can safely ignore this email.
        </p>
      </div>
    `,
  });
};

export const sendEmailForReport = async (to: string, reason: string) => {
  await sendEmail({
    to,
    from: config.email.from,
    subject: 'New Report - FullBoosts.com',
    text: `New Report: ${reason}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #333;">New Report Received</h1>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 4px; margin: 20px 0;">
          <p style="margin: 0; color: #444;">${reason}</p>
        </div>
        <p style="color: #666; font-size: 14px;">
          This report was submitted through the FullBoosts reporting system.
        </p>
      </div>
    `,
  });
};

export const sendOrderConfirmation = async (
  to: string,
  orderDetails: {
    orderId: string;
    items: Array<{ name: string; price: number }>;
    total: number;
  },
) => {
  await sendEmail({
    to,
    from: config.email.from,
    subject: 'Order Confirmation - FullBoosts',
    text: `Order confirmation for order ${orderDetails.orderId}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #333; text-align: center;">Order Confirmation</h1>
        <p>Thank you for your order!</p>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 4px; margin: 20px 0;">
          <h2 style="color: #444; margin-top: 0;">Order Details</h2>
          <p>Order ID: ${orderDetails.orderId}</p>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #ddd;">
              <th style="text-align: left; padding: 8px;">Item</th>
              <th style="text-align: right; padding: 8px;">Price</th>
            </tr>
            ${orderDetails.items
              .map(
                (item) => `
              <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 8px;">${item.name}</td>
                <td style="text-align: right; padding: 8px;">$${item.price.toFixed(
                  2,
                )}</td>
              </tr>
            `,
              )
              .join('')}
            <tr>
              <td style="padding: 8px; font-weight: bold;">Total</td>
              <td style="text-align: right; padding: 8px; font-weight: bold;">
                $${orderDetails.total.toFixed(2)}
              </td>
            </tr>
          </table>
        </div>
        <p style="color: #666; font-size: 14px; margin-top: 30px;">
          If you have any questions about your order, please contact our support team.
        </p>
      </div>
    `,
  });
};

export const sendPasswordReset = async (to: string, resetLink: string) => {
  await sendEmail({
    to,
    from: config.email.from,
    subject: 'Password Reset - FullBoosts',
    text: `Reset your password using this link: ${resetLink}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #333; text-align: center;">Reset Your Password</h1>
        <p>We received a request to reset your password. Click the button below to create a new password:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetLink}" 
             style="background-color: #2196F3; color: white; padding: 12px 24px; 
                    text-decoration: none; border-radius: 4px; font-weight: bold;">
            Reset Password
          </a>
        </div>
        <p>If you didn't request this change, you can safely ignore this email.</p>
        <p>This link will expire in 1 hour.</p>
      </div>
    `,
  });
};

export const sendWelcomeEmail = async (to: string, username: string) => {
  await sendEmail({
    to,
    from: config.email.from,
    subject: 'Welcome to FullBoosts! 🎮',
    text: `Welcome to FullBoosts, ${username}!`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #333; text-align: center;">Welcome to FullBoosts! 🎮</h1>
        <p>Hi ${username},</p>
        <p>Thank you for joining FullBoosts! We're excited to have you as part of our gaming community.</p>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 4px; margin: 20px 0;">
          <h2 style="color: #444; margin-top: 0;">Getting Started</h2>
          <ul style="padding-left: 20px;">
            <li>Browse our available services</li>
            <li>Check out our current promotions</li>
            <li>Connect with other gamers</li>
            <li>Track your orders in your dashboard</li>
          </ul>
        </div>
        <p style="color: #666; font-size: 14px;">
          If you have any questions, our support team is here to help!
        </p>
      </div>
    `,
  });
};
