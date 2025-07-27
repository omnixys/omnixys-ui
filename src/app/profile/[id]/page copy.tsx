'use client';

import { Box, Container } from '@mui/material';
import ProfileHeader from '../components/ProfileHeader';
import ProfileTabs from '../components/ProfileTabs';

export default function UserProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const userId = params.id;

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <ProfileHeader userId={userId} isOwnProfile={false} />
      <Box sx={{ mt: 4 }}>
        <ProfileTabs userId={userId} />
      </Box>
    </Container>
  );
}
