'use client';

import { Badge, IconButton } from '@mui/material';
import { ShoppingCart as ShoppingCartIconLucide } from 'lucide-react';
import NextLink from 'next/link';
import useCartStore from '../stores/cartStore';

const ShoppingCartIcon = () => {
  const { cart, hasHydrated } = useCartStore();

  // if (!hasHydrated) return null;

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <IconButton
      component={NextLink}
      href="/shop3/cart"
      sx={{
        position: 'relative',
        color: 'grey.700',
      }}
      aria-label="shopping cart"
    >
      <Badge
        badgeContent={totalItems}
        color="warning"
        overlap="circular"
        sx={{
          '& .MuiBadge-badge': {
            color: 'grey.800',
            fontWeight: 500,
            fontSize: '0.75rem',
            minWidth: '1rem',
            height: '1rem',
          },
        }}
      >
        <ShoppingCartIconLucide size={18} />
      </Badge>
    </IconButton>
  );
};

export default ShoppingCartIcon;
