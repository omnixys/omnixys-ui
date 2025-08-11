// components/RightMenu.tsx
import { Suspense } from 'react';
import UserInfoCard from './UserInfoCard';
import UserMediaCard from './UserMediaCard';
import FriendRequests from './FriendRequests';
import Birthdays from './Birthdays';
import Ad from '../Ad';

// MUI
import { Stack, Skeleton, Card, CardContent } from '@mui/material';

// leichter User-Typ statt Prisma
export type UserLite = {
  id: string;
  username: string;
  name?: string | null;
  surname?: string | null;
  description?: string | null;
  city?: string | null;
  school?: string | null;
  work?: string | null;
  website?: string | null;
  createdAt?: string | Date;
  avatar?: string | null;
  cover?: string | null;
};

function CardSkeleton({ lines = 3, height = 120 }: { lines?: number; height?: number }) {
  return (
    <Card elevation={2}>
      <CardContent>
        <Skeleton variant="text" width="40%" />
        <Skeleton variant="rounded" height={height} sx={{ my: 1.5 }} />
        {Array.from({ length: lines }).map((_, i) => (
          <Skeleton key={i} variant="text" width={`${70 - i * 10}%`} />
        ))}
      </CardContent>
    </Card>
  );
}

export default function RightMenu({ user }: { user?: UserLite }) {
  return (
    <Stack spacing={2}>
      {user ? (
        <>
          <Suspense fallback={<CardSkeleton lines={2} height={80} />}>
            <UserInfoCard user={user} />
          </Suspense>

          <Suspense fallback={<CardSkeleton lines={1} height={100} />}>
            <UserMediaCard user={user} />
          </Suspense>
        </>
      ) : null}

      <FriendRequests />
      <Birthdays />
      <Ad size="md" />
    </Stack>
  );
}
