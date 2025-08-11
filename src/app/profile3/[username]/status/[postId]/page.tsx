// app/status/page.tsx  (Server Component)
import * as React from "react";
import Link from "next/link";
import { Box, Stack, Typography, IconButton } from "@mui/material";
import Image from "../../../components/Image";
import Post from "../../../components/Post";       // Client-Component ist ok als Kind
import Comments from "../../../components/Comments";

export default function StatusPage() {
  return (
    <Box>
      {/* Sticky Header */}
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
          bgcolor: "rgba(0,0,0,0.52)",
        }}
      >
        <IconButton component={Link} href="/" size="small" aria-label="Back">
          <Image path="icons/back.svg" alt="back" w={24} h={24} />
        </IconButton>
        <Typography variant="h6" fontWeight={700}>
          Post
        </Typography>
      </Stack>

      {/* Inhalt */}
      <Post type="status" />
      <Comments />
    </Box>
  );
}
