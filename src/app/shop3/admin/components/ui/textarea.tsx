// src/components/ui/textarea.tsx
"use client";

import * as React from "react";
import { TextField, TextFieldProps } from "@mui/material";

export interface TextareaProps extends Omit<TextFieldProps, "variant" | "multiline"> {
  minRows?: number;
}

export const Textarea = React.forwardRef<HTMLDivElement, TextareaProps>(
  ({ minRows = 4, ...props }, ref) => {
    return (
      <TextField
        {...props}
        inputRef={ref}
        fullWidth
        multiline
        minRows={minRows}
        variant="outlined"
      />
    );
  }
);

Textarea.displayName = "Textarea";
