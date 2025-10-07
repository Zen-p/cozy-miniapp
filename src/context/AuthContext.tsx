import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

type AuthContextValue = {
  token: string | null;
  isAuthenticated: boolean;
  ready: boolean;
  login: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Do not auto-authenticate from localStorage; require fresh login per session
    setReady(true);
  }, []);

  const login = (newToken: string) => {
    localStorage.setItem('cozy_token', newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem('cozy_token');
    setToken(null);
  };

  const value = useMemo(
    () => ({ token, isAuthenticated: !!token, ready, login, logout }),
    [token, ready]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext must be used within AuthProvider');
  return ctx;
}


