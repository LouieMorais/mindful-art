// src/contexts/AuthContext.tsx
import { useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabaseClient';
import { logError } from '../utils/errorLogger';
import { AuthContext, type AuthState } from './auth-context';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    // Get initial session
    void (async () => {
      try {
        const { data, error } = await supabase.auth.getSession();

        if (!isMounted) return;

        if (error) {
          logError(error, { component: 'AuthContext', action: 'getSession' });
          setUserId(null);
        } else {
          const session: Session | null = data?.session ?? null;
          setUserId(session?.user?.id ?? null);
        }
      } catch (error) {
        if (!isMounted) return;
        logError(error, { component: 'AuthContext', action: 'getSession' });
        setUserId(null);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    })();

    // Subscribe to auth changes
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
