'use client';

import { useQuery } from '@apollo/client';
import { Box, Container, Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useMemo } from 'react';
import { GET_PROFILE_BY_USER_ID } from '../../graphql/profile/query/profile';
import getApolloClient from '../../lib/apolloClient';
import { FullProfile } from '../../types/profile/profile.type';
import { getLogger } from '../../utils/logger';
import NavigationBar from './components/NavigationBar';
import ProfileHeader from './components/ProfileHeader';
import ProfileTabs from './components/ProfileTabs';

export default function ProfilePage() {
  const logger = getLogger(ProfilePage.name);

  const { data: session } = useSession();
  const token = session?.access_token;
  const client = useMemo(() => getApolloClient(token), [token]);

  const userId = session?.user?.id;
  logger.debug('userId:', userId);
  const profileId = session?.user?.profileId;

  const { loading, error, data } = useQuery(GET_PROFILE_BY_USER_ID, {
    client,
    variables: { userId },
    skip: !client || !userId || !profileId,
    errorPolicy: 'all',
  });

  if (!client || !userId || !profileId) {
    return <Typography>Lade Benutzerprofil...</Typography>;
  }

  const profileData: FullProfile | undefined = data?.getFullProfileByUserId;

  if (!profileData) {
    logger.error('Profil ist null, obwohl Query erfolgreich war.');
    logger.error('error data:', { error });
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <NavigationBar />
        <Typography>Profil nicht gefunden.</Typography>
      </Container>
    );
  }

  if (!userId) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <NavigationBar />
        <Box>Du bist nicht eingeloggt.</Box>
      </Container>
    );
  }

  if (loading) return <Typography>Lädt...</Typography>;
  if (error) {
    logger.error('error data:', { error });
    return <Typography>Fehler: {error.message}</Typography>;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <NavigationBar />
      {/* Profil Header */}
      <ProfileHeader data={profileData} email={session?.user?.email} />

      {/* Tabs für Inhalte */}
      <Box sx={{ mt: 4 }}>
        <ProfileTabs profileId={profileId} />
      </Box>
    </Container>
  );
}
