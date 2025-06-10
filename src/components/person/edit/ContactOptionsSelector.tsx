// File: app/analytics/customers/[id]/edit/components/ContactOptionsSelector.tsx

import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  Box,
  Chip,
  SelectChangeEvent,
  Grid,
} from "@mui/material";

interface Props {
  value: string[];
  onChange: (value: string[]) => void;
}

const options = ["EMAIL", "PHONE", "LETTER", "SMS"];

export default function ContactOptionsSelector({ value, onChange }: Props) {
  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const selected = event.target.value as string[];
    onChange(selected);
  };

  return (
  <Grid size={{ xs: 12 }}>
      <FormControl fullWidth variant="outlined">
        <InputLabel id="contact-options-label">Kontaktoptionen</InputLabel>
        <Select
          labelId="contact-options-label"
          multiple
          value={value}
          onChange={handleChange}
          label="Kontaktoptionen"
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((val) => (
                <Chip key={val} label={val} />
              ))}
            </Box>
          )}
        >
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              <Checkbox checked={value.includes(option)} />
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
}
