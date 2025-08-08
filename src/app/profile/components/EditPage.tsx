'use client';

import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

import getApolloClient from '@/lib/apolloClient';

import { useMutation } from '@apollo/client';
import { UPDATE_CUSTOMER } from '../../../graphql/customer/mutation/update';
import {
  ContactOptionEnum,
  InterestEnum,
  MaritalStatusEnum,
} from '../../../types/person/enums';
import { CustomerFormData, Person } from '../../../types/person/person.type';
import { logger } from '../../../utils/logger';

export default function EditProfilePage({ user }: { user: Person }) {
  const { data: session } = useSession();
  const client = getApolloClient(session?.access_token);
  const userId = session?.user?.id;

  const [updatePerson, { loading, error }] = useMutation(UPDATE_CUSTOMER, {
    client,
  });

  const [form, setForm] = useState<CustomerFormData>({
    firstName: user.firstName,
    lastName: user.lastName,
    phoneNumber: user.phoneNumber,
    email: user.email,
    street: user.address?.street,
    houseNumber: user.address?.houseNumber,
    zipCode: user.address?.zipCode,
    city: user.address?.city,
    state: user.address?.state,
    country: user.address?.country,
    subscribed: user?.customer?.subscribed,
    maritalStatus: user.customer?.maritalStatus,
    contactOptions: [],
    interests: [],
  });

  const handleChange = (
    field: keyof CustomerFormData,
    value: string | string[],
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
    logger.debug(`Feld "${field}" wurde geändert:`, value);
  };

  const handleSubmit = async () => {
    logger.debug('user wurde geändert:', form);

    await updatePerson({
      variables: {
        id: userId,
        version: user.version,
        username: session?.user?.username ?? 'admin',
        input: {
          personInput: {
            firstName: form.firstName,
            lastName: form.lastName,
            phoneNumber: form.phoneNumber,
            email: form.email,
            address: {
              street: form.street,
              houseNumber: form.houseNumber,
              zipCode: form.zipCode,
              city: form.city,
              state: form.state,
              country: form.country,
            },
          },
          customerInput: {
            tierLevel: user.customer?.tierLevel,
            subscribed: form.subscribed,
            maritalStatus: form.maritalStatus,
            contactOptions: form.contactOptions,
            interests: form.interests,
          },
        },
      },
    });
  };

  if (loading) return <Typography>Lädt...</Typography>;
  if (error) return <Typography>Fehler: {error.message}</Typography>;

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        ✏️ Profil bearbeiten
      </Typography>

      <Grid container spacing={3}>
        <Grid container spacing={2}>
          <Grid sx={{ xs: 12, md: 6 }}>
            <TextField
              label="Vorname"
              fullWidth
              value={form.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
            />
          </Grid>
          <Grid sx={{ xs: 12, md: 6 }}>
            <TextField
              label="Nachname"
              fullWidth
              value={form.lastName}
              onChange={(e) => handleChange('lastName', e.target.value)}
            />
          </Grid>
          <Grid sx={{ xs: 12, md: 6 }}>
            <TextField
              label="E-Mail"
              fullWidth
              value={form.email}
              onChange={(e) => handleChange('email', e.target.value)}
            />
          </Grid>
          <Grid sx={{ xs: 12, md: 6 }}>
            <TextField
              label="Telefonnummer"
              fullWidth
              value={form.phoneNumber}
              onChange={(e) => handleChange('phoneNumber', e.target.value)}
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        <Grid container spacing={2}>
          <Grid sx={{ xs: 12, md: 6 }}>
            <TextField
              select
              label="Familienstand"
              fullWidth
              value={form.maritalStatus}
              onChange={(e) => handleChange('maritalStatus', e.target.value)}
            >
              {Object.values(MaritalStatusEnum).map((status) => (
                <MenuItem key={status} value={status}>
                  {status === 'SINGLE' && 'Ledig'}
                  {status === 'MARRIED' && 'Verheiratet'}
                  {status === 'DIVORCED' && 'Geschieden'}
                  {status === 'WIDOWED' && 'Verwitwet'}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid sx={{ xs: 12, md: 6 }}>
            <FormControl fullWidth>
              <InputLabel id="contactOptions-label">Kontaktoptionen</InputLabel>
              <Select
                labelId="contactOptions-label"
                multiple
                value={form.contactOptions}
                onChange={(e) =>
                  handleChange('contactOptions', e.target.value as string[])
                }
                label="Kontaktoptionen"
                renderValue={(selected) => (selected as string[]).join(', ')}
              >
                {Object.values(ContactOptionEnum).map((option) => (
                  <MenuItem key={option} value={option}>
                    {option === 'EMAIL' && 'E-Mail'}
                    {option === 'PHONE' && 'Telefon'}
                    {option === 'LETTER' && 'Brief'}
                    {option === 'SMS' && 'SMS'}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid sx={{ xs: 12, md: 6 }}>
            <FormControl fullWidth>
              <InputLabel id="interests-label">Interessen</InputLabel>
              <Select
                labelId="interests-label"
                multiple
                value={form.interests}
                onChange={(e) =>
                  handleChange('interests', e.target.value as InterestEnum[])
                }
                label="Interessen"
                renderValue={(selected) => (selected as string[]).join(', ')}
              >
                {Object.values(InterestEnum).map((interest) => (
                  <MenuItem key={interest} value={interest}>
                    {interest === 'INVESTMENTS' && 'Investments'}
                    {interest === 'REAL_ESTATE' && 'Immobilien'}
                    {interest === 'INSURANCE' && 'Versicherungen'}
                    {interest === 'OTHER' && 'Sonstiges'}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        {/* Adresse */}
        <Grid sx={{ xs: 12, md: 4 }}>
          <Typography variant="h6">Adresse</Typography>
        </Grid>

        <Grid container spacing={2}>
          <Grid sx={{ xs: 12, md: 6 }}>
            <TextField
              label="Straße"
              fullWidth
              value={form.street}
              onChange={(e) => handleChange('street', e.target.value)}
            />
          </Grid>
          <Grid sx={{ xs: 12, md: 6 }}>
            <TextField
              label="Hausnummer"
              fullWidth
              value={form.houseNumber}
              onChange={(e) => handleChange('houseNumber', e.target.value)}
            />
          </Grid>
          <Grid sx={{ xs: 12, md: 4 }}>
            <TextField
              label="PLZ"
              fullWidth
              value={form.zipCode}
              onChange={(e) => handleChange('zipCode', e.target.value)}
            />
          </Grid>
          <Grid sx={{ xs: 12, md: 8 }}>
            <TextField
              label="Stadt"
              fullWidth
              value={form.city}
              onChange={(e) => handleChange('city', e.target.value)}
            />
          </Grid>
          <Grid sx={{ xs: 12, md: 6 }}>
            <TextField
              label="Bundesland"
              fullWidth
              value={form.state}
              onChange={(e) => handleChange('state', e.target.value)}
            />
          </Grid>
          <Grid sx={{ xs: 12, md: 6 }}>
            <TextField
              label="Land"
              fullWidth
              value={form.country}
              onChange={(e) => handleChange('country', e.target.value)}
            />
          </Grid>
        </Grid>

        {/* Speichern */}
        <Grid sx={{ xs: 12 }}>
          <Stack direction="row" justifyContent="flex-end">
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Änderungen speichern
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
