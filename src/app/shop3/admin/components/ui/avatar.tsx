"use client";

import React from "react";
import { Avatar as MUIAvatar, AvatarProps as MUIAvatarProps } from "@mui/material";

export interface CustomAvatarProps extends MUIAvatarProps {
  fallback?: React.ReactNode;
}

export const Avatar: React.FC<CustomAvatarProps> = ({ src, alt, fallback, ...props }) => {
  return (
    <MUIAvatar
      src={src}
      alt={alt}
      {...props}
      sx={{
        width: 32,
        height: 32,
        fontSize: 14,
        bgcolor: "grey.300",
        ...props.sx,
      }}
    >
      {(!src || src.trim() === "") && (fallback || alt?.[0] || "?")}
    </MUIAvatar>
  );
};
