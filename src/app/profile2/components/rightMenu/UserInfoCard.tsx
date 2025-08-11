// components/UserInfoCard.tsx
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import UpdateUser from './UpdateUser';
import UserInfoCardInteraction from './UserInfoCardInteraction';

// MUI
import {
  Card,
  CardContent,
  Stack,
  Typography,
  Link as MUILink,
  Chip,
} from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';

// leichte User-Typen ohne Prisma
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
  createdAt: string | Date;
};

// --- Mock-Relationen statt Prisma -------------------------------------------
async function mockRelationFlags(currentUserId: string | null, profileUserId: string) {
  if (!currentUserId) {
    return { isUserBlocked: false, isFollowing: false, isFollowingSent: false };
  }
  // Für die Demo simpel: block/follow/request nur anhand fester Regeln mocken
  const isUserBlocked = false;
  const isFollowing = currentUserId !== profileUserId && profileUserId.endsWith('1');
  const isFollowingSent = !isFollowing && profileUserId.endsWith('2');
  return { isUserBlocked, isFollowing, isFollowingSent };
}
// -----------------------------------------------------------------------------

export default async function UserInfoCard({ user }: { user: UserLite }) {
  const session = await getServerSession(authOptions);
  const currentUserId =
    (session?.user as { id?: string } | undefined)?.id ??
    session?.user?.email ??
    null;

  const createdAtDate = new Date(user.createdAt);
  const formattedDate = createdAtDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const { isUserBlocked, isFollowing, isFollowingSent } = await mockRelationFlags(
    currentUserId,
    user.id
  );

  const displayName =
    user.name && user.surname ? `${user.name} ${user.surname}` : user.username;

  return (
    <Card elevation={2}>
      <CardContent>
        <Stack spacing={2}>
          {/* TOP */}
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="subtitle2" color="text.secondary" fontWeight={600}>
              User Information
            </Typography>

            {currentUserId === user.id ? (
              <UpdateUser user={user} />
            ) : (
              <MUILink component={Link} href="/" variant="caption" color="primary">
                See all
              </MUILink>
            )}
          </Stack>

          {/* NAME + HANDLE */}
          <Stack direction="row" spacing={1} alignItems="baseline">
            <Typography variant="h6">{displayName}</Typography>
            <Typography variant="body2" color="text.secondary">
              @{user.username}
            </Typography>
          </Stack>

          {/* DESCRIPTION */}
          {user.description && (
            <Typography variant="body2" color="text.primary">
              {user.description}
            </Typography>
          )}

          {/* ATTRIBUTES */}
          <Stack spacing={1}>
            {user.city && (
              <Stack direction="row" spacing={1} alignItems="center">
                <LocationOnOutlinedIcon fontSize="small" />
                <Typography variant="body2">
                  Living in <b>{user.city}</b>
                </Typography>
              </Stack>
            )}
            {user.school && (
              <Stack direction="row" spacing={1} alignItems="center">
                <SchoolOutlinedIcon fontSize="small" />
                <Typography variant="body2">
                  Went to <b>{user.school}</b>
                </Typography>
              </Stack>
            )}
            {user.work && (
              <Stack direction="row" spacing={1} alignItems="center">
                <WorkOutlineOutlinedIcon fontSize="small" />
                <Typography variant="body2">
                  Works at <b>{user.work}</b>
                </Typography>
              </Stack>
            )}

            <Stack direction="row" alignItems="center" justifyContent="space-between">
              {user.website && (
                <Stack direction="row" spacing={1} alignItems="center">
                  <LinkOutlinedIcon fontSize="small" />
                  <MUILink
                    component={Link}
                    href={user.website.startsWith('http') ? user.website : `https://${user.website}`}
                    color="primary"
                    underline="hover"
                    variant="body2"
                  >
                    {user.website}
                  </MUILink>
                </Stack>
              )}
              <Stack direction="row" spacing={1} alignItems="center">
                <CalendarMonthOutlinedIcon fontSize="small" />
                <Typography variant="body2">Joined {formattedDate}</Typography>
              </Stack>
            </Stack>
          </Stack>

          {/* ACTIONS */}
          {currentUserId && currentUserId !== user.id && (
            <UserInfoCardInteraction
              userId={user.id}
              isUserBlocked={isUserBlocked}
              isFollowing={isFollowing}
              isFollowingSent={isFollowingSent}
            />
          )}

          {/* Optionaler Status-Hinweis */}
          {currentUserId === user.id && (
            <Stack direction="row" spacing={1}>
              {user.city && <Chip size="small" label={`City: ${user.city}`} />}
              {user.work && <Chip size="small" label={`Work: ${user.work}`} />}
            </Stack>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
