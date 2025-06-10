// components/common/MotionImage.tsx
"use client";

import { motion } from "framer-motion";
import Image, { ImageProps } from "next/image";
import { fadeIn } from "@/lib/animation/motionVariants";

type MotionImageProps = ImageProps & {
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right";
};

export default function MotionImage({
  delay = 0,
  duration = 0.6,
  direction = "up",
  ...rest
}: MotionImageProps) {
  return (
    <motion.div {...fadeIn(direction, delay, duration)}>
      <Image {...rest} />
    </motion.div>
  );
}
