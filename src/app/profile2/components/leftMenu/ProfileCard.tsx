// components/ProfileCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';

// MUI
import {
  Card,
  CardContent,
  Box,
  Stack,
  Avatar,
  Typography,
  Button,
} from '@mui/material';

// leichte Typen
type UserLite = {
  id: string;
  username: string;
  name?: string | null;
  surname?: string | null;
  avatar?: string | null;
  cover?: string | null;
  _count: { followers: number };
};

// --- MOCHT: User + Follower-Count statt Prisma ------------------------------
async function mockFindUserById(userId: string): Promise<UserLite | null> {
  // hier könntest du anhand der userId variieren
  return {
    id: userId,
    username: 'you',
    name: 'You',
    surname: null,
    avatar: '/noAvatar.png',
    cover: '/noCover.png',
    _count: { followers: 123 },
  };
}
// ----------------------------------------------------------------------------

export default async function ProfileCard() {
  const session = await getServerSession(authOptions);
  const currentUserId =
    (session?.user as { id?: string } | undefined)?.id ??
    session?.user?.email ??
    null;

  if (!currentUserId) return null;

  const user = await mockFindUserById(currentUserId);
  if (!user) return null;

  const displayName =
    user.name && user.surname ? `${user.name} ${user.surname}` : user.username;

  return (
    <Card elevation={2}>
      <CardContent>
        <Stack spacing={2}>
          {/* Cover + Avatar */}
          <Box sx={{ position: 'relative', height: 80, borderRadius: 2, overflow: 'hidden' }}>
            <Image
              src={user.cover || '/noCover.png'}
              alt="cover"
              fill
              sizes="100vw"
              style={{ objectFit: 'cover' }}
            />
            <Avatar
              src={user.avatar || undefined}
              sx={{
                width: 48,
                height: 48,
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: -24,
                mx: 'auto',
                border: '2px solid',
                borderColor: 'background.paper',
                zIndex: 2,
              }}
            />
          </Box>

          {/* Name + Followers + Button */}
          <Stack spacing={1.5} alignItems="center" sx={{ pt: 3 }}>
            <Typography variant="subtitle1" fontWeight={600}>
              {displayName}
            </Typography>

            <Stack direction="row" spacing={1.5} alignItems="center">
              <Stack direction="row" spacing={0.5} alignItems="center">
                <Avatar sx={{ width: 12, height: 12 }} src="https://images.pexels.com/photos/19578755/pexels-photo-19578755/free-photo-of-woman-watching-birds-and-landscape.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load" />
                <Avatar sx={{ width: 12, height: 12 }} src="https://images.pexels.com/photos/19578755/pexels-photo-19578755/free-photo-of-woman-watching-birds-and-landscape.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load" />
                <Avatar sx={{ width: 12, height: 12 }} src="https://images.pexels.com/photos/19578755/pexels-photo-19578755/free-photo-of-woman-watching-birds-and-landscape.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load" />
              </Stack>
              <Typography variant="caption" color="text.secondary">
                {user._count.followers} Followers
              </Typography>
            </Stack>

            <Button
              component={Link}
              href={`/profile/${user.username}`}
              variant="contained"
              size="small"
            >
              My Profile
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
