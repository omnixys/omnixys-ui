// Datei: components/profile/AboutMeTab.tsx
'use client';

import { useQuery } from '@apollo/client';
import {
  Cake,
  Diversity3,
  Edit,
  Email,
  GitHub,
  Info,
  Instagram,
  LinkedIn,
  Phone,
  Star,
  Twitter,
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
  Link,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { GET_CUSTOMER_BY_ID } from '../../../graphql/customer/query/person';
import getApolloClient from '../../../lib/apolloClient';
import { Person } from '../../../types/person/person.type';
import { FullProfileType } from '../../../types/profile/profile.type';
import { getLogger } from '../../../utils/logger';

interface AboutMeTabsProps {
  fullProfile: FullProfileType | undefined;
}

export default function AboutMeTab({ fullProfile }: AboutMeTabsProps) {
  const logger = getLogger(AboutMeTab.name);
  const { data: session } = useSession();
  const token = session?.access_token;
  const client = getApolloClient(token);
  const userId = session?.user?.id;

  const { loading, error, data } = useQuery(GET_CUSTOMER_BY_ID, {
    client,
    variables: { id: userId },
    skip: !client || !userId,
    errorPolicy: 'all',
  });

  const user: Person | undefined = data?.customer;
  const profile = fullProfile?.profile;
  const info = profile?.info;

  if (!client || !userId)
    return <Typography>Lade Benutzerprofil...</Typography>;
  if (loading) return <Typography>Lädt...</Typography>;
  if (error) {
    logger.error('error data:', { error });
    return <Typography>Fehler: {error.message}</Typography>;
  }

  const social = info?.socialLinks || {};
  const kenntnisse = info?.kenntnisse || [];
  const sprachen = info?.sprachen || [];
  const ausbildung = info?.ausbildung || [];
  const berufserfahrung = info?.berufserfahrung || [];

  const socialLinks: Record<string, string | undefined> = {
    linkedIn: social.linkedIn,
    twitter: social.twitter,
    instagram: social.instagram,
    github: social.github,
  };

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
          <Tooltip title="Profil bearbeiten">
            <IconButton color="primary">
              <Edit />
            </IconButton>
          </Tooltip>
        </Stack>

        <Grid container spacing={4}>
          <Grid sx={{ xs: 12, md: 7 }}>
            <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
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
                    @{profile?.username} • {user?.customer?.tierLevel} Mitglied
                  </Typography>
                </Box>
              </Stack>

              <Divider sx={{ my: 2 }} />

              <Grid container spacing={2}>
                <Grid sx={{ xs: 6 }}>
                  <Email fontSize="small" /> <strong>E-Mail:</strong>
                  <br />
                  {user?.email}
                </Grid>
                <Grid sx={{ xs: 6 }}>
                  <Phone fontSize="small" /> <strong>Telefon:</strong>
                  <br />
                  {user?.phoneNumber}
                </Grid>
                <Grid sx={{ xs: 6 }}>
                  <Cake fontSize="small" /> <strong>Geburtstag:</strong>
                  <br />
                  {user?.birthdate}
                </Grid>
                <Grid sx={{ xs: 6 }}>
                  <Wc fontSize="small" /> <strong>Geschlecht:</strong>
                  <br />
                  {user?.gender}
                </Grid>
                <Grid sx={{ xs: 6 }}>
                  <Diversity3 fontSize="small" />{' '}
                  <strong>Familienstand:</strong>
                  <br />
                  {user?.customer?.maritalStatus}
                </Grid>
                <Grid sx={{ xs: 6 }}>
                  <Star fontSize="small" /> <strong>Status:</strong>
                  <br />
                  {user?.customer?.customerState}
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              <Typography
                variant="subtitle2"
                color="text.secondary"
                gutterBottom
              >
                📍 Adresse
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {user?.address?.street} {user?.address?.houseNumber},<br />
                {user?.address?.zipCode} {user?.address?.city},{' '}
                {user?.address?.state},<br />
                {user?.address?.country}
              </Typography>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" fontWeight="bold" gutterBottom>
                📞 Kontaktoptionen
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {user?.customer?.contactOptions?.map((option) => (
                  <Chip
                    key={option}
                    label={option}
                    variant="outlined"
                    color="secondary"
                  />
                ))}
              </Stack>
            </Card>
          </Grid>

          <Grid sx={{ xs: 12, md: 5 }}>
            <Stack spacing={3}>
              {info?.kurzprofil && (
                <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    <Info fontSize="small" /> Kurzprofil
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {info.kurzprofil}
                  </Typography>
                </Card>
              )}

              <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  🧭 Standort & Titel
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  📍 {info?.location || 'Nicht angegeben'}
                  <br />
                  🧑‍💼 {info?.headline || 'Kein Titel angegeben'}
                </Typography>
              </Card>

              {kenntnisse.length > 0 && (
                <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    🚀 Fähigkeiten
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    {kenntnisse.map((skill) => (
                      <Chip
                        key={skill}
                        label={skill}
                        color="info"
                        variant="outlined"
                        sx={{ fontWeight: 'bold', fontSize: '0.85rem' }}
                      />
                    ))}
                  </Stack>
                </Card>
              )}

              {sprachen.length > 0 && (
                <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    💬 Sprachen
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    {sprachen.map((lang) => (
                      <Chip key={lang} label={lang} variant="outlined" />
                    ))}
                  </Stack>
                </Card>
              )}

              {ausbildung.length > 0 && (
                <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    🎓 Ausbildung
                  </Typography>
                  {ausbildung.map((edu, i) => (
                    <Typography
                      key={i}
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      {edu.abschluss} in {edu.in} @ {edu.wo}
                    </Typography>
                  ))}
                </Card>
              )}

              {berufserfahrung.length > 0 && (
                <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    💼 Berufserfahrung
                  </Typography>
                  {berufserfahrung.map((job, i) => (
                    <Typography
                      key={i}
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      {job.von} – {job.bis}: {job.als} bei {job.wo}
                      <br />
                      {job.beschreibung}
                    </Typography>
                  ))}
                </Card>
              )}

              <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  🌐 Social Links
                </Typography>
                <Stack direction="row" spacing={2}>
                  {Object.entries(socialLinks).map(([platform, link]) =>
                    link ? (
                      <Tooltip key={platform} title={platform}>
                        <IconButton
                          component={Link}
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {
                            {
                              linkedIn: <LinkedIn />,
                              twitter: <Twitter />,
                              instagram: <Instagram />,
                              github: <GitHub />,
                            }[platform]
                          }
                        </IconButton>
                      </Tooltip>
                    ) : null,
                  )}
                </Stack>
              </Card>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </motion.div>
  );
}
