// app/ThemeRegistry.tsx
"use client";

import * as React from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  // Theme nur im Client erzeugen -> keine Funktionsobjekte vom Server serialisieren
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: { mode: "dark" }, // oder "light"
        // optional: eigene Breakpoints, Typography etc.
      }),
    []
  );

  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
