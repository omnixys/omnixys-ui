// src/components/layout/Sidebar.tsx
"use client";

import * as React from "react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Toolbar,
  Typography,
  Divider,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

type NavItem = {
  href: string;
  label: string;
  icon: React.ReactNode; // z. B. <Layout size={20} />
};

type SidebarProps = {
  collapsed: boolean;
  onToggle: () => void;
  items: NavItem[];
  logoUrl?: string;
  appName?: string;
};

const COLLAPSED_WIDTH = 64;   // md:w-16
const EXPANDED_WIDTH  = 256;  // w-64

export default function Sidebar({
  collapsed,
  onToggle,
  items,
  logoUrl = "https://s3-inventorymanagement.s3.us-east-2.amazonaws.com/logo.png",
  appName = "EDSTOCK",
}: SidebarProps) {
  const pathname = usePathname();
  const width = collapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH;

  return (
    <Drawer
      variant="permanent"
      PaperProps={{
        sx: {
          position: "fixed",
          whiteSpace: "nowrap",
          width,
          overflowX: "hidden",
          boxSizing: "border-box",
          transition: (t) =>
            t.transitions.create("width", {
              duration: t.transitions.duration.standard,
            }),
          borderRight: (t) => `1px solid ${t.palette.divider}`,
        },
      }}
      open
    >
      {/* TOP BAR */}
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "space-between",
          px: 2,
          gap: 1.5,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, minWidth: 0 }}>
          <Avatar
            src={logoUrl}
            alt="logo"
            sx={{ width: 32, height: 32, borderRadius: 1 }}
            imgProps={{ referrerPolicy: "no-referrer" }}
          />
          {!collapsed && (
            <Typography
              variant="h6"
              fontWeight={800}
              noWrap
              sx={{ letterSpacing: 0.5 }}
            >
              {appName}
            </Typography>
          )}
        </Box>

        {/* Mobile/Small toggle button (sichtbar wenn expanded Platz hat) */}
        {!collapsed && (
          <IconButton onClick={onToggle} edge="end" sx={{ display: { xs: "inline-flex", md: "none" } }}>
            <MenuIcon fontSize="small" />
          </IconButton>
        )}
      </Toolbar>

      <Divider />

      {/* LINKS */}
      <List sx={{ px: 1, py: 1 }}>
        {items.map((item) => {
          const isActive = pathname === item.href || (pathname === "/" && item.href === "/dashboard");

          return (
            <ListItemButton
              key={item.href}
              component={NextLink}
              href={item.href}
              selected={isActive}
              sx={{
                mb: 0.5,
                borderRadius: 2,
                justifyContent: collapsed ? "center" : "flex-start",
                px: collapsed ? 1 : 2,
                py: 1.25,
                "&.Mui-selected": {
                  bgcolor: "primary.light",
                  color: "primary.contrastText",
                  "&:hover": { bgcolor: "primary.light" },
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: collapsed ? 0 : 1.5,
                  color: isActive ? "primary.contrastText" : "text.secondary",
                }}
              >
                {/* Lucide-Icon (oder MUI) direkt als Node */}
                <Box sx={{ display: "inline-flex", alignItems: "center" }}>
                  {item.icon}
                </Box>
              </ListItemIcon>
              {!collapsed && (
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{ variant: "body2", fontWeight: 600 }}
                />
              )}
            </ListItemButton>
          );
        })}
      </List>

      {/* FOOTER */}
      {!collapsed && (
        <Box sx={{ mt: "auto", px: 2, pb: 3 }}>
          <Divider sx={{ mb: 1.5 }} />
          <Typography variant="caption" color="text.secondary" display="block" textAlign="center">
            © 2024 Edstock
          </Typography>
        </Box>
      )}
    </Drawer>
  );
}
