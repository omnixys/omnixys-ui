// components/Comments.tsx
"use client";

import * as React from "react";
import { Box, Stack, TextField, Button, Divider } from "@mui/material";
import Image from "./Image";
import Post from "./Post";

const Comments: React.FC = () => {
  const [reply, setReply] = React.useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: hier an deine shareAction / Reply-Action anbinden
    setReply("");
  };

  return (
    <Box>
      {/* Reply-Form */}
      <Stack
        component="form"
        onSubmit={onSubmit}
        direction="row"
        alignItems="center"
        gap={2}
        sx={{ p: 2 }}
      >
        <Box
          sx={{
            position: "relative",
            width: 40,
            height: 40,
            borderRadius: "50%",
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          <Image path="general/avatar.png" alt="Lama Dev" w={100} h={100} tr />
        </Box>

        <TextField
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          placeholder="Post your reply"
          variant="standard"
          fullWidth
          InputProps={{ disableUnderline: true }}
          sx={{ "& input": { fontSize: 20 } }}
        />

        <Button
          type="submit"
          variant="contained"
          disableElevation
          disabled={!reply.trim()}
          sx={{
            bgcolor: "common.white",
            color: "common.black",
            fontWeight: 700,
            borderRadius: "9999px",
            px: 2,
            "&:hover": { bgcolor: "grey.200" },
          }}
        >
          Reply
        </Button>
      </Stack>

      <Divider />

      {/* Kommentare (Mock) */}
      <Stack spacing={0}>
        {[...Array(6)].map((_, i) => (
          <Post key={i} type="comment" />
        ))}
      </Stack>
    </Box>
  );
};

export default Comments;
