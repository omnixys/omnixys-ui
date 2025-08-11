// components/FriendRequestList.tsx
'use client';

import { useOptimistic, useState } from 'react';
import { acceptFollowRequest, declineFollowRequest } from '../../lib/actions';

// MUI
import {
  Avatar,
  Stack,
  Typography,
  IconButton,
  Tooltip,
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

// leichte Typen (statt Prisma)
export interface UserLite {
  id: string;
  username?: string | null;
  name?: string | null;
  surname?: string | null;
  avatar?: string | null;
}
export interface FollowRequestLite {
  id: number;
  sender: UserLite;
}

export default function FriendRequestList({
  requests,
}: {
  requests: FollowRequestLite[];
}) {
  const [requestState, setRequestState] = useState(requests || []);

  const [optimisticRequests, removeOptimisticRequest] = useOptimistic(
    requestState,
    (state, requestId: number) => state.filter((r) => r.id !== requestId)
  );

  const accept = async (requestId: number, userId: string) => {
    removeOptimisticRequest(requestId);
    try {
      await acceptFollowRequest(userId); // Server Action (Mock)
      setRequestState((prev) => prev.filter((r) => r.id !== requestId));
    } catch {
      // optional: rollback/toast
    }
  };

  const decline = async (requestId: number, userId: string) => {
    removeOptimisticRequest(requestId);
    try {
      await declineFollowRequest(userId); // Server Action (Mock)
      setRequestState((prev) => prev.filter((r) => r.id !== requestId));
    } catch {
      // optional: rollback/toast
    }
  };

  if (!optimisticRequests.length) {
    return (
      <Card elevation={2}>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            No requests.
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card elevation={2}>
      <CardContent>
        <Stack spacing={2}>
          {optimisticRequests.map((request, idx) => {
            const name =
              request.sender.name && request.sender.surname
                ? `${request.sender.name} ${request.sender.surname}`
                : request.sender.username || 'User';

            return (
              <Stack key={request.id} spacing={1.5}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar
                      sx={{ width: 40, height: 40 }}
                      src={request.sender.avatar || undefined}
                    />
                    <Typography variant="subtitle2" fontWeight={600}>
                      {name}
                    </Typography>
                  </Stack>

                  <Stack direction="row" spacing={1.5}>
                    {/* Wie im Original per <form action=…>, damit useFormStatus ggf. nutzbar bleibt */}
                    <form action={() => accept(request.id, request.sender.id)}>
                      <Tooltip title="Accept">
                        <IconButton type="submit" size="small" color="success">
                          <CheckCircleOutlineIcon />
                        </IconButton>
                      </Tooltip>
                    </form>

                    <form action={() => decline(request.id, request.sender.id)}>
                      <Tooltip title="Decline">
                        <IconButton type="submit" size="small" color="error">
                          <CancelOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    </form>
                  </Stack>
                </Stack>

                {idx !== optimisticRequests.length - 1 && <Divider />}
              </Stack>
            );
          })}
        </Stack>
      </CardContent>
    </Card>
  );
}
