'use client';

import { useState } from 'react';
import PostCard from './PostCard';

const posts = [
  {
    id: 1,
    user: { name: 'Jane Doe', avatar: '/images/profile-avatar.jpg' },
    title: 'Neues Feature in OmnixysSphere',
    content: 'Wir haben gerade die Analytics-Integration veröffentlicht! 🚀',
    image: '/images/post1.jpg',
  },
  {
    id: 2,
    user: { name: 'John Smith', avatar: '/images/avatar2.jpg' },
    title: 'GraphQL rocks!',
    content: 'API-First Entwicklung mit GraphQL ist ein Game-Changer.',
  },
];

export default function FeedList() {
  const [feed, setFeed] = useState(posts);

  return (
    <>
      {feed.map((p) => (
        <PostCard
          key={p.id}
          title={p.title}
          content={p.content}
          image={p.image}
          user={p.user}
        />
      ))}
    </>
  );
}
