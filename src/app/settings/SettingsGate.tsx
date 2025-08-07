// src/components/SettingsGate.tsx
'use client';

import { useSettings } from '@/context/SettingsContext';
import { Typography } from '@mui/material';

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
