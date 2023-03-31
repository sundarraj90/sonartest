import { createContext, useState, useMemo } from 'react';
import { createTheme } from '@mui/material/styles';
import typography from './typography';
import colorTokens from './colors';
import { type Theme } from '@emotion/react';

export const themeSettings = (mode: string): Record<string, unknown> => {
  const colors = colorTokens(mode);

  return {
    palette: {
      mode,
      ...(mode === 'dark'
        ? {
          primary: {
            main: colors.primary[500],
            light: colors.primary[600],
            dark: colors.primary[400],
          },
          secondary: {
            main: colors.primaryGreen[500],
          },
          neutral: {
            dark: colors.gray[700],
            main: colors.gray[500],
            light: colors.gray[100],
          },
          background: {
            default: colors.primaryBg[500],
          },
          danger: {
            main: colors.primaryRed[100],
          },
        }
        : {
          primary: {
            main: colors.primary[200],
            light: colors.primary[300],
            dark: colors.primary[100],
          },
          secondary: {
            main: colors.primaryGreen[500],
          },
          neutral: {
            dark: colors.gray[700],
            main: colors.gray[500],
            light: colors.gray[100],
          },
          background: {
            default: colors.primaryBg[900],
          },
          danger: {
            main: colors.primaryRed[100],
          },
        }),
    },
    typography,
  };
};

/* context for color mode */
export const ColorModeContext = createContext({
  toggleColorMode: () => {
    /* togle color mode here */
  },
});

export const useMode = (): [theme: Theme, colorMode: { toggleColorMode: () => void; }] => {
  const [mode, setMode] = useState<string>('light');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return [theme, colorMode];
};



export const colorTheme = colorTokens;
