// src/theme/ColorModeContext.tsx
'use client';

import { PaletteMode } from '@mui/material';
import React, { createContext, useContext } from 'react';
import { useSettings } from '../context/SettingsContext';

interface ColorModeContextValue {
  mode: PaletteMode;
  toggleColorMode: () => void;
}

const ColorModeContext = createContext<ColorModeContextValue | undefined>(
  undefined,
);

export const useColorMode = (): ColorModeContextValue => {
  const ctx = useContext(ColorModeContext);
  if (!ctx)
    throw new Error('useColorMode must be used within ColorModeProvider');
  return ctx;
};

export const ColorModeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { settings, updateSettings, loading } = useSettings();

  if (loading) return null; // Verhindert falschen Theme-Render

  const mode = settings.colorMode ?? 'light';

  const value: ColorModeContextValue = {
    mode,
    toggleColorMode: () => {
      const newMode: PaletteMode = mode === 'light' ? 'dark' : 'light';
      updateSettings({ colorMode: newMode });
    },
  };

  // const theme = useMemo(
  //   () => themeFactory(mode, settings.colorScheme),
  //   [mode, settings.colorScheme]
  // );

  return (
    <ColorModeContext.Provider value={value}>
      {/* <ThemeProvider theme={theme}>
        <CssBaseline /> */}
      {children}
      {/* </ThemeProvider> */}
    </ColorModeContext.Provider>
  );
};
