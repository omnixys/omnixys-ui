'use client';

import { Cake, Diversity3, Email, Phone, Star, Wc } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Card,
  Chip,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { motion } from 'framer-motion';

export default function AboutMeTab() {
  const user = {
    firstName: 'Caleb',
    lastName: 'Admin',
    email: 'admin@gentlecorp.com',
    phoneNumber: '0000/0000000',
    username: 'admin',
    birthdate: '03.05.1999',
    gender: 'Männlich',
    maritalStatus: 'Verheiratet',
    tierLevel: 'Supreme',
    subscribed: true,
    customerState: 'Aktiv',
    address: {
      street: 'Kwame Nkrumah Street',
      houseNumber: '45',
      zipCode: 'KA003',
      city: 'Kumasi',
      state: 'Ashanti Region',
      country: 'Ghana',
    },
    contactOptions: ['Email', 'Telefon', 'Brief', 'SMS'],
    customRoles: ['Admin'],
    profileId: '688653b56da52243132bfd55',
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Box sx={{ p: { xs: 2, md: 4 } }}>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          👤 Über mich
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={7}>
            <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
              <Stack direction="row" alignItems="center" spacing={2} mb={2}>
                <Avatar sx={{ width: 64, height: 64 }}>CA</Avatar>
                <Box>
                  <Typography variant="h5" fontWeight="bold">
                    {user.firstName} {user.lastName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    @{user.username} • {user.tierLevel} Mitglied
                  </Typography>
                </Box>
              </Stack>

              <Divider sx={{ my: 2 }} />

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Email fontSize="small" /> <strong>E-Mail:</strong>
                  <br />
                  {user.email}
                </Grid>
                <Grid item xs={6}>
                  <Phone fontSize="small" /> <strong>Telefon:</strong>
                  <br />
                  {user.phoneNumber}
                </Grid>
                <Grid item xs={6}>
                  <Cake fontSize="small" /> <strong>Geburtstag:</strong>
                  <br />
                  {user.birthdate}
                </Grid>
                <Grid item xs={6}>
                  <Wc fontSize="small" /> <strong>Geschlecht:</strong>
                  <br />
                  {user.gender}
                </Grid>
                <Grid item xs={6}>
                  <Diversity3 fontSize="small" />{' '}
                  <strong>Familienstand:</strong>
                  <br />
                  {user.maritalStatus}
                </Grid>
                <Grid item xs={6}>
                  <Star fontSize="small" /> <strong>Status:</strong>
                  <br />
                  {user.customerState}
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
                {user.address.street} {user.address.houseNumber},<br />
                {user.address.zipCode} {user.address.city}, {user.address.state}
                ,<br />
                {user.address.country}
              </Typography>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" fontWeight="bold" gutterBottom>
                📞 Kontaktoptionen
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {user.contactOptions.map((option) => (
                  <Chip
                    key={option}
                    label={option}
                    variant="outlined"
                    color="secondary"
                  />
                ))}
              </Stack>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" fontWeight="bold" gutterBottom>
                🔐 Rollen
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {user.customRoles.map((role) => (
                  <Chip key={role} label={role} color="primary" />
                ))}
              </Stack>

              <Divider sx={{ my: 3 }} />

              <Typography variant="subtitle2" color="text.secondary">
                Profil-ID: {user.profileId}
              </Typography>
            </Card>
          </Grid>

          <Grid item xs={12} md={5}>
            <Stack spacing={3}>
              <Card sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Kurzprofil
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Fullstack Developer mit Fokus auf TypeScript, GraphQL und
                  Cloud-Infrastruktur. Zielorientiert, kreativ und immer bereit
                  für neue Herausforderungen.
                </Typography>
              </Card>

              <Card sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Fähigkeiten
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
                      color="secondary"
                      variant="outlined"
                    />
                  ))}
                </Stack>
              </Card>

              <Card sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Persönliches
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
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </motion.div>
  );
}
