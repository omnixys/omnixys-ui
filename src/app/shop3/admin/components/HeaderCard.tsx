"use client";
import { Paper, useTheme } from "@mui/material";
import * as React from "react";

export default function HeaderCard(props: React.ComponentProps<typeof Paper>) {
  const theme = useTheme();
  const bg =
    theme.palette.mode === "dark"
      ? theme.palette.background.default
      : theme.palette.secondary.light;

  return <Paper variant="outlined" sx={{ borderRadius: 2, bgcolor: bg, px: 2, py: 1.5 }} {...props} />;
}
