// components/Feed.tsx
"use client";

import * as React from "react";
import { Box, Stack } from "@mui/material";
import Post from "./Post";
import { mockPosts, mockFileDetails } from "../data/post"; // ausgelagerte Mock-Daten

const Feed: React.FC = () => {
  return (
    <Box sx={{ width: "100%", bgcolor: "background.default" }}>
      <Stack spacing={0}>
        {mockPosts.map((post, idx) => (
          <Post
            key={idx}
            type={post.type}
            // Falls du den Post-Komponent auf Props umgestellt hast:
            // post={post}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default Feed;
