// src/components/CartModal.tsx (MUI, wix-frei)
'use client';

import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCartStore } from '../hooks/useCartStore';

export default function CartModal() {
  const router = useRouter();
  const { cart, totals, isLoading, removeItem } = useCartStore();

  const empty = cart.length === 0;

  const handleCheckout = () => {
    // wix-frei: eigene Checkout-Route
    router.push('/checkout');
  };

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 48,
        right: 0,
        zIndex: 1200,
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 3,
        p: 2,
        width: { xs: 340, sm: 380 },
      }}
    >
      {empty ? (
        <Typography variant="body2">Cart is Empty</Typography>
      ) : (
        <Stack spacing={2}>
          <Typography variant="h6">Shopping Cart</Typography>

          {/* LIST */}
          <Stack spacing={2} sx={{ maxHeight: 360, overflowY: 'auto', pr: 1 }}>
            {cart.map((item) => (
              <Stack key={item.id} direction="row" spacing={1.5}>
                {item.image && (
                  <Box
                    sx={{
                      position: 'relative',
                      width: 72,
                      height: 96,
                      borderRadius: 1,
                      overflow: 'hidden',
                      bgcolor: 'grey.100',
                      flexShrink: 0,
                    }}
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="96px"
                      style={{ objectFit: 'cover' }}
                    />
                  </Box>
                )}

                <Stack spacing={0.5} sx={{ flex: 1, minWidth: 0 }}>
                  {/* TOP */}
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography variant="subtitle2" fontWeight={600} noWrap>
                      {item.name}
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box
                      sx={{
                        px: 1,
                        py: 0.5,
                        bgcolor: 'grey.50',
                        borderRadius: 1,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                      }}
                    >
                      {item.quantity > 1 && (
                        <Typography variant="caption" color="success.main">
                          {item.quantity} ×
                        </Typography>
                      )}
                      <Typography variant="caption">
                        € {item.price.toFixed(2)}
                      </Typography>
                    </Box>
                  </Stack>

                  {/* DESC / STATUS optional */}
                  <Typography variant="caption" color="text.secondary">
                    Qty. {item.quantity}
                  </Typography>

                  {/* BOTTOM */}
                  <Stack direction="row" alignItems="center">
                    <Box sx={{ flexGrow: 1 }} />
                    <IconButton
                      size="small"
                      aria-label="Remove"
                      onClick={() => removeItem(item.id)}
                      disabled={isLoading}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                </Stack>
              </Stack>
            ))}
          </Stack>

          <Divider />

          {/* BOTTOM */}
          <Stack spacing={1}>
            <Stack direction="row" justifyContent="space-between">
              <Typography fontWeight={600}>Subtotal</Typography>
              <Typography fontWeight={600}>
                € {totals.subtotal.toFixed(2)}
              </Typography>
            </Stack>
            <Typography variant="caption" color="text.secondary">
              Shipping and taxes calculated at checkout.
            </Typography>

            <Stack
              direction="row"
              spacing={1}
              justifyContent="space-between"
              sx={{ mt: 1 }}
            >
              <Button variant="outlined" onClick={() => router.push('/cart')}>
                View Cart
              </Button>
              <Button
                variant="contained"
                onClick={handleCheckout}
                disabled={isLoading}
              >
                Checkout
              </Button>
            </Stack>
          </Stack>
        </Stack>
      )}
    </Box>
  );
}
