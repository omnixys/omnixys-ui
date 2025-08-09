// src/app/[slug]/page.tsx (MUI-Version, ohne Wix)
import {
  Box,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { notFound } from 'next/navigation';
import Add from '../components/Add';
import CustomizeProducts from '../components/CustomizeProducts';
import ProductImages from '../components/ProductImages';
import Reviews from '../components/Reviews';
import { sampleProducts } from '../data/sampleProducts';

export default function SinglePage({ params }: { params: { slug: string } }) {
  const product = sampleProducts.find((p) => p.slug === params.slug);
  if (!product) return notFound();

  const hasDiscount =
    product.price?.discountedPrice != null &&
    product.price?.discountedPrice !== product.price?.price;

  return (
    <Box>
      <Container maxWidth="lg" sx={{ pt: 2, pb: 6 }}>
        <Grid container spacing={4}>
          {/* IMG */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <Box sx={{ position: 'sticky', top: 80 }}>
              <ProductImages items={product.media?.items} />
            </Box>
          </Grid>

          {/* TEXTS */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <Stack spacing={2}>
              <Typography variant="h3" fontWeight={600}>
                {product.name}
              </Typography>

              {product.description && (
                <Typography color="text.secondary">
                  {product.description}
                </Typography>
              )}

              <Divider />

              {hasDiscount ? (
                <Stack direction="row" spacing={2} alignItems="baseline">
                  <Typography
                    variant="h6"
                    color="text.secondary"
                    sx={{ textDecoration: 'line-through' }}
                  >
                    € {product.price?.price?.toFixed(2)}
                  </Typography>
                  <Typography variant="h4" fontWeight={700}>
                    € {product.price?.discountedPrice?.toFixed(2)}
                  </Typography>
                </Stack>
              ) : (
                <Typography variant="h4" fontWeight={700}>
                  € {product.price?.price?.toFixed(2)}
                </Typography>
              )}

              <Divider />

              {product.variants && product.productOptions ? (
                <CustomizeProducts
                  productId={product._id}
                  variants={product.variants}
                  productOptions={product.productOptions}
                />
              ) : (
                <Add
                  productId={product._id}
                  variantId="00000000-0000-0000-0000-000000000000"
                  stockNumber={product.stock?.quantity ?? 0}
                />
              )}

              <Divider />

              {(product.additionalInfoSections ?? []).map((section: any) => (
                <Box key={section.title}>
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    sx={{ mb: 1 }}
                  >
                    {section.title}
                  </Typography>
                  <Typography variant="body2">{section.description}</Typography>
                </Box>
              ))}

              <Divider />

              <Typography variant="h5">User Reviews</Typography>
              <Reviews productId={product._id} />
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
