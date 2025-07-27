'use client';

import { Card, CardContent, CardMedia, Typography } from '@mui/material';

interface PostCardProps {
  title: string;
  content: string;
  image?: string;
}

export default function PostCard({ title, content, image }: PostCardProps) {
  return (
    <Card sx={{ mb: 3 }}>
      {image && (
        <CardMedia
          component="img"
          height="200"
          image={image}
          alt={title}
          sx={{ objectFit: 'cover' }}
        />
      )}
      <CardContent>
        <Typography variant="h6" fontWeight="bold">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {content}
        </Typography>
      </CardContent>
    </Card>
  );
}
