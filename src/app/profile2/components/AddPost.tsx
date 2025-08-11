'use client';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRef, useState } from 'react';
import AddPostButton from './AddPostButton';

// MUI
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
  Tooltip,
} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import VideocamIcon from '@mui/icons-material/Videocam';
import PollIcon from '@mui/icons-material/Poll';
import EventIcon from '@mui/icons-material/Event';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { addPost } from '../lib/actions';

export default function AddPost() {
  const { data: session, status } = useSession();
  const [desc, setDesc] = useState('');
  const [imgUrl, setImgUrl] = useState<string | undefined>();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (status === 'loading') return <Typography variant="body2">Lädt…</Typography>;
  if (status === 'unauthenticated') return <Typography>Bitte einloggen.</Typography>;

  const handlePickFile = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImgUrl(url);
  };

  // Hinweis: addPost ist eine Server Action (Mock), die FormData + imgUrl entgegennimmt.
  // Beispiel für Mock in '@/lib/actions':
  // export async function addPost(formData: FormData, imageUrl: string) {
  //   'use server';
  //   console.log('MOCK addPost', { desc: formData.get('desc'), imageUrl });
  // }

  return (
    <Card elevation={2} sx={{ p: 2 }}>
      <Box
        component="form"
        action={(formData) => addPost(formData, imgUrl || '')}
      >
        <Stack direction="row" spacing={2} alignItems="flex-start">
          {/* AVATAR */}
          <Avatar
            sx={{ width: 48, height: 48 }}
            src={(session?.user?.image as string) || undefined}
            alt={session?.user?.name ?? 'User'}
          >
            {session?.user?.name?.[0] ?? 'U'}
          </Avatar>

          {/* POST */}
          <Box flex={1}>
            {/* TEXT INPUT */}
            <Stack direction="row" spacing={2} alignItems="flex-start">
              <TextField
                name="desc"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Was geht dir gerade durch den Kopf?"
                multiline
                minRows={3}
                fullWidth
              />
              <Stack spacing={1} alignItems="center">
                <Tooltip title="Emoji">
                  <IconButton aria-label="emoji">
                    <EmojiEmotionsIcon />
                  </IconButton>
                </Tooltip>
                <AddPostButton />
              </Stack>
            </Stack>

            {/* Image Preview */}
            {imgUrl && (
              <Box
                mt={2}
                borderRadius={2}
                overflow="hidden"
                sx={{ position: 'relative', width: '100%', maxWidth: 420 }}
              >
                <Image
                  src={imgUrl}
                  alt="Preview"
                  width={840}
                  height={560}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </Box>
            )}

            {/* POST OPTIONS */}
            <CardActions sx={{ px: 0, pt: 1.5 }}>
              <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
                <Stack direction="row" spacing={1} alignItems="center">
                  <IconButton onClick={handlePickFile} aria-label="Foto hinzufügen">
                    <ImageIcon />
                  </IconButton>
                  <Typography variant="body2">Photo</Typography>
                </Stack>

                <Stack direction="row" spacing={1} alignItems="center">
                  <span>
                    <IconButton disabled aria-label="Video">
                      <VideocamIcon />
                    </IconButton>
                  </span>
                  <Typography variant="body2" color="text.secondary">
                    Video
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={1} alignItems="center">
                  <span>
                    <IconButton disabled aria-label="Umfrage">
                      <PollIcon />
                    </IconButton>
                  </span>
                  <Typography variant="body2" color="text.secondary">
                    Poll
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={1} alignItems="center">
                  <span>
                    <IconButton disabled aria-label="Event">
                      <EventIcon />
                    </IconButton>
                  </span>
                  <Typography variant="body2" color="text.secondary">
                    Event
                  </Typography>
                </Stack>
              </Stack>
            </CardActions>
          </Box>
        </Stack>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={handleFileChange}
        />
      </Box>

      <Divider sx={{ mt: 2 }} />
      <CardContent sx={{ pt: 1 }}>
        <Typography variant="caption" color="text.secondary">
          Hinweis: Mock – keine Datenbank/Prisma. Das Bild wird nur lokal als Preview angezeigt.
        </Typography>
      </CardContent>
    </Card>
  );
}
