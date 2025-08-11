// components/Comments.tsx
import { Card, CardContent, Box } from '@mui/material';
import CommentList from './CommentList';
import { findCommentsByPostId } from '../../lib/commentsRepo';

export default async function Comments({ postId }: { postId: number }) {
  const comments = await findCommentsByPostId(postId);

  return (
    <Card elevation={2}>
      <CardContent>
        <Box>
          <CommentList comments={comments} postId={postId} />
        </Box>
      </CardContent>
    </Card>
  );
}
