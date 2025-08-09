// Pfad: components/HomeProducts.tsx
'use client';

import * as React from 'react';
import { useAppContext } from '../context/AppContext';
import ProductCard from './ProductCard';

// MUI Imports
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

export default function HomeProducts(): React.JSX.Element {
  const { products, router } = useAppContext();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      pt={7}
      pb={7}
    >
      {/* Titel */}
      <Typography
        variant="h5"
        fontWeight="medium"
        alignSelf="flex-start"
        width="100%"
      >
        Popular products
      </Typography>

      {/* Produkt-Grid */}
      <Grid container spacing={3} mt={2} mb={7}>
        {products.map((product, index) => (
          <Grid item xs={6} md={4} lg={3} xl={2.4} key={index}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>

      {/* Button */}
      <Button
        variant="outlined"
        color="inherit"
        sx={{
          px: 6,
          py: 1.25,
          color: 'text.secondary',
          '&:hover': { backgroundColor: 'action.hover' },
        }}
        onClick={() => router.push('/all-products')}
      >
        See more
      </Button>
    </Box>
  );
}
