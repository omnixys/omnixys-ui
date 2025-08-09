// src/components/Skeleton.tsx (MUI-Version)

'use client';

import { Box, Grid, Skeleton as MUISkeleton, Stack } from '@mui/material';

interface SkeletonProps {
  items?: number; // Anzahl Platzhalter (Standard: 4)
}

export default function Skeleton({ items = 4 }: SkeletonProps) {
  return (
    <Box sx={{ mt: 6 }}>
      <Grid container spacing={4}>
        {Array.from({ length: items }).map((_, idx) => (
          <Grid key={idx} xs={12} sm={6} md={4} lg={3}>
            <Stack spacing={1}>
              {/* Produktbild */}
              <MUISkeleton
                variant="rectangular"
                width="100%"
                height={320} // entspricht h-80
                sx={{ borderRadius: 2 }}
              />

              {/* Name & Preis */}
              <Stack direction="row" justifyContent="space-between">
                <MUISkeleton
                  variant="rectangular"
                  width={144}
                  height={32}
                  sx={{ borderRadius: 1 }}
                />
                <MUISkeleton
                  variant="rectangular"
                  width={64}
                  height={32}
                  sx={{ borderRadius: 1 }}
                />
              </Stack>

              {/* kurze Beschreibung */}
              <MUISkeleton
                variant="rectangular"
                width="100%"
                height={16}
                sx={{ borderRadius: 1 }}
              />
              <MUISkeleton
                variant="rectangular"
                width="50%"
                height={16}
                sx={{ borderRadius: 1 }}
              />

              {/* Button */}
              <MUISkeleton
                variant="rectangular"
                width="50%"
                height={48}
                sx={{ borderRadius: 4 }}
              />
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
