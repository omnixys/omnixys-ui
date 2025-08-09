// src/theme.ts
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  cssVariables: true,
  colorSchemes: {
    light: {
      palette: {
        primary: { main: '#4f46e5' },
        secondary: { main: '#06b6d4' },
        background: { default: '#fafafa' },
      },
    },
    dark: {
      palette: {
        primary: { main: '#818cf8' },
        secondary: { main: '#22d3ee' },
        background: { default: '#0b0f19' },
      },
    },
  },
  shape: { borderRadius: 16 },
  components: {
    MuiButton: {
      defaultProps: { variant: 'contained', disableElevation: true },
      styleOverrides: { root: { textTransform: 'none', borderRadius: 14 } },
    },
  },
});
