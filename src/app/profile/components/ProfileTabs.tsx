'use client';

import { useQuery } from '@apollo/client';
import {
  Avatar,
  Box,
  CircularProgress,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { GET_POST_BY_ID } from '../../../graphql/profile/query/post';
import getApolloClient from '../../../lib/apolloClient';
import { FullProfileType } from '../../../types/profile/profile.type';
import { getLogger } from '../../../utils/logger';
import AboutMeTab from './AboutMeTab';
import PostCard from './PostCard';
import StatistikTabs from './StatistikTabs';

interface ProfileTabsProps {
  profileId?: string;
  fullProfile: FullProfileType | undefined;
}

export default function ProfileTabs({
  profileId,
  fullProfile,
}: ProfileTabsProps) {
  const logger = getLogger(ProfileTabs.name);
  logger.debug('profileId:', profileId);

  const [tab, setTab] = useState(0);

  const { data: session } = useSession();

  const client = getApolloClient(session?.access_token);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const { data, loading, error } = useQuery(GET_POST_BY_ID, {
    client,
    variables: { id: profileId },
    skip: !profileId,
  });

  const posts = data?.getPostsByProfile || [];

  logger.debug('query data:', { data });

  if (error) {
    logger.error('query error:', { error });
    return <Typography>Fehler: {error.message}</Typography>;
  }

  const tabContent = [
    {
      label: 'Beiträge',
      content: (
        <>
          {loading && (
            <Box textAlign="center" mt={4}>
              <CircularProgress />
              <Typography>Lade Beiträge...</Typography>
            </Box>
          )}
          {error && (
            <Typography color="error" mt={2}>
              Fehler beim Laden: {error.message}
            </Typography>
          )}
          {!loading && posts.length === 0 && (
            <Typography mt={2}>Keine Beiträge vorhanden.</Typography>
          )}
          {!loading &&
            posts.map((post: any) => (
              <PostCard
                key={post.id}
                title={post.title || 'Beitrag'}
                content={post.content}
                image={post.media?.[0] || undefined}
                createdAt={post.createdAt}
                isSupremeUser={true}
                user={{
                  id: post.profileId,
                  name: post.authorName || 'Unbekannt', // falls verfügbar
                  avatar: post.authorAvatar || '/images/default-avatar.png',
                }}
              />
            ))}
        </>
      ),
    },
    // {
    //   label: 'Über mich',
    //   content: (
    //     <motion.div
    //       initial={{ opacity: 0, y: 10 }}
    //       animate={{ opacity: 1, y: 0 }}
    //       exit={{ opacity: 0, y: -10 }}
    //       transition={{ duration: 0.3 }}
    //     >
    //       <Box
    //         sx={{
    //           p: 3,
    //           borderRadius: 2,
    //           backgroundColor: (theme) => theme.palette.background.paper,
    //           boxShadow: 1,
    //         }}
    //       >
    //         <Typography variant="h6" fontWeight="bold" gutterBottom>
    //           Wer bin ich?
    //         </Typography>
    //         <Typography variant="body1" color="text.secondary" paragraph>
    //           Ich bin ein leidenschaftlicher Softwareentwickler mit Fokus auf
    //           cloud-native Architekturen, sichere APIs und moderne Frontends.
    //         </Typography>

    //         <Typography variant="h6" fontWeight="bold" gutterBottom>
    //           Interessen
    //         </Typography>
    //         <Typography variant="body1" color="text.secondary" paragraph>
    //           TypeScript, Kubernetes, GraphQL, Design Systems, DevOps und Kaffee ☕.
    //         </Typography>

    //         <Typography variant="h6" fontWeight="bold" gutterBottom>
    //           Standort
    //         </Typography>
    //         <Typography variant="body1" color="text.secondary">
    //           Berlin, Deutschland
    //         </Typography>
    //       </Box>
    //     </motion.div>
    //   ),
    // },
    {
      label: 'Über mich',
      content: <AboutMeTab fullProfile={fullProfile} />,
      //   (
      //   <Box p={3}>
      //     <Typography variant="h6" fontWeight="bold" gutterBottom>
      //       Kurzprofil
      //     </Typography>
      //     <Typography variant="body1" color="text.secondary" paragraph>
      //       Fullstack Developer mit Fokus auf TypeScript, GraphQL und
      //       Cloud-Infrastruktur. Zielorientiert, kreativ und immer bereit für
      //       neue Herausforderungen.
      //     </Typography>

      //     <Typography variant="h6" fontWeight="bold" gutterBottom>
      //       Fähigkeiten
      //     </Typography>
      //     <Stack direction="row" spacing={1} flexWrap="wrap" mb={2}>
      //       {[
      //         'TypeScript',
      //         'Next.js',
      //         'GraphQL',
      //         'MongoDB',
      //         'Docker',
      //         'Kubernetes',
      //       ].map((skill) => (
      //         <Box
      //           key={skill}
      //           px={2}
      //           py={0.5}
      //           borderRadius={99}
      //           bgcolor="primary.main"
      //           color="white"
      //         >
      //           {skill}
      //         </Box>
      //       ))}
      //     </Stack>

      //     <Typography variant="h6" fontWeight="bold" gutterBottom>
      //       Persönliches
      //     </Typography>
      //     <Typography variant="body1" color="text.secondary">
      //       🏡 Wohnort: Berlin <br />
      //       🎓 Ausbildung: M.Sc. in Computer Science <br />
      //       💼 Berufserfahrung: 5 Jahre <br />
      //       💬 Sprachen: Deutsch, Englisch, Französisch
      //     </Typography>
      //   </Box>
      // ),
    },

    {
      label: 'Einstellungen',
      content: (
        <Box p={3}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Anzeige
          </Typography>
          <Typography>🌙 Farbschema: Dunkelmodus</Typography>
          <Typography>🎨 Farbstil: Blau</Typography>

          <Typography variant="h6" fontWeight="bold" gutterBottom mt={3}>
            Sprache
          </Typography>
          <Typography>🌐 Aktuell: Deutsch</Typography>

          <Typography variant="h6" fontWeight="bold" gutterBottom mt={3}>
            Datenschutz
          </Typography>
          <Typography>🔒 Öffentliche Sichtbarkeit: Nur Freunde</Typography>
          <Typography>✉️ E-Mail-Benachrichtigungen: Aktiviert</Typography>
        </Box>
      ),
    },

    {
      label: 'Benachrichtigungen',
      content: (
        <Box p={3}>
          <Stack spacing={2}>
            {[
              {
                type: 'like',
                text: 'Tom hat deinen Beitrag "Neue Ideen für 2026" geliked.',
              },
              { type: 'follow', text: 'Anna folgt dir jetzt.' },
              {
                type: 'comment',
                text: 'David hat einen Kommentar hinterlassen.',
              },
            ].map((notif, idx) => (
              <Box
                key={idx}
                p={2}
                borderRadius={2}
                bgcolor="background.default"
                boxShadow={1}
              >
                <Typography variant="body2">{notif.text}</Typography>
              </Box>
            ))}
          </Stack>
        </Box>
      ),
    },

    {
      label: 'Freunde',
      content: (
        <Box p={3}>
          <Stack direction="row" spacing={3} flexWrap="wrap">
            {['Anna', 'Tom', 'Sophie', 'Lukas'].map((friend, i) => (
              <Box
                key={i}
                display="flex"
                alignItems="center"
                gap={1}
                bgcolor="background.paper"
                p={2}
                borderRadius={2}
                boxShadow={1}
              >
                <Avatar src={`/images/friend-${i + 1}.jpg`} />
                <Typography>{friend}</Typography>
              </Box>
            ))}
          </Stack>
        </Box>
      ),
    },

    {
      label: 'Nachrichten',
      content: (
        <Box p={3}>
          <Stack spacing={2}>
            {[
              {
                name: 'Sophie',
                msg: 'Lass uns morgen mal telefonieren.',
                time: 'Gestern',
              },
              {
                name: 'Lukas',
                msg: 'Ich habe den Code geprüft.',
                time: 'Vor 2 Tagen',
              },
            ].map((chat, idx) => (
              <Box
                key={idx}
                p={2}
                borderRadius={2}
                bgcolor="background.paper"
                boxShadow={1}
              >
                <Typography fontWeight="bold">{chat.name}</Typography>
                <Typography color="text.secondary">{chat.msg}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {chat.time}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>
      ),
    },

    {
      label: 'Favoriten',
      content: (
        <Box p={3}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Gespeicherte Beiträge
          </Typography>
          <Stack spacing={2}>
            <Typography>📌 "10 Tipps für bessere UI/UX"</Typography>
            <Typography>📌 "Kubernetes in 5 Minuten erklärt"</Typography>
            <Typography>📌 "Monorepos mit Nx – Ja oder Nein?"</Typography>
          </Stack>
        </Box>
      ),
    },

    // {
    //   label: 'Statistiken',
    //   content: (
    //     <Box p={3}>
    //       <Typography variant="h6" fontWeight="bold" gutterBottom>
    //         Deine Aktivität
    //       </Typography>
    //       <Typography>📄 Beiträge: 48</Typography>
    //       <Typography>❤️ Likes: 1.204</Typography>
    //       <Typography>💬 Kommentare: 312</Typography>
    //       <Typography>👥 Follower: 275</Typography>
    //     </Box>
    //   ),
    // },
    // {
    //   label: 'Statistiken',
    //   content: (
    //     <Box p={3}>
    //       <Typography variant="h6" fontWeight="bold" gutterBottom>
    //         Deine Aktivität im letzten Jahr
    //       </Typography>

    //       {/* Balkendiagramm: Beiträge pro Monat */}
    //       <ResponsiveContainer width="100%" height={300}>
    //         <BarChart data={[
    //           { month: 'Jan', posts: 5 },
    //           { month: 'Feb', posts: 8 },
    //           { month: 'Mär', posts: 12 },
    //           { month: 'Apr', posts: 6 },
    //           { month: 'Mai', posts: 15 },
    //           { month: 'Jun', posts: 10 },
    //           { month: 'Jul', posts: 7 },
    //         ]}>
    //           <XAxis dataKey="month" />
    //           <YAxis />
    //           <Tooltip />
    //           <Bar dataKey="posts" fill="#1976d2" radius={[4, 4, 0, 0]} />
    //         </BarChart>
    //       </ResponsiveContainer>

    //       <Box mt={4}>
    //         <Typography variant="h6" fontWeight="bold" gutterBottom>
    //           Interaktionen
    //         </Typography>

    //         {/* Tortendiagramm: Interaktionsverteilung */}
    //         <ResponsiveContainer width="100%" height={250}>
    //           <PieChart>
    //             <Pie
    //               data={[
    //                 { name: 'Likes', value: 1204 },
    //                 { name: 'Kommentare', value: 312 },
    //                 { name: 'Follower', value: 275 },
    //               ]}
    //               dataKey="value"
    //               nameKey="name"
    //               cx="50%"
    //               cy="50%"
    //               outerRadius={80}
    //               fill="#8884d8"
    //               label
    //             >
    //               <Cell fill="#1976d2" />
    //               <Cell fill="#4caf50" />
    //               <Cell fill="#ff9800" />
    //             </Pie>
    //             <Tooltip />
    //           </PieChart>
    //         </ResponsiveContainer>
    //       </Box>

    //       <Box mt={4}>
    //         <Typography variant="h6" fontWeight="bold" gutterBottom>
    //           Wachstum der Follower
    //         </Typography>

    //         {/* Liniendiagramm: Follower-Wachstum */}
    //         <ResponsiveContainer width="100%" height={250}>
    //           <LineChart
    //             data={[
    //               { month: 'Jan', followers: 100 },
    //               { month: 'Feb', followers: 130 },
    //               { month: 'Mär', followers: 180 },
    //               { month: 'Apr', followers: 210 },
    //               { month: 'Mai', followers: 240 },
    //               { month: 'Jun', followers: 275 },
    //             ]}
    //           >
    //             <XAxis dataKey="month" />
    //             <YAxis />
    //             <Tooltip />
    //             <Line type="monotone" dataKey="followers" stroke="#1976d2" strokeWidth={2} />
    //           </LineChart>
    //         </ResponsiveContainer>
    //       </Box>
    //     </Box>
    //   ),
    // },

    {
      label: 'Statistiken',
      content: <StatistikTabs />,
    },

    {
      label: 'Projekte',
      content: (
        <Box p={3}>
          <Stack spacing={2}>
            {[
              {
                title: 'OmnixysSphere',
                desc: 'Modulares System für digitale Ökosysteme.',
              },
              {
                title: 'VibeCheck',
                desc: 'HR-Recruiting Plattform für Soft-Skill-Profiling.',
              },
              {
                title: 'SkillSwap',
                desc: 'Community für Skill-Tausch in Echtzeit.',
              },
            ].map((proj, idx) => (
              <Box
                key={idx}
                p={2}
                borderRadius={2}
                boxShadow={1}
                bgcolor="background.paper"
              >
                <Typography fontWeight="bold">{proj.title}</Typography>
                <Typography color="text.secondary">{proj.desc}</Typography>
              </Box>
            ))}
          </Stack>
        </Box>
      ),
    },

    {
      label: 'Netzwerk',
      content: (
        <Box p={3}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Verbindungen
          </Typography>
          <Typography>🔗 Du folgst 120 Personen</Typography>
          <Typography>👥 87 Personen folgen dir</Typography>
          <Typography>📨 4 neue Anfragen</Typography>
        </Box>
      ),
    },
  ];

  return (
    <Box>
      <Tabs
        value={tab}
        onChange={handleChange}
        textColor="primary"
        indicatorColor="primary"
        variant="scrollable"
        scrollButtons="auto"
      >
        {tabContent.map((t, i) => (
          <Tab key={i} label={t.label} />
        ))}
      </Tabs>

      <Box sx={{ mt: 3, minHeight: 200 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
          >
            {tabContent[tab].content}
          </motion.div>
        </AnimatePresence>
      </Box>
    </Box>
  );
}
