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
import { GET_PRODUCTS } from '../../../graphql/product/query/products';
import getApolloClient from '../../../lib/apolloClient';
import { ProductType } from '../../../types/product/product.type';
import { getLogger } from '../../../utils/logger';

export default function ProductAnalyticsPage() {
  const logger = getLogger(ProductAnalyticsPage.name);
  const { data: session } = useSession();
  const client = getApolloClient(session?.access_token);
  const { data, loading } = useQuery(GET_PRODUCTS, { client });
  const products: ProductType[] = data?.products?.content || [];

  logger.debug('produkte: %o', data);
  const theme = useTheme();

  const handleExport = () => {
    window.open('/export/products/report.xlsx', '_blank');
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
          Produktanalyse
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
          {products.map((product) => (
            <Grid sx={{ xs: 12, md: 6, lg: 4 }} key={product.id}>
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
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {product.description || 'Keine Beschreibung'}
                    </Typography>
                    <Box mt={2}>
                      <Chip
                        label={`Kategorie: ${product.category}`}
                        color="primary"
                      />
                      <Chip
                        label={`Varianten: ${product.variants.length}`}
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
