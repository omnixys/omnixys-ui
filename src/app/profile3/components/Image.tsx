// components/Image.tsx
"use client";

import { IKImage } from "imagekitio-next";
import { Box, Alert } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";

type ImageProps = {
  path: string;
  w?: number;
  h?: number;
  alt: string;
  tr?: boolean;          // true => ImageKit-Transformation
  sx?: SxProps<Theme>;   // MUI-Styling statt className
};

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT ?? "";

const Image = ({ path, w, h, alt, tr, sx }: ImageProps) => {
  if (!urlEndpoint) {
    // Safer als ein Throw: bricht nicht das ganze Rendering
    return (
      <Alert severity="error" variant="outlined">
        Fehlende Konfiguration: Bitte <code>NEXT_PUBLIC_URL_ENDPOINT</code> in <code>.env.local</code> setzen.
      </Alert>
    );
  }

  return (
    <Box
      // Größe optional auch via sx steuerbar (z. B. sx={{ width: 40, height: 40 }})
      sx={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        lineHeight: 0,
        ...sx,
      }}
    >
      <IKImage
        urlEndpoint={urlEndpoint}
        path={path}
        {...(tr
          ? { transformation: [{ width: String(w ?? ""), height: String(h ?? "") }] }
          : { width: w, height: h })}
        lqip={{ active: true, quality: 20 }}
        alt={alt}
        // kein className mehr nötig; Styling via sx am umgebenden Box
      />
    </Box>
  );
};

export default Image;
