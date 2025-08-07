// components/landing/TrustBadges.jsx
'use client';

import { Box, Container, Typography } from '@mui/material';
import Image from 'next/image';

export default function TrustBadges() {
  const badges = ['/trusted-ssl.png', '/trusted-dsgvo.png', '/trusted-iso.png'];
  return (
    <Box sx={{ py: 6 }}>
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <Typography
          color="text.primary"
          variant="h5"
          fontWeight={600}
          gutterBottom
        >
          Vertrauen durch Qualität
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: 4,
            mt: 3,
          }}
        >
          {badges.map((src, i) => (
            <Image
              key={i}
              src={src}
              alt="Trust-Siegel"
              width={80}
              height={80}
              style={{ filter: 'brightness(1.2)' }}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
}
