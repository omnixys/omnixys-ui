// File: app/analytics/person/[id]/edit/page.tsx

'use client';

import { useMutation, useQuery } from '@apollo/client';
import {
  Alert,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { UPDATE_CUSTOMER } from '../../../../graphql/customer/mutation/update';
import { GET_CUSTOMER_BY_ID } from '../../../../graphql/customer/query/person';
import getApolloClient from '../../../../lib/apolloClient';
import { CustomerFormState } from '../../../../types/person/CustomerFormData';
import AddressForm from '../../edit/AddressForm';
import ContactOptionsSelector from '../../edit/ContactOptionsSelector';
import CustomerHeaderPanel from '../../edit/CustomerHeaderPanel';
import InterestSelector from '../../edit/InterestSelector';

const maritalStatusOptions = ['SINGLE', 'MARRIED', 'DIVORCED', 'WIDOWED'];
const maritalStatusLabels = {
  SINGLE: 'Ledig',
  MARRIED: 'Verheiratet',
  DIVORCED: 'Geschieden',
  WIDOWED: 'Verwitwet',
};
type MaritalStatus = keyof typeof maritalStatusLabels;

const tierLevelOptions = [
  { value: 1, label: 'Basic' },
  { value: 2, label: 'Elite' },
  { value: 3, label: 'Supreme' },
];

export default function CustomerEditPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { data: session } = useSession();
  const theme = useTheme();

  const client = useMemo(
    () => getApolloClient(session?.access_token),
    [session?.access_token],
  );

  const { loading, error, data } = useQuery(GET_CUSTOMER_BY_ID, {
    client,
    variables: { id },
  });

  const [updateCustomer, { loading: updateLoading, error: updateError }] =
    useMutation(UPDATE_CUSTOMER, { client });

  const [formState, setFormState] = useState<CustomerFormState>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    tierLevel: 1,
    subscribed: false,
    maritalStatus: 'SINGLE', // Defaultwert vom Typ MaritalStatus
    address: {
      street: '',
      houseNumber: '',
      zipCode: '',
      city: '',
      state: '',
      country: '',
    },
    contactOptions: [],
    interests: [],
    version: '',
  });

  useEffect(() => {
    if (!data?.customer) return;
    const {
      firstName = '',
      lastName = '',
      email = '',
      phoneNumber = '',
      tierLevel = 1,
      subscribed = false,
      maritalStatus = '',
      address = {},
      contactOptions = [],
      interests = [],
      version = '',
    } = data.customer;

    setFormState({
      firstName,
      lastName,
      email,
      phoneNumber,
      tierLevel,
      subscribed,
      maritalStatus,
      address: {
        street: address.street ?? '',
        houseNumber: address.houseNumber ?? '',
        zipCode: address.zipCode ?? '',
        city: address.city ?? '',
        state: address.state ?? '',
        country: address.country ?? '',
      },
      contactOptions,
      interests,
      version,
    });
  }, [data]);

  const handleAddressChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormState((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [name]: value,
        },
      }));
    },
    [],
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { version, ...input } = formState;
    try {
      await updateCustomer({ variables: { id, input, version } });
      router.push(`/analytics/person/${id}`);
    } catch (err) {
      console.error('Update fehlgeschlagen:', err);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: (theme) =>
            `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
        }}
      >
        <CircularProgress sx={{ color: theme.palette.background.paper }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Paper
          sx={{
            p: 5,
            textAlign: 'center',
            borderRadius: 3,
            boxShadow: 4,
            backgroundColor: theme.palette.background.paper,
          }}
        >
          <Typography variant="h5" color="error" sx={{ fontWeight: 'bold' }}>
            Fehler beim Laden der Kundendaten
          </Typography>
          <Typography
            variant="body1"
            sx={{ mt: 2, color: theme.palette.text.primary }}
          >
            Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.
          </Typography>
          <Button
            component={Link}
            href="/analytics/person"
            variant="contained"
            sx={{
              mt: 3,
              backgroundColor: theme.palette.primary.main,
              '&:hover': { backgroundColor: theme.palette.secondary.main },
            }}
          >
            Zurück zur Kundenliste
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 5 }}>
            <CustomerHeaderPanel />
          </Grid>
          <Grid size={{ xs: 12, md: 7 }}>
            <Paper
              sx={{
                p: 4,
                borderRadius: 2,
                boxShadow: 3,
                backgroundColor: theme.palette.background.paper,
                transition: 'box-shadow 0.3s ease',
                '&:hover': { boxShadow: '0 8px 16px rgba(0,0,0,0.15)' },
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 'bold',
                  mb: 3,
                  color: theme.palette.primary.main,
                  textAlign: 'center',
                }}
              >
                Kundendaten bearbeiten
              </Typography>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      label="Vorname"
                      value={formState.firstName}
                      onChange={(e) =>
                        setFormState({
                          ...formState,
                          firstName: e.target.value,
                        })
                      }
                      fullWidth
                      variant="outlined"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      label="Nachname"
                      value={formState.lastName}
                      onChange={(e) =>
                        setFormState({ ...formState, lastName: e.target.value })
                      }
                      fullWidth
                      variant="outlined"
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      label="Email"
                      value={formState.email}
                      onChange={(e) =>
                        setFormState({ ...formState, email: e.target.value })
                      }
                      fullWidth
                      variant="outlined"
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      label="Telefonnummer"
                      value={formState.phoneNumber}
                      onChange={(e) =>
                        setFormState({
                          ...formState,
                          phoneNumber: e.target.value,
                        })
                      }
                      fullWidth
                      variant="outlined"
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel id="tier-level-label">
                        Mitgliedschaftsstufe
                      </InputLabel>
                      <Select
                        labelId="tier-level-label"
                        value={formState.tierLevel}
                        label="Mitgliedschaftsstufe"
                        onChange={(e) =>
                          setFormState({
                            ...formState,
                            tierLevel: e.target.value,
                          })
                        }
                      >
                        {tierLevelOptions.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formState.subscribed}
                          onChange={(e) =>
                            setFormState({
                              ...formState,
                              subscribed: e.target.checked,
                            })
                          }
                          color="primary"
                        />
                      }
                      label="Abonniert"
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel id="marital-status-label">
                        Ehestand
                      </InputLabel>
                      <Select
                        labelId="marital-status-label"
                        value={formState.maritalStatus}
                        label="Ehestand"
                        onChange={(e) =>
                          setFormState({
                            ...formState,
                            maritalStatus: e.target.value,
                          })
                        }
                      >
                        {maritalStatusOptions.map((status) => (
                          <MenuItem key={status} value={status}>
                            {maritalStatusLabels[status as MaritalStatus]}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <AddressForm
                    address={formState.address}
                    onChange={handleAddressChange}
                  />
                  <ContactOptionsSelector
                    value={formState.contactOptions}
                    onChange={(val) =>
                      setFormState({ ...formState, contactOptions: val })
                    }
                  />
                  <InterestSelector
                    value={formState.interests}
                    onChange={(val) =>
                      setFormState({ ...formState, interests: val })
                    }
                  />

                  {updateError && (
                    <Grid size={{ xs: 12 }}>
                      <Alert severity="error">{updateError.message}</Alert>
                    </Grid>
                  )}

                  <Grid size={{ xs: 12 }} sx={{ textAlign: 'center', mt: 2 }}>
                    <Box
                      sx={{
                        mt: 4,
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Button
                        component={Link}
                        href={`/analytics/person/${id}?type=CUSTOMER`}
                        variant="outlined"
                        sx={{
                          borderColor: theme.palette.text.primary,
                          color: theme.palette.text.primary,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            backgroundColor: theme.palette.action.hover,
                          },
                        }}
                      >
                        Abbrechen
                      </Button>
                      <Button
                        type="submit"
                        variant="contained"
                        sx={{
                          backgroundColor: theme.palette.primary.main,
                          '&:hover': {
                            backgroundColor: theme.palette.secondary.main,
                          },
                          px: 4,
                          py: 1.5,
                        }}
                        disabled={updateLoading}
                      >
                        {updateLoading ? (
                          <CircularProgress
                            size={24}
                            sx={{
                              color: theme.palette.getContrastText(
                                theme.palette.primary.main,
                              ),
                            }}
                          />
                        ) : (
                          'Speichern'
                        )}
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
