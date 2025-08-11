import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
      // Custom 2xl wie bei Tailwind (1920px)
      xxl: 1920,
    } as any,
  },
});

export default theme;
