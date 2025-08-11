"use client";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

/** Nutzt das MUI-Theme: "md" ≈ 900px (default) */
export function useIsMobile() {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down("md"), { noSsr: true });
}

/** Falls du lieber eine feste Breite willst (Standard: 768px) */
export function useIsMobilePx(maxWidth = 768) {
  return useMediaQuery(`(max-width:${maxWidth - 1}px)`, { noSsr: true });
}
