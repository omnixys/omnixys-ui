'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import PostCard from './PostCard';

const dummyPosts = [
  {
    id: 1,
    user: {
      id: 'jane-doe',
      name: 'Jane Doe',
      avatar: '/images/profile-avatar.jpg',
    },
    title: 'Neues Feature in OmnixysSphere',
    content: 'Analytics-Integration ist live! 🚀',
    image: '/images/post1.jpg',
  },
  {
    id: 2,
    user: {
      id: 'john-smith',
      name: 'John Smith',
      avatar: '/images/avatar2.jpg',
    },
    title: 'GraphQL rocks!',
    content: 'API-first Entwicklung ist ein Game-Changer.',
  },
];

export default function FeedList() {
  const [feed, setFeed] = useState(dummyPosts);

  const loadMore = () => {
    setTimeout(() => {
      setFeed((prev) => [
        ...prev,
        ...dummyPosts.map((p) => ({ ...p, id: prev.length + Math.random() })),
      ]);
    }, 1000);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 200
      ) {
        loadMore();
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {feed.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <PostCard
            title={p.title}
            content={p.content}
            image={p.image}
            user={p.user}
          />
        </motion.div>
      ))}
    </>
  );
}
