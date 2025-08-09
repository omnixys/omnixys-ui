// Pfad: components/NewsLetter.tsx
'use client';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';

export default function NewsLetter(): React.JSX.Element {
  const [email, setEmail] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);
  const [ok, setOk] = React.useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOk(false);
    // sehr einfache Mail-Validierung
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!valid) {
      setError('Bitte eine gültige E-Mail-Adresse eingeben.');
      return;
    }
    setError(null);
    // TODO: hier API-Call ausführen
    setOk(true);
    setEmail('');
  };

  return (
    <Box textAlign="center" pt={8} pb={14}>
      <Stack alignItems="center" spacing={2}>
        <Typography
          variant="h4"
          fontWeight={500}
          sx={{ typography: { xs: 'h5', md: 'h4' } }}
        >
          Subscribe now & get 20% off
        </Typography>

        <Typography variant="body1" color="text.secondary" pb={2}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </Typography>

        <Box
          component="form"
          onSubmit={onSubmit}
          width="100%"
          maxWidth="48rem"
          display="flex"
          gap={0}
        >
          <TextField
            fullWidth
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={Boolean(error)}
            helperText={error ?? ' '}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              px: { xs: 4, md: 6 },
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              bgcolor: '#ea580c', // orange-600
              '&:hover': { bgcolor: '#c2410c' },
              height: { xs: 48, md: 56 },
            }}
          >
            Subscribe
          </Button>
        </Box>

        {ok && (
          <Alert severity="success">
            Danke! Bitte bestätige deine Anmeldung in deinem Postfach.
          </Alert>
        )}
      </Stack>
    </Box>
  );
}
