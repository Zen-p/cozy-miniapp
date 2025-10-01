import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getTelegramWebApp } from '../utils/telegram';

type Theme = 'light' | 'dark';

type ThemeContextValue = {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggle: () => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function applyThemeClass(theme: Theme) {
  const root = document.documentElement;
  if (theme === 'dark') root.classList.add('dark');
  else root.classList.remove('dark');
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light');

  // initial: telegram colorScheme -> storage -> media
  useEffect(() => {
    const webApp = getTelegramWebApp();
    const tgScheme = (webApp?.colorScheme as Theme | undefined);
    const saved = (localStorage.getItem('cozy_theme') as Theme | null);
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial: Theme = saved || tgScheme || (prefersDark ? 'dark' : 'light');
    setThemeState(initial);
    applyThemeClass(initial);

    // subscribe to Telegram themeChanged
    if (webApp?.onEvent) {
      const handler = () => {
        const next = (webApp.colorScheme as Theme) || 'light';
        setThemeState(next);
        localStorage.setItem('cozy_theme', next);
        applyThemeClass(next);
      };
      webApp.onEvent('themeChanged', handler);
      return () => webApp.offEvent?.('themeChanged', handler as any);
    }
  }, []);

  const setTheme = (t: Theme) => {
    setThemeState(t);
    localStorage.setItem('cozy_theme', t);
    applyThemeClass(t);
  };

  const toggle = () => setTheme(theme === 'light' ? 'dark' : 'light');

  const value = useMemo(() => ({ theme, setTheme, toggle }), [theme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}


