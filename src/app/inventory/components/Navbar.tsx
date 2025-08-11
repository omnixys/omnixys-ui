// src/components/layout/Navbar.tsx
"use client";

import * as React from "react";
import NextLink from "next/link";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  TextField,
  InputAdornment,
  Badge,
  Avatar,
  Typography,
  Divider,
  Link as MUILink,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

type NavbarProps = {
  isSidebarCollapsed?: boolean;
  onToggleSidebar?: () => void;

  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;

  notificationsCount?: number;

  userName?: string;
  avatarUrl?: string;
};

const Navbar: React.FC<NavbarProps> = ({
  isSidebarCollapsed = false,
  onToggleSidebar,
  isDarkMode = false,
  onToggleDarkMode,
  notificationsCount = 3,
  userName = "Ed Roh",
  avatarUrl = "https://s3-inventorymanagement.s3.us-east-2.amazonaws.com/profile.jpg",
}) => {
  return (
    <AppBar
      position="static"
      color="inherit"
      elevation={1}
      sx={{
        borderRadius: 3,
        px: 2,
        mb: 3,
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          px: 2,
          gap: 2,
          justifyContent: "space-between",
        }}
      >
        {/* LEFT */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, minWidth: 0 }}>
          <IconButton
            aria-label="toggle sidebar"
            onClick={onToggleSidebar}
            edge="start"
          >
            <MenuIcon />
          </IconButton>

          <TextField
            placeholder="Start typing to search groups & products"
            size="small"
            fullWidth
            sx={{ maxWidth: 360 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* RIGHT */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton aria-label="toggle theme" onClick={onToggleDarkMode}>
            {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>

          <IconButton aria-label="notifications">
            <Badge color="error" badgeContent={notificationsCount} max={99}>
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

          <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 1.5 }}>
            <Avatar
              alt={userName}
              src={avatarUrl}
              sx={{ width: 40, height: 40 }}
              imgProps={{ referrerPolicy: "no-referrer" }}
            />
            <Typography variant="subtitle2" fontWeight={600} noWrap>
              {userName}
            </Typography>
          </Box>

          <MUILink component={NextLink} href="/inventory/settings" underline="none" color="inherit">
            <IconButton aria-label="settings">
              <SettingsIcon />
            </IconButton>
          </MUILink>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
