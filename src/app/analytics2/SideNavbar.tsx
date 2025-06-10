"use client";

import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import {
  Home as HomeIcon,
  People as PeopleIcon,
  ListAlt as LogsIcon,
  Receipt as ReportsIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion"; // Sanfte Animationen

const drawerWidthOpen = 240;
const drawerWidthClosed = 70;

const menuItems = [
  { text: "Dashboard", icon: <HomeIcon />, link: "/analytics" },
  { text: "Kunden", icon: <PeopleIcon />, link: "/analytics/customers" },
  { text: "Logs", icon: <LogsIcon />, link: "/logs" },
  { text: "Reports", icon: <ReportsIcon />, link: "/reports" },
  { text: "Control Panel", icon: <SettingsIcon />, link: "/settings" },
];

/**
 * Prüft, ob der aktuelle Pfad zum übergebenen Link gehört.
 */
function isActive(link: string, pathname: string): boolean {
  return link === "/analytics/customers"
    ? pathname.startsWith(link)
    : pathname === link;
}

interface SideNavbarProps {
  sidebarOpen: boolean;
  headerHeight?: number;
  footerHeight?: number;

}

/**
 * **Sanfte, moderne Sidebar für das GentleCorp-Ecosystem.**
 */
export default function SideNavbar({ sidebarOpen, headerHeight, footerHeight  }: SideNavbarProps) {
  const pathname = usePathname();

  return (
    <Drawer
      variant="permanent"
      open={sidebarOpen}
      sx={{
        width: sidebarOpen ? drawerWidthOpen : drawerWidthClosed,
        flexShrink: 0,
        //transition: "width 0.4s ease-in-out",
        "& .MuiDrawer-paper": {
          width: sidebarOpen ? drawerWidthOpen : drawerWidthClosed,
          backgroundColor: "#6A4BBC",
          color: "#ffffff",
          hposition: "absolute",
          top: `${headerHeight}px`,
          bottom: `${footerHeight}px`,
          height: `calc(100vh - ${headerHeight}px)`,
          overflowY: "auto",
          transition: "width 0.4s ease-in-out",
          borderRight: "0px",
        },
      }}
    >
      <List sx={{ mt: 2 }}>
        {menuItems.map(({ text, icon, link }) => (
          <Tooltip
            key={text}
            title={!sidebarOpen ? text : ""}
            placement="right"
            arrow
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ListItem
                component={Link}
                href={link}
                sx={{
                  borderTopLeftRadius: "100px",
                  borderBottomLeftRadius: "100px",
                  borderRight: isActive(link, pathname)
                    ? "4px solid #fff"
                    : "none",
                  mx: 1,
                  my: 1,
                  transition: "all 0.3s ease-in-out",
                  backgroundColor: isActive(link, pathname)
                    ? "#fff"
                    : "transparent",
                  color: isActive(link, pathname) ? "#4E3792" : "#ddd",
                  "&:hover": {
                    backgroundColor: "#fff",
                    color: "#4E3792",
                    transform: "scale(1.02)",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: isActive(link, pathname) ? "#4E3792" : "#ddd",
                    minWidth: sidebarOpen ? "40px" : "50px",
                    transition: "all 0.3s ease-in-out",
                    "&:hover": {
                      color: "#4E3792",
                      transform: "scale(1.1)",
                    },
                  }}
                >
                  {icon}
                </ListItemIcon>
                {sidebarOpen && <ListItemText primary={text} />}
              </ListItem>
            </motion.div>
          </Tooltip>
        ))}
      </List>
    </Drawer>
  );
}
