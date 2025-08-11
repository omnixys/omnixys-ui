"use client";

import * as React from "react";
import {
  Button as MuiButton,
  IconButton as MuiIconButton,
  type ButtonProps as MuiButtonProps,
} from "@mui/material";
import { alpha } from "@mui/material/styles";

export type AppButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";

export type AppButtonSize = "sm" | "default" | "lg" | "xl" | "icon";

export interface ButtonProps
  extends Omit<MuiButtonProps, "variant" | "color" | "size"> {
  variant?: AppButtonVariant;
  size?: AppButtonSize;
  /** Für Abwärtskompatibilität; nutze bei MUI lieber `component="a"` etc. */
  asChild?: boolean;
}

/** interne Styles je Variante */
function variantSx(variant: AppButtonVariant) {
  return (theme: any) => {
    const ring = `0 0 0 3px ${alpha(theme.palette.primary.main, 0.5)}`;
    const base = {
      textTransform: "none",
      borderRadius: 8,
      fontWeight: 500,
      gap: 8,
      "& svg": { pointerEvents: "none", fontSize: 16, flexShrink: 0 },
      "&:focus-visible": { boxShadow: ring, outline: "none" },
      "&[aria-invalid='true']": {
        boxShadow: `0 0 0 3px ${alpha(theme.palette.error.main, theme.palette.mode === "dark" ? 0.4 : 0.2)}`,
        borderColor: theme.palette.error.main,
      },
    } as const;

    switch (variant) {
      case "default":
        return {
          ...base,
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          boxShadow: theme.shadows[1],
          "&:hover": { backgroundColor: theme.palette.primary.dark },
          "&.Mui-disabled": { opacity: 0.5, pointerEvents: "none" },
        };
      case "destructive":
        return {
          ...base,
          backgroundColor:
            theme.palette.mode === "dark"
              ? alpha(theme.palette.error.main, 0.6)
              : theme.palette.error.main,
          color: theme.palette.getContrastText(theme.palette.error.main),
          boxShadow: theme.shadows[1],
          "&:hover": { backgroundColor: theme.palette.error.dark },
        };
      case "outline":
        return {
          ...base,
          backgroundColor:
            theme.palette.mode === "dark" ? alpha(theme.palette.action.disabledBackground, 0.3) : theme.palette.background.paper,
          color: theme.palette.text.primary,
          border: `1px solid ${theme.palette.divider}`,
          boxShadow: theme.shadows[1],
          "&:hover": {
            backgroundColor: theme.palette.action.hover,
          },
        };
      case "secondary":
        return {
          ...base,
          backgroundColor: theme.palette.secondary.main,
          color: theme.palette.secondary.contrastText,
          boxShadow: theme.shadows[1],
          "&:hover": { backgroundColor: theme.palette.secondary.dark },
        };
      case "ghost":
        return {
          ...base,
          backgroundColor: "transparent",
          color: theme.palette.text.primary,
          "&:hover": { backgroundColor: theme.palette.action.hover },
        };
      case "link":
        return {
          ...base,
          backgroundColor: "transparent",
          color: theme.palette.primary.main,
          textDecoration: "none",
          "&:hover": { textDecoration: "underline", textUnderlineOffset: "4px", backgroundColor: "transparent" },
        };
      default:
        return base;
    }
  };
}

/** interne Maße je Größe */
function sizeSx(size: AppButtonSize) {
  switch (size) {
    case "sm":
      return { height: 32, paddingInline: 12, borderRadius: 8, gap: 6, fontSize: 13 };
    case "lg":
      return { height: 40, paddingInline: 24, borderRadius: 8, fontSize: 14 };
    case "xl":
      return { height: 48, paddingInline: 32, borderRadius: 8, fontSize: 15 };
    case "default":
      return { height: 36, paddingInline: 16, borderRadius: 8, fontSize: 14 };
    // icon handled separately
    default:
      return {};
  }
}

/**
 * Button – MUI-only Ersatz für deine frühere Button-Komponente.
 * - Varianten: default, destructive, outline, secondary, ghost, link
 * - Größen: sm, default, lg, xl, icon
 * - Nutze `startIcon`/`endIcon` für Icons.
 * - Für Links: `component="a"` + `href`.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function AppButton(
    { variant = "default", size = "default", asChild, sx, children, ...props },
    ref
  ) {
    if (size === "icon") {
      return (
        <MuiIconButton
          ref={ref as any}
          sx={{
            width: 36,
            height: 36,
            borderRadius: 8,
            ...variantSx(variant),
            ...(sx as any),
          }}
          {...(props as any)}
        >
          {children}
        </MuiIconButton>
      );
    }

    return (
      <MuiButton
        ref={ref}
        disableElevation
        disableRipple={variant !== "link"}
        sx={{
          ...variantSx(variant),
          ...sizeSx(size),
          ...(sx as any),
        }}
        {...props}
      >
        {children}
      </MuiButton>
    );
  }
);

/**
 * Placeholder-Export für Kompatibilität zu früherem Import { buttonVariants }.
 * Gibt keine Klassen zurück, sondern ist nur ein noop.
 */
export const buttonVariants = (_opts?: {
  variant?: AppButtonVariant;
  size?: AppButtonSize;
  className?: string;
}) => {
  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.warn(
      "[buttonVariants] wird in der MUI-Version nicht mehr benötigt. Styles kommen über `sx`."
    );
  }
  return "";
};

export default Button;
