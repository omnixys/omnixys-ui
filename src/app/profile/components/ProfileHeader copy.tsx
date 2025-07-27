'use client';

import {
  Avatar,
  Box,
  Button,
  Divider,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { GET_PROFILE_BY_USER_ID, MY_PROFILE } from '../../../graphql/profile/query/profile';
import getApolloClient from '../../../lib/apolloClient';
import { useQuery } from '@apollo/client';

interface ProfileHeaderProps {
  userId?: string;
  isOwnProfile?: boolean;
  followers?: number;
  following?: number;
  friends?: number;
}

export default function ProfileHeader({
  userId,
  isOwnProfile = true,
  followers = 0,
  following = 0,
  friends = 0,
}: ProfileHeaderProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { data: session } = useSession();

  const client = getApolloClient(session?.access_token);
    const { loading, error, data, refetch } = useQuery<{ profile: Profile }>(
      isOwnProfile ? MY_PROFILE : GET_PROFILE_BY_USER_ID,
      {
        client,
        variables: isOwnProfile ? undefined : { userId },
        skip: !isOwnProfile && !userId, // ✅ Verhindert Fehler bei fehlender ID
      },
    );


  const displayName = isOwnProfile
    ? session?.user?.name || 'Mein Profil'
    : 'Jane Doe'; // Später: GraphQL-Fetch
  const email = isOwnProfile ? session?.user?.email : 'jane@example.com';

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: { xs: 'center', md: 'flex-start' },
        gap: 4,
        backgroundColor: theme.palette.background.paper,
        borderRadius: 3,
        p: { xs: 3, md: 4 },
        boxShadow: 4,
        position: 'relative',
      }}
    >
      {/* Animiertes Logo */}
      <motion.div
        style={{
          position: 'absolute',
          top: 20,
          right: 20,
          width: 50,
          height: 50,
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      >
        <Box
          sx={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${theme.palette.primary.main} 40%, transparent 80%)`,
            boxShadow: `0 0 20px ${theme.palette.primary.main}`,
          }}
        />
      </motion.div>

      {/* Avatar */}
      <Avatar
        src="/images/profile-avatar.jpg"
        alt="Profilbild"
        sx={{
          width: { xs: 100, md: 140 },
          height: { xs: 100, md: 140 },
          border: `3px solid ${theme.palette.primary.main}`,
          boxShadow: `0 0 12px ${theme.palette.primary.main}`,
        }}
      />

      {/* Info + Actions */}
      <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
        <Typography variant="h5" fontWeight="bold">
          {displayName}{' '}
          {isOwnProfile && `(${session?.user?.username || 'user'})`}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {email}
        </Typography>

        <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
          Leidenschaft für Cloud-native Architekturen, KI und modulare
          Plattformen.
        </Typography>

        {/* Stats Section */}
        <Stack
          direction="row"
          justifyContent={isMobile ? 'center' : 'flex-start'}
          divider={<Divider orientation="vertical" flexItem />}
          spacing={4}
          sx={{ mt: 3 }}
        >
          <Box textAlign="center">
            <Typography variant="h6" fontWeight="bold">
              {followers}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Follower
            </Typography>
          </Box>
          <Box textAlign="center">
            <Typography variant="h6" fontWeight="bold">
              {following}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Folgt
            </Typography>
          </Box>
          <Box textAlign="center">
            <Typography variant="h6" fontWeight="bold">
              {friends}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Freunde
            </Typography>
          </Box>
        </Stack>

        {/* Buttons */}
        <Stack
          direction="row"
          spacing={2}
          justifyContent={isMobile ? 'center' : 'flex-start'}
          sx={{ mt: 3 }}
        >
          {!isOwnProfile ? (
            <>
              <Button
                variant="contained"
                sx={{
                  textTransform: 'none',
                  px: 3,
                  backgroundColor: theme.palette.primary.main,
                  '&:hover': { backgroundColor: theme.palette.primary.dark },
                }}
              >
                Folgen
              </Button>
              <Button
                variant="outlined"
                sx={{
                  textTransform: 'none',
                  px: 3,
                  '&:hover': { backgroundColor: theme.palette.primary.light },
                }}
              >
                Nachricht
              </Button>
              <Button
                variant="outlined"
                sx={{
                  textTransform: 'none',
                  px: 3,
                  '&:hover': { backgroundColor: theme.palette.primary.light },
                }}
              >
                Freund hinzufügen
              </Button>
            </>
          ) : (
            <Button
              variant="outlined"
              sx={{
                textTransform: 'none',
                px: 3,
                '&:hover': { backgroundColor: theme.palette.primary.light },
              }}
            >
              Profil bearbeiten
            </Button>
          )}
        </Stack>
      </Box>
    </Box>
  );
}
