// components/Post.tsx
import Image from 'next/image';
import { Suspense } from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';

import PostInfo from './PostInfo';
import PostInteraction from './PostInteraction';
import Comments from './Comments';

// MUI
import {
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
  Skeleton,
} from '@mui/material';

// leichte Typen statt Prisma
export interface UserLite {
  id: string;
  username?: string | null;
  name?: string | null;
  surname?: string | null;
  avatar?: string | null;
}

export interface FeedPost {
  id: number;
  desc: string;
  img?: string | null;
  user: UserLite;
  likes: { userId: string }[];          // kompatibel zu PostInteraction
  _count: { comments: number };         // kompatibel zu Comments-Aufruf
}

export default async function Post({ post }: { post: FeedPost }) {
  const session = await getServerSession(authOptions);
  const currentUserId =
    (session?.user as { id?: string } | undefined)?.id ??
    session?.user?.email ??
    null;

  const isOwner = currentUserId === post.user.id;

  return (
    <Card elevation={2}>
      <CardContent>
        <Stack spacing={2}>
          {/* USER ROW */}
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Stack direction="row" spacing={2} alignItems="center">
              <Box
                sx={{
                  position: 'relative',
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  overflow: 'hidden',
                }}
              >
                <Image
                  src={post.user.avatar || '/noAvatar.png'}
                  alt="avatar"
                  fill
                  sizes="40px"
                  style={{ objectFit: 'cover' }}
                />
              </Box>
              <Typography variant="subtitle2" fontWeight={600}>
                {post.user.name && post.user.surname
                  ? `${post.user.name} ${post.user.surname}`
                  : post.user.username || 'User'}
              </Typography>
            </Stack>

            {isOwner && <PostInfo postId={post.id} />}
          </Stack>

          {/* CONTENT */}
          <Stack spacing={2}>
            {post.img && (
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  minHeight: 320,
                  borderRadius: 2,
                  overflow: 'hidden',
                }}
              >
                <Image
                  src={post.img}
                  alt="post image"
                  fill
                  sizes="100vw"
                  style={{ objectFit: 'cover' }}
                />
              </Box>
            )}
            <Typography variant="body1">{post.desc}</Typography>
          </Stack>

          {/* INTERACTIONS */}
          <Suspense
            fallback={
              <Stack direction="row" spacing={2} alignItems="center">
                <Skeleton variant="rounded" width={160} height={36} />
                <Skeleton variant="rounded" width={160} height={36} />
                <Box flex={1} />
                <Skeleton variant="rounded" width={120} height={36} />
              </Stack>
            }
          >
            <PostInteraction
              postId={post.id}
              likes={post.likes.map((l) => l.userId)}
              commentNumber={post._count.comments}
            />
          </Suspense>

          {/* COMMENTS */}
          <Suspense
            fallback={
              <Stack spacing={2}>
                <Skeleton variant="text" width="40%" />
                <Skeleton variant="rounded" width="100%" height={64} />
                <Skeleton variant="rounded" width="100%" height={64} />
              </Stack>
            }
          >
            <Comments postId={post.id} />
          </Suspense>
        </Stack>
      </CardContent>
    </Card>
  );
}
