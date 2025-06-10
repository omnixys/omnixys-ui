// components/Sidebar.tsx

import * as React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import BuildIcon from "@mui/icons-material/Build";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import { JSX } from "react";

/**
 * Sidebar-Komponente zur Darstellung der navigierbaren Leiste.
 * Verwendet MUI-Icons und animierte Hover-Effekte für ein modernes, kreatives UI.
 *
 * @returns {JSX.Element} Die navigierbare Sidebar
 */
export default function Sidebar(): JSX.Element {
  return (
    <Box
      sx={{
        width: 260,
        height: "100vh",
        backgroundColor: "primary.main",
        color: "primary.contrastText",
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton component="a" href="#">
            <ListItemIcon sx={{ color: "primary.contrastText" }}>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Startseite" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component="a" href="#">
            <ListItemIcon sx={{ color: "primary.contrastText" }}>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="Über Uns" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component="a" href="#">
            <ListItemIcon sx={{ color: "primary.contrastText" }}>
              <BuildIcon />
            </ListItemIcon>
            <ListItemText primary="Services" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component="a" href="#">
            <ListItemIcon sx={{ color: "primary.contrastText" }}>
              <ContactMailIcon />
            </ListItemIcon>
            <ListItemText primary="Kontakt" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}
