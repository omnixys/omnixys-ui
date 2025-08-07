'use client';

import { CssBaseline, ThemeProvider } from '@mui/material';
import { SessionProvider } from 'next-auth/react';
import { Inter } from 'next/font/google';
import MotionLayout from '../components/common/MotionLayout';
import { MotionProvider } from '../components/common/MotionProvider';
import NavigationProgress from '../components/common/NavigationProgress';
import { ProgressBarProvider } from '../components/common/PageProgressBar';
import Navbar from '../components/Navbar';
import { SettingsProvider } from '../context/SettingsContext';
import { SidebarProvider } from '../context/SidebarContext';
import { ColorModeProvider, useColorMode } from '../theme/ColorModeContext';
import {
  ColorSchemeProvider,
  useColorScheme,
} from '../theme/ColorSchemeContext';
import themeFactory from '../theme/theme';
import SettingsGate from './settings/SettingsGate';

const inter = Inter({ subsets: ['latin'] });

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SettingsProvider>
      <SettingsGate>
        <ColorModeProvider>
          <ColorSchemeProvider>
            <SidebarProvider>
              <ThemeWrapper>
                <ProgressBarProvider>
                  <MotionProvider>
                    <NavigationProgress />
                    {/* <PageTransitionOverlay /> */}
                    <MotionLayout>{children}</MotionLayout>
                  </MotionProvider>
                </ProgressBarProvider>
              </ThemeWrapper>
            </SidebarProvider>
          </ColorSchemeProvider>
        </ColorModeProvider>
      </SettingsGate>
    </SettingsProvider>
  );
}

function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { scheme } = useColorScheme();
  const { mode } = useColorMode(); // optional: erweitern, falls du den Modus im Kontext speicherst
  const theme = themeFactory(mode, scheme);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      {children}
    </ThemeProvider>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <Providers>{children}</Providers>
        </SessionProvider>
      </body>
    </html>
  );
}
