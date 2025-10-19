// src/lib/auth.ts
import { supabase } from './supabaseClient';
import { logError, AppError } from '../utils/errorLogger';
import type { Provider, Session } from '@supabase/supabase-js';

/**
 * Sign in with OAuth provider with error handling
 */
export async function signInWithOAuth(provider: Provider): Promise<void> {
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      throw new AppError(
        `Failed to sign in with ${provider}`,
        'AUTH_ERROR',
        { component: 'auth', action: 'signInWithOAuth', metadata: { provider } },
        error
      );
    }

    // OAuth redirect happens automatically
  } catch (error) {
    logError(error, { component: 'auth', action: 'signInWithOAuth', metadata: { provider } });
    throw error;
  }
}

/**
 * Sign out with error handling
 */
export async function signOut(): Promise<void> {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw new AppError(
        'Failed to sign out',
        'AUTH_ERROR',
        { component: 'auth', action: 'signOut' },
        error
      );
    }
  } catch (error) {
    logError(error, { component: 'auth', action: 'signOut' });
    throw error;
  }
}

/**
 * Get current session with error handling
 */
export async function getSession(): Promise<Session | null> {
  try {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      throw new AppError(
        'Failed to get session',
        'AUTH_ERROR',
        { component: 'auth', action: 'getSession' },
        error
      );
    }

    return data.session;
  } catch (error) {
    logError(error, { component: 'auth', action: 'getSession' });
    return null;
  }
}

/**
 * Listen to auth state changes
 */
export function onAuthStateChange(callback: (session: Session | null) => void) {
  return supabase.auth.onAuthStateChange((_event, session) => {
    callback(session);
  });
}
