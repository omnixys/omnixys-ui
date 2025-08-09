'use client';

import { ArrowRight, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import PaymentForm from '../components/PaymentForm';
import ShippingForm from '../components/ShippingForm';
import useCartStore from '../stores/cartStore';
import { ShippingFormInputs } from '../types';

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  IconButton,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material';

const steps = ['Shopping Cart', 'Shipping Address', 'Payment Method'];

const CartPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [shippingForm, setShippingForm] = useState<ShippingFormInputs>();

  const activeStep = parseInt(searchParams.get('step') || '1');
  const activeIndex = Math.max(0, Math.min(steps.length - 1, activeStep - 1));

  const { cart, removeFromCart, hasHydrated } = useCartStore();

  const subtotal = useMemo(
    () => cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [cart],
  );

  const discount = 10; // demo
  const shipping = 10; // demo
  const total = subtotal; // passe an, falls Discount/Shipping einfließen sollen

  // if (!hasHydrated) return null;

  return (
    <Box sx={{ mt: 6, display: 'flex', flexDirection: 'column', gap: 4 }}>
      {/* TITLE */}
      <Typography variant="h5" fontWeight={600} align="center">
        Your Shopping Cart
      </Typography>

      {/* STEPPER */}
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Stepper
          activeStep={activeIndex}
          alternativeLabel
          sx={{ maxWidth: 900, width: '100%' }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>
                <Typography variant="body2" fontWeight={600}>
                  {label}
                </Typography>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      {/* CONTENT */}
      <Grid container spacing={4}>
        {/* LEFT: Steps */}
        <Grid item xs={12} lg={7}>
          <Card elevation={6} sx={{ borderRadius: 2 }}>
            <CardContent
              sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
            >
              {activeStep === 1 ? (
                cart.length ? (
                  cart.map((item) => (
                    <Box
                      key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 2,
                      }}
                    >
                      {/* IMAGE + DETAILS */}
                      <Box
                        sx={{
                          display: 'flex',
                          gap: 2,
                          alignItems: 'center',
                          flex: 1,
                        }}
                      >
                        <Box
                          sx={{
                            position: 'relative',
                            width: 128,
                            height: 128,
                            bgcolor: 'grey.50',
                            borderRadius: 2,
                            overflow: 'hidden',
                            flexShrink: 0,
                          }}
                        >
                          <Image
                            src={item.images[item.selectedColor]}
                            alt={item.name}
                            fill
                            style={{ objectFit: 'contain' }}
                          />
                        </Box>
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 0.5,
                          }}
                        >
                          <Typography variant="body2" fontWeight={600}>
                            {item.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Quantity: {item.quantity}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Size: {item.selectedSize}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Color: {item.selectedColor}
                          </Typography>
                          <Typography
                            variant="subtitle2"
                            fontWeight={600}
                            sx={{ mt: 0.5 }}
                          >
                            ${item.price.toFixed(2)}
                          </Typography>
                        </Box>
                      </Box>

                      {/* DELETE */}
                      <IconButton
                        aria-label="remove from cart"
                        onClick={() => removeFromCart(item)}
                        sx={{
                          bgcolor: 'error.light',
                          color: 'error.main',
                          '&:hover': {
                            bgcolor: 'error.main',
                            color: 'common.white',
                          },
                        }}
                      >
                        <Trash2 size={16} />
                      </IconButton>
                    </Box>
                  ))
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    Your cart is empty.
                  </Typography>
                )
              ) : activeStep === 2 ? (
                <ShippingForm setShippingForm={setShippingForm} />
              ) : activeStep === 3 && shippingForm ? (
                <PaymentForm />
              ) : (
                <Typography variant="body2" color="text.secondary">
                  Please fill in the shipping form to continue.
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* RIGHT: Details */}
        <Grid item xs={12} lg={5}>
          <Card
            elevation={6}
            sx={{ borderRadius: 2, position: 'sticky', top: 16 }}
          >
            <CardContent
              sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            >
              <Typography variant="h6" fontWeight={700}>
                Cart Details
              </Typography>

              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">
                  Subtotal
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  ${subtotal.toFixed(2)}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">
                  Discount (10%)
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  $ {discount}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">
                  Shipping Fee
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  ${shipping}
                </Typography>
              </Box>

              <Divider />

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography variant="subtitle1" fontWeight={700}>
                  Total
                </Typography>
                <Typography variant="subtitle1" fontWeight={700}>
                  ${total.toFixed(2)}
                </Typography>
              </Box>
            </CardContent>

            {activeStep === 1 && (
              <CardActions sx={{ p: 2, pt: 0 }}>
                <Button
                  fullWidth
                  variant="contained"
                  endIcon={<ArrowRight size={16} />}
                  onClick={() =>
                    router.push('/shop3/cart?step=2', { scroll: false })
                  }
                  sx={{ textTransform: 'none', borderRadius: 2 }}
                >
                  Continue
                </Button>
              </CardActions>
            )}
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CartPage;
