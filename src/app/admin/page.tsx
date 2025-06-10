"use client";

import { Box, Typography, Alert } from "@mui/material";
import { useSession } from "next-auth/react";

export default function AdminPage() {
  const { data: session } = useSession();
    const isAdmin = session?.user.roles?.includes('Admin'); 

  return (
    <>
      {!isAdmin ? (
        <Alert severity="error" sx={{ mt: 4 }}>
          Zugriff verweigert – Du benötigst die Rolle <strong>Admin</strong>.
        </Alert>
      ) : (
        <Box p={4}>
          <Typography variant="h4" gutterBottom>
            Admin-Dashboard
          </Typography>
          <Typography>
            Willkommen, {session?.user.username}
          </Typography>
          {/* Weitere Admin-Komponenten */}
        </Box>
      )}
    </>
  );
}
