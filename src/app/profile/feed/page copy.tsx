'use client';

import { Box, Container, Typography } from '@mui/material';
import FeedList from '../components/FeedList';

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
