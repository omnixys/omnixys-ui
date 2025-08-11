// components/Feed.tsx
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import Post, { FeedPost, UserLite } from './Post';

// MUI
import { Card, CardContent, Stack, Typography } from '@mui/material';

// --- Mock-Datenquelle --------------------------------------------------------
type Like = { userId: string };

const mockUsers: Record<string, UserLite> = {
  u1: { id: 'u1', username: 'alice', name: 'Alice', avatar: '/noAvatar.png' },
  u2: { id: 'u2', username: 'bob', name: 'Bob', avatar: '/noAvatar.png' },
  u3: { id: 'u3', username: 'you', name: 'You', avatar: '/noAvatar.png' },
};

const mockFollows: Array<{ followerId: string; followingId: string }> = [
  { followerId: 'u3', followingId: 'u1' }, // you -> alice
];

const mockPosts: FeedPost[] = [
  {
    id: 1,
    desc: 'Hallo Welt!',
    img: '/example/post1.jpg',
    user: mockUsers.u1,
    likes: [{ userId: 'u2' }, { userId: 'u3' }] as Like[],
    _count: { comments: 2 },
  },
  {
    id: 2,
    desc: 'Mein zweiter Post.',
    img: null,
    user: mockUsers.u3,
    likes: [{ userId: 'u1' }] as Like[],
    _count: { comments: 0 },
  },
];

async function mockFindPostsByUsername(username: string): Promise<FeedPost[]> {
  const user = Object.values(mockUsers).find((u) => u.username === username);
  if (!user) return [];
  return mockPosts
    .filter((p) => p.user.id === user.id)
    .sort((a, b) => b.id - a.id);
}

async function mockFindFeedPostsForUser(currentUserId: string): Promise<FeedPost[]> {
  const followingIds = mockFollows
    .filter((f) => f.followerId === currentUserId)
    .map((f) => f.followingId);
  const ids = new Set([currentUserId, ...followingIds]);
  return mockPosts
    .filter((p) => ids.has(p.user.id))
    .sort((a, b) => b.id - a.id);
}
// ---------------------------------------------------------------------------

export default async function Feed({ username }: { username?: string }) {
  const session = await getServerSession(authOptions);
  const currentUserId =
    (session?.user as { id?: string } | undefined)?.id ??
    session?.user?.email ??
    null;

  let posts: FeedPost[] = [];

  if (username) {
    posts = await mockFindPostsByUsername(username);
  } else if (currentUserId) {
    posts = await mockFindFeedPostsForUser(currentUserId);
  }

  return (
    <Card elevation={2}>
      <CardContent>
        {posts.length ? (
          <Stack spacing={6}>
            {posts.map((post) => (
              <Post key={post.id} post={post} />
            ))}
          </Stack>
        ) : (
          <Typography variant="body2" color="text.secondary">
            No posts found!
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
