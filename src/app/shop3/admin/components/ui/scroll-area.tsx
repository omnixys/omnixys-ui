"use client";

import * as React from "react";
import { Box, type BoxProps } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";

export type ScrollAreaProps = BoxProps & {
  /** Optional: true = immer Scrollbar einblenden (default: auto) */
  alwaysVisible?: boolean;
};

/**
 * ScrollArea (MUI-only)
 * - ersetzte Radix ScrollArea Root + Viewport + Thumb
 * - Scrollbar wird per CSS/SX gestylt (WebKit & Firefox)
 */
export function ScrollArea({
  alwaysVisible = false,
  sx,
  children,
  ...props
}: ScrollAreaProps) {
  const theme = useTheme();
  const thumbBase = alpha(theme.palette.text.secondary, 0.35);
  const thumbHover = alpha(theme.palette.text.secondary, 0.6);

  return (
    <Box
      data-slot="scroll-area"
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "auto",
        borderRadius: "inherit",
        outline: "none",
        // Focus-Ring wie im Original
        "&:focus-visible": {
          boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.5)}`,
          borderColor: theme.palette.primary.main,
        },
        // Firefox
        scrollbarWidth: "thin",
        scrollbarColor: `${thumbBase} transparent`,
        // WebKit (Chrome/Safari/Edge)
        "&::-webkit-scrollbar": {
          width: 10,
          height: 10,
          background: "transparent",
        },
        "&::-webkit-scrollbar-track": {
          background: "transparent",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: thumbBase,
          borderRadius: 999,
          border: "2px solid transparent",
          backgroundClip: "content-box",
        },
        "&:hover::-webkit-scrollbar-thumb": {
          backgroundColor: thumbHover,
        },
        ...(alwaysVisible && {
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: thumbHover,
          },
        }),
        ...sx,
      }}
      {...props}
    >
      {/* Viewport-Ersatz */}
      <Box
        data-slot="scroll-area-viewport"
        sx={{
          width: "100%",
          height: "100%",
          borderRadius: "inherit",
          transition: "box-shadow .15s, color .15s",
          outline: "none",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

/**
 * ScrollBar
 * - Für API-Kompatibilität exportiert, wird aber nicht mehr benötigt.
 * - Styles werden direkt auf dem Container gesetzt.
 */
export type ScrollBarProps = {
  orientation?: "vertical" | "horizontal";
  sx?: BoxProps["sx"];
};

export function ScrollBar(_props: ScrollBarProps) {
  return null;
}

export default ScrollArea;
