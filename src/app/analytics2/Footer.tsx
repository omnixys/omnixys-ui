// app/components/Footer.tsx
"use client";

import { Box, Typography } from "@mui/material";
import Link from "next/link";

const footerHeight = 50;

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#6A4BBC",
        color: "#fff",
        py: 2,
        textAlign: "center",
        width: "100%",
        height: `${footerHeight}px`,
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} GentleCorp - Alle Rechte vorbehalten.
      </Typography>
      <Typography variant="body2">
        <Link
          href="/impressum"
          style={{ color: "#fff", textDecoration: "none" }}
        >
          Impressum
        </Link>
        <Link
          href="/datenschutz"
          style={{ color: "#fff", textDecoration: "none" }}
        >
          Datenschutz
        </Link>
      </Typography>
    </Box>
  );
}
