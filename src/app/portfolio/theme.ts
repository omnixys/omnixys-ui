import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    secondary: { main: "#ff4081" },
    error: { main: "#f44336" },
    background: { default: "#fafafa" },
  },
  typography: {
    fontFamily: [
      "Inter",
      "system-ui",
      "Segoe UI",
      "Roboto",
      "Helvetica",
      "Arial",
      "sans-serif",
    ].join(","),
  },
});

export default theme;
