'use client';

import { Container, Typography } from '@mui/material';
import FeedList from '../components/FeedList';
import NavigationBar from '../components/NavigationBar';

export default function HomePage() {
  return (
    <>
      <NavigationBar />
      <Container maxWidth="md">
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
          Dein Feed
        </Typography>
        <FeedList />
      </Container>
    </>
  );
}
