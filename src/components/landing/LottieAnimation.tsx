"use client";

import { Box } from "@mui/material";
import Lottie from "lottie-react";
import { useTheme } from "@mui/material/styles";
import type { LottieOptions } from "lottie-react";

interface LottieAnimationProps {
  animationData: any;
  loop?: boolean;
  autoplay?: boolean;
  speed?: number;
  width?: number | string;
  height?: number | string;
  className?: string;
}

export default function LottieAnimation({
  animationData,
  loop = true,
  autoplay = true,
  speed = 1,
  width = "100%",
  height = "auto",
  className,
}: LottieAnimationProps) {
  const theme = useTheme();

  const options: LottieOptions = {
    animationData,
    loop,
    autoplay,
  };

  return (
    <Box
      className={className}
      sx={{
        width,
        height,
        maxWidth: "100%",
        mx: "auto",
      }}
    >
      <Lottie
        animationData={animationData}
        loop={loop}
        autoplay={autoplay}
        style={{ width: "100%" }}
      />
    </Box>
  );
}
