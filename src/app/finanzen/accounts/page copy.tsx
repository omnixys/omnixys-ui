'use client';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import Link from 'next/link';

const dummyAccounts = [
  {
    id: '1',
    name: 'Girokonto',
    balance: 1234.56,
    iban: 'DE89 3704 0044 0532 0130 00',
    currency: 'EUR',
  },
  {
    id: '2',
    name: 'Sparkonto',
    balance: 5432.1,
    iban: 'DE68 2105 0170 0012 3456 78',
    currency: 'EUR',
  },
  {
    id: '3',
    name: 'Kreditkonto',
    balance: -10000.0,
    iban: 'DE12 3456 7890 1234 5678 90',
    currency: 'EUR',
  },
];

export default function AccountsPage() {
  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Deine Konten
      </Typography>
      <Grid container spacing={3}>
        {dummyAccounts.map((account) => (
          <Grid item xs={12} sm={6} md={4} key={account.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{account.name}</Typography>
                <Typography color="text.secondary">{account.iban}</Typography>
                <Typography variant="body1" sx={{ mt: 2 }}>
                  Kontostand:{' '}
                  <strong
                    style={{
                      color: account.balance < 0 ? '#F87171' : '#A3E635',
                    }}
                  >
                    {account.balance.toFixed(2)} {account.currency}
                  </strong>
                </Typography>
                <Box mt={2}>
                  <Link href={`/finanzen/account/${account.id}`}>
                    <Button variant="contained" color="primary">
                      Details
                    </Button>
                  </Link>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
