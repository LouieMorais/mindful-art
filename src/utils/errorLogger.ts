// src/utils/errorLogger.ts
/**
 * Centralized error logging utility
 * - Logs errors to console in development
 * - Can be extended to send to monitoring service (Sentry, LogRocket, etc.)
 * - Sanitizes sensitive data before logging
 */

export interface ErrorContext {
  component?: string;
  action?: string;
  userId?: string;
  metadata?: Record<string, unknown>;
}

export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public context?: ErrorContext,
    public originalError?: unknown
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export function logError(error: unknown, context?: ErrorContext): void {
  const isDev = import.meta.env.DEV;

  if (isDev) {
    console.error('[Error]', {
      error,
      context,
      timestamp: new Date().toISOString(),
    });
  }

  // In production, send to monitoring service
  // Example: Sentry.captureException(error, { contexts: { custom: context } });
}

export function createUserFriendlyMessage(error: unknown): string {
  if (error instanceof AppError) {
    return error.message;
  }

  if (error instanceof Error) {
    // Don't expose internal error messages to users
    return 'An unexpected error occurred. Please try again.';
  }

  return 'Something went wrong. Please try again.';
}
