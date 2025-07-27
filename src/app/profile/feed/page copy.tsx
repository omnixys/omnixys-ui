'use client';

import FeedList from '../components/FeedList';
import { Box, Container, Typography } from '@mui/material';

export default function HomePage() {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
        Dein Feed
      </Typography>
      <Box>
        <FeedList />
      </Box>
    </Container>
  );
}
