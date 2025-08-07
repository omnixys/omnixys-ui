// File: app/analytics/customers/[id]/edit/components/InterestSelector.tsx

import {
  Box,
  Checkbox,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';

interface Props {
  value: string[];
  onChange: (value: string[]) => void;
}

const options = [
  'INVESTMENTS',
  'SAVING_AND_FINANCE',
  'CREDIT_AND_DEBT',
  'BANK_PRODUCTS_AND_SERVICES',
  'FINANCIAL_EDUCATION_AND_COUNSELING',
  'REAL_ESTATE',
  'INSURANCE',
  'SUSTAINABLE_FINANCE',
  'TECHNOLOGY_AND_INNOVATION',
  'TRAVEL',
];

export default function InterestSelector({ value, onChange }: Props) {
  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const selected = event.target.value as string[];
    onChange(selected);
  };

  return (
    <Grid size={{ xs: 12 }}>
      <FormControl fullWidth variant="outlined">
        <InputLabel id="interests-label">Interessen</InputLabel>
        <Select
          labelId="interests-label"
          multiple
          value={value}
          onChange={handleChange}
          label="Interessen"
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
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
