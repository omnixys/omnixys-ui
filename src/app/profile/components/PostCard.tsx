'use client';

import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import 'dayjs/locale/de';
import isToday from 'dayjs/plugin/isToday';
import isYesterday from 'dayjs/plugin/isYesterday';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { getDayjsLocale } from '../utils/getDayjsLocale';

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);
dayjs.extend(isToday);
dayjs.extend(isYesterday);

interface PostCardProps {
  title: string;
  content: string;
  image?: string;
  user?: { id: string; name: string; avatar: string };
  createdAt?: string;
  isSupremeUser?: boolean;
}

export default function PostCard({
  title,
  content,
  image,
  user,
  createdAt,
  isSupremeUser = false,
}: PostCardProps) {
  const { data: session } = useSession();
  const userLang = getDayjsLocale(
    session?.user?.language?.toLowerCase() || 'de',
  );
  dayjs.locale(userLang);

  const now = dayjs();
  const date = dayjs(createdAt);

  if (!createdAt || !date.isValid()) return null;

  const relative = date.fromNow(); // z. B. "vor 3 Tagen"
  const absoluteTime = date.format('HH:mm');
  const absoluteDate = date.format('D. MMMM YYYY');

  let displayDate = '';
  let showTooltip = false;

  if (isSupremeUser) {
    if (date.isToday()) {
      displayDate = `Heute, ${absoluteTime} Uhr`;
    } else if (date.isYesterday()) {
      displayDate = `Gestern, ${absoluteTime} Uhr`;
    } else {
      displayDate = relative;
      showTooltip = true;
    }
  } else {
    if (date.isToday()) displayDate = 'Heute';
    else if (date.isYesterday()) displayDate = 'Gestern';
    else displayDate = relative;
  }

  return (
    <Card sx={{ mb: 3 }}>
      {user && (
        <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
          <Avatar src={user.avatar} sx={{ mr: 2 }} />
          <Box>
            <Link
              href={`/profile/${user.id}`}
              style={{ textDecoration: 'none' }}
            >
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                color="text.primary"
              >
                {user.name}
              </Typography>
            </Link>

            {displayDate &&
              (isSupremeUser && showTooltip ? (
                <Tooltip title={`${absoluteDate} (${absoluteTime} Uhr)`} arrow>
                  <Typography variant="caption" color="text.secondary">
                    {relative}
                  </Typography>
                </Tooltip>
              ) : (
                <Typography variant="caption" color="text.secondary">
                  {displayDate}
                </Typography>
              ))}
          </Box>
        </Box>
      )}

      {image && (
        <CardMedia
          component="img"
          height="250"
          image={image}
          alt={title}
          sx={{ objectFit: 'cover' }}
        />
      )}

      <CardContent>
        <Typography variant="h6" fontWeight="bold">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {content}
        </Typography>

        <Stack direction="row" spacing={2}>
          <IconButton>
            <FavoriteBorderIcon />
          </IconButton>
          <IconButton>
            <ChatBubbleOutlineIcon />
          </IconButton>
          <IconButton>
            <ShareIcon />
          </IconButton>
        </Stack>
      </CardContent>
    </Card>
  );
}
