'use client';

import { useSession } from 'next-auth/react';
import { useOptimistic, useState } from 'react';
import { switchLike } from '../../lib/actions';

// MUI
import {
  Stack,
  IconButton,
  Typography,
  Card,
  CardContent,
  Divider,
  Tooltip,
} from '@mui/material';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';

export default function PostInteraction({
  postId,
  likes,
  commentNumber,
}: {
  postId: number;
  likes: string[];
  commentNumber: number;
}) {
  const { data: session, status } = useSession();

  const userId =
    (session?.user as { id?: string } | undefined)?.id ??
    session?.user?.email ??
    null;

  const [likeState, setLikeState] = useState(() => ({
    likeCount: likes.length,
    isLiked: userId ? likes.includes(userId) : false,
  }));

  const [optimisticLike, applyOptimistic] = useOptimistic(
    likeState,
    (state) => ({
      likeCount: state.isLiked ? state.likeCount - 1 : state.likeCount + 1,
      isLiked: !state.isLiked,
    })
  );

  const likeAction = async () => {
    if (!userId) return; // nicht eingeloggt
    applyOptimistic(null as never);
    try {
      await switchLike(postId); // Mock-Server-Action
      setLikeState((s) => ({
        likeCount: s.isLiked ? s.likeCount - 1 : s.likeCount + 1,
        isLiked: !s.isLiked,
      }));
    } catch {
      // optional: rollback oder snackbar
    }
  };

  if (status === 'loading') return null;

  return (
    <Card elevation={0} sx={{ bgcolor: 'transparent' }}>
      <CardContent sx={{ py: 1 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ my: 1 }}>
          {/* Left group: Likes & Comments */}
          <Stack direction="row" spacing={2} alignItems="center">
            <Stack
              direction="row"
              spacing={1.5}
              alignItems="center"
              sx={{ bgcolor: 'action.hover', px: 1.5, py: 1, borderRadius: 3 }}
            >
              <Tooltip title={optimisticLike.isLiked ? 'Unlike' : 'Like'}>
                <IconButton size="small" onClick={likeAction} disabled={!userId}>
                  {optimisticLike.isLiked ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
                </IconButton>
              </Tooltip>
              <Divider flexItem orientation="vertical" />
              <Typography variant="body2" color="text.secondary">
                {optimisticLike.likeCount}
                <Typography component="span" variant="body2" sx={{ ml: 0.5 }} color="text.secondary">
                  Likes
                </Typography>
              </Typography>
            </Stack>

            <Stack
              direction="row"
              spacing={1.5}
              alignItems="center"
              sx={{ bgcolor: 'action.hover', px: 1.5, py: 1, borderRadius: 3 }}
            >
              <IconButton size="small" disabled>
                <ChatBubbleOutlineIcon />
              </IconButton>
              <Divider flexItem orientation="vertical" />
              <Typography variant="body2" color="text.secondary">
                {commentNumber}
                <Typography component="span" variant="body2" sx={{ ml: 0.5 }} color="text.secondary">
                  Comments
                </Typography>
              </Typography>
            </Stack>
          </Stack>

          {/* Right group: Share */}
          <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
            sx={{ bgcolor: 'action.hover', px: 1.5, py: 1, borderRadius: 3 }}
          >
            <IconButton size="small" disabled>
              <ShareOutlinedIcon />
            </IconButton>
            <Divider flexItem orientation="vertical" />
            <Typography variant="body2" color="text.secondary">
              Share
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
