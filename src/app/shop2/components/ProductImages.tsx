'use client';

import { Box, Stack } from '@mui/material';
import Image from 'next/image';
import * as React from 'react';

type MediaItem = { _id?: string; image?: { url?: string } };

export default function ProductImages({ items }: { items?: MediaItem[] }) {
  const images = (items ?? [])
    .map((i) => i?.image?.url)
    .filter(Boolean) as string[];

  const [index, setIndex] = React.useState(0);
  const active = images[index] || '/product.png';

  // Safety: falls Index out of bounds (wenn items später nachladen)
  React.useEffect(() => {
    if (index >= images.length) setIndex(0);
  }, [images.length, index]);

  return (
    <Stack spacing={2}>
      {/* Main image */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: 500,
          borderRadius: 2,
          overflow: 'hidden',
          bgcolor: 'grey.100',
        }}
      >
        <Image
          src={active}
          alt=""
          fill
          sizes="50vw"
          style={{ objectFit: 'cover' }}
          priority
        />
      </Box>

      {/* Thumbnails */}
      <Stack
        direction="row"
        spacing={2}
        sx={{ mt: 1 }}
        useFlexGap
        flexWrap="wrap"
      >
        {images.map((src, i) => {
          const isActive = i === index;
          return (
            <Box
              key={`${src}-${i}`}
              role="button"
              tabIndex={0}
              aria-label={`Bild ${i + 1}`}
              onClick={() => setIndex(i)}
              onKeyDown={(e) =>
                (e.key === 'Enter' || e.key === ' ') && setIndex(i)
              }
              sx={{
                position: 'relative',
                width: { xs: 'calc(25% - 12px)', sm: 120 },
                height: 96,
                borderRadius: 1,
                overflow: 'hidden',
                outline: '1px solid',
                outlineColor: isActive ? 'primary.main' : 'divider',
                cursor: 'pointer',
              }}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="25vw"
                style={{ objectFit: 'cover' }}
              />
            </Box>
          );
        })}
      </Stack>
    </Stack>
  );
}
