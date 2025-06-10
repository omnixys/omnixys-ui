"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  MenuItem,
  Menu,
  Badge,
  Avatar,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogInIcon from "@mui/icons-material/Login";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircle from "@mui/icons-material/AccountCircle";
import TimerIcon from "@mui/icons-material/Timer";
import RefreshIcon from "@mui/icons-material/Refresh";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/ExitToApp";
import { formatTime } from "../../utils/counter-format.util";
import Logout from "../../components/Logout";

const HEADER_HEIGHT = 64;

/**
 * Generiert Initialen für den Avatar.
 */
const generateAvatarInitials = (name: string = ""): string => {
  const names = name.trim().split(" ");
  return names.length === 1
    ? names[0].charAt(0).toUpperCase()
    : `${names[0].charAt(0).toUpperCase()}${names[1].charAt(0).toUpperCase()}`;
};

/**
 * Eleganter Header mit optimierter UI.
 */
const Header: React.FC<{ toggleSidebar: () => void }> = ({ toggleSidebar }) => {
  const { data: session, update } = useSession();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [remainingTime, setRemainingTime] = useState<number | undefined>(
    undefined
  );

  /**
   * Öffnet das Benutzer-Menü.
   */
  const handleMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  /**
   * Schließt das Benutzer-Menü.
   */
  const handleClose = (): void => {
    setAnchorEl(null);
  };

  /**
   * Aktualisiert den Token.
   */
  const handleRefreshToken = useCallback(async () => {
    try {
      await update();
      //handleClose();
    } catch (err) {
      console.error("Fehler beim Aktualisieren des Tokens:", err);
    }
  }, [update]);

  /**
   * Aktualisiert den Countdown für den Token.
   */
  useEffect(() => {
    if (session?.expires_in) {
      const now = Math.floor(Date.now() / 1000);
      setRemainingTime(session?.expires_in - now);

      const interval = setInterval(() => {
        setRemainingTime((prev) => (prev !== undefined ? prev - 1 : undefined));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [session]);

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#4E3792",
        backdropFilter: "blur(15px)", // **Glassmorphism**
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        width: "100%",
        height: HEADER_HEIGHT,
        padding: "0 24px",
        display: "flex",
        justifyContent: "center",
        transition: "all 0.3s ease-in-out",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo & Sidebar Toggle */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton
            color="inherit"
            onClick={toggleSidebar}
            sx={{
              transition: "transform 0.2s ease-in-out",
              "&:hover": { transform: "scale(1.1)" },
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              letterSpacing: 1,
              color: "#fff",
              textTransform: "uppercase",
            }}
          >
            GentleCorp
          </Typography>
        </Box>

        {/* Navigations-Links */}
        <Box sx={{ display: "flex", gap: 3 }}>
          {["Startseite", "GentleBank", "GentleStore", "Services"].map(
            (item, index) => (
              <Button
                key={index}
                color="inherit"
                component={Link}
                href={`/${item.toLowerCase()}`}
                sx={{
                  position: "relative",
                  fontSize: "1rem",
                  fontWeight: 500,
                  color: "#fff",
                  "&:hover": {
                    color: "#A3E635",
                  },
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    width: "100%",
                    height: "2px",
                    bottom: "-5px",
                    left: 0,
                    backgroundColor: "#A3E635",
                    transform: "scaleX(0)",
                    transformOrigin: "bottom right",
                    transition: "transform 0.3s ease-out",
                  },
                  "&:hover::after": {
                    transform: "scaleX(1)",
                    transformOrigin: "bottom left",
                  },
                }}
              >
                {item}
              </Button>
            )
          )}
        </Box>

                {/* Rechtsbündige Benutzer- & Benachrichtigungs-Elemente */}
        {session &&
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton size="large" color="inherit">
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton size="large" color="inherit">
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
       

            {/* Benutzerbereich */}
            {session ? (
              <IconButton onClick={handleMenu} color="inherit">
                {session.user?.image ? (
                  <Avatar
                    alt={session.user?.name || "Benutzer"}
                    src={session.user?.image || ""}
                    sx={{ width: 48, height: 48, border: "2px solid #fff" }}
                  />
                ) : (
                  <Avatar
                    sx={{
                      width: 48,
                      height: 48,
                      bgcolor: "#fff",
                      color: "#4E3792",
                      fontSize: "1.5rem",
                    }}
                  >
                    {generateAvatarInitials(session.user?.name || "Benutzer")}
                  </Avatar>
                )}
              </IconButton>
            ) : (
              <Button
                color="inherit"
                component={Link}
                href="/login"
                startIcon={<LogInIcon />}
              >
                Login
              </Button>
            )}
          </Box>
        }

        {/* Dropdown-Menü */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          PaperProps={{
            elevation: 12,
            sx: {
              borderRadius: 2,
              mt: 1,
              minWidth: 220,
              backgroundColor: "#f5f5f5",
              padding: "8px",
            },
          }}
        >
          <MenuItem onClick={handleClose} component={Link} href="/profile">
            <AccountCircle sx={{ mr: 1 }} />
            Profil
          </MenuItem>
          <MenuItem>
            <TimerIcon sx={{ mr: 1 }} />
            Token: {remainingTime ? formatTime(remainingTime) : "Abgelaufen"}
          </MenuItem>
          <MenuItem onClick={handleRefreshToken}>
            <RefreshIcon sx={{ mr: 1 }} />
            Token erneuern
          </MenuItem>
          <MenuItem onClick={handleClose} component={Link} href="/settings">
            <SettingsIcon sx={{ mr: 1 }} />
            Einstellungen
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Logout />
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
