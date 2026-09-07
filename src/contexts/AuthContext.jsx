import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { isSupabaseConfigured, requireSupabase, supabase } from '../lib/supabase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(isSupabaseConfigured);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return undefined;
    }

    let isMounted = true;
    supabase.auth.getSession().then(({ data, error }) => {
      if (error) console.error('Unable to restore Supabase session:', error.message);
      if (isMounted) {
        setSession(data.session ?? null);
        setLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setLoading(false);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const value = useMemo(() => ({
    session,
    user: session?.user ?? null,
    loading,
    configured: isSupabaseConfigured,
    signInWithPassword: (email, password) => requireSupabase().auth.signInWithPassword({ email, password }),
    signUp: (email, password, fullName) => requireSupabase().auth.signUp({ email, password, options: { data: { full_name: fullName } } }),
    signInWithOAuth: (provider) =>
      requireSupabase().auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}`,
        },
      }),
    signOut: () => requireSupabase().auth.signOut(),
  }), [loading, session]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider.');
  return context;
}