// src/contexts/AuthContext.tsx
import { useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabaseClient';
import { AuthContext, type AuthState } from './auth-context';

/**
 * AuthProvider (v0.5 stub):
 * - Reads current Supabase session on mount
 * - Subscribes to auth state changes
 * - Exposes { userId, isLoading } via AuthContext
 * NOTE: This file exports ONLY a React component to satisfy
 *       react-refresh/only-export-components.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      const { data, error } = await supabase.auth.getSession();
      if (!isMounted) return;

      if (error) {
        setUserId(null);
      } else {
        const session: Session | null = data?.session ?? null;
        setUserId(session?.user?.id ?? null);
      }
      setIsLoading(false);
    })().catch(() => {
      if (!isMounted) return;
      setUserId(null);
      setIsLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!isMounted) return;
      setUserId(session?.user?.id ?? null);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const value: AuthState = useMemo(() => ({ userId, isLoading }), [userId, isLoading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
