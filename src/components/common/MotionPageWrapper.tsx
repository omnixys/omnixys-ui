// components/common/MotionPageWrapper.tsx
"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function MotionPageWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}
