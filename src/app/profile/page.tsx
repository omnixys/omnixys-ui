// src/app/profile/page.tsx
"use client";

import { Box, Typography } from "@mui/material";
import { useSession } from "next-auth/react";

export default function ProfilePage() {
    const { data: session } = useSession();

  return (
      <Box p={4}>
        <Typography variant="h4" gutterBottom>
          Profil
        </Typography>
        <Typography variant="body1">
          Benutzer: {session?.user.username}
        </Typography>
        <Typography variant="body1">E-Mail: {session?.user.email}</Typography>
      </Box>
  );
}
