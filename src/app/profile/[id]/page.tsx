// src/app/user/[id]/page.tsx
'use client';

import { Box, Container } from '@mui/material';
import NavigationBar from '../components/NavigationBar';
import ProfileHeader from '../components/ProfileHeader';
import ProfileTabs from '../components/ProfileTabs';

export default function UserProfilePage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <>
      <NavigationBar />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <ProfileHeader isOwnProfile={false} profileId={params.id} />
        <Box sx={{ mt: 4 }}>
          <ProfileTabs profileId={params.id} />
        </Box>
      </Container>
    </>
  );
}
