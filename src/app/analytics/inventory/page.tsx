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
import { GET_INVENTORYS } from '../../../graphql/inventory/query/inventory';
import getApolloClient from '../../../lib/apolloClient';
import { InventoryType } from '../../../types/inventory/inventory.type';

export default function InventoryAnalyticsPage() {
  const { data: session } = useSession();
  const client = getApolloClient(session?.access_token);
  const { data, loading } = useQuery(GET_INVENTORYS, { client });
  const inventories: InventoryType[] = data?.inventorys?.content || [];
  const theme = useTheme();

  const handleExport = () => {
    window.open('/export/inventorys/report.xlsx', '_blank');
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
          Lageranalyse
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
          {inventories.map((inv) => (
            <Grid sx={{ xs: 12, md: 6, lg: 4 }} key={inv.id}>
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
                      {inv.product_name || 'Unbekanntes Produkt'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      SKU: {inv.sku_code} — Status: {inv.status}
                    </Typography>
                    <Box mt={2}>
                      <Chip
                        label={`Bestand: ${inv.quantity}`}
                        color="success"
                      />
                      <Chip
                        label={`Preis: ${inv.unit_price} €`}
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
