// lib/commentsRepo.ts
import type { CommentLite, UserLite } from '@/types/social'; // siehe unten

const users: Record<string, UserLite> = {
  u1: { id: 'u1', username: 'alice', name: 'Alice', avatar: '/noAvatar.png' },
  u2: { id: 'u2', username: 'bob',   name: 'Bob',   avatar: '/noAvatar.png' },
};

const allComments: CommentLite[] = [
  {
    id: 'c1',
    desc: 'Erster!',
    createdAt: new Date(Date.now() - 1000 * 60 * 60),
    updatedAt: new Date(),
    userId: 'u1',
    postId: 1,
    user: users.u1,
  },
  {
    id: 'c2',
    desc: 'Sieht gut aus 👌',
    createdAt: new Date(Date.now() - 1000 * 60 * 30),
    updatedAt: new Date(),
    userId: 'u2',
    postId: 1,
    user: users.u2,
  },
];

export async function findCommentsByPostId(postId: number): Promise<CommentLite[]> {
  // Mock: filter & newest-first
  return allComments
    .filter((c) => c.postId === postId)
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}
