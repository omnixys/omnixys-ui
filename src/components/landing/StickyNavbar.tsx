// components/common/StickyNavbar.jsx
"use client";

import { AppBar, Toolbar, Box, Typography, Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export default function StickyNavbar() {
  return (
    <AppBar
      position="sticky"
      color="transparent"
      elevation={0}
      sx={{
        backdropFilter: "blur(12px)",
        backgroundColor: "rgba(0,0,0,0.1)",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Image src="/omnixys-logo.png" alt="Logo" width={40} height={40} />
          <Typography variant="h6" fontWeight={600} color="inherit">
            OmnixysSphere
          </Typography>
        </Box>
        <Link href="/person" passHref>
          <Button variant="contained" color="primary" size="small">
            Dashboard
          </Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
}
