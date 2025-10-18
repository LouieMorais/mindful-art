// src/contexts/auth-context.ts
import { createContext } from 'react';

export interface AuthState {
  userId: string | null;
  isLoading: boolean;
}

/**
 * Context only. No components exported from this file.
 * This avoids the react-refresh/only-export-components rule.
 */
export const AuthContext = createContext<AuthState | undefined>(undefined);
