'use client'; // Entfernen, wenn die Seite ein Server Component bleiben soll

import { Box, Container } from '@mui/material';
import Image from 'next/image';
import ProductList from './components/ProductList';

type SearchParams = { [key: string]: string | string[] | undefined };

const Homepage = ({ searchParams }: { searchParams: SearchParams }) => {
  const category =
    typeof searchParams?.category === 'string' ? searchParams.category : '';

  return (
    <Container maxWidth={false} disableGutters sx={{ py: 2 }}>
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          aspectRatio: '3 / 1',
          mb: 6,
          overflow: 'hidden',
          '& img': { objectFit: 'cover' },
        }}
      >
        <Image src="/shop3/featured.png" alt="Featured Product" fill priority />
      </Box>

      <ProductList category={category} params="homepage" />
    </Container>
  );
};

export default Homepage;
