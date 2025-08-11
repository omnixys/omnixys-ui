"use client";

import * as React from "react";
import { Chip, type ChipProps } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";

export type BadgeVariant = "default" | "secondary" | "destructive" | "outline";

export interface BadgeProps
  extends Omit<ChipProps, "variant" | "color" | "size"> {
  /** Varianten-Mapping aus deinem bisherigen Design */
  variant?: BadgeVariant;
}

/**
 * MUI-only Badge:
 * - Nutzt <Chip size="small" />
 * - Icons bitte über `icon={<YourIcon />}` übergeben (wird automatisch klein gerendert)
 * - Für Links: <Badge component="a" href="..." />
 */
export const Badge: React.FC<BadgeProps> = ({
  variant = "default",
  sx,
  ...props
}) => {
  const theme = useTheme();

  // Styles je Variante
  const stylesByVariant: Record<BadgeVariant, ChipProps["sx"]> = {
    default: {
      bgcolor: "primary.main",
      color: "primary.contrastText",
      "&:hover": { bgcolor: "primary.dark" },
      border: "1px solid transparent",
    },
    secondary: {
      bgcolor: "secondary.main",
      color: "secondary.contrastText",
      "&:hover": { bgcolor: "secondary.dark" },
      border: "1px solid transparent",
    },
    destructive: {
      bgcolor: alpha(theme.palette.error.main, theme.palette.mode === "dark" ? 0.75 : 1),
      color: theme.palette.getContrastText(theme.palette.error.main),
      "&:hover": { bgcolor: theme.palette.error.dark },
      border: "1px solid transparent",
      // optionaler, dezenter Fokusring
      "&.Mui-focusVisible": {
        boxShadow: `0 0 0 3px ${alpha(theme.palette.error.main, 0.2)}`,
      },
    },
    outline: {
      bgcolor: "transparent",
      color: "text.primary",
      borderColor: "divider",
      borderStyle: "solid",
      borderWidth: 1,
      "&:hover": {
        bgcolor: "action.hover",
      },
    },
  };

  return (
    <Chip
      size="small"
      // Einheitliches Layout, ähnliches Spacing wie zuvor
      sx={{
        px: 0.75,
        py: 0.25,
        fontSize: 12,
        fontWeight: 500,
        borderRadius: 1,
        lineHeight: 1.2,
        maxWidth: "fit-content",
        "& .MuiChip-icon": { fontSize: 14, mr: 0.5 },
        "& .MuiChip-deleteIcon": { fontSize: 14, ml: 0.25 },
        ...stylesByVariant[variant],
        ...sx,
      }}
      {...props}
    />
  );
};

export default Badge;
