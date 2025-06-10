// src/components/ColorSchemeSelector.tsx
"use client";

import { MenuItem, ListItemIcon, ListItemText, Divider } from "@mui/material";
import PaletteIcon from "@mui/icons-material/Palette";
import { OmnixysColorScheme } from "@/theme/theme";

const availableSchemes: OmnixysColorScheme[] = [
  "original",
  "red",
  "green",
  "yellow",
  "blue",
];

interface ColorSchemeSelectorProps {
  current: OmnixysColorScheme;
  onChange: (scheme: OmnixysColorScheme) => void;
}

export default function ColorSchemeSelector({
  current,
  onChange,
}: ColorSchemeSelectorProps) {
  return (
    <>
      <Divider />
      <MenuItem disabled>
        <ListItemIcon>
          <PaletteIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Farb-Schema</ListItemText>
      </MenuItem>
      {availableSchemes.map((scheme) => (
        <MenuItem
          key={scheme}
          selected={scheme === current}
          onClick={() => onChange(scheme)}
        >
          <ListItemText>
            {scheme.charAt(0).toUpperCase() + scheme.slice(1)}
          </ListItemText>
        </MenuItem>
      ))}
    </>
  );
}
