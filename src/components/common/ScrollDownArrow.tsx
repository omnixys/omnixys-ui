// components/common/ScrollDownArrow.tsx
"use client";

import { IconButton } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";

interface ScrollDownArrowProps {
  targetId?: string;
  color?: string; // z. B. "white", "primary.main", "secondary.light"
  size?: number;
  onClick?: () => void;
}

export default function ScrollDownArrow({
  targetId,
  color = "white",
  size = 48,
  onClick,
}: ScrollDownArrowProps) {
  const theme = useTheme();

  const resolveColor = (key: string): string => {
    if (key?.includes(".")) {
      return (
        key.split(".").reduce((acc: any, k) => acc?.[k], theme.palette) ?? key
      );
    }
    return (
      theme.palette?.[key as keyof typeof theme.palette]?.main ??
      theme.palette?.common?.[key as keyof typeof theme.palette.common] ??
      key
    );
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (targetId) {
      const el = document.getElementById(targetId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.div
      animate={{ y: [0, 10, 0] }}
      transition={{ repeat: Infinity, duration: 1.5 }}
      style={{ textAlign: "center", marginTop: 4 }}
    >
      <IconButton onClick={handleClick} aria-label="Scroll down">
        <KeyboardArrowDownIcon
          sx={{ fontSize: size, color: resolveColor(color) }}
        />
      </IconButton>
    </motion.div>
  );
}
