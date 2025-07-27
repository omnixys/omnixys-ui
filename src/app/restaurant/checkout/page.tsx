'use client';
import { Button, Container, TextField, Typography } from '@mui/material';

export default function CheckoutPage() {
  return (
    <Container sx={{ mt: 3 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        ✅ Checkout
      </Typography>
      <TextField label="Adresse" fullWidth sx={{ mb: 2 }} />
      <TextField
        label="Zahlungsmethode (z.B. Kreditkarte)"
        fullWidth
        sx={{ mb: 2 }}
      />
      <Button variant="contained">Bestellung abschicken</Button>
    </Container>
  );
}
