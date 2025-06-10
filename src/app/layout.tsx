"use client";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { SessionProvider } from "next-auth/react";
import Navbar from "../components/Navbar";
import { ColorModeProvider, useColorMode } from "../theme/ColorModeContext";
import { SettingsProvider } from "../context/SettingsContext";
import { Inter } from "next/font/google";
import { ColorSchemeProvider, useColorScheme } from "../theme/ColorSchemeContext";
import themeFactory from "../theme/theme";
import { SidebarProvider } from "../context/SidebarContext";
import SettingsGate from "./settings/SettingsGate";
import { MotionProvider } from "../components/common/MotionProvider";
import MotionLayout from "../components/common/MotionLayout";
import { ProgressBarProvider } from "../components/common/PageProgressBar";
import NavigationProgress from "../components/common/NavigationProgress";

const inter = Inter({ subsets: ["latin"] });

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