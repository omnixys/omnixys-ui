// app/banking/transfers/page.tsx
'use client';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';

export default function TransfersPage() {
  return (
    <Box p={4} maxWidth={600}>
      <Typography variant="h4" gutterBottom>
        Überweisung tätigen
      </Typography>
      <Stack spacing={3}>
        <TextField label="Empfänger" fullWidth />
        <TextField label="IBAN" fullWidth />
        <TextField label="Betrag" type="number" fullWidth />
        <TextField label="Verwendungszweck" fullWidth />
        <Button variant="contained">Absenden</Button>
      </Stack>
    </Box>
  );
}
