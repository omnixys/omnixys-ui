// Pfad: app/add-address/page.tsx
'use client';

import Image from 'next/image';
import * as React from 'react';
import { assets } from '../assets/assets';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

// MUI
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

type Address = {
  fullName: string;
  phoneNumber: string;
  pincode: string;
  area: string;
  city: string;
  state: string;
};

export default function AddAddress(): React.JSX.Element {
  const [address, setAddress] = React.useState<Address>({
    fullName: '',
    phoneNumber: '',
    pincode: '',
    area: '',
    city: '',
    state: '',
  });

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: API-Call zum Speichern
    // console.log(address);
  };

  const handleChange =
    (field: keyof Address) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setAddress((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <>
      <Navbar />

      <Container maxWidth="lg">
        <Grid
          container
          spacing={4}
          alignItems="center"
          justifyContent="space-between"
          sx={{ py: 6 }}
        >
          {/* Form */}
          <Grid item xs={12} md={7}>
            <Box component="form" onSubmit={onSubmitHandler} maxWidth={480}>
              <Typography
                variant="h4"
                sx={{ typography: { xs: 'h5', md: 'h4' } }}
                color="text.secondary"
              >
                Add Shipping{' '}
                <Box
                  component="span"
                  sx={{ color: 'primary.main', fontWeight: 600 }}
                >
                  Address
                </Box>
              </Typography>

              <Box mt={4} display="grid" gap={2}>
                <TextField
                  label="Full name"
                  fullWidth
                  value={address.fullName}
                  onChange={handleChange('fullName')}
                  required
                />
                <TextField
                  label="Phone number"
                  fullWidth
                  value={address.phoneNumber}
                  onChange={handleChange('phoneNumber')}
                  inputProps={{ inputMode: 'tel', pattern: '[0-9+ -]+' }}
                  required
                />
                <TextField
                  label="Pin code"
                  fullWidth
                  value={address.pincode}
                  onChange={handleChange('pincode')}
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]+' }}
                  required
                />
                <TextField
                  label="Address (Area and Street)"
                  fullWidth
                  multiline
                  minRows={4}
                  value={address.area}
                  onChange={handleChange('area')}
                  required
                />
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="City/District/Town"
                      fullWidth
                      value={address.city}
                      onChange={handleChange('city')}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="State"
                      fullWidth
                      value={address.state}
                      onChange={handleChange('state')}
                      required
                    />
                  </Grid>
                </Grid>
              </Box>

              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{ mt: 3, textTransform: 'uppercase' }}
              >
                Save address
              </Button>
            </Box>
          </Grid>

          {/* Illustration */}
          <Grid item xs={12} md="auto">
            <Box sx={{ mt: { xs: 4, md: 0 }, mr: { md: 6 } }}>
              <Image
                src={assets.my_location_image}
                alt="my_location_image"
                style={{ width: '100%', maxWidth: 420, height: 'auto' }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Footer />
    </>
  );
}
