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
  FullProfile: FullProfileType | undefined;
}

export default function AboutMeTab({ fullProfile }: AboutMeTabsProps) {
  const logger = getLogger(AboutMeTab.name);

  const { data: session } = useSession();
  const token = session?.access_token;
  const client = getApolloClient(token);

  const userId = session?.user?.id;
  logger.debug('userId:', userId);

  const { loading, error, data } = useQuery(GET_CUSTOMER_BY_ID, {
    client,
    variables: { id: userId },
    skip: !client || !userId,
    errorPolicy: 'all',
  });

  if (!client || !userId) {
    return <Typography>Lade Benutzerprofil...</Typography>;
  }

  const user: Person | undefined = data?.customer;
  const profile = fullProfile?.profile;
  const info = profile?.info;

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

  // const user1 = {
  //   firstName: 'Caleb',
  //   lastName: 'Admin',
  //   email: 'admin@gentlecorp.com',
  //   phoneNumber: '0000/0000000',
  //   username: 'admin',
  //   birthdate: '03.05.1999',
  //   gender: 'Männlich',
  //   maritalStatus: 'Verheiratet',
  //   tierLevel: 'Supreme',
  //   subscribed: true,
  //   customerState: 'Aktiv',
  //   address: {
  //     street: 'Kwame Nkrumah Street',
  //     houseNumber: '45',
  //     zipCode: 'KA003',
  //     city: 'Kumasi',
  //     state: 'Ashanti Region',
  //     country: 'Ghana',
  //   },
  //   contactOptions: ['Email', 'Telefon', 'Brief', 'SMS'],
  //   customRoles: ['Admin'],
  //   profileId: '688653b56da52243132bfd55',
  //   profileCompletion: 82,
  //   socialLinks: {
  //     linkedIn: 'https://linkedin.com/in/caleb-admin',
  //     twitter: 'https://twitter.com/calebadmin',
  //     instagram: 'https://instagram.com/caleb.admin',
  //     github: 'https://github.com/calebadmin',
  //   },
  // };

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

        {/* <LinearProgress
          variant="determinate"
          value={user?.profileCompletion}
          sx={{ height: 10, borderRadius: 5, mb: 3 }}
        />
        <Typography variant="caption" color="text.secondary" gutterBottom>
          Profilvervollständigung: {user?.profileCompletion}%
        </Typography> */}

        <Grid container spacing={4}>
          <Grid sx={{ xs: 12, md: 7 }}>
            <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
              <Stack direction="row" alignItems="center" spacing={2} mb={2}>
                <Avatar sx={{ width: 64, height: 64 }}>CA</Avatar>
                <Box>
                  <Typography variant="h5" fontWeight="bold">
                    {user?.firstName} {user?.lastName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    @{user?.username} • {user?.customer?.tierLevel} Mitglied
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
                {user?.address.street} {user?.address.houseNumber},<br />
                {user?.address.zipCode} {user?.address.city},{' '}
                {user?.address.state}
                ,<br />
                {user?.address.country}
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

              <Divider sx={{ my: 3 }} />

              {/* <Typography variant="h6" fontWeight="bold" gutterBottom>
                🔐 Rollen
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {user?.customer?.customRoles.map((role) => (
                  <Chip key={role} label={role} color="primary" />
                ))}
              </Stack>

              <Divider sx={{ my: 3 }} /> */}

              {/* <Typography variant="subtitle2" color="text.secondary">
                Profil-ID: {user?.profileId}
              </Typography> */}
            </Card>
          </Grid>

          <Grid sx={{ xs: 12, md: 5 }}>
            <Stack spacing={3}>
              <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  <Info fontSize="small" /> Kurzprofil
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Fullstack Developer mit Fokus auf TypeScript, GraphQL und
                  Cloud-Infrastruktur. Zielorientiert, kreativ und immer bereit
                  für neue Herausforderungen.
                </Typography>
              </Card>

              <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  🔎 Interessen
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  {Array.isArray(user?.customer?.interests) &&
                  user.customer.interests.length > 0 ? (
                    user.customer.interests.map((skill) => (
                      <Chip
                        key={skill}
                        label={skill}
                        color="info"
                        variant="outlined"
                        sx={{ fontWeight: 'bold', fontSize: '0.85rem' }}
                      />
                    ))
                  ) : (
                    <Typography>Keine Interessen</Typography>
                  )}
                </Stack>
              </Card>

              <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  🚀 Fähigkeiten
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  {[
                    'TypeScript',
                    'Next.js',
                    'GraphQL',
                    'MongoDB',
                    'Docker',
                    'Kubernetes',
                  ].map((skill) => (
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

              <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  🌍 Persönliches
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  🏡 Wohnort: Berlin
                  <br />
                  🎓 Ausbildung: M.Sc. in Computer Science
                  <br />
                  💼 Berufserfahrung: 5 Jahre
                  <br />
                  💬 Sprachen: Deutsch, Englisch, Französisch
                </Typography>
              </Card>

              <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  🌐 Social Links
                </Typography>
                <Stack direction="row" spacing={2}>
                  <Tooltip title="LinkedIn">
                    <IconButton
                      component={Link}
                      href={social.linkedIn}
                      target="_blank"
                    >
                      <LinkedIn />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Twitter">
                    <IconButton
                      component={Link}
                      href={social.twitter}
                      target="_blank"
                    >
                      <Twitter />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Instagram">
                    <IconButton
                      component={Link}
                      href={social.instagram}
                      target="_blank"
                    >
                      <Instagram />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="GitHub">
                    <IconButton
                      component={Link}
                      href={social.github}
                      target="_blank"
                    >
                      <GitHub />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Card>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </motion.div>
  );
}
