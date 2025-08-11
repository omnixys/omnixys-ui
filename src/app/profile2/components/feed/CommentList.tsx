'use client';

import { useSession } from 'next-auth/react';
import { useOptimistic, useState } from 'react';
import { addComment } from '../../lib/actions';
import Image from 'next/image';

// leichte lokale Typen statt Prisma
export interface UserLite {
  id: string;
  username?: string | null;
  name?: string | null;
  surname?: string | null;
  avatar?: string | null;
}

export interface CommentLite {
  id: string | number;
  desc: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  postId: number;
  user: UserLite;
}

// MUI
import {
  Avatar,
  Box,
  IconButton,
  Stack,
  TextField,
  Typography,
  Divider,
  ButtonBase,
} from '@mui/material';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

export default function CommentList({
  comments,
  postId,
}: {
  comments: CommentLite[];
  postId: number;
}) {
  const { data: session, status } = useSession();
  const [commentState, setCommentState] = useState<CommentLite[]>(comments || []);
  const [desc, setDesc] = useState('');

  const userId =
    (session?.user as { id?: string } | undefined)?.id ??
    session?.user?.email ??
    null;

  const [optimisticComments, pushOptimistic] = useOptimistic(
    commentState,
    (state, value: CommentLite) => [value, ...state]
  );

  const handleAdd = async () => {
    if (!userId || !desc.trim()) return;

    // optimistic item
    const optimistic: CommentLite = {
      id: Math.random(),
      desc: desc.trim(),
      createdAt: new Date(),
      updatedAt: new Date(),
      userId,
      postId,
      user: {
        id: userId,
        username: 'Sending…',
        name: session?.user?.name ?? null,
        surname: null,
        avatar: (session?.user?.image as string) ?? '/noAvatar.png',
      },
    };
    pushOptimistic(optimistic);

    try {
      const created = await addComment(postId, desc.trim());
      if (created) setCommentState((prev) => [created as CommentLite, ...prev]);
    } finally {
      setDesc('');
    }
  };

  if (status === 'loading') return <Typography variant="body2">Lädt…</Typography>;

  return (
    <Stack spacing={2}>
      {/* Eingabe */}
      {userId && (
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar
            sx={{ width: 32, height: 32 }}
            src={(session?.user?.image as string) || '/noAvatar.png'}
          />
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{ flex: 1, bgcolor: 'action.hover', borderRadius: 3, px: 2, py: 1 }}
          >
            <TextField
              variant="standard"
              placeholder="Write a comment..."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              fullWidth
              InputProps={{ disableUnderline: true }}
            />
            <IconButton size="small" aria-label="emoji">
              <EmojiEmotionsIcon fontSize="small" />
            </IconButton>
            <ButtonBase
              onClick={handleAdd}
              sx={{
                px: 1.5,
                py: 0.5,
                borderRadius: 2,
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                '&:hover': { opacity: 0.9 },
              }}
            >
              Senden
            </ButtonBase>
          </Stack>
        </Stack>
      )}

      <Divider />

      {/* Liste */}
      <Stack spacing={3}>
        {optimisticComments.map((comment) => (
          <Stack key={comment.id} direction="row" spacing={2} alignItems="flex-start">
            {/* Avatar */}
            <Avatar
              sx={{ width: 40, height: 40 }}
              src={comment.user.avatar || '/noAvatar.png'}
            />

            {/* Inhalt */}
            <Box flex={1}>
              <Typography fontWeight={600} variant="body2">
                {comment.user.name && comment.user.surname
                  ? `${comment.user.name} ${comment.user.surname}`
                  : comment.user.username || 'User'}
              </Typography>

              <Typography variant="body2" sx={{ mt: 0.5 }}>
                {comment.desc}
              </Typography>

              <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 1 }}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <IconButton size="small">
                    <ThumbUpOffAltIcon fontSize="inherit" />
                  </IconButton>
                  <Typography variant="caption" color="text.secondary">
                    0 Likes
                  </Typography>
                </Stack>
                <Typography variant="caption" color="text.secondary" sx={{ cursor: 'pointer' }}>
                  Reply
                </Typography>
              </Stack>
            </Box>

            {/* Mehr */}
            <IconButton size="small" aria-label="more">
              <MoreHorizIcon fontSize="small" />
            </IconButton>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}
