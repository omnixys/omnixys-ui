"use client";

import {
  Drawer,
  useTheme,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SidebarContent from "./SidebarContent";
import { useSidebar } from "../context/SidebarContext";

export default function AnalyticsSidebar() {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { isOpen, toggle, close } = useSidebar();

  return (
    <>
      {isMobile && (
        <IconButton
          onClick={toggle}
          sx={{
            position: "fixed",
            top: 16,
            left: 16,
            zIndex: theme.zIndex.drawer + 1,
            backgroundColor: theme.palette.background.paper,
            borderRadius: 2,
            boxShadow: 2,
          }}
        >
          <MenuIcon />
        </IconButton>
      )}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        anchor="left"
        open={isMobile ? isOpen : true}
        onClose={close}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          width: 260,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: 260,
            boxSizing: "border-box",
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary,
          },
        }}
      >
        <SidebarContent />
      </Drawer>
    </>
  );
}
