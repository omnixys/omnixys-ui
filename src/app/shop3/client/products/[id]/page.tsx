// app/products/[id]/page.tsx
import { Box, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import ProductInteraction from '../../components/ProductInteraction';
import { ProductType } from '../../types';

// TEMPORARY
const product: ProductType = {
  id: 1,
  name: 'Adidas CoreFit T-Shirt',
  shortDescription:
    'Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.',
  description:
    'Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.',
  price: 59.9,
  sizes: ['xs', 's', 'm', 'l', 'xl'],
  colors: ['gray', 'purple', 'green'],
  images: {
    gray: '/shop3/products/1g.png',
    purple: '/shop3/products/1p.png',
    green: '/shop3/products/1gr.png',
  },
};

export async function generateMetadata({ params }: { params: { id: string } }) {
  // TODO: Produkt aus DB laden
  return {
    title: product.name,
    description: product.description, // ✅ nicht "describe"
  };
}

type SearchParams = { [key: string]: string | string[] | undefined };

export default function ProductPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: SearchParams;
}) {
  const sizeParam =
    typeof searchParams?.size === 'string' ? searchParams.size : undefined;
  const colorParam =
    typeof searchParams?.color === 'string' ? searchParams.color : undefined;

  const selectedSize = sizeParam || product.sizes[0];
  const selectedColor = colorParam || product.colors[0];

  return (
    <Grid container spacing={{ xs: 3, md: 6 }} sx={{ mt: { xs: 3, md: 6 } }}>
      {/* IMAGE */}
      <Grid item xs={12} lg={5}>
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            aspectRatio: '2 / 3',
            borderRadius: 2,
            overflow: 'hidden',
          }}
        >
          <Image
            src={product.images[selectedColor]}
            alt={product.name}
            fill
            style={{ objectFit: 'contain' }}
            priority
          />
        </Box>
      </Grid>

      {/* DETAILS */}
      <Grid item xs={12} lg={7}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="h5" fontWeight={600}>
            {product.name}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {product.description}
          </Typography>

          <Typography variant="h6" fontWeight={700}>
            ${product.price.toFixed(2)}
          </Typography>

          <ProductInteraction
            product={product}
            selectedSize={selectedSize}
            selectedColor={selectedColor}
          />

          {/* CARD INFO */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mt: 1 }}>
            <Box sx={{ borderRadius: 1, overflow: 'hidden' }}>
              <Image
                src="/shop3/klarna.png"
                alt="klarna"
                width={50}
                height={25}
              />
            </Box>
            <Box sx={{ borderRadius: 1, overflow: 'hidden' }}>
              <Image
                src="/shop3/cards.png"
                alt="cards"
                width={50}
                height={25}
              />
            </Box>
            <Box sx={{ borderRadius: 1, overflow: 'hidden' }}>
              <Image
                src="/shop3/stripe.png"
                alt="stripe"
                width={50}
                height={25}
              />
            </Box>
          </Box>

          <Typography variant="caption" color="text.secondary">
            By clicking Pay Now, you agree to our{' '}
            <Box
              component="span"
              sx={{
                textDecoration: 'underline',
                cursor: 'pointer',
                '&:hover': { color: 'text.primary' },
              }}
            >
              Terms & Conditions
            </Box>{' '}
            and{' '}
            <Box
              component="span"
              sx={{
                textDecoration: 'underline',
                cursor: 'pointer',
                '&:hover': { color: 'text.primary' },
              }}
            >
              Privacy Policy
            </Box>
            . You authorize us to charge your selected payment method for the
            total amount shown. All sales are subject to our return and{' '}
            <Box
              component="span"
              sx={{
                textDecoration: 'underline',
                cursor: 'pointer',
                '&:hover': { color: 'text.primary' },
              }}
            >
              Refund Policies
            </Box>
            .
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}
