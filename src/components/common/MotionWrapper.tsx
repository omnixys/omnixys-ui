// components/common/MotionWrapper.tsx
"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function MotionWrapper({
  children,
  delay = 0,
  duration = 0.6,
  initialY = 30,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  initialY?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: initialY }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration, delay }}
    >
      {children}
    </motion.div>
  );
}
