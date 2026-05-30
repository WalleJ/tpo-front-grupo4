import { createContext, useEffect, useMemo, useState } from 'react';
import type { PropsWithChildren } from 'react';
import type { ThemeMode } from '@/types/common.types';

interface ThemeContextValue {
  theme: ThemeMode;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: PropsWithChildren) {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const stored = localStorage.getItem('aio-theme');
    return stored === 'dark' ? 'dark' : 'light';
  });

  const toggleTheme = () => {
    setTheme((prev: ThemeMode) => {
      const next = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('aio-theme', next);
      document.documentElement.classList.toggle('dark', next === 'dark');
      document.documentElement.classList.toggle('light', next === 'light');
      return next;
    });
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.classList.toggle('light', theme === 'light');
  }, [theme]);

  const value = useMemo(() => ({ theme, toggleTheme }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}