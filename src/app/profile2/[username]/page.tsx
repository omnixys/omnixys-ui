// app/profile/[username]/page.tsx
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';

import LeftMenu from '../components/leftMenu/LeftMenu';
import RightMenu from '../components/rightMenu/RightMenu';
import Feed from '../components/feed/Feed';

// MUI
import { Box, Stack, Typography } from '@mui/material';

// --------- Leichte Typen & Mock-Repo (statt Prisma) -------------------------
type UserLite = {
  id: string;
  username: string;
  name?: string | null;
  surname?: string | null;
  avatar?: string | null;
  cover?: string | null;
  _count: { followers: number; followings: number; posts: number };
};

async function mockFindUserByUsername(username: string): Promise<UserLite | null> {
  const users: Record<string, UserLite> = {
    alice: {
      id: 'u1',
      username: 'alice',
      name: 'Alice',
      surname: null,
      avatar: '/noAvatar.png',
      cover: '/noCover.png',
      _count: { followers: 120, followings: 85, posts: 17 },
    },
    you: {
      id: 'u3',
      username: 'you',
      name: 'You',
      surname: null,
      avatar: '/noAvatar.png',
      cover: '/noCover.png',
      _count: { followers: 42, followings: 33, posts: 9 },
    },
  };
  return users[username] ?? null;
}

async function mockIsBlockedByUser(profileOwnerId: string, viewerId: string | null) {
  // Demo: niemand blockiert
  return false;
}
// ---------------------------------------------------------------------------

export default async function ProfilePage({ params }: { params: { username: string } }) {
  const username = params.username;
  const user = await mockFindUserByUsername(username);
  if (!user) return notFound();

  const session = await getServerSession(authOptions);
  const currentUserId =
    (session?.user as { id?: string } | undefined)?.id ?? session?.user?.email ?? null;

  const isBlocked = await mockIsBlockedByUser(user.id, currentUserId);
  if (isBlocked) return notFound();

  const displayName =
    user.name && user.surname ? `${user.name} ${user.surname}` : user.username;

  return (
    <Box
      sx={{
        display: 'grid',
        gap: 2,
        pt: 2,
        gridTemplateColumns: {
          xs: '1fr',
          lg: '7fr 3fr',
          xl: '2fr 5fr 3fr',
        },
      }}
    >
      {/* Left (nur xl) */}
      <Box sx={{ display: { xs: 'none', xl: 'block' } }}>
        <LeftMenu type="profile" />
      </Box>

      {/* Center */}
      <Box>
        <Stack spacing={2}>
          {/* Header / Cover / Avatar / Counters */}
          <Stack alignItems="center" spacing={2}>
            <Box sx={{ position: 'relative', width: '100%', height: 256, borderRadius: 2, overflow: 'hidden' }}>
              <Image
                src={user.cover || '/noCover.png'}
                alt="cover"
                fill
                sizes="100vw"
                style={{ objectFit: 'cover' }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: -64,
                  m: 'auto',
                  width: 128,
                  height: 128,
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '4px solid',
                  borderColor: 'background.paper',
                }}
              >
                <Image
                  src={user.avatar || '/noAvatar.png'}
                  alt="avatar"
                  fill
                  sizes="128px"
                  style={{ objectFit: 'cover' }}
                />
              </Box>
            </Box>

            <Typography variant="h5" fontWeight={600} sx={{ mt: 10 }}>
              {displayName}
            </Typography>

            <Stack direction="row" spacing={6} alignItems="center" sx={{ mb: 1 }}>
              <Stack alignItems="center">
                <Typography fontWeight={600}>{user._count.posts}</Typography>
                <Typography variant="body2" color="text.secondary">Posts</Typography>
              </Stack>
              <Stack alignItems="center">
                <Typography fontWeight={600}>{user._count.followers}</Typography>
                <Typography variant="body2" color="text.secondary">Followers</Typography>
              </Stack>
              <Stack alignItems="center">
                <Typography fontWeight={600}>{user._count.followings}</Typography>
                <Typography variant="body2" color="text.secondary">Following</Typography>
              </Stack>
            </Stack>
          </Stack>

          {/* Feed der Person */}
          <Feed username={user.username} />
        </Stack>
      </Box>

      {/* Right (ab lg) */}
      <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
        <RightMenu user={user} />
      </Box>
    </Box>
  );
}
