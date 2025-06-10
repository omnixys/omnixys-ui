// src/components/SettingsGate.tsx
"use client";

import { Typography } from "@mui/material";
import { useSettings } from "@/context/SettingsContext";

export default function SettingsGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading } = useSettings();

  if (loading) {
    return <Typography p={4}>Lade Benutzereinstellungen...</Typography>;
  }

  return <>{children}</>;
}
