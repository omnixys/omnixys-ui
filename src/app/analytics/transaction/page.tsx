// app/analytics/transaction/page.tsx

'use client';

import { useQuery } from '@apollo/client';
import DownloadIcon from '@mui/icons-material/Download';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Grid,
  Typography,
  useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { GET_TRANSACTIONS } from '../../../graphql/transaction/query/transactions';
import getApolloClient from '../../../lib/apolloClient';
import { Transaction } from '../../../types/transaction/transaction.type';

export default function TransactionAnalyticsPage() {
  const { data: session } = useSession();
  const client = getApolloClient(session?.access_token);
  const { data, loading } = useQuery(GET_TRANSACTIONS, { client });
  const transactions: Transaction[] = data?.transactions || [];
  const theme = useTheme();

  const handleExport = () => {
    window.open('/export/transactions/report.xlsx', '_blank');
  };

  return (
    <Box p={4} bgcolor={theme.palette.background.default}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          color={theme.palette.primary.main}
        >
          Transaktionen
        </Typography>
        <Button
          variant="contained"
          startIcon={<DownloadIcon />}
          onClick={handleExport}
        >
          Exportieren
        </Button>
      </Box>
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3}>
          {transactions.map((tx) => (
            <Grid sx={{ xs: 12, md: 6, lg: 4 }} key={tx.id}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Card sx={{ borderRadius: 4, boxShadow: 3 }}>
                  <CardContent>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      color={theme.palette.text.primary}
                    >
                      {tx.type} – {tx.currencyType}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Sender: {tx.sender} | Empfänger: {tx.receiver}
                    </Typography>
                    <Box mt={2}>
                      <Chip
                        label={`Betrag: ${tx.amount.toFixed(2)}`}
                        color="success"
                      />
                      <Chip
                        label={`Datum: ${new Date(tx.created).toLocaleDateString()}`}
                        sx={{ ml: 1 }}
                      />
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
