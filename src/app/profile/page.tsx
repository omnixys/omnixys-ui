'use client';

import { Box, Container } from '@mui/material';
import NavigationBar from './components/NavigationBar';
import ProfileHeader from './components/ProfileHeader';
import ProfileTabs from './components/ProfileTabs';

export default function ProfilePage() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <NavigationBar />
      {/* Profil Header */}
      <ProfileHeader />

      {/* Tabs für Inhalte */}
      <Box sx={{ mt: 4 }}>
        <ProfileTabs />
      </Box>
    </Container>
  );
}
