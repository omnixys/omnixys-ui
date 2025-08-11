// app/(…)/Stories.tsx
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import StoryList from './StoryList';

// MUI
import { Card, CardContent, Box } from '@mui/material';

// ---- leichte Typen-Kompatibilität zur StoryList ----------------------------
export interface UserLite {
  id: string;
  username?: string | null;
  name?: string | null;
  avatar?: string | null;
}

export interface StoryLite {
  id: string | number;
  img: string;
  createdAt: Date;
  expiresAt: Date;
  userId: string;
  user: UserLite;
}
// ---------------------------------------------------------------------------

// Mock: Stories + Follows (statt Prisma)
async function mockFindActiveStoriesForUser(currentUserId: string): Promise<StoryLite[]> {
  // Beispiel-User
  const users: Record<string, UserLite> = {
    u1: { id: 'u1', username: 'alice', name: 'Alice', avatar: '/noAvatar.png' },
    u2: { id: 'u2', username: 'bob', name: 'Bob', avatar: '/noAvatar.png' },
    u3: { id: 'u3', username: 'you', name: 'You', avatar: '/noAvatar.png' },
  };

  // Follows: wer folgt wem
  const follows: Array<{ followerId: string; followeeId: string }> = [
    { followerId: 'u3', followeeId: 'u1' }, // du folgst Alice
    // erweitere nach Bedarf
  ];

  // Beispiel-Stories
  const now = Date.now();
  const stories: StoryLite[] = [
    {
      id: 's1',
      img: '/example/story1.jpg',
      createdAt: new Date(now - 1 * 60 * 60 * 1000),
      expiresAt: new Date(now + 23 * 60 * 60 * 1000),
      userId: 'u1',
      user: users['u1'],
    },
    {
      id: 's2-expired',
      img: '/example/expired.jpg',
      createdAt: new Date(now - 30 * 60 * 60 * 1000),
      expiresAt: new Date(now - 6 * 60 * 60 * 1000),
      userId: 'u2',
      user: users['u2'],
    },
    {
      id: 's3',
      img: '/example/your-story.jpg',
      createdAt: new Date(now - 2 * 60 * 60 * 1000),
      expiresAt: new Date(now + 22 * 60 * 60 * 1000),
      userId: 'u3',
      user: users['u3'],
    },
  ];

  // aktive Stories (nicht abgelaufen)
  const active = stories.filter((s) => s.expiresAt.getTime() > now);

  // folgt currentUserId dem Story-Owner?
  const isFollowedByCurrent = (ownerId: string) =>
    follows.some((f) => f.followerId === currentUserId && f.followeeId === ownerId);

  // Filter: (Owner folgt-Beziehung) ODER (eigene Story)
  return active.filter((s) => s.userId === currentUserId || isFollowedByCurrent(s.userId));
}

export default async function Stories() {
  const session = await getServerSession(authOptions);
  const currentUserId =
    (session?.user as { id?: string } | undefined)?.id ??
    session?.user?.email ??
    null;

  if (!currentUserId) return null;

  const stories = await mockFindActiveStoriesForUser(currentUserId);

  return (
    <Card elevation={2} sx={{ p: 2 }}>
      <CardContent sx={{ py: 1 }}>
        {/* horizontal scrollbarer Bereich wie zuvor */}
        <Box sx={{ overflowX: 'auto' }}>
          <Box sx={{ display: 'flex', gap: 3, width: 'max-content' }}>
            <StoryList stories={stories} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
