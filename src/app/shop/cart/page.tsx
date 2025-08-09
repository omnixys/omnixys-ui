// Pfad: app/cart/page.tsx
'use client';

import Image from 'next/image';
import { assets } from '../assets/assets';
import Navbar from '../components/Navbar';
import OrderSummary from '../components/OrderSummary';
import { useAppContext } from '../context/AppContext';

// MUI
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

export default function Cart(): JSX.Element {
  const {
    products,
    router,
    cartItems,
    addToCart,
    updateCartQuantity,
    getCartCount,
    currency,
  } = useAppContext();

  const items = Object.keys(cartItems);

  return (
    <>
      <Navbar />

      <Container maxWidth="lg" sx={{ pt: 4, mb: 6 }}>
        <Grid container spacing={4}>
          {/* Left: Cart Table */}
          <Grid item xs={12} md={8} lg={9}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              pb={2}
            >
              <Typography
                variant="h4"
                sx={{ typography: { xs: 'h5', md: 'h4' } }}
                color="text.secondary"
              >
                Your{' '}
                <Box
                  component="span"
                  sx={{ color: 'primary.main', fontWeight: 600 }}
                >
                  Cart
                </Box>
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ typography: { xs: 'subtitle1', md: 'h6' } }}
              >
                {getCartCount()} Items
              </Typography>
            </Box>

            <Divider sx={{ mb: 2 }} />

            <TableContainer
              component={Paper}
              elevation={0}
              sx={{ overflowX: 'auto' }}
            >
              <Table size="small" aria-label="cart table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>
                      Product Details
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Price</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Quantity</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Subtotal</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items.map((itemId) => {
                    const product = products.find((p) => p._id === itemId);
                    const qty = cartItems[itemId];

                    if (!product || qty <= 0) return null;

                    return (
                      <TableRow key={itemId} hover>
                        <TableCell>
                          <Box display="flex" alignItems="center" gap={2}>
                            <Box
                              sx={{
                                borderRadius: 2,
                                overflow: 'hidden',
                                bgcolor: 'action.hover',
                                p: 1,
                                flexShrink: 0,
                              }}
                            >
                              <Image
                                src={product.image[0]}
                                alt={product.name}
                                width={64}
                                height={64}
                                style={{
                                  width: 64,
                                  height: 'auto',
                                  objectFit: 'cover',
                                  mixBlendMode: 'multiply',
                                }}
                              />
                            </Box>

                            {/* Desktop: name + remove */}
                            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                              <Typography variant="body2" color="text.primary">
                                {product.name}
                              </Typography>
                              <Button
                                variant="text"
                                size="small"
                                sx={{
                                  color: 'primary.main',
                                  p: 0,
                                  minWidth: 0,
                                }}
                                onClick={() =>
                                  updateCartQuantity(product._id, 0)
                                }
                              >
                                Remove
                              </Button>
                            </Box>

                            {/* Mobile: remove button under image */}
                            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                              <Button
                                variant="text"
                                size="small"
                                sx={{
                                  color: 'primary.main',
                                  p: 0,
                                  minWidth: 0,
                                }}
                                onClick={() =>
                                  updateCartQuantity(product._id, 0)
                                }
                              >
                                Remove
                              </Button>
                            </Box>
                          </Box>
                        </TableCell>

                        <TableCell>
                          <Typography variant="body2" color="text.secondary">
                            {currency}
                            {product.offerPrice}
                          </Typography>
                        </TableCell>

                        <TableCell>
                          <Box display="flex" alignItems="center" gap={1.5}>
                            <IconButton
                              size="small"
                              onClick={() =>
                                updateCartQuantity(
                                  product._id,
                                  Math.max(0, qty - 1),
                                )
                              }
                            >
                              <Image
                                src={assets.decrease_arrow}
                                alt="decrease"
                                width={16}
                                height={16}
                              />
                            </IconButton>

                            <TextField
                              value={qty}
                              onChange={(e) => {
                                const val = Number(e.target.value);
                                updateCartQuantity(
                                  product._id,
                                  Number.isFinite(val) ? Math.max(0, val) : 0,
                                );
                              }}
                              type="number"
                              inputProps={{
                                min: 0,
                                style: {
                                  textAlign: 'center',
                                  appearance: 'textfield',
                                  width: 40,
                                },
                              }}
                              size="small"
                            />

                            <IconButton
                              size="small"
                              onClick={() => addToCart(product._id)}
                            >
                              <Image
                                src={assets.increase_arrow}
                                alt="increase"
                                width={16}
                                height={16}
                              />
                            </IconButton>
                          </Box>
                        </TableCell>

                        <TableCell>
                          <Typography variant="body2" color="text.secondary">
                            {currency}
                            {(product.offerPrice * qty).toFixed(2)}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>

            <Button
              onClick={() => router.push('/all-products')}
              startIcon={
                <Image
                  src={assets.arrow_right_icon_colored}
                  alt="continue"
                  width={16}
                  height={16}
                />
              }
              sx={{ mt: 2, color: 'primary.main', textTransform: 'none' }}
            >
              Continue Shopping
            </Button>
          </Grid>

          {/* Right: Order Summary */}
          <Grid item xs={12} md={4} lg={3}>
            <OrderSummary />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
