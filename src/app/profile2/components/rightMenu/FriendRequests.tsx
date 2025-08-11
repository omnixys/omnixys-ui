// components/FriendRequests.tsx
import NextLink from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import FriendRequestList, { FollowRequestLite, UserLite } from './FriendRequestList';

// MUI
import {
  Card,
  CardContent,
  Stack,
  Typography,
  Link as MUILink,
} from '@mui/material';

// --- Mock statt Prisma -------------------------------------------------------
async function mockFindRequestsForUser(receiverId: string): Promise<FollowRequestLite[]> {
  const users: Record<string, UserLite> = {
    u1: { id: 'u1', username: 'alice', name: 'Alice', avatar: '/noAvatar.png' },
    u2: { id: 'u2', username: 'bob',   name: 'Bob',   avatar: '/noAvatar.png' },
  };

  // Beispiel: zwei Anfragen an den aktuellen User
  return [
    { id: 101, sender: users.u1 },
    { id: 102, sender: users.u2 },
  ];
}
// -----------------------------------------------------------------------------

export default async function FriendRequests() {
  const session = await getServerSession(authOptions);
  const currentUserId =
    (session?.user as { id?: string } | undefined)?.id ??
    session?.user?.email ??
    null;

  if (!currentUserId) return null;

  const requests = await mockFindRequestsForUser(currentUserId);
  if (!requests.length) return null;

  return (
    <Card elevation={2}>
      <CardContent>
        <Stack spacing={2}>
          {/* TOP */}
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="subtitle2" color="text.secondary" fontWeight={600}>
              Friend Requests
            </Typography>
            <MUILink component={NextLink} href="/" variant="caption" color="primary">
              See all
            </MUILink>
          </Stack>

          {/* LIST */}
          <FriendRequestList requests={requests} />
        </Stack>
      </CardContent>
    </Card>
  );
}
