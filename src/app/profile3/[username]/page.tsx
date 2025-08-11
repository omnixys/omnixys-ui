// components/UserPage.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import Feed from "../components/Feed";
import Image from "../components/Image";
import {
  Box,
  Stack,
  Typography,
  IconButton,
  Button,
} from "@mui/material";

const mockUser = {
  name: "Lama Dev",
  handle: "@lamaWebDev",
  coverPath: "general/cover.jpg",
  avatarPath: "general/avatar.png",
  location: "USA",
  joined: "Joined May 2021",
  followers: 100,
  followings: 100,
};

const UserPage: React.FC = () => {
  return (
    <Box>
      {/* PROFILE TITLE (sticky) */}
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          p: 2,
          backdropFilter: "blur(8px)",
          backgroundColor: "rgba(0,0,0,0.52)",
        }}
      >
        <IconButton component={Link} href="/" size="small">
          <Image path="icons/back.svg" alt="back" w={24} h={24} />
        </IconButton>
        <Typography variant="h6" fontWeight={700}>
          {mockUser.name}
        </Typography>
      </Stack>

      {/* INFO */}
      <Box>
        {/* COVER & AVATAR CONTAINER */}
        <Box sx={{ position: "relative", width: "100%" }}>
          {/* COVER */}
          <Box sx={{ position: "relative", width: "100%", aspectRatio: "3 / 1", overflow: "hidden" }}>
            <Image path={mockUser.coverPath} alt="cover" w={1200} h={400} tr sx={{ width: "100%", height: "100%" }} />
          </Box>

          {/* AVATAR */}
          <Box
            sx={{
              position: "absolute",
              left: 16,
              top: "100%",
              transform: "translateY(-50%)",
              width: 128,
              height: 128,
              borderRadius: "50%",
              overflow: "hidden",
              border: "4px solid",
              borderColor: "common.black",
              bgcolor: "grey.700",
            }}
          >
            <Image path={mockUser.avatarPath} alt="avatar" w={200} h={200} tr />
          </Box>
        </Box>

        {/* ACTIONS (rechts oben) */}
        <Stack direction="row" alignItems="center" spacing={1} sx={{ p: 1.5, justifyContent: "flex-end", gap: 1, mt: 2 }}>
          {["more.svg", "explore.svg", "message.svg"].map((icon) => (
            <IconButton
              key={icon}
              size="small"
              sx={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                border: 1,
                borderColor: "grey.700",
              }}
            >
              <Image path={`icons/${icon}`} alt={icon} w={20} h={20} />
            </IconButton>
          ))}
          <Button
            variant="contained"
            disableElevation
            sx={{
              bgcolor: "common.white",
              color: "common.black",
              fontWeight: 700,
              borderRadius: "9999px",
              px: 2,
              "&:hover": { bgcolor: "grey.200" },
            }}
          >
            Follow
          </Button>
        </Stack>

        {/* USER DETAILS */}
        <Stack sx={{ p: 2 }} spacing={1.2}>
          {/* USERNAME & HANDLE */}
          <Box>
            <Typography variant="h5" fontWeight={800}>{mockUser.name}</Typography>
            <Typography variant="body2" color="text.secondary">{mockUser.handle}</Typography>
          </Box>

          <Typography variant="body1">Lama Dev Youtube Channel</Typography>

          {/* LOCATION & DATE */}
          <Stack direction="row" spacing={3} sx={{ color: "text.secondary", fontSize: 15 }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Image path="icons/userLocation.svg" alt="location" w={20} h={20} />
              <Typography variant="body2">{mockUser.location}</Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <Image path="icons/date.svg" alt="date" w={20} h={20} />
              <Typography variant="body2">{mockUser.joined}</Typography>
            </Stack>
          </Stack>

          {/* FOLLOWERS & FOLLOWINGS */}
          <Stack direction="row" spacing={3}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="body2" fontWeight={700}>{mockUser.followers}</Typography>
              <Typography variant="body2" color="text.secondary">Followers</Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="body2" fontWeight={700}>{mockUser.followings}</Typography>
              <Typography variant="body2" color="text.secondary">Followings</Typography>
            </Stack>
          </Stack>
        </Stack>
      </Box>

      {/* FEED */}
      <Feed />
    </Box>
  );
};

export default UserPage;
