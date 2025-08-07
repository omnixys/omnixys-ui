// components/common/MotionCard.tsx
'use client';

import { zoomIn } from '@/lib/animation/motionVariants';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

type MotionCardProps = {
  children: ReactNode;
  delay?: number;
  duration?: number;
};

export default function MotionCard({
  children,
  delay = 0,
  duration = 0.5,
}: MotionCardProps) {
  return (
    <motion.div
      {...zoomIn(delay, duration)}
      whileHover={{ scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 120 }}
    >
      {children}
    </motion.div>
  );
}
