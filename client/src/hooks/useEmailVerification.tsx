import { useState, useCallback } from 'react';

interface VerificationStatus {
  isVerified: boolean;
  isPending: boolean;
  token: string | null;
}

interface UseEmailVerificationReturn {
  verificationStatus: VerificationStatus;
  isLoading: boolean;
  error: string | null;
  sendVerificationEmail: (email: string) => Promise<void>;
  verifyEmail: (token: string) => Promise<void>;
  resendVerification: (email: string) => Promise<void>;
  clearError: () => void;
}

interface VerificationResponse {
  success: boolean;
  message: string;
}

export const useEmailVerification = (): UseEmailVerificationReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>({
    isVerified: false,
    isPending: false,
    token: null,
  });

  const handleApiError = (err: unknown) => {
    const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
    setError(errorMessage);
    throw err;
  };

  const sendVerificationEmail = async (email: string): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/email/verify/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data: VerificationResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send verification email');
      }

      setVerificationStatus((prev) => ({
        ...prev,
        isPending: true,
      }));
    } catch (err) {
      handleApiError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const verifyEmail = async (token: string): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/email/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      const data: VerificationResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Email verification failed');
      }

      setVerificationStatus({
        isVerified: true,
        isPending: false,
        token,
      });
    } catch (err) {
      handleApiError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const resendVerification = async (email: string): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/email/verify/resend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data: VerificationResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to resend verification email');
      }

      setVerificationStatus((prev) => ({
        ...prev,
        isPending: true,
      }));
    } catch (err) {
      handleApiError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    verificationStatus,
    isLoading,
    error,
    sendVerificationEmail,
    verifyEmail,
    resendVerification,
    clearError,
  };
};
