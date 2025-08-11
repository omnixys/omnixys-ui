// components/Video.tsx
"use client";

import * as React from "react";
import { IKVideo } from "imagekitio-next";
import { Box, Alert } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT ?? "";

export type VideoProps = {
  path: string;
  /** Überschreibt die Standard-Transformationen */
  transformation?: Array<Record<string, string>>;
  /** Text-Overlay (nutzt ImageKit 'raw' Transformation) */
  overlayText?: string;
  /** Qualität, Breite/Höhe für Default-Transform */
  width?: number;
  height?: number;
  quality?: number;
  /** Native Video-Props */
  controls?: boolean;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  playsInline?: boolean;
  posterPath?: string; // optionales Poster (ImageKit-Pfad)
  sx?: SxProps<Theme>;
};

const Video: React.FC<VideoProps> = ({
  path,
  transformation,
  overlayText,
  width = 1920,
  height = 1080,
  quality = 90,
  controls = true,
  autoPlay = false,
  muted = false,
  loop = false,
  playsInline = true,
  posterPath,
  sx,
}) => {
  if (!urlEndpoint) {
    return (
      <Alert severity="error" variant="outlined">
        Fehlende Konfiguration: Bitte <code>NEXT_PUBLIC_URL_ENDPOINT</code> in <code>.env.local</code> setzen.
      </Alert>
    );
  }

  const defaultTransform = [
    { width: String(width), height: String(height), q: String(quality) },
    ...(overlayText
      ? [{ raw: `l-text,i-${encodeURIComponent(overlayText)},fs-80,co-white,l-end` }]
      : []),
  ];

  return (
    <Box sx={{ width: "100%", lineHeight: 0, ...sx }}>
      <IKVideo
        urlEndpoint={urlEndpoint}
        path={path}
        // Falls posterPath gesetzt ist, generieren wir die absolute Poster-URL
        poster={posterPath ? `${urlEndpoint}/${posterPath}` : undefined}
        transformation={transformation ?? defaultTransform}
        controls={controls}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        playsInline={playsInline}
        // Keine className – Styling erfolgt über sx-Wrapper
      />
    </Box>
  );
};

export default Video;
