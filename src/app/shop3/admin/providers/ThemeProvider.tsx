"use client";

import * as React from "react";
import {
  CssVarsProvider,
  useColorScheme,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { extendTheme } from '@mui/material/styles';

/**
 * 1) MUI Theme, das Light/Dark Paletten bekommt
 *    (du kannst die Farben gerne feiner abstimmen)
 */


const theme = extendTheme({
  cssVarPrefix: 'app',
  colorSchemes: {
    light: {
      palette: {
        primary: { main: '#1976d2' }, // kein oklch(), nur Hex/RGB/HSL
        secondary: { main: 'rgb(156, 39, 176)' },
      },
    },
    dark: {
      palette: {
        primary: { main: '#90caf9' },
        secondary: { main: '#f48fb1' },
      },
    },
  },
});

export default theme;

/**
 * 2) Deine Custom-CSS-Variablen als GlobalStyles
 *    Wir binden sie an das MUI Color-Scheme-Attribut:
 *    - :root                               (light)
 *    - [data-mui-color-scheme="dark"]      (dark)
 */
const Vars = (
  <GlobalStyles
    styles={{
      ":root": {
        // Radii
        "--radius": "0.625rem",
        "--radius-sm": "calc(var(--radius) - 4px)",
        "--radius-md": "calc(var(--radius) - 2px)",
        "--radius-lg": "var(--radius)",
        "--radius-xl": "calc(var(--radius) + 4px)",

        // Light tokens
        "--background": "oklch(1 0 0)",
        "--foreground": "oklch(0.145 0 0)",
        "--card": "oklch(1 0 0)",
        "--card-foreground": "oklch(0.145 0 0)",
        "--popover": "oklch(1 0 0)",
        "--popover-foreground": "oklch(0.145 0 0)",
        "--primary": "oklch(0.205 0 0)",
        "--primary-foreground": "oklch(0.985 0 0)",
        "--secondary": "oklch(0.97 0 0)",
        "--secondary-foreground": "oklch(0.205 0 0)",
        "--muted": "oklch(0.97 0 0)",
        "--muted-foreground": "oklch(0.556 0 0)",
        "--accent": "oklch(0.97 0 0)",
        "--accent-foreground": "oklch(0.205 0 0)",
        "--destructive": "oklch(0.577 0.245 27.325)",
        "--border": "oklch(0.922 0 0)",
        "--input": "oklch(0.922 0 0)",
        "--ring": "oklch(0.708 0 0)",

        // Charts
        "--chart-1": "oklch(0.646 0.222 41.116)",
        "--chart-2": "oklch(0.6 0.118 184.704)",
        "--chart-3": "oklch(0.398 0.07 227.392)",
        "--chart-4": "oklch(0.828 0.189 84.429)",
        "--chart-5": "oklch(0.769 0.188 70.08)",

        // Sidebar
        "--sidebar": "oklch(0.985 0 0)",
        "--sidebar-foreground": "oklch(0.145 0 0)",
        "--sidebar-primary": "oklch(0.205 0 0)",
        "--sidebar-primary-foreground": "oklch(0.985 0 0)",
        "--sidebar-accent": "oklch(0.97 0 0)",
        "--sidebar-accent-foreground": "oklch(0.205 0 0)",
        "--sidebar-border": "oklch(0.922 0 0)",
        "--sidebar-ring": "oklch(0.708 0 0)",

        // Custom
        "--custom-color": "oklch(0.6 0.2 150)",
      },

      /** Dark scheme */
      '[data-mui-color-scheme="dark"]': {
        "--background": "oklch(0.145 0 0)",
        "--foreground": "oklch(0.985 0 0)",
        "--card": "oklch(0.205 0 0)",
        "--card-foreground": "oklch(0.985 0 0)",
        "--popover": "oklch(0.205 0 0)",
        "--popover-foreground": "oklch(0.985 0 0)",
        "--primary": "oklch(0.922 0 0)",
        "--primary-foreground": "oklch(0.205 0 0)",
        "--secondary": "oklch(0.269 0 0)",
        "--secondary-foreground": "oklch(0.985 0 0)",
        "--muted": "oklch(0.269 0 0)",
        "--muted-foreground": "oklch(0.708 0 0)",
        "--accent": "oklch(0.269 0 0)",
        "--accent-foreground": "oklch(0.985 0 0)",
        "--destructive": "oklch(0.704 0.191 22.216)",
        "--border": "oklch(1 0 0 / 10%)",
        "--input": "oklch(1 0 0 / 15%)",
        "--ring": "oklch(0.556 0 0)",

        "--chart-1": "oklch(0.488 0.243 264.376)",
        "--chart-2": "oklch(0.696 0.17 162.48)",
        "--chart-3": "oklch(0.769 0.188 70.08)",
        "--chart-4": "oklch(0.627 0.265 303.9)",
        "--chart-5": "oklch(0.645 0.246 16.439)",

        "--sidebar": "oklch(0.205 0 0)",
        "--sidebar-foreground": "oklch(0.985 0 0)",
        "--sidebar-primary": "oklch(0.488 0.243 264.376)",
        "--sidebar-primary-foreground": "oklch(0.985 0 0)",
        "--sidebar-accent": "oklch(0.269 0 0)",
        "--sidebar-accent-foreground": "oklch(0.985 0 0)",
        "--sidebar-border": "oklch(1 0 0 / 10%)",
        "--sidebar-ring": "oklch(0.556 0 0)",

        "--custom-color": "oklch(0.6 0.2 150)",
      },

      /** Base layer: ersetzte Tailwind @apply */
      "*": {
        outlineColor: "var(--ring)",
      },
      body: {
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
      },
    }}
  />
);

/**
 * 3) Provider-Komponente
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <CssVarsProvider theme={theme} defaultMode="light">
      <CssBaseline />
      {Vars}
      {children}
    </CssVarsProvider>
  );
}

/** Optional: einfacher Hook für deinen Theme-Switcher */
export function useMuiThemeMode() {
  const { mode, setMode } = useColorScheme();
  return {
    mode: (mode ?? "light") as "light" | "dark",
    setMode: (m: "light" | "dark" | "system") => setMode(m),
  };
}
