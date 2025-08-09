// src/app/page.tsx
// Next.js App Router – MUI-Version, ohne Wix

import { Box, Container, Typography } from '@mui/material';
import { Suspense } from 'react';
import CategoryList from './components/CategoryList';
import ProductList from './components/ProductList';
import Skeleton from './components/Skeleton';
import Slider from './components/Slider';

// Beispiel-Kategorien für Dummy-Daten
const FEATURED_CATEGORY_ID = 'featured';
const NEW_CATEGORY_ID = 'new';

export default function HomePage() {
  return (
    <Box>
      <Slider />

      <Container maxWidth="lg" sx={{ mt: { xs: 8, md: 10 } }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Featured Products
        </Typography>
        <Suspense fallback={<Skeleton items={4} />}>
          <ProductList categoryId={FEATURED_CATEGORY_ID} limit={4} />
        </Suspense>
      </Container>

      <Container maxWidth="lg" sx={{ mt: { xs: 8, md: 10 } }}>
        <Typography variant="h5" sx={{ mb: 3 }}>
          Categories
        </Typography>
        <Suspense fallback={<Skeleton items={4} />}>
          <CategoryList />
        </Suspense>
      </Container>

      <Container
        maxWidth="lg"
        sx={{ mt: { xs: 8, md: 10 }, mb: { xs: 8, md: 12 } }}
      >
        <Typography variant="h5" sx={{ mb: 2 }}>
          New Products
        </Typography>
        <Suspense fallback={<Skeleton items={4} />}>
          <ProductList categoryId={NEW_CATEGORY_ID} limit={4} />
        </Suspense>
      </Container>
    </Box>
  );
}
