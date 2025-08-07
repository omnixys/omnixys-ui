'use client';

import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { CustomerFormData } from '../../../types/person/CustomerFormData';
import { Person } from '../../../types/person/person.type';
import OmnixysCard from '../../OmnixysCard';

const contactOptionLabels: Record<string, string> = {
  EMAIL: 'E-Mail',
  PHONE: 'Telefon',
  LETTER: 'Brief',
  SMS: 'SMS',
};

interface CustomerFormProps {
  person: Person;
  onSubmit?: (data: CustomerFormData) => void;
}

export default function CustomerForm({ person, onSubmit }: CustomerFormProps) {
  const [form, setForm] = useState<CustomerFormData>({
    firstName: person.firstName || '',
    lastName: person.lastName || '',
    email: person.email || '',
    phoneNumber: person.phoneNumber || '',
    tierLevel: person.customer?.tierLevel || 1,
    subscribed: person.customer?.subscribed || false,
    maritalStatus: person.customer?.maritalStatus || 'SINGLE',
    contactOptions: person.customer?.contactOptions || [],
  });

  const handleChange = <K extends keyof CustomerFormData>(
    field: K,
    value: CustomerFormData[K],
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (option: string) => {
    const exists = form.contactOptions.includes(option);
    setForm((prev) => ({
      ...prev,
      contactOptions: exists
        ? prev.contactOptions.filter((o) => o !== option)
        : [...prev.contactOptions, option],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.firstName.trim() || !form.lastName.trim()) {
      alert('Vor- und Nachname sind erforderlich.');
      return;
    }

    if (!form.email.includes('@')) {
      alert('Bitte eine gültige E-Mail-Adresse eingeben.');
      return;
    }

    onSubmit?.(form);
  };

  return (
    <OmnixysCard component="form" onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            id="firstName"
            label="Vorname"
            fullWidth
            value={form.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            id="lastName"
            label="Nachname"
            fullWidth
            value={form.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            id="email"
            label="E-Mail"
            fullWidth
            value={form.email}
            onChange={(e) => handleChange('email', e.target.value)}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            id="phoneNumber"
            label="Telefonnummer"
            fullWidth
            value={form.phoneNumber}
            onChange={(e) => handleChange('phoneNumber', e.target.value)}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            id="tierLevel"
            label="Tier Level"
            fullWidth
            select
            value={form.tierLevel}
            onChange={(e) => handleChange('tierLevel', Number(e.target.value))}
          >
            <MenuItem value={1}>Bronze (1)</MenuItem>
            <MenuItem value={2}>Silber (2)</MenuItem>
            <MenuItem value={3}>Gold (3)</MenuItem>
          </TextField>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            id="maritalStatus"
            label="Familienstand"
            fullWidth
            select
            value={form.maritalStatus}
            onChange={(e) =>
              handleChange(
                'maritalStatus',
                e.target.value as CustomerFormData['maritalStatus'],
              )
            }
          >
            <MenuItem value="SINGLE">Ledig</MenuItem>
            <MenuItem value="MARRIED">Verheiratet</MenuItem>
            <MenuItem value="DIVORCED">Geschieden</MenuItem>
            <MenuItem value="WIDOWED">Verwitwet</MenuItem>
          </TextField>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Typography variant="subtitle1" gutterBottom>
            Kontaktoptionen
          </Typography>
          <FormGroup row>
            {Object.entries(contactOptionLabels).map(([opt, label]) => (
              <FormControlLabel
                key={opt}
                control={
                  <Checkbox
                    inputProps={{ 'aria-label': label }}
                    checked={form.contactOptions.includes(opt)}
                    onChange={() => handleCheckboxChange(opt)}
                  />
                }
                label={label}
              />
            ))}
          </FormGroup>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Box mt={1}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={form.subscribed}
                  onChange={(e) => handleChange('subscribed', e.target.checked)}
                />
              }
              label="Newsletter abonniert"
            />
          </Box>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 2,
              backgroundColor: (theme) => theme.palette.primary.main,
              ':hover': {
                backgroundColor: (theme) => theme.palette.secondary.main,
              },
            }}
          >
            Speichern
          </Button>
        </Grid>
      </Grid>
    </OmnixysCard>
  );
}
