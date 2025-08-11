'use client';

import { useOptimistic, useState } from 'react';
import { switchBlock, switchFollow } from '../../lib/actions';

// MUI
import { Button, Typography, Stack } from '@mui/material';

export default function UserInfoCardInteraction({
  userId,
  isUserBlocked,
  isFollowing,
  isFollowingSent,
}: {
  userId: string;
  isUserBlocked: boolean;
  isFollowing: boolean;
  isFollowingSent: boolean;
}) {
  const [userState, setUserState] = useState({
    following: isFollowing,
    blocked: isUserBlocked,
    followingRequestSent: isFollowingSent,
  });

  const [optimisticState, switchOptimisticState] = useOptimistic(
    userState,
    (state, action: 'follow' | 'block') =>
      action === 'follow'
        ? {
            ...state,
            // folgt bereits → bleibt folgen=true; sonst: Request senden
            following: state.following && false,
            followingRequestSent:
              !state.following && !state.followingRequestSent ? true : state.followingRequestSent,
          }
        : {
            ...state,
            blocked: !state.blocked,
          }
  );

  const follow = async () => {
    switchOptimisticState('follow');
    try {
      await switchFollow(userId);
      setUserState((prev) => ({
        ...prev,
        following: prev.following && false,
        followingRequestSent:
          !prev.following && !prev.followingRequestSent ? true : prev.followingRequestSent,
      }));
    } catch {
      // optional: rollback/snackbar
    }
  };

  const block = async () => {
    switchOptimisticState('block');
    try {
      await switchBlock(userId);
      setUserState((prev) => ({ ...prev, blocked: !prev.blocked }));
    } catch {
      // optional: rollback/snackbar
    }
  };

  const followLabel = optimisticState.following
    ? 'Following'
    : optimisticState.followingRequestSent
    ? 'Friend Request Sent'
    : 'Follow';

  return (
    <Stack spacing={1} alignItems="flex-end">
      {/* Follow */}
      <form action={follow} style={{ width: '100%' }}>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={optimisticState.following}
        >
          {followLabel}
        </Button>
      </form>

      {/* Block / Unblock */}
      <form action={block}>
        <Button type="submit" variant="text" color="error" size="small">
          <Typography variant="caption">
            {optimisticState.blocked ? 'Unblock User' : 'Block User'}
          </Typography>
        </Button>
      </form>
    </Stack>
  );
}
