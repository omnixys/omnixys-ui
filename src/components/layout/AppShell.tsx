"use client";

import { Box, Toolbar, useMediaQuery, useTheme } from "@mui/material";
import Navbar from "../Navbar";
import AnalyticsSidebar from "../AnalyticsSidebar";

const drawerWidth = 260;

export default function AppShell({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Navbar />
      <AnalyticsSidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          ml: isMobile ? 0 : `${drawerWidth}px`,
          transition: "margin 0.3s ease",
        }}
      >
        {/* Abstand für feste Navbar */}
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
