// Pfad: components/ProductCard.tsx
'use client';

import Image from 'next/image';
import { useAppContext } from '../context/AppContext';

// MUI
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// ---- Types ----
type Product = {
  _id: string;
  name: string;
  description?: string;
  image: string[];
  offerPrice: number;
  rating?: number; // optional
};

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props): JSX.Element {
  const { currency, router } = useAppContext();
  const ratingValue = product.rating ?? 4.5;

  const handleOpen = () => {
    router.push('/shop/product/' + product._id);
    // Scroll nach oben
    if (typeof window !== 'undefined')
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Card
      elevation={0}
      sx={{
        width: 1,
        maxWidth: 200,
        cursor: 'pointer',
        borderRadius: 2,
        bgcolor: 'background.paper',
      }}
    >
      <CardActionArea onClick={handleOpen} sx={{ borderRadius: 2 }}>
        {/* Bildbereich */}
        <Box
          sx={{
            position: 'relative',
            width: 1,
            height: 208, // ~ h-52
            bgcolor: 'action.hover',
            borderRadius: 2,
            overflow: 'hidden',
          }}
        >
          <Image
            src={product.image?.[0] ?? ''}
            alt={product.name}
            fill
            sizes="(max-width: 600px) 180px, 200px"
            style={{ objectFit: 'cover', transition: 'transform 200ms ease' }}
            onLoadingComplete={(img) => (img.style.transform = 'none')}
            onMouseOver={(e) =>
              ((e.currentTarget as HTMLImageElement).style.transform =
                'scale(1.05)')
            }
            onMouseOut={(e) =>
              ((e.currentTarget as HTMLImageElement).style.transform = 'none')
            }
          />

          <IconButton
            aria-label="add to wishlist"
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              bgcolor: 'background.paper',
              boxShadow: 1,
              '&:hover': { bgcolor: 'background.paper' },
            }}
            onClick={(e) => {
              e.stopPropagation();
              // TODO: Wishlist-Action
            }}
          >
            <FavoriteBorderOutlinedIcon fontSize="small" />
          </IconButton>
        </Box>

        <CardContent sx={{ px: 0, pt: 1.5 }}>
          <Typography variant="subtitle1" fontWeight={600} noWrap>
            {product.name}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            noWrap
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            {product.description}
          </Typography>

          <Stack direction="row" alignItems="center" spacing={1} mt={0.5}>
            <Typography variant="caption">{ratingValue}</Typography>
            <Rating
              value={Math.round(ratingValue * 2) / 2}
              precision={0.5}
              readOnly
              size="small"
            />
          </Stack>

          <Stack
            direction="row"
            alignItems="flex-end"
            justifyContent="space-between"
            mt={1}
          >
            <Typography variant="subtitle1" fontWeight={600}>
              {currency}
              {product.offerPrice}
            </Typography>

            <Button
              variant="outlined"
              size="small"
              sx={{
                display: { xs: 'none', sm: 'inline-flex' },
                borderRadius: 999,
              }}
              onClick={(e) => {
                e.stopPropagation();
                router.push('/shop/product/' + product._id);
              }}
            >
              Buy now
            </Button>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
