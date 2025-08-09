// Pfad: app/order-placed/page.tsx
'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { assets } from '../assets/assets';

// MUI
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function OrderPlaced(): JSX.Element {
  const router = useRouter();

  React.useEffect(() => {
    const timer = window.setTimeout(() => {
      router.push('/shop/my-orders');
    }, 5000);
    return () => window.clearTimeout(timer);
  }, [router]);

  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={2}
    >
      <Stack spacing={3} alignItems="center" textAlign="center">
        <Box position="relative" width={96} height={96}>
          {/* Hintergrundring */}
          <CircularProgress
            variant="determinate"
            value={100}
            size={96}
            thickness={4}
            sx={{ color: 'action.hover', position: 'absolute', inset: 0 }}
          />
          {/* Spinner */}
          <CircularProgress
            size={96}
            thickness={4}
            color="success"
            sx={{ position: 'absolute', inset: 0 }}
          />
          {/* Häkchen */}
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            display="flex"
            alignItems="center"
            justifyContent="center"
            p={1.5}
          >
            <Image src={assets.checkmark} alt="Order placed" />
          </Box>
        </Box>

        <Typography variant="h5" fontWeight={600}>
          Order Placed Successfully
        </Typography>

        <Button
          variant="text"
          onClick={() => router.push('/my-orders')}
          sx={{ textTransform: 'none' }}
        >
          Go to My Orders now
        </Button>
      </Stack>
    </Box>
  );
}
