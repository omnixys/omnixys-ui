'use client';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useOptimistic, useRef, useState } from 'react';
import { addStory } from '../lib/actions';

// ---- Lokale Typen statt Prisma ---------------------------------------------
export interface UserLite {
  id: string;
  username?: string | null;
  name?: string | null;
  avatar?: string | null;
}

export interface StoryLite {
  id: string | number;
  img: string;               // bei Mock: ObjectURL
  createdAt: Date;
  expiresAt: Date;
  userId: string;
  user: UserLite;
}
// ----------------------------------------------------------------------------

// MUI
import {
  Avatar,
  Badge,
  Box,
  Button,
  Stack,
  Tooltip,
  Typography,
  Card,
  CardContent,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export default function StoryList({
  stories,
}: {
  stories: StoryLite[];
}) {
  const { data: session, status } = useSession();
  const [storyList, setStoryList] = useState<StoryLite[]>(stories || []);
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const userId =
    (session?.user as { id?: string } | undefined)?.id ??
    session?.user?.email ??
    'anonymous';

  const [optimisticStories, pushOptimistic] = useOptimistic(
    storyList,
    (state, value: StoryLite) => [value, ...state]
  );

  if (status === 'loading') return <Typography variant="body2">Lädt…</Typography>;
  if (status === 'unauthenticated') return <Typography>Bitte einloggen.</Typography>;

  const handlePick = () => fileRef.current?.click();

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const url = URL.createObjectURL(f); // Mock: lokale Vorschau
    setImgUrl(url);
  };

  const add = async () => {
    if (!imgUrl) return;

    // Optimistic
    const optimistic: StoryLite = {
      id: Math.random(),
      img: imgUrl,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      userId,
      user: {
        id: userId,
        username: 'Sending…',
        name: session?.user?.name ?? null,
        avatar: (session?.user?.image as string) ?? '/noAvatar.png',
      },
    };
    pushOptimistic(optimistic);

    try {
      const created = await addStory(imgUrl); // Server-Action (Mock)
      if (created) {
        setStoryList((prev) => [created as StoryLite, ...prev]);
      }
    } finally {
      // reset
      setImgUrl(null);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  return (
    <Stack direction="row" spacing={3} alignItems="flex-start">
      {/* Add Story */}
      <Card variant="outlined" sx={{ p: 2 }}>
        <CardContent sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: 1.5 }}>
          <Tooltip title="Story hinzufügen">
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              badgeContent={<AddCircleOutlineIcon fontSize="small" />}
            >
              <Box sx={{ position: 'relative', width: 80, height: 80, borderRadius: '50%', overflow: 'hidden', cursor: 'pointer' }} onClick={handlePick}>
                <Image
                  src={imgUrl || (session?.user?.image as string) || '/noAvatar.png'}
                  alt="avatar"
                  fill
                  sizes="80px"
                  style={{ objectFit: 'cover' }}
                />
              </Box>
            </Badge>
          </Tooltip>

          {imgUrl ? (
            <Button size="small" variant="contained" onClick={add}>
              Senden
            </Button>
          ) : (
            <Typography variant="body2" fontWeight={600}>
              Add a Story
            </Typography>
          )}

          <input ref={fileRef} type="file" accept="image/*" hidden onChange={onFile} />
        </CardContent>
      </Card>

      {/* Stories */}
      <Stack direction="row" spacing={2} flexWrap="wrap">
        {optimisticStories.map((story) => (
          <Stack key={story.id} alignItems="center" spacing={1}>
            <Avatar
              sx={{ width: 80, height: 80, border: '2px solid', borderColor: 'divider' }}
              src={story.user.avatar || undefined}
            />
            <Typography variant="body2" fontWeight={600} noWrap maxWidth={80} textAlign="center">
              {story.user.name || story.user.username || 'User'}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}
