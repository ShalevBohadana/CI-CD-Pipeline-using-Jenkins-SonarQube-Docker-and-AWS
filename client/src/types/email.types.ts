// src/types/email.types.ts
export type EmailType = 'verification' | 'welcome' | 'order' | 'password_reset' | 'report';

export interface EmailLog {
  id: string;
  to: string;
  subject: string;
  emailType: EmailType;
  status: 'success' | 'failed';
  error?: string;
  createdAt: string;
}

export interface EmailFilters {
  emailType?: EmailType;
  status?: 'success' | 'failed';
}
