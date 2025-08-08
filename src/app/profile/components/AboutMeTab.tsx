'use client';

import { useQuery } from '@apollo/client';
import {
  Cake,
  Diversity3,
  Edit,
  Email,
  Phone,
  Star,
  Wc,
} from '@mui/icons-material';
import {
  Avatar,
  Box,
  Card,
  Chip,
  Divider,
  Grid,
  IconButton,
  Stack,
  Tooltip,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';

import { GET_CUSTOMER_BY_ID } from '@/graphql/customer/query/person';
import getApolloClient from '@/lib/apolloClient';
import { getLogger } from '@/utils/logger';

import { Person } from '@/types/person/person.type';
import {
  FullProfileType,
  InfoType,
  ProfileType,
} from '@/types/profile/profile.type';
import { Typography } from '@mui/material';
import { useState } from 'react';
import EditProfilePage from './EditPage';
import ProfileEducationCard from './ProfileEducationCard';
import ProfileExperienceCard from './ProfileExperienceCard';
import ProfileLanguagesCard from './ProfileLanguagesCard';
import ProfileLocationTitleCard from './ProfileLocationTitleCard';
import ProfileSkillsCard from './ProfileSkillsCard';
import ProfileSocialLinksCard from './ProfileSocialLinksCard';
import ProfileSummaryCard from './ProfileSummaryCard';

interface AboutMeTabsProps {
  fullProfile: FullProfileType | undefined;
}

export default function AboutMeTab({ fullProfile }: AboutMeTabsProps) {
  const [isEditing, setIsEditing] = useState(false);

  const logger = getLogger(AboutMeTab.name);
  const { data: session } = useSession();
  const client = getApolloClient(session?.access_token);
  const userId = session?.user?.id;

  const { loading, error, data } = useQuery(GET_CUSTOMER_BY_ID, {
    client,
    variables: { id: userId },
    skip: !client || !userId,
  });

  const user: Person | undefined = data?.customer;
  const profile: ProfileType | undefined = fullProfile?.profile;
  const info: InfoType | undefined = profile?.info;

  logger.debug('info=', info);

  if (!client || !userId)
    return <Typography>Lade Benutzerprofil...</Typography>;
  if (loading) return <Typography>Lädt...</Typography>;
  if (error) {
    logger.error('error data:', { error });
    return <Typography>Fehler: {error.message}</Typography>;
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Box sx={{ p: { xs: 2, md: 4 } }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h4" gutterBottom fontWeight="bold">
            👤 Über mich
          </Typography>

          <Tooltip
            title={isEditing ? 'Bearbeitung abbrechen' : 'Profil bearbeiten'}
          >
            <IconButton
              onClick={() => setIsEditing((prev) => !prev)}
              color="primary"
            >
              <Edit />
            </IconButton>
          </Tooltip>
        </Stack>

        <Grid container spacing={4}>
          <Grid sx={{ xs: 6, md: 7 }}>
            <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
              {isEditing ? (
                <>
                  <EditProfilePage user={user} />
                </>
              ) : (
                <>
                  <Stack direction="row" alignItems="center" spacing={2} mb={2}>
                    <Avatar
                      src={info?.profileImage}
                      sx={{ width: 64, height: 64 }}
                    />
                    <Box>
                      <Typography variant="h5" fontWeight="bold">
                        {user?.firstName} {user?.lastName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        @{profile?.username} • {user?.customer?.tierLevel}{' '}
                        Mitglied
                      </Typography>
                    </Box>
                  </Stack>

                  <Divider sx={{ my: 2 }} />

                  <Grid container spacing={2}>
                    <Grid sx={{ xs: 6 }}>
                      <Email fontSize="small" /> {user?.email}
                    </Grid>
                    <Grid sx={{ xs: 6 }}>
                      <Phone fontSize="small" /> {user?.phoneNumber}
                    </Grid>
                    <Grid sx={{ xs: 6 }}>
                      <Cake fontSize="small" /> {user?.birthdate}
                    </Grid>
                    <Grid sx={{ xs: 6 }}>
                      <Wc fontSize="small" /> {user?.gender}
                    </Grid>
                    <Grid sx={{ xs: 6 }}>
                      <Diversity3 fontSize="small" />{' '}
                      {user?.customer?.maritalStatus}
                    </Grid>
                    <Grid sx={{ xs: 6 }}>
                      <Star fontSize="small" /> {user?.customer?.customerState}
                    </Grid>
                  </Grid>

                  <Divider sx={{ my: 3 }} />
                  <Typography variant="subtitle2" color="text.secondary">
                    📍 {user?.address.street} {user?.address.houseNumber},{' '}
                    {user?.address.zipCode} {user?.address.city}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {user?.address.state}, {user?.address.country}
                  </Typography>

                  <Divider sx={{ my: 3 }} />
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    📞 Kontaktoptionen
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    {user?.customer?.contactOptions.map((option) => (
                      <Chip
                        key={option}
                        label={option}
                        variant="outlined"
                        color="secondary"
                      />
                    ))}
                  </Stack>
                </>
              )}
            </Card>
          </Grid>

          <Grid sx={{ xs: 6, md: 5 }}>
            <Stack spacing={3}>
              <ProfileSummaryCard kurzprofil={info?.kurzprofil} />
              <ProfileLocationTitleCard
                location={info?.location}
                headline={info?.headline}
              />
              <ProfileSkillsCard skills={info?.kenntnisse} />
              <ProfileLanguagesCard languages={info?.sprachen} />
              <ProfileEducationCard ausbildung={info?.ausbildung} />
              <ProfileExperienceCard erfahrung={info?.berufserfahrung} />
              <ProfileSocialLinksCard socialLinks={info?.socialLinks} />
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </motion.div>
  );
}
