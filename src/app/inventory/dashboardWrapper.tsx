// src/app/(dashboard)/DashboardWrapper.tsx
"use client";

import * as React from "react";
import { CssBaseline, ThemeProvider, createTheme, Box } from "@mui/material";   // die MUI-Version aus vorher
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import { Archive, CircleDollarSign, Clipboard, Layout, SlidersHorizontal, User } from "lucide-react";

export default function DashboardWrapper({ children }: { children: React.ReactNode }) {
  // Local UI state statt Redux
  const [collapsed, setCollapsed] = React.useState(false);
  const [mode, setMode] = React.useState<"light" | "dark">("light");

  const theme = React.useMemo(() => createTheme({ palette: { mode } }), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default", color: "text.primary" }}>
        {/* Sidebar (permanent) */}
        <Sidebar
          collapsed={collapsed}
          onToggle={() => setCollapsed((v) => !v)}
          items={[
            { href: "/inventory/dashboard", label: "Dashboard", icon: <Layout size={20} /> },
            { href: "/inventory/inventory", label: "Inventory", icon: <Archive size={20} /> },
            { href: "/inventory/products", label: "Products", icon: <Clipboard size={20} /> },
            { href: "/inventory/users", label: "Users", icon: <User size={20} /> },
            { href: "/inventory/settings", label: "Settings", icon: <SlidersHorizontal size={20} /> },
            { href: "/inventory/expenses", label: "Expenses", icon: <CircleDollarSign size={20} /> },
          ]}
        />

        {/* Content */}
        <Box
          component="main"
          sx={{
            flex: 1,
            ml: `${collapsed ? 64 : 256}px`, // identisch mit Sidebar-Breiten
            transition: (t) => t.transitions.create("margin-left"),
            p: { xs: 2, md: 3 },
          }}
        >
          <Navbar
            isSidebarCollapsed={collapsed}
            onToggleSidebar={() => setCollapsed((v) => !v)}
            isDarkMode={mode === "dark"}
            onToggleDarkMode={() => setMode((m) => (m === "dark" ? "light" : "dark"))}
            notificationsCount={3}
            userName="admin"
          />
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
