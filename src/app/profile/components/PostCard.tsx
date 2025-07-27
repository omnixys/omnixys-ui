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
  Typography,
} from '@mui/material';
import Link from 'next/link';

interface PostCardProps {
  title: string;
  content: string;
  image?: string;
  user?: { id: string; name: string; avatar: string };
}

export default function PostCard({
  title,
  content,
  image,
  user,
}: PostCardProps) {
  return (
    <Card sx={{ mb: 3 }}>
      {user && (
        <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
          <Avatar src={user.avatar} sx={{ mr: 2 }} />
          <Link href={`/profile/${user.id}`} style={{ textDecoration: 'none' }}>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              color="text.primary"
            >
              {user.name}
            </Typography>
          </Link>
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
