// File: app/analytics/customers/[id]/edit/components/AddressForm.tsx

import { Grid, TextField } from '@mui/material';
import React from 'react';

interface Address {
  street: string;
  houseNumber: string;
  zipCode: string;
  city: string;
  state: string;
  country: string;
}

interface Props {
  address: Address;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function AddressForm({ address, onChange }: Props) {
  return (
    <>
      <Grid size={{ xs: 12 }}>
        <h4>Adresse</h4>
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          label="Straße"
          name="street"
          value={address.street}
          onChange={onChange}
          fullWidth
          variant="outlined"
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          label="Hausnummer"
          name="houseNumber"
          value={address.houseNumber}
          onChange={onChange}
          fullWidth
          variant="outlined"
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          label="PLZ"
          name="zipCode"
          value={address.zipCode}
          onChange={onChange}
          fullWidth
          variant="outlined"
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          label="Stadt"
          name="city"
          value={address.city}
          onChange={onChange}
          fullWidth
          variant="outlined"
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          label="Bundesland"
          name="state"
          value={address.state}
          onChange={onChange}
          fullWidth
          variant="outlined"
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          label="Land"
          name="country"
          value={address.country}
          onChange={onChange}
          fullWidth
          variant="outlined"
        />
      </Grid>
    </>
  );
}
