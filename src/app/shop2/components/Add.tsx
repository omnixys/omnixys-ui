// src/components/Add.tsx (MUI, wix-frei, bereinigt)
'use client';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import * as React from 'react';
import { useCartStore } from '../hooks/useCartStore'; // Pfad-Alias statt ../

export default function Add({
  productId,
  variantId,
  stockNumber,
}: {
  productId: string;
  variantId?: string | null;
  stockNumber: number;
}) {
  const [quantity, setQuantity] = React.useState(1);
  const [adding, setAdding] = React.useState(false);
  const { addItem, isLoading } = useCartStore();

  const maxStock = Number.isFinite(stockNumber) ? stockNumber : 9999;
  const outOfStock = !stockNumber || stockNumber < 1;

  const dec = () => setQuantity((q) => Math.max(1, q - 1));
  const inc = () => setQuantity((q) => Math.min(maxStock, q + 1));

  const handleAdd = async () => {
    try {
      setAdding(true);
      // wix-freie Signatur: addItem(productId, variantId, quantity)
      await Promise.resolve(addItem(productId, variantId ?? null, quantity));
      // optional: Snackbar hier
    } finally {
      setAdding(false);
    }
  };

  return (
    <Stack spacing={2}>
      <Typography variant="subtitle1" fontWeight={600}>
        Choose a Quantity
      </Typography>

      <Stack direction="row" alignItems="center" justifyContent="space-between">
        {/* Menge */}
        <Stack direction="row" spacing={2} alignItems="center">
          <Box
            sx={{
              bgcolor: 'grey.100',
              px: 2,
              py: 1,
              borderRadius: 6,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: 160,
            }}
          >
            <IconButton
              onClick={dec}
              disabled={quantity === 1}
              size="small"
              aria-label="decrease"
            >
              <RemoveIcon />
            </IconButton>

            <Typography
              component="span"
              sx={{ minWidth: 24, textAlign: 'center' }}
            >
              {quantity}
            </Typography>

            <IconButton
              onClick={inc}
              disabled={quantity === maxStock || outOfStock}
              size="small"
              aria-label="increase"
            >
              <AddIcon />
            </IconButton>
          </Box>

          <Typography variant="caption" aria-live="polite">
            {outOfStock ? (
              'Product is out of stock'
            ) : (
              <>
                Only{' '}
                <Box
                  component="span"
                  sx={{ color: 'warning.main', fontWeight: 600 }}
                >
                  {stockNumber} items
                </Box>{' '}
                left!
                <br />
                Don’t miss it
              </>
            )}
          </Typography>
        </Stack>

        {/* Add to Cart */}
        <Button
          variant="outlined"
          onClick={handleAdd}
          disabled={isLoading || adding || outOfStock}
          sx={{ width: 160, borderRadius: 6 }}
        >
          Add to Cart
        </Button>
      </Stack>
    </Stack>
  );
}
