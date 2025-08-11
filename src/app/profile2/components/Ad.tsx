// components/Ad.tsx
'use client';

import Image from 'next/image';
import {
  Card,
  CardContent,
  Stack,
  Box,
  Typography,
  IconButton,
  Button,
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

type AdSize = 'sm' | 'md' | 'lg';

interface AdProps {
  size: AdSize;
}

const AD_IMAGE =
  'https://images.pexels.com/photos/23193135/pexels-photo-23193135.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load';

const SIZE_PRESET: Record<AdSize, { imgHeight: number; bodyVariant: 'caption' | 'body2' }> = {
  sm: { imgHeight: 96, bodyVariant: 'caption' },
  md: { imgHeight: 144, bodyVariant: 'body2' },
  lg: { imgHeight: 192, bodyVariant: 'body2' },
};

export default function Ad({ size }: AdProps) {
  const { imgHeight, bodyVariant } = SIZE_PRESET[size];

  const descriptionBase =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit.';
  const description =
    size === 'sm'
      ? descriptionBase
      : size === 'md'
      ? `${descriptionBase} ${descriptionBase}`
      : `${descriptionBase} ${descriptionBase} ${descriptionBase}`;

  return (
    <Card elevation={2}>
      <CardContent>
        {/* TOP */}
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle2" color="text.secondary" fontWeight={600}>
            Sponsored Ads
          </Typography>
          <IconButton size="small" aria-label="more options">
            <MoreHorizIcon fontSize="small" />
          </IconButton>
        </Stack>

        {/* IMAGE */}
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: imgHeight,
            borderRadius: 2,
            overflow: 'hidden',
            mt: 2,
          }}
        >
          <Image
            src={AD_IMAGE}
            alt="Sponsored"
            fill
            sizes="(max-width: 600px) 100vw, 33vw"
            style={{ objectFit: 'cover' }}
            priority={size === 'sm'}
          />
        </Box>

        {/* BRAND + TEXT */}
        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mt: 2 }}>
          <Box
            sx={{
              position: 'relative',
              width: 24,
              height: 24,
              borderRadius: '50%',
              overflow: 'hidden',
              flexShrink: 0,
            }}
          >
            <Image src={AD_IMAGE} alt="BigChef Lounge Logo" fill style={{ objectFit: 'cover' }} />
          </Box>
          <Typography variant="body2" color="primary" fontWeight={600}>
            BigChef Lounge
          </Typography>
        </Stack>

        <Typography variant={bodyVariant} color="text.secondary" sx={{ mt: 1.5 }}>
          {description}
        </Typography>

        <Button variant="outlined" size="small" sx={{ mt: 2 }}>
          Learn more
        </Button>
      </CardContent>
    </Card>
  );
}
