// src/modules/mailing/mailing.service.ts
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import { createTransport } from 'nodemailer';
import { URL, URLSearchParams } from 'url'; // Add this import

import config, { SITE_INFO } from '@/config';
import ApiError from '@/errors/ApiError';

import {
  EmailType,
  IEmailVerificationPayload,
  IMailOptions,
  IOrderEmailDetails,
  IPasswordResetDetails,
  IWelcomeEmailDetails,
} from './mailing.interface';
import EmailLog from './mailing.model';

class MailingService {
  private transporter;
  private defaultFromEmail: string;

  constructor() {
    if (
      !config.mailer?.host ||
      !config.mailer?.auth?.user ||
      !config.mailer?.auth?.pass
    ) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Missing mail configuration');
    }

    this.transporter = createTransport({
      host: config.mailer.host,
      port: config.mailer.port,
      secure: config.mailer.secure,
      auth: {
        user: config.mailer.auth.user,
        pass: config.mailer.auth.pass,
      },
    });

    this.defaultFromEmail = config.email.from;
  }

  private async logEmailAttempt(
    to: string,
    subject: string,
    emailType: EmailType,
    success: boolean,
    error?: string,
    metadata?: Record<string, any>,
  ) {
    await EmailLog.create({
      to,
      subject,
      type: 'email',
      emailType,
      status: success ? 'success' : 'failed',
      error,
      metadata,
      createdAt: new Date(),
    });
  }

  async sendEmail(
    options: IMailOptions,
    emailType: EmailType,
    metadata?: Record<string, any>,
  ): Promise<void> {
    try {
      await this.logEmailAttempt(
        options.to,
        options.subject,
        emailType,
        true,
        undefined,
        metadata,
      );
    } catch (error) {
      console.error('Error sending email:', error);
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      await this.logEmailAttempt(
        options.to,
        options.subject,
        emailType,
        false,
        errorMessage,
        metadata,
      );
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error sending email');
    }
  }

  async sendEmailVerification(
    payload: IEmailVerificationPayload,
  ): Promise<void> {
    if (!config.email_verify_token) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        'Missing email verification token',
      );
    }

    const token = jwt.sign(payload, config.email_verify_token, {
      expiresIn: '1h',
    });

    const verifyLink = new URL(`${SITE_INFO.API}/auth/verify/email`);
    const searchQuery = new URLSearchParams();
    searchQuery.append('token', token);
    verifyLink.search = searchQuery.toString();

    await this.sendEmail(
      {
        to: payload.email,
        subject: 'Email verification - FullBoosts',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1>Email Verification</h1>
            <p>Please verify your email address by clicking the button below:</p>
            <a href="${verifyLink.href}" 
               style="display: inline-block; background: #4CAF50; color: white; 
                      padding: 12px 24px; text-decoration: none; border-radius: 4px;">
              Verify Email
            </a>
            <p>Or copy and paste this link: ${verifyLink.href}</p>
            <p>This link will expire in 1 hour.</p>
          </div>
        `,
      },
      'verification',
      { userId: payload.userId },
    );
  }

  async sendOrderConfirmation(details: IOrderEmailDetails): Promise<void> {
    const itemsList = details.items
      .map(
        (item) => `
        <tr>
          <td style="padding: 8px;">${item.name}</td>
          <td style="padding: 8px; text-align: right;">$${item.price.toFixed(
            2,
          )}</td>
        </tr>
      `,
      )
      .join('');

    await this.sendEmail(
      {
        to: details.orderId,
        subject: 'Order Confirmation - FullBoosts',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1>Order Confirmation</h1>
            <p>Order ID: ${details.orderId}</p>
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr>
                  <th style="padding: 8px; text-align: left;">Item</th>
                  <th style="padding: 8px; text-align: right;">Price</th>
                </tr>
              </thead>
              <tbody>
                ${itemsList}
                <tr>
                  <td style="padding: 8px; font-weight: bold;">Total</td>
                  <td style="padding: 8px; text-align: right; font-weight: bold;">
                    $${details.total.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        `,
      },
      'order',
      { orderId: details.orderId },
    );
  }

  async sendPasswordReset(details: IPasswordResetDetails): Promise<void> {
    await this.sendEmail(
      {
        to: details.to,
        subject: 'Password Reset - FullBoosts',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1>Password Reset</h1>
            <p>Click the button below to reset your password:</p>
            <a href="${details.resetLink}" 
               style="display: inline-block; background: #2196F3; color: white; 
                      padding: 12px 24px; text-decoration: none; border-radius: 4px;">
              Reset Password
            </a>
            <p>Or copy and paste this link: ${details.resetLink}</p>
            <p>This link will expire in 1 hour.</p>
          </div>
        `,
      },
      'password_reset',
      { resetToken: details.resetToken },
    );
  }

  async sendEmailForReport(to: string, reason: string): Promise<void> {
    await this.sendEmail(
      {
        to,
        subject: 'New Report - FullBoosts',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1>New Report Received</h1>
            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 4px; margin: 20px 0;">
              <h2 style="margin-top: 0; color: #333;">Report Details</h2>
              <p style="color: #666; line-height: 1.6;">${reason}</p>
            </div>
            <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee;">
              <p style="color: #666; font-size: 14px;">
                This report was submitted through the FullBoosts reporting system.
                Please review and take appropriate action.
              </p>
            </div>
          </div>
        `,
      },
      'report',
      { reportReason: reason },
    );
  }

  async sendWelcomeEmail(details: IWelcomeEmailDetails): Promise<void> {
    await this.sendEmail(
      {
        to: details.to,
        subject: 'Welcome to FullBoosts! 🎮',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1>Welcome to FullBoosts! 🎮</h1>
            <p>Hi ${details.username},</p>
            <p>Thank you for joining FullBoosts! We're excited to have you as part of our gaming community.</p>
            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 4px;">
              <h2 style="margin-top: 0;">Getting Started</h2>
              <ul>
                <li>Browse our available services</li>
                <li>Check out our current promotions</li>
                <li>Connect with other gamers</li>
                <li>Track your orders in your dashboard</li>
              </ul>
            </div>
          </div>
        `,
      },
      'welcome',
      { username: details.username },
    );
  }

  async getEmailLogs(
    filters: Partial<{
      emailType: EmailType;
      status: 'success' | 'failed';
    }> = {},
  ) {
    return EmailLog.find(filters).sort({ createdAt: -1 });
  }
}

export const mailingService = new MailingService();
