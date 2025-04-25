// src/modules/mailing/mailing.interface.ts
import { Document } from 'mongoose';

export interface IMailOptions {
  to: string;
  from?: string;
  subject: string;
  text?: string;
  html: string;
}

export interface IEmailVerificationPayload {
  email: string;
  userId: string;
}

export interface IOrderEmailDetails {
  orderId: string;
  items: Array<{ name: string; price: number }>;
  total: number;
}

export interface IReportEmailDetails {
  to: string;
  reason: string;
}

export interface IPasswordResetDetails {
  to: string;
  resetToken: string;
  resetLink: string;
}

export interface IWelcomeEmailDetails {
  to: string;
  username: string;
}

export interface IEmailLog extends Document {
  to: string;
  subject: string;
  type: string;
  status: 'success' | 'failed';
  error?: string;
  createdAt: Date;
  emailType: EmailType;
  metadata?: Record<string, any>;
}

export type EmailType =
  | 'verification'
  | 'order'
  | 'report'
  | 'password_reset'
  | 'welcome';
