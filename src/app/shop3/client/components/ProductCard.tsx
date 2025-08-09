'use client';

import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-toastify';
import useCartStore from '../stores/cartStore';
import { ProductType } from '../types';

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
  Typography,
} from '@mui/material';

const ProductCard = ({ product }: { product: ProductType }) => {
  const [productTypes, setProductTypes] = useState({
    size: product.sizes[0],
    color: product.colors[0],
  });

  const { addToCart } = useCartStore();

  const handleProductType = ({
    type,
    value,
  }: {
    type: 'size' | 'color';
    value: string;
  }) => {
    setProductTypes((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity: 1,
      selectedSize: productTypes.size,
      selectedColor: productTypes.color,
    });
    toast.success('Product added to cart');
  };

  return (
    <Card elevation={6} sx={{ borderRadius: 2, overflow: 'hidden' }}>
      {/* IMAGE */}
      <Box
        component={Link}
        href={`/shop3/products/${product.id}`}
        sx={{ display: 'block' }}
      >
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            aspectRatio: '2 / 3',
            overflow: 'hidden',
            '& img': {
              transition: 'transform 300ms',
            },
            '&:hover img': {
              transform: 'scale(1.05)',
            },
          }}
        >
          <Image
            src={product.images[productTypes.color]}
            alt={product.name}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 600px) 100vw, 33vw"
            priority={false}
          />
        </Box>
      </Box>

      {/* PRODUCT DETAIL */}
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="subtitle1" fontWeight={600}>
          {product.name}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {product.shortDescription}
        </Typography>

        {/* PRODUCT TYPES */}
        <Grid container spacing={2} alignItems="center">
          {/* SIZE */}
          <Grid item xs="auto">
            <FormControl size="small" variant="outlined" sx={{ minWidth: 120 }}>
              <InputLabel id={`size-${product.id}`}>Size</InputLabel>
              <Select
                labelId={`size-${product.id}`}
                id="size"
                label="Size"
                value={productTypes.size}
                onChange={(e) =>
                  handleProductType({ type: 'size', value: e.target.value })
                }
              >
                {product.sizes.map((size) => (
                  <MenuItem key={size} value={size}>
                    {size.toUpperCase()}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* COLOR */}
          <Grid item xs>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
              Color
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {product.colors.map((color) => {
                const selected = productTypes.color === color;
                return (
                  <Tooltip key={color} title={color}>
                    <IconButton
                      size="small"
                      onClick={() =>
                        handleProductType({ type: 'color', value: color })
                      }
                      sx={{
                        p: 0.5,
                        border: 1,
                        borderColor: selected ? 'grey.500' : 'grey.300',
                        borderRadius: '50%',
                      }}
                    >
                      <Box
                        sx={{
                          width: 14,
                          height: 14,
                          borderRadius: '50%',
                          bgcolor: color,
                        }}
                      />
                    </IconButton>
                  </Tooltip>
                );
              })}
            </Box>
          </Grid>
        </Grid>
      </CardContent>

      {/* PRICE AND ADD TO CART BUTTON */}
      <CardActions
        sx={{
          px: 2,
          pb: 2,
          pt: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="subtitle1" fontWeight={600}>
          ${product.price.toFixed(2)}
        </Typography>

        <Button
          onClick={handleAddToCart}
          variant="outlined"
          startIcon={<ShoppingCart size={18} />}
          sx={{
            textTransform: 'none',
            boxShadow: 2,
            '&:hover': { boxShadow: 3 },
          }}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
