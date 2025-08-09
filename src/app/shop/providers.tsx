'use client';

import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import * as React from 'react';
import { Toaster } from 'react-hot-toast';
import { AppContextProvider } from './context/AppContext';

const theme = createTheme({
  palette: {
    primary: { main: '#ea580c' },
    secondary: { main: '#1f2937' },
  },
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppContextProvider>{children}</AppContextProvider>
      <Toaster />
    </ThemeProvider>
  );
}
