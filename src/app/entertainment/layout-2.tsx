'use client';

import { CssBaseline, ThemeProvider } from '@mui/material';
import { ReactNode } from 'react';
import themeFactory from '../../theme/theme';
import Layout from './components/Layout';

export default function RootLayout({ children }: { children: ReactNode }) {
  const theme = themeFactory('light', 'original'); // Omnixys Branding
  return (
    <html lang="de">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Layout>{children}</Layout>
        </ThemeProvider>
      </body>
    </html>
  );
}
