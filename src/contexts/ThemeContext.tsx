'use client';

import {
  createContext,
  useState,
  ReactNode,
  useEffect,
  SetStateAction,
  Dispatch,
} from 'react';
import { themes } from '@/components/CLIComponent/themes';

type Theme = Record<string, string>;

type ThemeContextType = {
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: themes.classic,
  setTheme: () => {},
});

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(themes.classic);

  // Effect to apply the theme to the body element
  useEffect(() => {
    for (const [property, value] of Object.entries(theme)) {
      document.body.style.setProperty(`--${property}`, value);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
