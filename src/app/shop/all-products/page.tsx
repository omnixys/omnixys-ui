// Pfad: app/all-products/page.tsx
'use client';

import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import { useAppContext } from '../context/AppContext';

// MUI
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

export default function AllProducts(): JSX.Element {
  const { products } = useAppContext();

  return (
    <>
      <Navbar />

      <Container maxWidth="lg">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          py={3}
        >
          <Box alignSelf="flex-end" pt={6}>
            <Typography variant="h5" fontWeight={600}>
              All products
            </Typography>
            <Box
              mt={0.5}
              width={64}
              height={4}
              sx={{ bgcolor: 'primary.main', borderRadius: 999 }}
            />
          </Box>

          <Grid container spacing={3} mt={3} mb={7}>
            {products.map((product, index) => (
              <Grid item xs={6} md={4} lg={3} xl={2.4 as any} key={index}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>

      <Footer />
    </>
  );
}
