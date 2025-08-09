// src/app/success/page.tsx (MUI-Version)
'use client';

import { Box, Stack, Typography } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';
import Confetti from 'react-confetti';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get('orderId');

  // Confetti size (avoid SSR mismatch)
  const [size, setSize] = React.useState({ width: 0, height: 0 });
  React.useEffect(() => {
    const onResize = () =>
      setSize({ width: window.innerWidth, height: window.innerHeight });
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  React.useEffect(() => {
    if (!orderId) return;
    const timer = setTimeout(
      () => router.push(`/shop2/orders/${orderId}`),
      5000,
    );
    return () => clearTimeout(timer);
  }, [orderId, router]);

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 180px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Confetti width={size.width} height={size.height} numberOfPieces={400} />

      <Stack
        spacing={1.5}
        alignItems="center"
        sx={{ textAlign: 'center', px: 2 }}
      >
        <Typography variant="h2" color="success.main" fontWeight={700}>
          Successful
        </Typography>
        <Typography variant="h6" fontWeight={500}>
          We sent the invoice to your e-mail
        </Typography>
        <Typography variant="body1">
          You are being redirected to the order page…
        </Typography>
      </Stack>
    </Box>
  );
}
