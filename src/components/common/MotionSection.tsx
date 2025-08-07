// components/common/MotionSection.tsx
'use client';

import { fadeIn, staggerContainer } from '@/lib/animation/motionVariants';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

type MotionSectionProps = {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  stagger?: boolean;
  duration?: number;
};

export default function MotionSection({
  children,
  delay = 0,
  direction = 'up',
  stagger = false,
  duration = 0.6,
}: MotionSectionProps) {
  return (
    <motion.section
      variants={stagger ? staggerContainer(0.2, delay) : undefined}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.div {...fadeIn(direction, delay, duration)}>
        {children}
      </motion.div>
    </motion.section>
  );
}
