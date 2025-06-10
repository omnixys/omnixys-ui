// app/components/Layout.tsx
"use client";

import { Box, CssBaseline } from "@mui/material";
import { useState } from "react";
import Header from "./Header";
import SideNavbar from "./SideNavbar";
import Footer from "./Footer";

const headerHeight = 64;
const footerHeight = 50;

export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false); // Sidebar-Status

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen); // Toggle Funktion

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#ffffff",
      }}
    >
      <CssBaseline />

      {/* Header */}
      <Header toggleSidebar={toggleSidebar} />

      {/* Platz für den Header */}
      <Box sx={{ height: `${headerHeight}px` }} />

      {/* Main Content mit Sidebar */}
      <Box sx={{ display: "flex", flexGrow: 1, position: "relative" }}>
        {/* Sidebar */}
        <Box
          sx={{
            //position: "absolute",
            position: "absolute",
            top: 0,
            left: sidebarOpen ? 0 : "-240px",
            height: `calc(100vh - ${headerHeight}px)`,
            transition: "left 0.3s ease-in-out",
            zIndex: 10,
          }}
        >
          <SideNavbar
            sidebarOpen={sidebarOpen}
            headerHeight={headerHeight}
            footerHeight={footerHeight}
          />
        </Box>

        {/* Hauptinhalt */}
        <Box
          sx={{
            flexGrow: 1,
            px: 3,
            pl: 10,
            py: 2,
          }}
        >
          {children}
        </Box>
      </Box>

      {/* Footer */}
      <Box overflow={"hidden"}>
        <Footer />
      </Box>
    </Box>
  );
}
