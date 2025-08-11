// components/UserMediaCard.tsx
import Link from 'next/link';
import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';

// MUI
import {
  Card,
  CardContent,
  Stack,
  Typography,
  Link as MUILink,
  Box,
} from '@mui/material';

// leichte Typen
type UserLite = {
  id: string;
  username?: string | null;
};

type MediaPost = {
  id: string | number;
  img: string;
  createdAt: Date;
};

// --- Mock statt Prisma -------------------------------------------------------
async function mockFindUserMedia(userId: string, limit = 8): Promise<MediaPost[]> {
  // Demo-Daten; in echt würdest du hier deine Datenquelle anbinden
  const samples = [
    '/example/post1.jpg',
    '/example/post2.jpg',
    '/example/post3.jpg',
    '/example/post4.jpg',
    '/example/post5.jpg',
    '/example/post6.jpg',
    '/example/post7.jpg',
    '/example/post8.jpg',
    '/example/post9.jpg',
  ];

  return samples
    .slice(0, limit)
    .map((src, i) => ({ id: `${userId}-m${i}`, img: src, createdAt: new Date(Date.now() - i * 1000) }));
}
// -----------------------------------------------------------------------------

export default async function UserMediaCard({ user }: { user: UserLite }) {
  // Session ist hier nicht zwingend nötig, aber verfügbar falls du Zugriffsregeln brauchst
  await getServerSession(authOptions);

  const postsWithMedia = await mockFindUserMedia(user.id, 8);

  return (
    <Card elevation={2}>
      <CardContent>
        <Stack spacing={2}>
          {/* TOP */}
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="subtitle2" color="text.secondary" fontWeight={600}>
              User Media
            </Typography>
            <MUILink component={Link} href="/" variant="caption" color="primary">
              See all
            </MUILink>
          </Stack>

          {/* GRID */}
          {postsWithMedia.length ? (
            <Box
              sx={{
                display: 'grid',
                gap: 1.5,
                gridTemplateColumns: 'repeat(auto-fill, minmax(96px, 1fr))',
              }}
            >
              {postsWithMedia.map((post) => (
                <Box
                  key={post.id}
                  sx={{
                    position: 'relative',
                    width: '100%',
                    height: 96,
                    borderRadius: 2,
                    overflow: 'hidden',
                  }}
                >
                  <Image
                    src={post.img}
                    alt="media"
                    fill
                    sizes="(max-width: 600px) 33vw, 96px"
                    style={{ objectFit: 'cover' }}
                  />
                </Box>
              ))}
            </Box>
          ) : (
            <Typography variant="body2" color="text.secondary">
              No media found!
            </Typography>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
