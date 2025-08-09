'use client';

import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { PropsWithChildren } from 'react';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1976d2' },
    secondary: { main: '#ff4081' },
  },
  typography: {
    fontFamily:
      'var(--font-geist-sans), system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial',
    mono: 'var(--font-geist-mono), ui-monospace, SFMono-Regular, Menlo, Monaco',
  },
});

export default function AppProviders({ children }: PropsWithChildren) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
