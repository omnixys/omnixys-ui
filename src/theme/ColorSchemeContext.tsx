// src/theme/ColorSchemeContext.tsx
'use client';

import React, { createContext, useContext } from 'react';
import { useSettings } from '../context/SettingsContext';
import { OmnixysColorScheme } from './theme';

interface ColorSchemeContextValue {
  scheme: OmnixysColorScheme;
  setScheme: (scheme: OmnixysColorScheme) => void;
}

const ColorSchemeContext = createContext<ColorSchemeContextValue | undefined>(
  undefined,
);

export const useColorScheme = (): ColorSchemeContextValue => {
  const ctx = useContext(ColorSchemeContext);
  if (!ctx)
    throw new Error('useColorScheme must be used within ColorSchemeProvider');
  return ctx;
};

export const ColorSchemeProvider = ({
  children,
}: {
  initialScheme?: OmnixysColorScheme;
  children: React.ReactNode;
}) => {
  const { settings, updateSettings, loading } = useSettings();

  if (loading) return null;

  const scheme = settings.colorScheme;

  const value: ColorSchemeContextValue = {
    scheme,
    setScheme: (newScheme) => updateSettings({ colorScheme: newScheme }),
  };

  return (
    <ColorSchemeContext.Provider value={value}>
      {children}
    </ColorSchemeContext.Provider>
  );
};
