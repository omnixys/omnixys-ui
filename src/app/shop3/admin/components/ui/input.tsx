"use client";

import * as React from "react";
import InputBase, { type InputBaseProps } from "@mui/material/InputBase";
import { alpha } from "@mui/material/styles";

export type InputProps = Omit<
  React.ComponentProps<"input">,
  "size" | "color" | "className"
> & {
  sx?: InputBaseProps["sx"];
};

/**
 * Input – MUI-only Ersatz für dein altes <input/>
 * - Volle Native-Input-API (value, onChange, type, placeholder, etc.)
 * - Fokusring & Fehlerzustand per MUI-Theme
 * - Datei-Input-Styling (::file-selector-button) inklusive
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type, sx, ...props }, ref) => {
    const isInvalid =
      props["aria-invalid"] === true || props["aria-invalid"] === "true";

    return (
      <InputBase
        inputRef={ref}
        type={type}
        fullWidth
        // Props wie onChange/value gehen direkt an <input/>
        {...props}
        sx={{
          // Root (Box um das input)
          display: "flex",
          alignItems: "center",
          minWidth: 0,
          height: 36, // ~ h-9
          px: 1.5, // ~ px-3
          py: 0.5, // ~ py-1
          borderRadius: 1,
          border: (t) => `1px solid ${t.palette.divider}`,
          boxShadow: 1, // zart wie "shadow-xs"
          backgroundColor: "transparent",
          transition: "box-shadow .15s, border-color .15s, color .15s",
          outline: "none",
          // disabled
          "&.Mui-disabled": {
            opacity: 0.5,
            pointerEvents: "none",
            cursor: "not-allowed",
          },
          // focus ring
          "&:focus-within": (t) => ({
            borderColor: t.palette.primary.main,
            boxShadow: `0 0 0 3px ${alpha(t.palette.primary.main, 0.5)}`,
          }),
          // aria-invalid
          ...(isInvalid && {
            borderColor: "error.main",
            boxShadow: (t) =>
              `0 0 0 3px ${alpha(t.palette.error.main, t.palette.mode === "dark" ? 0.4 : 0.2)}`,
          }),

          // eigentliche Input-Element-Styles
          "& .MuiInputBase-input": {
            fontSize: { xs: 14, md: 14 }, // md:text-sm
            lineHeight: 1.5,
            color: "text.primary",
            minWidth: 0,
            "&::placeholder": {
              color: "text.secondary", // placeholder:text-muted-foreground
              opacity: 1,
            },
            // Textauswahl (selection)
            "&::selection": {
              backgroundColor: "primary.main",
              color: "primary.contrastText",
            },
          },

          // file input button
          '& .MuiInputBase-input[type="file"]::-webkit-file-upload-button': {
            height: 28, // ~ h-7
            border: 0,
            background: "transparent",
            fontSize: 12,
            fontWeight: 500,
            color: "text.primary",
            cursor: "pointer",
          },

          ...sx,
        }}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
