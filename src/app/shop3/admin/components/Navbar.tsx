"use client";

import * as React from "react";
import Link from "next/link";
import { useTheme } from "next-themes";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";

// MUI Icons
import LogoutIcon from "@mui/icons-material/Logout";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";

import { SidebarTrigger, useSidebar } from "./ui/sidebar";
import { useMuiThemeMode } from "../providers/ThemeProvider";

const Navbar: React.FC = () => {
  const { mode, setMode } = useMuiThemeMode();

  const { theme, setTheme } = useTheme();
  const { toggleSidebar } = useSidebar();

  // Theme menu
  const [themeAnchor, setThemeAnchor] = React.useState<null | HTMLElement>(null);
  const openThemeMenu = (e: React.MouseEvent<HTMLElement>) => setThemeAnchor(e.currentTarget);
  const closeThemeMenu = () => setThemeAnchor(null);

  // User menu
  const [userAnchor, setUserAnchor] = React.useState<null | HTMLElement>(null);
  const openUserMenu = (e: React.MouseEvent<HTMLElement>) => setUserAnchor(e.currentTarget);
  const closeUserMenu = () => setUserAnchor(null);

  const ThemeIcon = theme === "dark" ? DarkModeIcon : LightModeIcon;

  return (
    <AppBar
      position="sticky"
      color="default"
      elevation={0}
      sx={{
        top: 0,
        zIndex: (t) => t.zIndex.drawer + 1,
        borderBottom: (t) => `1px solid ${t.palette.divider}`,
        bgcolor: "background.paper",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
        {/* LEFT */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <SidebarTrigger aria-label="Toggle sidebar" onClick={toggleSidebar} />
        </Box>

        {/* RIGHT */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Button component={Link} href="/shop3/admin" color="inherit">
            Dashboard
          </Button>

          {/* Theme menu */}
          <IconButton
            aria-label="Toggle theme"
            onClick={openThemeMenu}
            size="small"
            edge="end"
          >
            <ThemeIcon fontSize="small" />
          </IconButton>
          <Menu
            anchorEl={themeAnchor}
            open={Boolean(themeAnchor)}
            onClose={closeThemeMenu}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem
              onClick={() => {
                setTheme("light");
                closeThemeMenu();
              }}
            >
              <ListItemIcon>
                <LightModeIcon fontSize="small" />
              </ListItemIcon>
              Light
            </MenuItem>
            <MenuItem
              onClick={() => {
                setTheme("dark");
                closeThemeMenu();
              }}
            >
              <ListItemIcon>
                <DarkModeIcon fontSize="small" />
              </ListItemIcon>
              Dark
            </MenuItem>
            <MenuItem
              onClick={() => {
                setTheme("system");
                closeThemeMenu();
              }}
            >
              System
            </MenuItem>
          </Menu>

          {/* User menu */}
          <IconButton onClick={openUserMenu} size="small" edge="end">
            <Avatar
              alt="John Doe"
              src="https://avatars.githubusercontent.com/u/1486366"
              sx={{ width: 32, height: 32 }}
            />
          </IconButton>
          <Menu
            anchorEl={userAnchor}
            open={Boolean(userAnchor)}
            onClose={closeUserMenu}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            slotProps={{ paper: { sx: { minWidth: 200 } } }}
          >
            <Typography variant="subtitle2" sx={{ px: 2, py: 1.5 }}>
              My Account
            </Typography>
            <Divider />
            <MenuItem onClick={closeUserMenu}>
              <ListItemIcon>
                <PersonIcon fontSize="small" />
              </ListItemIcon>
              Profile
            </MenuItem>
            <MenuItem onClick={closeUserMenu}>
              <ListItemIcon>
                <SettingsIcon fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
            <MenuItem
              onClick={() => {
                // TODO: Logout-Flow
                closeUserMenu();
              }}
              sx={{ color: "error.main" }}
            >
              <ListItemIcon sx={{ color: "error.main" }}>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
