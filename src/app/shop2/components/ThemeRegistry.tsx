// src/components/ThemeRegistry.tsx
'use client';

import { CssBaseline } from '@mui/material';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import * as React from 'react';
import { theme } from '../theme';

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CssVarsProvider theme={theme} defaultMode="system">
      <CssBaseline />
      {children}
    </CssVarsProvider>
  );
}
