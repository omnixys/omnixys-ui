// components/Recommendations.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import {
  Box,
  Stack,
  Card,
  Button,
  Typography,
  Divider,
} from "@mui/material";
import Image from "./Image";

type UserRec = {
  id: number;
  name: string;
  handle: string;
  avatarPath: string;
};

const mockRecs: UserRec[] = [
  { id: 1, name: "John Doe", handle: "@johnDoe", avatarPath: "general/avatar.png" },
  { id: 2, name: "Jane Smith", handle: "@janeSmith", avatarPath: "general/avatar.png" },
  { id: 3, name: "Dev Team", handle: "@devteam", avatarPath: "general/avatar.png" },
];

export default function Recommendations() {
  return (
    <Card
      variant="outlined"
      sx={{
        p: 2,
        borderRadius: 3,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      {mockRecs.map((u, idx) => (
        <React.Fragment key={u.id}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            {/* USER INFO */}
            <Stack direction="row" alignItems="center" spacing={1.5}>
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
                <Image path={u.avatarPath} alt={u.name} w={100} h={100} tr />
              </Box>
              <Box>
                <Typography variant="subtitle2" fontWeight={700}>
                  {u.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {u.handle}
                </Typography>
              </Box>
            </Stack>

            {/* FOLLOW BUTTON */}
            <Button
              variant="contained"
              size="small"
              disableElevation
              sx={{
                bgcolor: "common.white",
                color: "common.black",
                borderRadius: "9999px",
                px: 2,
                "&:hover": { bgcolor: "grey.200" },
                fontWeight: 600,
              }}
            >
              Follow
            </Button>
          </Stack>

          {idx < mockRecs.length - 1 && <Divider />}
        </React.Fragment>
      ))}

      <Box>
        <Link
          href="/"
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: "primary.main",
              fontWeight: 600,
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Show more
          </Typography>
        </Link>
      </Box>
    </Card>
  );
}
