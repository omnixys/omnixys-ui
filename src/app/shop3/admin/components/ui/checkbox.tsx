"use client";

import * as React from "react";
import { Checkbox as MuiCheckbox, type CheckboxProps } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

export interface AppCheckboxProps extends Omit<CheckboxProps, "icon" | "checkedIcon"> {}

/**
 * MUI-only Checkbox
 * - Nutzt MUI-Checkbox mit angepassten Icons & Styles
 * - Disabled- und Fehlerzustände greifen automatisch auf das Theme zu
 */
export const Checkbox: React.FC<AppCheckboxProps> = ({ sx, ...props }) => {
  return (
    <MuiCheckbox
      icon={<span style={{
        width: 16,
        height: 16,
        borderRadius: 4,
        border: "1px solid currentColor",
      }} />}
      checkedIcon={
        <span style={{
          width: 16,
          height: 16,
          borderRadius: 4,
          backgroundColor: "currentColor",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <CheckIcon fontSize="small" sx={{ color: "common.white", fontSize: 14 }} />
        </span>
      }
      disableRipple
      sx={{
        p: 0.5,
        color: "text.secondary",
        "&.Mui-checked": {
          color: "primary.main",
        },
        "&.Mui-disabled": {
          color: "action.disabled",
        },
        ...sx,
      }}
      {...props}
    />
  );
};

export default Checkbox;
