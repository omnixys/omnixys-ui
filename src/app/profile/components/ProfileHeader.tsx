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
import { getLogger } from '../../../utils/logger';
import { FullProfile } from '../../../types/profile/profile.type';

interface ProfileHeaderProps {
  data?: FullProfile;
  email: string | undefined;
  isOwnProfile?: boolean;
}

export default function ProfileHeader({ data, email, isOwnProfile=true}: ProfileHeaderProps) {
  const logger = getLogger(ProfileHeader.name);
  logger.debug('data:', { data });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));



  if (!data || !data.profile) {
    return <Typography>Profil nicht gefunden.</Typography>;
  }

  const profile = data?.profile;
  const followers = data?.followCount.followers || 0;
  const following = data?.followCount.following || 0;
  const friends = data?.friendships || 0;



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
        src={profile?.info?.profileImage || '/images/default-avatar.png'}
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
          {profile?.username || 'Unbekannt'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {email}
        </Typography>

        <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
          {/* profile?.info?.headline || */}
          {'Keine Bio angegeben'}
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
              <Button variant="contained" sx={{ textTransform: 'none', px: 3 }}>
                Folgen
              </Button>
              <Button variant="outlined" sx={{ textTransform: 'none', px: 3 }}>
                Nachricht
              </Button>
              <Button variant="outlined" sx={{ textTransform: 'none', px: 3 }}>
                Freund hinzufügen
              </Button>
            </>
          ) : (
            <Button variant="outlined" sx={{ textTransform: 'none', px: 3 }}>
              Profil bearbeiten
            </Button>
          )}
        </Stack>
      </Box>
    </Box>
  );
}
