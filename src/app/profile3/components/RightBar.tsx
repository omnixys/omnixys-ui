// components/RightBar.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { Box, Stack, Typography } from "@mui/material";
import Search from "./Search";
import PopularTags from "./PopularTags";
import Recommendations from "./Recommendations";

const footerLinks = [
  { label: "Terms of Service", href: "/" },
  { label: "Privacy Policy", href: "/" },
  { label: "Cookie Policy", href: "/" },
  { label: "Accessibility", href: "/" },
  { label: "Ads Info", href: "/" },
];

export default function RightBar() {
  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        pt: 2,
        height: "max-content",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Search />
      <PopularTags />
      <Recommendations />

      {/* Footer */}
      <Stack direction="row" spacing={2} flexWrap="wrap">
        {footerLinks.map((l) => (
          <Link
            key={l.label}
            href={l.href}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Typography variant="caption" color="text.secondary">
              {l.label}
            </Typography>
          </Link>
        ))}
        <Typography variant="caption" color="text.secondary">
          © 2025 L Corp.
        </Typography>
      </Stack>
    </Box>
  );
}
