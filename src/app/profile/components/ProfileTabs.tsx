'use client';

import { useQuery } from '@apollo/client';
import { Box, CircularProgress, Tab, Tabs, Typography } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { GET_POST_BY_ID } from '../../../graphql/profile/query/post';
import getApolloClient from '../../../lib/apolloClient';
import { getLogger } from '../../../utils/logger';
import PostCard from './PostCard';

interface ProfileTabsProps {
  profileId?: string;
}

export default function ProfileTabs({ profileId }: ProfileTabsProps) {
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
    { label: 'Über mich', content: <Box>Über mich Inhalt...</Box> },
    { label: 'Projekte', content: <Box>Projektliste...</Box> },
    { label: 'Netzwerk', content: <Box>Netzwerk anzeigen...</Box> },
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
