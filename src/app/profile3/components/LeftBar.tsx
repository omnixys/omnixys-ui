// components/LeftBar.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import {
  Box,
  Stack,
  IconButton,
  Button,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Tooltip,
  useMediaQuery,
  Divider,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useTheme } from "@mui/material/styles";
import Image from "./Image";

const menuList = [
  { id: 1, name: "Homepage", link: "/", icon: "home.svg" },
  { id: 2, name: "Explore", link: "/", icon: "explore.svg" },
  { id: 3, name: "Notification", link: "/", icon: "notification.svg" },
  { id: 4, name: "Messages", link: "/", icon: "message.svg" },
  { id: 5, name: "Bookmarks", link: "/", icon: "bookmark.svg" },
  { id: 6, name: "Jobs", link: "/", icon: "job.svg" },
  { id: 7, name: "Communities", link: "/", icon: "community.svg" },
  { id: 8, name: "Premium", link: "/", icon: "logo.svg" },
  { id: 9, name: "Profile", link: "/", icon: "profile.svg" },
  { id: 10, name: "More", link: "/", icon: "more.svg" },
];

export default function LeftBar() {
  const theme = useTheme();
  // Dein früheres "xxl:" simuliere ich mit MUIs 'xl'-Breakpoint
  const showLabels = useMediaQuery(theme.breakpoints.up("xl"));

  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        pt: 1,
        pb: 4,
      }}
    >
      {/* LOGO + MENU + POST */}
      <Stack spacing={2} alignItems={showLabels ? "flex-start" : "center"}>
        {/* LOGO */}
        <Tooltip title="Home">
          <IconButton
            component={Link}
            href="/"
            sx={{
              p: 1,
              borderRadius: "9999px",
              "&:hover": { bgcolor: "action.hover" },
            }}
          >
            <Image path="icons/logo.svg" alt="logo" w={24} h={24} />
          </IconButton>
        </Tooltip>

        {/* MENU */}
        <List disablePadding sx={{ width: "100%" }}>
          {menuList.map((item) => (
            <ListItemButton
              key={item.id}
              component={Link}
              href={item.link}
              sx={{
                borderRadius: "9999px",
                px: 1.5,
                py: 1,
                "&:hover": { bgcolor: "action.hover" },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                <Image path={`icons/${item.icon}`} alt={item.name} w={24} h={24} />
              </ListItemIcon>
              {showLabels && <ListItemText primary={item.name} primaryTypographyProps={{ fontWeight: 600 }} />}
            </ListItemButton>
          ))}
        </List>

        {/* POST BUTTON */}
        {!showLabels ? (
          <Tooltip title="Post verfassen">
            <IconButton
              component={Link}
              href="/compose/post"
              sx={{
                bgcolor: "common.white",
                color: "common.black",
                width: 48,
                height: 48,
                borderRadius: "9999px",
                "&:hover": { bgcolor: "grey.200" },
              }}
            >
              <Image path="icons/post.svg" alt="new post" w={24} h={24} />
            </IconButton>
          </Tooltip>
        ) : (
          <Button
            component={Link}
            href="/compose/post"
            variant="contained"
            disableElevation
            sx={{
              bgcolor: "common.white",
              color: "common.black",
              fontWeight: 700,
              borderRadius: "9999px",
              px: 5,
              "&:hover": { bgcolor: "grey.200" },
            }}
          >
            Post
          </Button>
        )}
      </Stack>

      {/* USER SECTION */}
      <Box>
        <Divider sx={{ mb: 1, display: { xl: "block", xs: "none" } }} />
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Avatar sx={{ width: 40, height: 40, overflow: "hidden" }}>
              <Image path="general/avatar.png" alt="Lama Dev" w={100} h={100} tr />
            </Avatar>
            {showLabels && (
              <Stack>
                <Box component="span" sx={{ fontWeight: 700 }}>
                  Lama Dev
                </Box>
                <Box component="span" sx={{ fontSize: 12, color: "text.secondary" }}>
                  @lamaWebDev
                </Box>
              </Stack>
            )}
          </Stack>

          {showLabels && (
            <IconButton sx={{ fontWeight: 700 }}>
              <MoreHorizIcon />
            </IconButton>
          )}
        </Stack>
      </Box>
    </Box>
  );
}
