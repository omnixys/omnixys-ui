// src/app/list/page.tsx
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import { Suspense } from 'react';
import Filter from '../components/Filter';
import ProductList from '../components/ProductList';
import Skeleton from '../components/Skeleton';
import { sampleCategories } from '../data/categories';

type ListPageProps = { searchParams: Record<string, string | undefined> };

export default function ListPage({ searchParams }: ListPageProps) {
  const slug = searchParams.cat || 'all';
  const currentCat = sampleCategories.find((c) => c.slug === slug) || {
    name: 'All Products',
    slug: 'all',
  };

  return (
    <Box>
      <Container
        maxWidth="lg"
        sx={{ position: 'relative', px: { xs: 2, md: 4 }, pt: 2 }}
      >
        {/* CAMPAIGN */}
        <Grid
          container
          spacing={2}
          sx={{
            display: { xs: 'none', sm: 'flex' },
            bgcolor: 'pink.50',
            px: 2,
            height: 256,
            borderRadius: 2,
            alignItems: 'center',
            mb: 3,
          }}
        >
          <Grid size={{ xs: 12, md: 8 }}>
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: 2,
                textAlign: 'center',
              }}
            >
              <Typography
                variant="h4"
                fontWeight={600}
                color="grey.700"
                lineHeight={1.2}
              >
                Grab up to 50% off on
                <br /> Selected Products
              </Typography>
              <Button variant="contained" sx={{ borderRadius: 6, px: 3 }}>
                Buy Now
              </Button>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ position: 'relative', width: '100%', height: 256 }}>
              <Image
                src="/woman.png"
                alt="Campaign"
                fill
                style={{ objectFit: 'contain' }}
              />
            </Box>
          </Grid>
        </Grid>

        {/* FILTER */}
        <Filter />

        {/* PRODUCTS */}
        <Typography variant="h6" fontWeight={600} sx={{ mt: 6 }}>
          {currentCat.name} For You!
        </Typography>

        <Suspense fallback={<Skeleton items={8} />}>
          <ProductList
            categoryId={slug} // "all" zeigt alles (siehe Hinweis unten)
            searchParams={searchParams}
          />
        </Suspense>
      </Container>
    </Box>
  );
}
