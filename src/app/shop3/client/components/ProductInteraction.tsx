'use client';

import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from '@mui/material';
import { Minus, Plus, ShoppingCart } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';
import useCartStore from '../stores/cartStore';
import { ProductType } from '../types';

const ProductInteraction = ({
  product,
  selectedSize,
  selectedColor,
}: {
  product: ProductType;
  selectedSize: string;
  selectedColor: string;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCartStore();

  const handleTypeChange = (type: 'size' | 'color', value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(type, value);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleQuantityChange = (type: 'increment' | 'decrement') => {
    setQuantity((prev) =>
      type === 'increment' ? prev + 1 : Math.max(1, prev - 1),
    );
  };

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity,
      selectedColor,
      selectedSize,
    });
    toast.success('Product added to cart');
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push('/shop3/cart?step=2', { scroll: false });
  };

  return (
    <Stack spacing={2} mt={2}>
      {/* SIZE */}
      <Stack spacing={1}>
        <Typography variant="caption" color="text.secondary">
          Size
        </Typography>
        <ToggleButtonGroup
          value={selectedSize}
          exclusive
          onChange={(_, val) => val && handleTypeChange('size', val)}
          size="small"
        >
          {product.sizes.map((size) => (
            <ToggleButton
              key={size}
              value={size}
              sx={{ px: 1.5, minWidth: 40 }}
            >
              {size.toUpperCase()}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Stack>

      {/* COLOR */}
      <Stack spacing={1}>
        <Typography variant="caption" color="text.secondary">
          Color
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {product.colors.map((color) => {
            const selected = selectedColor === color;
            return (
              <Tooltip title={color} key={color}>
                <IconButton
                  size="small"
                  onClick={() => handleTypeChange('color', color)}
                  sx={{
                    p: 0.5,
                    border: 1,
                    borderColor: selected ? 'grey.500' : 'grey.300',
                    borderRadius: '50%',
                  }}
                >
                  <Box
                    sx={{
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      bgcolor: color,
                    }}
                  />
                </IconButton>
              </Tooltip>
            );
          })}
        </Box>
      </Stack>

      {/* QUANTITY */}
      <Stack spacing={1}>
        <Typography variant="caption" color="text.secondary">
          Quantity
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <ButtonGroup variant="outlined" size="small">
            <Button onClick={() => handleQuantityChange('decrement')}>
              <Minus size={16} />
            </Button>
            <Button disabled sx={{ cursor: 'default', px: 2 }}>
              {quantity}
            </Button>
            <Button onClick={() => handleQuantityChange('increment')}>
              <Plus size={16} />
            </Button>
          </ButtonGroup>
        </Box>
      </Stack>

      {/* ACTIONS */}
      <Button
        onClick={handleAddToCart}
        variant="contained"
        fullWidth
        startIcon={<Plus size={16} />}
        sx={{ textTransform: 'none', borderRadius: 2 }}
      >
        Add to Cart
      </Button>
      <Button
        onClick={handleBuyNow}
        variant="outlined"
        fullWidth
        startIcon={<ShoppingCart size={16} />}
        sx={{ textTransform: 'none', borderRadius: 2 }}
      >
        Buy this Item
      </Button>
    </Stack>
  );
};

export default ProductInteraction;
