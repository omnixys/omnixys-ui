// Pfad: app/product/[id]/page.tsx
'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import * as React from 'react';

import Footer from '../../components/Footer';
import Loading from '../../components/Loading';
import Navbar from '../../components/Navbar';
import ProductCard from '../../components/ProductCard';
import { useAppContext } from '../../context/AppContext';

// MUI
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Rating from '@mui/material/Rating';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

export default function ProductPage(): JSX.Element {
  const params = useParams<{ id: string }>();
  const { id } = params;

  const { products, router, addToCart, currency } = useAppContext();

  const [mainImage, setMainImage] = React.useState<string | null>(null);
  const [productData, setProductData] = React.useState<any | null>(null);

  const fetchProductData = React.useCallback(() => {
    const product = products.find((p) => p._id === id);
    setProductData(product ?? null);
    if (product && product.image?.length) {
      setMainImage(product.image[0]);
    }
  }, [id, products]);

  React.useEffect(() => {
    fetchProductData();
  }, [fetchProductData]);

  if (!productData) {
    return <Loading />;
  }

  const ratingValue = 4.5;

  return (
    <>
      <Navbar />

      <Container maxWidth="lg" sx={{ pt: 4 }}>
        <Grid container spacing={6}>
          {/* Galerie */}
          <Grid item xs={12} md={6}>
            <Box px={{ xs: 0, lg: 4 }}>
              <Box
                sx={{
                  borderRadius: 2,
                  overflow: 'hidden',
                  bgcolor: 'action.hover',
                  mb: 2,
                }}
              >
                <Image
                  src={mainImage ?? productData.image[0]}
                  alt={productData.name}
                  width={1280}
                  height={720}
                  style={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'cover',
                    mixBlendMode: 'multiply',
                  }}
                />
              </Box>

              <Grid container spacing={2}>
                {productData.image.map((img: string, idx: number) => (
                  <Grid item xs={3} key={idx}>
                    <Box
                      onClick={() => setMainImage(img)}
                      sx={{
                        borderRadius: 2,
                        overflow: 'hidden',
                        bgcolor: 'action.hover',
                        cursor: 'pointer',
                      }}
                    >
                      <Image
                        src={img}
                        alt={`${productData.name} thumb ${idx + 1}`}
                        width={320}
                        height={180}
                        style={{
                          width: '100%',
                          height: 'auto',
                          objectFit: 'cover',
                          mixBlendMode: 'multiply',
                        }}
                      />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>

          {/* Details */}
          <Grid item xs={12} md={6}>
            <Typography
              variant="h4"
              fontWeight={600}
              color="text.primary"
              mb={1}
            >
              {productData.name}
            </Typography>

            <Box display="flex" alignItems="center" gap={1}>
              <Rating
                value={Math.round(ratingValue * 2) / 2}
                precision={0.5}
                readOnly
                size="small"
              />
              <Typography variant="body2" color="text.secondary">
                ({ratingValue})
              </Typography>
            </Box>

            <Typography variant="body1" color="text.secondary" mt={2}>
              {productData.description}
            </Typography>

            <Box mt={3} display="flex" alignItems="baseline" gap={1.5}>
              <Typography variant="h4" fontWeight={700}>
                {currency}
                {productData.offerPrice}
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ textDecoration: 'line-through' }}
              >
                {currency}
                {productData.price}
              </Typography>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Table size="small" sx={{ maxWidth: 288 }}>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>
                    Brand
                  </TableCell>
                  <TableCell sx={{ color: 'text.secondary' }}>
                    Generic
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>
                    Color
                  </TableCell>
                  <TableCell sx={{ color: 'text.secondary' }}>Multi</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>
                    Category
                  </TableCell>
                  <TableCell sx={{ color: 'text.secondary' }}>
                    {productData.category}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <Box display="flex" gap={2} mt={4}>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => addToCart(productData._id)}
              >
                Add to Cart
              </Button>
              <Button
                fullWidth
                variant="contained"
                onClick={() => {
                  addToCart(productData._id);
                  router.push('/cart');
                }}
              >
                Buy now
              </Button>
            </Box>
          </Grid>
        </Grid>

        {/* Featured Products */}
        <Box mt={10} textAlign="center">
          <Box mb={2}>
            <Typography variant="h4" fontWeight={600}>
              Featured{' '}
              <Box component="span" sx={{ color: 'primary.main' }}>
                Products
              </Box>
            </Typography>
            <Box
              mx="auto"
              mt={1}
              width={112}
              height={4}
              sx={{ bgcolor: 'primary.main', borderRadius: 999 }}
            />
          </Box>

          <Grid container spacing={3} mt={1} mb={6}>
            {products.slice(0, 5).map((p: any, index: number) => (
              <Grid item xs={6} md={4} lg={3} xl={2.4 as any} key={index}>
                <ProductCard product={p} />
              </Grid>
            ))}
          </Grid>

          <Button variant="outlined" sx={{ mb: 6 }}>
            See more
          </Button>
        </Box>
      </Container>

      <Footer />
    </>
  );
}
