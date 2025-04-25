import { EmailType } from '@/types/email.types';
import { useState } from 'react';

interface EmailLog {
  id: string;
  to: string;
  subject: string;
  emailType: EmailType;
  status: 'success' | 'failed';
  error?: string;
  createdAt: string;
}

export const useEmailManagement = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [logs, setLogs] = useState<EmailLog[]>([]);

  const fetchEmailLogs = async (
    filters?: Partial<{ emailType: EmailType; status: 'success' | 'failed' }>
  ) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        '/api/email/logs' + (filters ? `?${new URLSearchParams(filters as any)}` : '')
      );
      const data = await response.json();
      setLogs(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch email logs');
    } finally {
      setIsLoading(false);
    }
  };

  const sendVerificationEmail = async (email: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/email/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) throw new Error('Failed to send verification email');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send verification email');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    logs,
    isLoading,
    error,
    fetchEmailLogs,
    sendVerificationEmail,
  };
};
